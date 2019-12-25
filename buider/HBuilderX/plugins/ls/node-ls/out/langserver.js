(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "vscode-css-languageservice", "./cssNodes", "vscode-languageserver-types", "./scssCompletion", "./lessCompletion"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const vscode_css_languageservice_1 = require("vscode-css-languageservice");
    const nodes = require("./cssNodes");
    const vscode_languageserver_types_1 = require("vscode-languageserver-types");
    const scssCompletion_1 = require("./scssCompletion");
    const lessCompletion_1 = require("./lessCompletion");
    function getOutline(param) {
        let scope = param.scope;
        let languageId = scope.split('.').pop();
        let document = vscode_languageserver_types_1.TextDocument.create(param.uri, languageId, 0, param.contents);
        let languageService = null;
        if (languageId === 'less') {
            languageService = vscode_css_languageservice_1.getLESSLanguageService();
        }
        else if (languageId === 'scss') {
            languageService = vscode_css_languageservice_1.getSCSSLanguageService();
        }
        let styleSheet = languageService.parseStylesheet(document);
        var outlines = new Array();
        var symbols = languageService.findDocumentSymbols(document, styleSheet);
        for (let symbol of symbols) {
            var selectionRange = symbol.location.range;
            var startRangeLine = selectionRange.start.line;
            var startRangeCharacter = selectionRange.start.character;
            var endRangeLine = selectionRange.end.line;
            var endRangeCharacter = selectionRange.end.character;
            var range = vscode_languageserver_types_1.Range.create(startRangeLine, startRangeCharacter, endRangeLine, endRangeCharacter);
            if (outlines.length === 0) {
                let documentSymbols = new Array();
                outlines.push(vscode_languageserver_types_1.DocumentSymbol.create(symbol.name, undefined, symbol.kind, range, selectionRange, documentSymbols));
            }
            else {
                var hasParent = false;
                for (var index = outlines.length - 1; index >= 0; index--) {
                    let outline = outlines[index];
                    if (outline.selectionRange.start.line < startRangeLine && endRangeLine < outline.selectionRange.end.line) {
                        hasParent = true;
                    }
                    else if (outline.selectionRange.start.line === startRangeLine &&
                        outline.selectionRange.start.character < startRangeCharacter &&
                        endRangeLine < outline.selectionRange.end.line) {
                        hasParent = true;
                    }
                    else if (outline.selectionRange.start.line === startRangeLine &&
                        outline.selectionRange.start.character < startRangeCharacter &&
                        endRangeLine === outline.selectionRange.end.line &&
                        endRangeCharacter < outline.selectionRange.end.character) {
                        hasParent = true;
                    }
                    else if (outline.selectionRange.start.line < startRangeLine &&
                        endRangeLine === outline.selectionRange.end.line &&
                        endRangeCharacter < outline.selectionRange.end.character) {
                        hasParent = true;
                    }
                    if (hasParent) {
                        let documentSymbols = new Array();
                        let childrenSymbols = outline.children;
                        childrenSymbols.push(vscode_languageserver_types_1.DocumentSymbol.create(symbol.name, undefined, symbol.kind, range, selectionRange, documentSymbols));
                        break;
                    }
                }
                if (!hasParent) {
                    outlines.push(vscode_languageserver_types_1.DocumentSymbol.create(symbol.name, undefined, symbol.kind, range, selectionRange, new Array()));
                }
            }
        }
        return JSON.stringify(outlines);
    }
    exports.getOutline = getOutline;
    function getCurrentWord(document, offset) {
        let i = offset - 1;
        const text = document.getText();
        while (i >= 0 && ' \t\n\r":{[()]},*>+'.indexOf(text.charAt(i)) === -1) {
            i--;
        }
        return text.substring(i + 1, offset);
    }
    function getUniScssVariables(document, styleSheet, variables) {
        let symbols = vscode_css_languageservice_1.getSCSSLanguageService().findDocumentSymbols(document, styleSheet);
        for (let symbol of symbols) {
            if (symbol.kind === vscode_languageserver_types_1.SymbolKind.Variable) {
                let label = symbol.name;
                variables.push(label);
            }
        }
    }
    function getLocationType(param) {
        let scope = param.scope;
        let offset = param.offset;
        let contents = param.contents;
        let uri = param.uri;
        let languageId = scope.split('.').pop();
        let document = vscode_languageserver_types_1.TextDocument.create(uri, languageId, 0, contents);
        let languageService = null;
        let completion = null;
        let uniScssUri = param.uniScssPath;
        let uniScssContents = param.uniScssContents;
        if (languageId === 'less') {
            languageService = vscode_css_languageservice_1.getLESSLanguageService();
            completion = new lessCompletion_1.LESSCompletion();
        }
        else if (languageId === 'scss') {
            languageService = vscode_css_languageservice_1.getSCSSLanguageService();
            completion = new scssCompletion_1.SCSSCompletion();
        }
        var variables = [];
        if (uniScssUri && uniScssContents) {
            var uniScssDocument = vscode_languageserver_types_1.TextDocument.create(uniScssUri, 'scss', 0, uniScssContents);
            var uniScssStyleSheet = languageService.parseStylesheet(uniScssDocument);
        }
        var locationType = "ALLELEMENT";
        let line = +param.line;
        let character = +param.character;
        let position = vscode_languageserver_types_1.Position.create(line, character);
        let styleSheet = languageService.parseStylesheet(document);
        completion.offset = document.offsetAt(position);
        completion.position = position;
        completion.currentWord = getCurrentWord(document, completion.offset);
        completion.defaultRange = vscode_languageserver_types_1.Range.create(vscode_languageserver_types_1.Position.create(position.line, position.character - completion.currentWord.length), position);
        completion.textDocument = document;
        completion.styleSheet = styleSheet;
        let isScss = languageId === 'scss';
        try {
            completion.nodePath = nodes.getNodePath(styleSheet, offset);
            let size = completion.nodePath.length;
            if (size === 0) {
                if (completion.currentWord.charAt(0) === "#"
                    || completion.currentWord === "") {
                    locationType = "NONE";
                }
                else if (completion.currentWord.charAt(0) === "$") {
                    locationType = isScss ? "VARIABLE" : "";
                }
                else if (completion.currentWord.charAt(0) === "@") {
                    locationType = isScss ? "AtDirective" : "VARIABLE";
                }
            }
            for (let i = size - 1; i >= 0; i--) {
                var node = completion.nodePath[i];
                if (node.type === nodes.NodeType.Property) {
                    locationType = "INSIDE_PROPERTY";
                    break;
                }
                else if (node.type === nodes.NodeType.Expression) {
                    if (node.parent.type === nodes.NodeType.Declaration) {
                        if (node.parent.getChildren().length == 2
                            && node.parent.getChild(0).type === nodes.NodeType.Property) {
                            locationType = "INSIDE_VALUE";
                            break;
                        }
                    }
                    else if (node.parent.type === nodes.NodeType.VariableDeclaration) {
                        locationType = "VARIABLEDECLARATION";
                        break;
                    }
                }
                else if (node.type === nodes.NodeType.Declarations) {
                    locationType = "INSIDE_VALUE";
                    break;
                }
                else if (node instanceof nodes.AttributeSelector) {
                    if (node.getChildren().length == 1) {
                        locationType = "OUTSIDE_ATTRIBUTE";
                        break;
                    }
                    else {
                        let children = node.getChildren();
                        for (let i = 0; i < children.length; ++i) {
                            let child = children[i];
                            if (completion.offset >= child.offset
                                && completion.offset <= child.offset) {
                                if (node instanceof nodes.Identifier) {
                                    locationType = "OUTSIDE_ATTRIBUTE";
                                    break;
                                }
                                else if (node instanceof nodes.BinaryExpression) {
                                    locationType = "OUTSIDE_ATTRIBUTE_VALUE";
                                    break;
                                }
                            }
                        }
                    }
                }
                else if (node.type === nodes.NodeType.IdentifierSelector) {
                    locationType = "ID";
                    break;
                }
                else if (node.type === nodes.NodeType.ClassSelector) {
                    locationType = "CLASS";
                    break;
                }
                else if (node.type === nodes.NodeType.PseudoSelector) {
                    locationType = "COLON";
                    break;
                }
                else if (node.type === nodes.NodeType.Import) {
                    locationType = "IN_IMPORT_RULE";
                    break;
                }
                else if (node.type === nodes.NodeType.Media) {
                    locationType = "IN_MEDIA_RULE";
                    break;
                }
                else if (node.type === nodes.NodeType.VariableName) {
                    locationType = "VARIABLE";
                    break;
                }
                else if (node.type === nodes.NodeType.VariableDeclaration) {
                    locationType = "VARIABLEDECLARATION";
                    break;
                }
                else if (node.type === nodes.NodeType.ElementNameSelector) {
                    locationType = "ALLELEMENT";
                    while (node != null && node.type !== nodes.NodeType.Stylesheet) {
                        if (node.type === nodes.NodeType.Declarations) {
                            locationType = "INSIDE_PROPERTY";
                            break;
                        }
                        node = node.parent;
                    }
                    break;
                }
            }
        }
        finally {
            if (locationType === "ALLELEMENT") {
                if (completion.currentWord.charAt(0) === "#"
                    || completion.currentWord === "") {
                    locationType = "NONE";
                }
                else if (completion.currentWord.charAt(0) === "$") {
                    locationType = isScss ? "VARIABLE" : "";
                }
                else if (completion.currentWord.charAt(0) === "@") {
                    locationType = isScss ? "ATDIRECTIVE" : "VARIABLE";
                }
            }
        }
        let startPos = completion.defaultRange.start;
        let endPos = completion.defaultRange.end;
        if (locationType === "INSIDE_VALUE") {
            let symbols = languageService.findDocumentSymbols(document, styleSheet);
            for (let symbol of symbols) {
                if (symbol.kind === vscode_languageserver_types_1.SymbolKind.Variable) {
                    let label = symbol.name;
                    variables.push(label);
                }
            }
        }
        if (locationType === "VARIABLEDECLARATION" ||
            locationType === "INSIDE_VALUE") {
            if (languageId === "scss"
                && uniScssDocument != null
                && uniScssContents != null)
                getUniScssVariables(uniScssDocument, uniScssStyleSheet, variables);
        }
        if (locationType == "VARIABLEDECLARATION" && languageId === 'scss') {
            if (completion.currentWord.charAt(0) === '!') {
                locationType = "DEFAULT";
            }
        }
        return {
            type: locationType,
            replaceRange: {
                start: {
                    line: startPos.line,
                    character: startPos.character
                },
                end: {
                    line: endPos.line,
                    character: endPos.character
                }
            },
            variables: variables
        };
    }
    exports.getLocationType = getLocationType;
    function gotoDefinition(param) {
        let scope = param.scope;
        let languageId = scope.split('.').pop();
        let document = vscode_languageserver_types_1.TextDocument.create(param.uri, languageId, 0, param.contents);
        let languageService = null;
        if (languageId === 'less') {
            languageService = vscode_css_languageservice_1.getLESSLanguageService();
        }
        else if (languageId === 'scss') {
            languageService = vscode_css_languageservice_1.getSCSSLanguageService();
        }
        let position = vscode_languageserver_types_1.Position.create(+param.line, +param.character);
        let styleSheet = languageService.parseStylesheet(document);
        let loc = languageService.findDefinition(document, position, styleSheet);
        return JSON.stringify(loc);
    }
    exports.gotoDefinition = gotoDefinition;
});
//# sourceMappingURL=langserver.js.map