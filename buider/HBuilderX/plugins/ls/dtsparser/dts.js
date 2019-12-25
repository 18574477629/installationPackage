/// <reference path="typescript.d.ts" />
const fs = require('fs');
const path = require('path');
const ts = require('./typescript');
const sdocml = require('./sdocml');
const parser = require('./parser');
var SymbolTable = require('./symbol');

var args = process.argv.splice(2);//启动参数
///Users/wkp/Documents/HBuilderProjects/sdf/node_modules/@types/lodash/index.d.ts
// args.push("/Users/wkp/Documents/HBuilderProjects/sdf/node_modules/@types/lodash/index.d.ts");
// args.push("/Users/wkp/Documents/HBuilderProjects/sdf/node_modules/@types/node/index.d.ts");
if(args.length != 1){
    process.exit(0);
    return ;
}
//var fileName = "/Users/wkp/Documents/HBuilderProjects/dtsparser/typescript.d.ts";
///Users/wkp/Documents/HBuilderProjects/dtsparser/uni.d.ts
var fileName = args[0];

var sourceFiles = [];
findSourceFiles(fileName);

var st = new SymbolTable();
st.symbolName = parser.getModuleName(fileName);
sourceFiles.forEach((sourceFile)=>{
    st = parser.getGlobal(sourceFile,st);
    if(st.owner){
        console.error("parse error:"+sourceFile.fileName);
    }
});
if(st.owner){ // 全局符号没有owner
    console.error('parse error:' + fileName);
}else{
    let types = parser.getTypes(st,fileName);
    sdocml.generate(types,fileName);
}

function findSourceFiles(filename){
    let sourceText = fs.readFileSync(filename, "utf8");
    let sourceFile = ts.createSourceFile(filename, sourceText, ts.ScriptTarget.Latest);
    sourceFiles.push(sourceFile);
    sourceFile.referencedFiles.forEach((fileref)=>{
        let refFileName = path.resolve(path.dirname(filename), fileref.fileName);
        if(!fs.existsSync(refFileName)){
            return ;
        }
        if(sourceFileExists(refFileName)){
            return ;
        }
        findSourceFiles(refFileName);
    });
}

function sourceFileExists(filename){
    return sourceFiles.some((sourcefile)=>{
        return path.resolve(sourcefile.fileName) === filename;
    });
}
