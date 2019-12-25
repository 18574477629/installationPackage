var path = require('path');
var fs = require('fs-extra');
var argv = require('yargs').argv;
var stripHtmlComments = require('strip-html-comments');

var babel = require("babel-core");
var parse = require('../parser/parser');
var nview = require("../plugin/nview");
var nviewValidate = require("../plugin/nview.validate");
var nviewRename = require("../plugin/nview.rename");

var scriptRegex = /<script[\s\S]*?>([\s\S]*)?<\/script>/gi;

module.exports = function(base, from, to) {
    var result = parse.parseComponent(fs.readFileSync(from, 'utf-8'), {
        pad: 'space'
    });
    if (result) {
        var template = result.template;
        var script = result.script;
        var stylesArray = result.styles;
        if (template && template.content) {
            var result = require("babel-core").transform(stripHtmlComments(template.content), {
                plugins: [
                    nviewValidate.template, nviewRename.template, ["transform-react-jsx", {
                        pragma: 'SubNView.createElement'
                    }],
                    nview.template
                ]
            });
            if (result.code && script && script.content) {
                var templateStr = fs.readFileSync(path.join(__dirname, '../template/nview.old.js'), 'utf-8');
                var res = templateStr.replace('/*NAME*/', function() {
                    return from.replace(base, '').replace(/^\//, '').replace('.nview', '');
                }).replace('/*SCRIPT*/', function() {
                    return script.content.trim();
                }).replace('/*NVIEWS*/', function() {
                    return result.code.trim();
                });
                fs.outputFileSync(to, res, {
                    override: true
                });
            }
        }

    }
}
//__build__('C:/Users/fxy06/Documents/wechat/wap2app-subnview-template-tools', 'C:/Users/fxy06/Documents/wechat/wap2app-subnview-template-tools/test.nview', 'C:/Users/fxy06/Documents/wechat/wap2app-subnview-template-tools/test.nview.js');
//if (process.argv.length !== 5) {
//  console.log('参数不正确');
//} else {
//  __build__(process.argv[2], process.argv[3], process.argv[4]);
//}