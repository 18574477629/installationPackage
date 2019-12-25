var net = require('net');

var eventListeners = {}
function _sendMessage(msg){
    console.log('ipc['+msg+']');
}

function _on(event,callback){
    if(eventListeners[event]){
        eventListeners[event].push(callback);
    }else{
        eventListeners[event] = [callback];
    }
}

function emit(event){
    var listeners = eventListeners[event];
    if(listeners){
        for(var i = 0;i < listeners.length;i++){
            listeners[i]();
        }
    }
}

function _ping(pid){
    var count = 0;
    function checkMain(){
        var client= new net.Socket();
        client.connect(pid, function(){
            count = 0;
            client.destroy();
            setTimeout(checkMain, 2000);
        });
        client.on('error',function(error){
            if(error.code === 'ENOENT'
                || error.code === 'ECONNREFUSED'){
                count++;
            }
            if(count>=2){
                emit('exit');
            }else{
                setTimeout(checkMain, 2000);
            }
        });
    }
    setTimeout(checkMain, 2000);
}


process.stdin.setEncoding('utf8');
process.stdin.on('data',function(data) {
    data = data.trim();
    if(data.startsWith('ipc[') && data.endsWith(']')){
        data = data.substring(4,data.length - 1);
    }
    var dataObject = JSON.parse(data);
    var eventKey = 'event';
    if(dataObject[eventKey]){
        var listeners = eventListeners[eventKey];
        if(listeners){
            for(var i = 0;i < listeners.length;i++){
                listeners[i](dataObject[eventKey]);
            }
        }
    }else if(dataObject['exit']){
        var listeners = eventListeners['exit'];
        if(listeners){
        	for(var i = 0;i < listeners.length;i++){
        		listeners[i](dataObject['exit']);
        	}
        }
    }
});

module.exports = {
    sendMessage:_sendMessage,
    on:_on,
    ping:_ping
}