var fs = require("fs");
var snippet = require("./snippet").CodeSnippet;
var SnippetVariablesResolver = require('./snippetVariables').SnippetVariablesResolver;

//D:\Program Files (x86)\Microsoft VS Code\resources\app\extensions\javascript\snippets\javascript.json
var data = fs.readFileSync('D:/Program Files (x86)/Microsoft VS Code/resources/app/extensions/javascript/snippets/javascript.json');
var javascript = JSON.parse(data.toString());
for(var prop in javascript){
	if(javascript.hasOwnProperty(prop)){
		var lines = javascript[prop].body;
		var content = lines.join('\n');
		var codeSnippet = snippet.fromTextmate(content,new SnippetVariablesResolver());
        console.log(JSON.stringify(codeSnippet));
	}
}
