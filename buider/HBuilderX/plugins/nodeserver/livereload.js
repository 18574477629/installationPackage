var path = require('path');
var express = require('express');
var net = require('net');
var fs = require('fs');
var marked = require('marked'); //markdown预览插件
var iconv = require('iconv-lite'); //流操作辅助模块
var cookieParser = require('cookie-parser'); //cookie模块
var ipc = require('./ipc.js');
var args = process.argv.splice(2);//启动参数
var port = 8848;
const renderer = new marked.Renderer();
renderer.listitem = function(text, task, checked){
	return task ? ('<li class=\'task\'>' + text + '</li>\n') : ('<li>' + text + '</li>\n');
}
marked.setOptions({
	renderer:renderer
});

process.on('uncaughtException', function(err) { //这个是热刷新监听方法有时候会报错，但是不影响运行，catch住不管他
	console.error(err.stack);
	console.log("Node NOT Exiting...");
});
var hostPid = args[0];
ipc.ping(hostPid);

var routerfile = args.length > 1 ? args[1] : "";//当前项目路由配置
console.error(routerfile);
var filechangedwatcher = args.length > 2 ? args[2] : path.join(__dirname, 'public');

var appendProjectName = true;

ipc.on('exit',function(){
    process.exit();
});

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'imgsource')));
app.use(cookieParser());
var livereload = require('easy-livereload');
app.use(livereload({
	watchDirs: [filechangedwatcher],
	checkFunc:function(file){
			//console.error(file);
			// 检查修改的文件，确认要不要刷新
			if(file == ".filechanges"){
                if(fs.existsSync(filechangedwatcher + "/.filechanges")){
                	var filename = fs.readFileSync(filechangedwatcher + "/.filechanges",'utf-8');
                	return !filename.endsWith(".log");
                }
            }
			return false;
	},
	renameFunc:function(file){
		if(fs.existsSync(filechangedwatcher + "/.filechanges")){
			var filename = fs.readFileSync(filechangedwatcher + "/.filechanges",'utf-8');
			//console.error(filename);
			return filename.trim();
		}
		return file;
	},
	port: process.env.LIVERELOAD_PORT || 35929
}));
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
	var htmlstart = "<!DOCTYPE html><html><head><meta charset=\""+charset+"\" /><link rel=\"stylesheet\" href=\"/stylesheets/style.css\" type=\"text/css\" charset=\""+charset+"\" /><link rel=\"stylesheet\" href=\"/stylesheets/"+theme+"\" type=\"text/css\" charset=\""+charset+"\" /><link rel=\"stylesheet\" href=\"/stylesheets/prism.css\" type=\"text/css\" charset=\""+charset+"\" /><script src=\"/javascripts/prism.js\" type=\"text/javascript\" charset=\""+charset+"\"></script></head><body class='markdown-body'>"
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

//处理文件请求
app.get('*', function(req, res) {
	//PATH: /test/index.html
	//实时初始化路由配置信息
	var routers = JSON.parse(fs.readFileSync(routerfile));
	/**
	 * 请求的文件路径
	 * @type {String}
	 */
	var requestFilePath = decodeURIComponent(req.path);
	console.log(requestFilePath);
	if (requestFilePath === '/') {
		res.send('<br/><br/><br/><br/><H1 style="text-align: center">欢迎使用HBuilder X!</H1>');
        return ;
	}
	var proSepIndex = requestFilePath.indexOf('/', 1);
	var projectName = "";
	if (proSepIndex != -1 && appendProjectName) {
		projectName = requestFilePath.substring(1, proSepIndex);
		console.error("projectName : " + projectName);
        requestFilePath = requestFilePath.substring(proSepIndex+1,requestFilePath.length);
	}
	var projectDir = "";
    if(routers && routers[projectName]){
    	projectDir = routers[projectName];
    	if(!projectDir.endsWith('/')){
	    	projectDir = projectDir + '/';
	    }
   	}
    var reqfile = projectDir + requestFilePath;
    console.error("reqfile:"+reqfile);
    if(fs.existsSync(reqfile) && projectDir.length > 0){
        var options = {
            root: projectDir,
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };
        res.sendFile(requestFilePath, options, function(err) {
            if (err) {
                console.error(err.stack);
            }
        });
    }else{
        var requestFileName = requestFilePath.toLowerCase();
        if(requestFileName.endsWith('.jpg')
        	||requestFileName.endsWith('.png')
        	||requestFileName.endsWith('.gif')){
        	var projectname = req.cookies.projectname;
        	var repath = req.cookies.repath;
        	var virtualprojectdir = req.cookies.virtualprojectdir;
        	var originalUrl = req.originalUrl;
        	var ext ='';
        	if(originalUrl.indexOf('.')>0){//后缀名，主要是监听看是不是图片
        		ext = originalUrl.substring(originalUrl.lastIndexOf('.')+1);
        		ext = ext.toLowerCase();
        	}
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
        	
        	return ;
        }
        res.sendFile( __dirname + "/" + "404.html" );
    }
});

function tryStartServer() {
	//启动server
	var server = app.listen(port, function() {
		var msg = {
            'event':{
                'type':'StartedEvent',
                'port': port
            }
		}
		ipc.sendMessage(JSON.stringify(msg));
	})
	server.on('error', function(err) {
		if (err.errno === 'EADDRINUSE') {
			port++;
			tryStartServer();
		} else {
			console.log(err);
		}
	});
}
tryStartServer();
