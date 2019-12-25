/**
 * 命令行接口
 * 输入参数：--range-start -1 --range-end -1 --stdin-filepath %path%
 * 输出：格式化后的内容
 */
const beautify = require("js-beautify");
const fs = require("fs")
const path = require("path")
// 截取参数 --range-start -1 --range-end -1 --stdin-filepath %path% --use-tabs true --tab-width 4
var args = process.argv.slice(2)
var formator_options = {}
for (var i = 0; i < args.length; i = i + 2) {
    formator_options[args[i]] = args[i + 1]
}
var options = {
    start: formator_options["--range-start"],
    end: formator_options["--range-end"],
    filepath: formator_options["--stdin-filepath"],
    useTabs:"true" == formator_options["--use-tabs"],
    tabWidth:formator_options["--tab-width"],
    contents: fs.readFileSync(formator_options["--stdin-filepath"], "utf8")
}
if (!options.filepath || options.filepath.length == 0) {
    console.error("无效的参数：--stdin-filepath")
    process.exit(0)
}
function exitWithError(msg){
    console.error(msg);
    process.exit(0);
}
if (options.start >= 0) {
    var _options = require("./jsbeautifyrc.js")
    var extname = path.extname(options.filepath)
    if(!_options.parsers[extname]){
        exitWithError("不支持的文件类型："+extname)
    }
    var _formator = beautify[_options.parsers[extname]]
    if(_formator){
        if(options.useTabs){
            _options.options["indent_with_tabs"] = true;
            _options.options["indent_char"] = "\t";
            _options.options["indent_size"] = "1";
        }else{
            _options.options["indent_with_tabs"] = false;
            _options.options["indent_char"] = " ";
            _options.options["indent_size"] = options.tabWidth;
        }
        var formated = _formator(options.contents, _options.options)
        console.log(formated.trim())
    }else{
        exitWithError("Can't find formator："+_options.parsers[extname])
    }
}
