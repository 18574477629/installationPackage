const ts = require('./typescript');
const path = require('path');
const fs = require('fs');
var SymbolTable = require('./symbol');
function getModuleName(refFileName) {
    if (fs.existsSync(refFileName)) {
        let name = path.basename(refFileName);
        name = name.substr(0, name.indexOf('.'));
        if (name == 'index') {
            let dirname = path.basename(path.dirname(refFileName));
            if(dirname == 'types'){
                dirname = path.basename(path.dirname(path.dirname(refFileName)));
            }
            return dirname + '.exports';
        } else {
            return name + '.exports';
        }
    }
    return 'Any';
}
/**
 * 
 * @param {ts.SourceFile} ast 
 * @param {SymbolTable} st 
 */
function getGlobal(ast, st) {
    var currentNS = st;
    //遍历AST
    ts.forEachChild(ast, visitNodeHelper(currentNS, ast));

    function visitNodeHelper(currentNS, sourceFile) {

        /**
         * 获取模块类型
         * @param {ts.Node} node 
         */
        function getModuleType(node) {
            if (node.kind == ts.SyntaxKind.ExternalModuleReference) {
                let moduleUri = node.expression.text;
                let refFileName = path.resolve(path.dirname(sourceFile.fileName), moduleUri + '.d.ts');
                return getModuleName(refFileName);
            }
            return 'Any'
        }

        function getJSDoc(node) {
            if (node.jsDoc) {
                if (node.jsDoc.length > 0) { //TODO 解析多个jsdoc
                    return node.jsDoc[0].comment;
                }
            }
            return "";
        }

        return function (node) {
            let hasExport = (node.modifiers && node.modifiers.length > 0) ?
                node.modifiers[0].kind == ts.SyntaxKind.ExportKeyword : false;
            switch (node.kind) {
                case ts.SyntaxKind.ImportDeclaration: {
                    let importClause = node.importClause;
                    // let moduleSpecifier = node.moduleSpecifier;
                    // let moduleName = moduleSpecifier.text;
                    if (importClause.namedBindings.kind == ts.SyntaxKind.NamespaceImport) {
                        // addImportModule(importClause.namedBindings.name.text, moduleName);
                        currentNS.addSymbol(importClause.namedBindings.name.text, node);
                    } else if (importClause.namedBindings.kind == ts.SyntaxKind.NamedImports) {
                        let elements = importClause.namedBindings.elements;
                        let len = elements.length;
                        for (let i = 0; i < len; i++) {
                            let name = elements[i].name.text;
                            // addImportModule(name, moduleName + '.' + name);
                            if (name && name.length > 0) {
                                currentNS.addSymbol(name, node);
                            }
                        }
                    }
                    break;
                }
                case ts.SyntaxKind.ImportEqualsDeclaration: {
                    // let varName = node.name.text;
                    // let moduleType = getModuleType(node.moduleReference);
                    // addImportModule(varName, moduleType);
                    if(!currentNS.getSymbol(node.name.text)){
                        let symbol = currentNS.addSymbol(node.name.text, node.moduleReference);
                        symbol.setType(getModuleType(node.moduleReference));
                    }
                    break;
                }
                case ts.SyntaxKind.ExportAssignment: {
                    currentNS.addValue(node.expression);
                    break;
                }
                case ts.SyntaxKind.NamespaceExportDeclaration: {
                    //addSymbol("vars");
                    let symbolName = node.name.text;
                    currentNS.addSymbol(symbolName, node);
                    break;
                }
                case ts.SyntaxKind.ModuleDeclaration: {
                    //生成新的对象
                    //currentNS = addChildModule(node.name.text);
                    let moduleName = node.name.text;
                    if (node.name.kind == ts.SyntaxKind.StringLiteral) {
                        let refFileName = path.resolve(path.dirname(sourceFile.fileName), moduleName + '.d.ts');
                        moduleName = getModuleName(refFileName);
                    }
                    let pushModule = false;
                    if (moduleName != currentNS.symbolName) {
                        currentNS = currentNS.addSymbol(moduleName, node);
                        pushModule = true;
                    }
                    //遍历namespace
                    node.forEachChild(visitNodeHelper(currentNS, sourceFile));
                    //还原
                    if (pushModule) {
                        currentNS = currentNS.owner;
                    }
                    break;
                }
                case ts.SyntaxKind.TypeAliasDeclaration: {
                    // TODO 需要想清楚类型别名怎么处理
                    let aliasName = node.name.text;
                    currentNS.addSymbol(aliasName, node.type);
                    break;
                }
                case ts.SyntaxKind.VariableStatement: {
                    let declars = node.declarationList.declarations;
                    let size = declars.length;
                    let doc = getJSDoc(node);
                    let hasDeclar = false;
                    if(node.modifiers && node.modifiers[0].kind == ts.SyntaxKind.DeclareKeyword){
                        hasDeclar = true;
                    }
                    for (let i = 0; i < size; i++) {
                        let declarNode = declars[i];
                        let varName = declarNode.name.text;
                        let symbol = currentNS.addSymbol(varName, declarNode, hasExport);
                        symbol.isVar = true;
                        symbol.isGlobal = hasDeclar;
                        symbol.jsdoc = doc;
                    }
                    break;
                }
                case ts.SyntaxKind.ClassDeclaration: {
                    let symbol = currentNS.addSymbol(node.name.text, node, hasExport);
                    symbol.isType = true;
                    symbol.jsdoc = getJSDoc(node);
                    break;
                }
                case ts.SyntaxKind.FunctionDeclaration: {
                    let symbol = currentNS.addSymbol(node.name.text, node, hasExport);
                    symbol.isFn = true;
                    symbol.jsdoc = getJSDoc(node);
                    break;
                }
                case ts.SyntaxKind.InterfaceDeclaration: {
                    let symbol = currentNS.addSymbol(node.name.text, node, hasExport);
                    symbol.isType = true;
                    symbol.jsdoc = getJSDoc(node);
                    break;
                }
                case ts.SyntaxKind.EnumDeclaration: {
                    let symbol = currentNS.addSymbol(node.name.text, node, hasExport);
                    symbol.isType = true;
                    symbol.jsdoc = getJSDoc(node);
                    break;
                }
                default:
                    //继续遍历子节点
                    node.forEachChild(visitNodeHelper(currentNS, sourceFile));
                    break;
            }

        }
    }
    return currentNS;
}
/**
 * 
 * @param {SymbolTable} global 
 */
function getTypes(global, fileName) {
    let types = [];
    if(global.getSymbol('exports')){
        let type = global.getSymbol('exports').getType();
        type.name = getModuleName(fileName);
        types.push(type);
    }
    
    let type = global.getType();
    type.name = getModuleName(fileName);
    types.push(type);
    
    global.getTypes().forEach((type)=>{
        types.push(type);
    });
    let vars = global.getGlobals();
    if(vars){
        let globalType = {
            name:"Global",
            members:vars
        }
        types.push(globalType);
    }
    return types;
}

module.exports = {
    getGlobal: getGlobal,
    getTypes: getTypes,
    getModuleName: getModuleName
}