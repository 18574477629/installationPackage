var path = require('path');
var args = process.argv.splice(2);
var express = require('express');
var net = require('net');
var app = express();
var argsjson =JSON.parse(args[0]); //解析参数
var projects = argsjson.projects; //项目信息
var port = argsjson.port; //server启动端口
var hot = argsjson.hot; //是否要热刷新
var marked = require('marked'); //markdown预览插件
var iconv = require('iconv-lite'); //流操作辅助模块
var fs = require('fs'); //文件操作模块，读取md文件
var cookieParser = require('cookie-parser'); //cookie模块
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'imgsource')));
app.use(cookieParser());
app.get('/dcloudmdpaser', function (req, res) {  //markdown预览方法
	var filename = req.query.filename; //markdown文件（全路径）
	var theme = req.query.theme; //皮肤样式   默认/
	var projectname = req.query.projectname; //markdown文件所在项目，外部的markdown文件这个值是空的
	
	projectname = decodeURI(projectname);
	filename  = decodeURI(filename);

	var repath = req.query.repath; //markdown文件相对于项目根路径的相对路径
	repath  = decodeURI(repath);
	var charset = req.query.charset; //编码
	if(charset == "" || charset==undefined) {//不设置编码的话默认是u8
		charset = "utf-8";
  	}
	if(theme==""||theme==undefined){ //默认使用github的markdown样式
		theme = "github-markdown.css";
	}
	var fileStr = fs.readFileSync(req.query.filename, {encoding:'binary'}); //读取markdown文件内容
	var buf = new Buffer(fileStr, 'binary');
	var str = iconv.decode(buf, charset);
	var html = marked(str); //使用marked解析markdown为html
	var htmlstart = "<!DOCTYPE html><html><head><meta charset=\""+charset+"\" /><link rel=\"stylesheet\" href=\"/stylesheets/style.css\" type=\"text/css\" charset=\""+charset+"\" /><link rel=\"stylesheet\" href=\"/stylesheets/"+theme+"\" type=\"text/css\" charset=\""+charset+"\" /><link rel=\"stylesheet\" href=\"/stylesheets/prism.css\" type=\"text/css\" charset=\""+charset+"\" /><script src=\"/javascripts/prism.js\" type=\"text/javascript\" charset=\""+charset+"\"></script></head><body>"
	var htmlend = "</body></html>";
	html = htmlstart+html+htmlend;
	res.cookie('projectname', req.query.projectname, { expires: new Date(Date.now() + 900000), httpOnly: true }); //把项目名保存到cookie里
	res.cookie('repath', req.query.repath, { expires: new Date(Date.now() + 900000), httpOnly: true });//把相对路径保存到cookie里
	if(projectname==''){ //这说明是个外部的markdown文件
		var virtualprojectdir = filename.substring(0,filename.lastIndexOf("/")); //取出markdown文件所在目录
		var virtualprojectname = virtualprojectdir.substring(virtualprojectdir.lastIndexOf("/")+1,virtualprojectdir.length);//虚拟一个项目名出来
		
		//把虚拟出来的项目信息写到cookie里
		app.use('/'+encodeURIComponent(virtualprojectname),express.static(virtualprojectdir+''));
		res.cookie('projectname', virtualprojectname, { expires: new Date(Date.now() + 900000), httpOnly: true });
		res.cookie('repath', '', { expires: new Date(Date.now() + 900000), httpOnly: true });
		res.cookie('virtualprojectdir', virtualprojectdir, { expires: new Date(Date.now() + 900000), httpOnly: true });
	}else{
		//如果是项目内的markdown清除虚拟项目名
		res.cookie('virtualprojectdir', '', { expires: new Date(Date.now() + 900000), httpOnly: true });
	}
    res.send(html);
})
process.on('uncaughtException', function (err) { //这个是热刷新监听方法有时候会报错，但是不影响运行，catch住不管他
    console.error(err.stack);
    console.log("Node NOT Exiting...");
});

//把项目路径添加到一个list里
var joins = new Array();
projects.forEach(function (value,index,array) {
	joins.push(path.resolve(decodeURIComponent(value.path)));
});

//开启热刷新时，把上面的list传给对应参数
if (app.get('env') === 'development'&&hot) {
  var livereload = require('easy-livereload');
  app.use(livereload({
    watchDirs: joins,
	checkFunc:function(file){
		return true;
	},
    port: process.env.LIVERELOAD_PORT || 35729
  }));
}

//静态目录代理
projects.forEach(function (value,index,array) {
	
	var pname = decodeURIComponent(value.name)
	var ppath = decodeURIComponent(value.path)

	app.use('/'+encodeURIComponent(pname),express.static(ppath+''));
});

//处理静态监听找不到的文件
app.get('*', function(req, res){
	var projectname = req.cookies.projectname;
	var repath = req.cookies.repath;
	var virtualprojectdir = req.cookies.virtualprojectdir;
	var originalUrl = req.originalUrl;
	var ext ='';
	if(originalUrl.indexOf('.')>0){//后缀名，主要是监听看是不是图片
		ext = originalUrl.substring(originalUrl.lastIndexOf('.')+1);
		ext = ext.toLowerCase();
	}
	if(ext=='jpg'||ext=='png'||ext=='gif'){	//如果是图片大概率是markdown预览要使用的，那么拼下url看看能访问到不	
		if(virtualprojectdir!=''){//这个是外部markdown文件，那就直接以流的形式把图片丢回去
			res.set( 'content-type', ext );//设置返回类型
			var stream = fs.createReadStream( virtualprojectdir+"/"+req.cookies.repath+"/"+ originalUrl );
			var responseData = [];//存储文件流
			if (stream) {//判断状态
			    stream.on( 'data', function( chunk ) {
			      responseData.push( chunk );
			    });
			    stream.on( 'end', function() {
			       var finalData = Buffer.concat( responseData );
			       res.write( finalData );
			       res.end();
			    });
			}
		}else{//内部markdown文件，那么项目下必然存在该图片，重新组装下url
			res.redirect("/" + req.cookies.projectname +"/"+req.cookies.repath+"/"+ originalUrl);
		}
		
	}else{
		//到这里说明这个文件真不知道是干啥的，在哪里了，返回404页面吧
		res.sendFile( __dirname + "/" + "404.html" );
	}  
});

//启动server
var server = app.listen(port, function () {
	console.log('server start at '+port);
})

server.on('error', function(err) { console.log(err); });

//热刷新代码
if(args.length > 1 && args[1].length>0){
	var count = 0;
	function checkMain(){
		var client= new net.Socket();
		client.connect(args[1], function(){
			count = 0;
			client.destroy();
			setTimeout(checkMain, 2000);
		});
		client.on('error',function(error){
			if(error.code === 'ENOENT'){
				count++;
			}
			if(count>=2){
				process.exit();
			}else{
				setTimeout(checkMain, 2000);
			}
		});
	}
	setTimeout(checkMain, 2000);
}