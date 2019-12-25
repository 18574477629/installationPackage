var ipc = require('./ipc.js');
var snippetService = require('./SnippetService.js');
var args = process.argv.splice(2);//启动参数
ipc.on('exit',function(){
    process.exit();
});
ipc.on('request',function(request){
    // console.error(JSON.stringify(request))
    try{
        if(request && request['method'] && request['args']){
            // console.error(request['method']);
            // console.error(request['args']);
            // console.error(JSON.stringify(snippetService));
            var result = snippetService[request['method']](request['args']);
            // console.error(result);
            ipc.sendMessage(JSON.stringify(result));
        }else{
            console.error(JSON.stringify(request));
            ipc.sendMessage("{}");
        }
    }catch(e){
        console.error(e);
        ipc.sendMessage("{}");
    }
});

var hostPid = args[0];
console.error(hostPid);
ipc.ping(hostPid);

setTimeout(function(){
    ipc.sendMessage("StartedEvent");
},1000);
