var fs = require('fs');
var path = require('path');
var snippet = require("../../snippet/snippet").CodeSnippet;
var SnippetVariablesResolver = require('../../snippet/snippetVariables').SnippetVariablesResolver;
var Snippets = {
    name: 'Snippets',
    version: function() {
        console.log("Snippet Version 1.0");
    },
    exit:function(){
        process.exit();
    },
    load: function(params) {
        var result = {};
        var pluginPath = params;
        if (params["pluginPath"]) {
            pluginPath = params["pluginPath"];
        }

        if (!fs.existsSync(pluginPath)) {
            return result;
        }
        var pluginInfo = fs.statSync(pluginPath);
        if (!pluginInfo.isDirectory()) {
            return this.parse(pluginPath);
        }
        var plugins = fs.readdirSync(pluginPath);
        plugins.forEach(function(ele, index) {
            try {
                var info = fs.statSync(pluginPath + "/" + ele);
                if (info.isDirectory()) {
                    var pluginConfigFile = path.join(pluginPath, ele, 'package.json');
                    if (fs.existsSync(pluginConfigFile)) {
                        try {
                            var pluginConfig = require(pluginConfigFile);
                            if (pluginConfig['contributes']) {
                                var contributes = pluginConfig['contributes'];
                                if (contributes['snippets']) {
                                    var snippetInfos = contributes['snippets'];
                                    snippetInfos.forEach(function(snippetInfo) {
                                        var lang = snippetInfo['language'];
                                        var project = snippetInfo['project'];
                                        var snippetPath = path.join(pluginPath, ele,
                                            snippetInfo['path']);
                                        var _snippets = Snippets.parse(snippetPath);
                                        if (project) {
                                            for (var prop in _snippets) {
                                                _snippets[prop]['project'] = project;
                                            }
                                        }
                                        if (!result[lang]) {
                                            result[lang] = _snippets;
                                        } else {
                                            for (var prop in _snippets) {
                                                result[lang][prop] = _snippets[prop];
                                            }
                                        }
                                    });
                                }
                            }
                        } catch (e) {
                            //TODO handle the exception
                        }
                    }
                }
            } catch (e) {
                console.log("ERROR: error process plugin " + ele + "\n\treason: " + e);
            }
        });
        return result;
    },
    parseOne: function(snippet_path) {
        if (!fs.existsSync(snippet_path)) {
            return {};
        }
        var contents = fs.readFileSync(snippet_path, 'latin1');
        var codeSnippet = snippet.fromTextmate(contents, new SnippetVariablesResolver());
        return codeSnippet;
    },
    parse: function(snippet_path) {
        var result = {};
        if (!fs.existsSync(snippet_path)) {
            return result;
        }

        var contents = fs.readFileSync(snippet_path, 'latin1');
        var lines = contents.split('\n');
        var len = lines.length;
        var jsonContents = [];// 去除注释
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (!line.trim().startsWith("//")) {
                jsonContents.push(line);
            }
        }
        contents = jsonContents.join('\n');
        // contents = contents.replace(/\t/g, '    ')
        var snippets = JSON.parse(contents);

        for (var sName in snippets) {
            var s = snippets[sName];
            s.lines = s.body;
            result[sName] = s;
            // var content = lines.join('\n');
            // var codeSnippet = snippet.fromTextmate(content, new SnippetVariablesResolver());
            // if (codeSnippet) {
            //     codeSnippet.prefix = s.prefix;
            //     codeSnippet.description = s.description;
            //     codeSnippet.scope = s.scope;
            //     codeSnippet.triggerAssist = s.triggerAssist;
            //     result[sName] = codeSnippet;
            // }
        }
        return result;
    },
    printUsage: function() {
        console.log("load   [plugin_path]");
        console.log("parse   [snippet_path]");
        console.log("parseOne   [snippet_path]");
    }
};
module.exports = Snippets;