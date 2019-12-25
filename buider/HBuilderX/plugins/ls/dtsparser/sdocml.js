const XMLWriter = require('xml-writer');
const fs = require('fs');
const parser = require('./parser');
var marked = require('marked'); //markdown
var xw = new XMLWriter(true);

function generate(ns,filename){
    xw.startDocument("1.0","UTF-8");
    xw.startElement('javascript');
    xw.writeAttribute('name', filename);
    ns.fileName = filename;
    //写入global变量
    // writeAliases(ns,xw);
    //写入类型数据
    writeTypes(ns,xw);
    xw.endElement();
    xw.endDocument();

    // fs.writeFileSync("/Users/wkp/Documents/HBuilderProjects/sdf/node.sdocml",xw.toString());
    console.log(xw.toString());
}

function writeTypes(ns,xw){
    ns.forEach(type => {
        if(type.name){
            writeType(type,xw);
        }
    });
}

function writeType(type,xw,isStatic){
    if(!type){
        return ;
    }
    let memLen = type.members ? type.members.length : 0;

    xw.startElement("class");
    xw.writeAttribute("type",type.name);
    xw.writeAttribute("superclass",convertType(type.extends,true));
    xw.startElement("methods");
    for(let i = 0;i < memLen;i++){
        let mem = type.members[i];
        if(mem.fn && mem.name){
            xw.startElement("method");
            xw.writeAttribute("name",mem.name);
            
            xw.writeAttribute("scope",mem.scope);
        
            xw.startElement("parameters");
            for(let j = 0;j < mem.parameters.length;j++){
                let param = mem.parameters[j];
                xw.startElement("parameter");
                xw.writeAttribute("name",param.name);
                xw.writeAttribute("type",convertType(param.type));
                xw.endElement();
            }
            xw.endElement();
            
            xw.startElement("return-types");
            let returnTypeName = mem.returnTypes;
            xw.startElement("return-type");
            xw.writeAttribute("type",convertType(returnTypeName));
            xw.endElement();
            xw.endElement();
            xw.writeElement("description",getDescription(mem));
            xw.endElement();
        }
    }
    xw.endElement();

    xw.startElement("properties");
    for(let i = 0;i < memLen;i++){
        let mem = type.members[i];
        if(!mem.fn && mem.name && mem.type){
            xw.startElement("property");
            xw.writeAttribute("name",mem.name);
            let propType = convertType(mem.type);
            if(!propType || propType.length == 0){
                propType = "None" ;
            }
            xw.writeAttribute("type",propType);
            xw.writeAttribute("scope",mem.scope);
            xw.writeElement("description",getDescription(mem));
            xw.endElement();
        }
    }
    xw.endElement();
    xw.endElement();
}

function getDescription(mem){
    if(mem && mem.jsdoc){
        return marked(mem.jsdoc);
    }
    return "";
}

function convertType(type,superclass){
    if(!type){
        return "None";
    }
    
    if(type.length == 0){
        return "None";
    }

    if(type.constructor.name === 'Array'){
        if(superclass){
            return type.join(' ');
        }
        return type.join('|');
    }
    if(type.hasOwnProperty('name')){
        let typeName = type['name'];
        if(type.fnObject){
            return typeName + '|Function';
        }
        return type['name'];
    }
    return type;
}
function writeAliases(ns,xw){
    if(ns.exports){
        let mod = {};
        let moduelType = parser.getModuleName(ns.fileName);
        mod.name = moduelType;
        mod.members = ns.exports;
        writeType(mod,xw);
    }else{
        let globalType = {};
        globalType.name = "Global";
        globalType.members = ns.vars;
        writeType(globalType,xw);
    }
    
}
function writeAlias(name,type,xw){
    xw.startElement("alias");
    xw.writeAttribute("name",name);
    xw.writeAttribute("type",type);
    xw.endElement();
}

module.exports = {
    generate:generate
}