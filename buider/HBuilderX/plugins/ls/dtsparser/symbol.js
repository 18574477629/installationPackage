const ts = require('./typescript');
const path = require('path');
const parser = require('./parser');
const fs = require('fs');


function getSymbol(st, node) {
    if(!node){
        return null;
    }
    switch (node.kind) {
        case ts.SyntaxKind.Identifier: {
            return st.getSymbol(node.text);
        }
        case ts.SyntaxKind.QualifiedName: {
            let symbol = getSymbol(node.left);
            if (symbol) {
                return symbol.getSymbol(node.right.text);
            }
        }
    }
    return null;
}


function getJSDoc(node) {
    if (node.jsDoc) {
        if (node.jsDoc.length > 0) { //TODO 解析多个jsdoc
            return node.jsDoc[0].comment;
        }
    }
    return "";
}


function parseMember(member) {
    if (member.kind == ts.SyntaxKind.MethodDeclaration
        || member.kind == ts.SyntaxKind.MethodSignature) {
        return parseFunction(member);
    } else if (member.kind == ts.SyntaxKind.PropertySignature
        || member.kind == ts.SyntaxKind.PropertyDeclaration) {
        return {
            name: member.name.text,
            type: getSimpleType(member.type),
            jsdoc: getJSDoc(member)
        }
    } else if (member.kind == ts.SyntaxKind.CallSignature) {
        return parseFunction(member);
    }
}

function getSimpleType(token) {
    if (!token) {
        return "none";
    }
    switch (token.kind) {
        case ts.SyntaxKind.StringLiteral:
        case ts.SyntaxKind.StringKeyword:
            return "String";
        case ts.SyntaxKind.NumericLiteral:
        case ts.SyntaxKind.NumberKeyword:
            return "Number";
        case ts.SyntaxKind.TrueKeyword:
        case ts.SyntaxKind.FalseKeyword:
        case ts.SyntaxKind.BooleanKeyword:
            return "Boolean";
        case ts.SyntaxKind.AnyKeyword:
            return "Object";
        case ts.SyntaxKind.VoidKeyword:
            return "void";
        case ts.SyntaxKind.TypeReference:
            return token.typeName.text;
        case ts.SyntaxKind.FunctionType: {
            //TODO 解析function表达式
            return "Function";
        }
        default:
            break;
    }
    return "None";
}

function parseFunction(member) {
    let methodName = member.name ? member.name.text : '';
    let params = [];
    let jsdoc = getJSDoc(member);
    if (member.parameters) {
        let paramLen = member.parameters.length;
        for (let i = 0; i < paramLen; i++) {
            let param = member.parameters[i];
            let paramName = param.name.text;
            let typeName = getSimpleType(param.type);
            params.push({
                name: paramName,
                type: typeName
            });
        }
    }
    let returnTypeName = "undefined";
    if (member.type) {
        returnTypeName = getSimpleType(member.type);
    }
    return {
        name: methodName,
        parameters: params,
        returnTypes: returnTypeName,
        jsdoc: jsdoc,
        fn: true,
        fnObject: member.kind == ts.SyntaxKind.CallSignature
    }
}
function parseParent(clauses) {
    if (!clauses) {
        return "None";
    }
    let parentTypes = [];
    clauses.forEach((node) => {
        if (node.kind == ts.SyntaxKind.HeritageClause) {
            let types = node.types;
            for (let j = 0; j < types.length; j++) {
                let typeName = getSimpleType(types[j]);
                parentTypes.push(typeName);
            }
        }
    });
    return parentTypes;
}
/**
 * 
 * @param {ts.Node} value 
 * @param {SymbolTable} st 
 * @param {Type} type 
 */
function value2Type(value, st, type) {
    if (!value) {
        return;
    }
    switch (value.kind) {
        case ts.SyntaxKind.Identifier: {
            let text = value.text;
            let symbol = st.getSymbol(text);
            let _type = symbol.getType();
            _type.propagateTo(type);
            break;
        }
        case ts.SyntaxKind.VariableDeclaration: {
            if (value.type) {
                value2Type(value.type.typeName, st, type);
                if(st.isGlobal){
                    st.getGlobal().addGlobal({
                        name:st.symbolName,
                        type:type.name,
                        scope:'instance',
                        jsdoc:st.jsdoc
                    });
                }
            } else if (value.initializer) {
                value2Type(value.initializer, st, type);
            }
            break;
        }
        case ts.SyntaxKind.EnumDeclaration:
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.ClassDeclaration: {
            let members = [];
            if (value.members && value.members.length > 0) {
                let memLen = value.members.length;
                for (let i = 0; i < memLen; i++) {
                    let member = value.members[i];
                    let memInfo = parseMember(member);
                    if(memInfo && memInfo.fnObject && memInfo.fn){
                        type.fnObject = true;
                    }
                    if(memInfo){
                        members.push(memInfo);
                    }    
                }
            }
            members.forEach(mem => {
                type.members.push(mem);
            });

            if (value.heritageClauses) {
                type.extends = parseParent(value.heritageClauses);
            }
            type.name = st.symbolName;
            st.getGlobal().addType(type);
            break;
        }
        case ts.SyntaxKind.QualifiedName: {
            let symbol = getSymbol(st, value.left);
            let rightText = value.right.text;
            if (symbol) {
                let targetSymbol = symbol.getSymbol(rightText);
                if (targetSymbol) {
                    let _type = targetSymbol.getType();
                    _type.propagateTo(type);
                }
            }
        }
        case ts.SyntaxKind.ModuleDeclaration:{
            //ignore
            type.name = st.symbolName;
            st.getGlobal().addType(st.getType());
            break;
        }
        case ts.SyntaxKind.TypeReference:{
            break;
        }
        case ts.SyntaxKind.NamespaceExportDeclaration: {
            //生成全局类型
            if (value.name) {
                let ns = value.name.text;
                st.getGlobal().addGlobal({
                    name:ns,
                    type:st.getGlobal().symbolName,
                    scope:"instance",
                    jsdoc:""
                });
            }
            break;
        }

        default: {
            // console.log(value);
            break;
        }
    }
}




function Type() {
    //类型名
    this.name = "";
    //父类
    this.extends = [];
    //成员
    this.members = [];
    //描述
    this.jsdoc = "";
    this.children = [];

    this.propagateTo = function (other) {
        if (!other) {
            return;
        }
        this.extends.forEach(e => {
            other.extends.push(e);
        });
        this.members.forEach(m => {
            other.members.push(m);
        });

        if(this.fnObject){
            other.fnObject = this.fnObject;
        }
        if(other.name.length == 0){
            other.name = this.name;
        }
    }
}

/**
 * 符号表
 * @param {SymbolTable} owner 
 */
function SymbolTable(owner, symbolName) {
    //符号表
    let properties = {};
    let values = [];
    let types = {};
    let globals = [];
    let type = null;
    const EXPORT_KEYWORD = "exports";
    this.symbolName = symbolName;
    this.owner = owner;
    this.addSymbol = function (name, value, isExport) {
        if (isExport) {
            return addExportSymbol.call(this, name, value);
        }
        if (!properties[name]) {
            properties[name] = new SymbolTable(this, name);
        }else if(properties[name].constructor.name !== 'SymbolTable'){
            properties[name] = new SymbolTable(this, name);
        }
        properties[name].addValue(value);
        return properties[name];
    }

    /**
     * 属性传播
     */
    this.propagateTo = function (target) {
        if (target) {
            for (let name in properties) {
                let symbol = properties[name];
                let values = symbol.getValues();
                values.forEach((val) => {
                    target.addSymbol(symbol.symbolName, val);
                });
            }
        }
    }

    function addExportSymbol(name, value) {
        if (!this.getSymbol(EXPORT_KEYWORD)) {
            this.addSymbol(EXPORT_KEYWORD);
        }
        return this.getSymbol(EXPORT_KEYWORD).addSymbol(name, value);
    }

    this.getSymbol = function (symbolName) {
        if (properties[symbolName]) {
            return properties[symbolName];
        } else if (this.owner) {
            return this.owner.getSymbol(symbolName);
        }
    }

    this.getGlobal = function(){
        let gbl = this;
        while(gbl.owner){
            gbl = gbl.owner;
        }
        return gbl;
    }

    this.addGlobal = function(mem){
        globals.push(mem);
    }

    this.getGlobals = function(){
        return globals;
    }

    this.addType = function(type){
        if(type.name){
            types[type.name] = type;
        }
    }

    this.getTypes = function(){
        let _types = [];
        for(name in types){
            _types.push(types[name]);
        }
        return _types;
    }

    this.hasCacheType = function () {
        return type != null;
    }
    this.setType = function(typeName){
        type = new Type();
        type.name = typeName;
    }
    this.getType = function () {
        if (this.hasCacheType()) {
            return type;
        }
        type = new Type();
        //process values
        values.forEach(val => {
            let targetRef = getSymbol(this, val);
            this.propagateTo(targetRef);
        });
        values.forEach(val => {
            value2Type(val, this, type);
        });
        // process properties
        let _properties = this.getProperties();
        for (let propName in _properties) {
            let prop = _properties[propName];
            type.members.push(getMember(prop));
        }
        return type;
    }

    /**
     * 
     * @param {SymbolTable} prop 
     */
    function getMember(prop) {
        if (prop.isFn) {
            let values = prop.getValues();
            for(let i in values){
                if(values[i].kind == ts.SyntaxKind.FunctionDeclaration){
                    let fn = parseFunction(values[i]);
                    return fn;
                }
            }
        } else if (prop.isVar) {
            return {
                name: prop.symbolName,
                type: prop.getType(),
                jsdoc: prop.jsdoc,
                scope: "instance"
            }
        } else {
            return {
                name: prop.symbolName,
                type: prop.getType().name,
                jsdoc: prop.jsdoc,
                scope: 'static'
            }
        }
    }

    this.addValue = function (value) {
        if (value) {
            values.push(value);
        }
    }

    this.getProperties = function () {
        return properties;
    }

    this.hasValue = function () {
        return values && values.length > 0;
    }

    this.getValues = function () {
        return values;
    }
}

module.exports = SymbolTable;