(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./cssNodes", "./cssSymbolScope", "./facts", "./strings", "vscode-languageserver-types", "vscode-nls"], factory);
    }
})(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    const nodes = require("./cssNodes");
    const cssSymbolScope_1 = require("./cssSymbolScope");
    const languageFacts = require("./facts");
    const strings = require("./strings");
    const vscode_languageserver_types_1 = require("vscode-languageserver-types");
    const nls = require("vscode-nls");
    const localize = nls.loadMessageBundle();
    const SnippetFormat = vscode_languageserver_types_1.InsertTextFormat.Snippet;
    class CSSCompletion {
        constructor(variablePrefix = null) {
            this.completionParticipants = [];
            this.valueTypes = [
                nodes.NodeType.Identifier, nodes.NodeType.Value, nodes.NodeType.StringLiteral, nodes.NodeType.URILiteral, nodes.NodeType.NumericValue,
                nodes.NodeType.HexColorValue, nodes.NodeType.VariableName, nodes.NodeType.Prio
            ];
            this.variablePrefix = variablePrefix;
        }
        configure(settings) {
            this.settings = settings;
        }
        getSymbolContext() {
            if (!this.symbolContext) {
                this.symbolContext = new cssSymbolScope_1.Symbols(this.styleSheet);
            }
            return this.symbolContext;
        }
        setCompletionParticipants(registeredCompletionParticipants) {
            this.completionParticipants = registeredCompletionParticipants || [];
        }
        doComplete(document, position, styleSheet) {
            this.offset = document.offsetAt(position);
            this.position = position;
            this.currentWord = getCurrentWord(document, this.offset);
            this.defaultReplaceRange = vscode_languageserver_types_1.Range.create(vscode_languageserver_types_1.Position.create(this.position.line, this.position.character - this.currentWord.length), this.position);
            this.textDocument = document;
            this.styleSheet = styleSheet;
            try {
                const result = { isIncomplete: false, items: [] };
                this.nodePath = nodes.getNodePath(this.styleSheet, this.offset);
                for (let i = this.nodePath.length - 1; i >= 0; i--) {
                    const node = this.nodePath[i];
                    if (node instanceof nodes.Property) {
                        this.getCompletionsForDeclarationProperty(node.getParent(), result);
                    }
                    else if (node instanceof nodes.Expression) {
                        if (node.parent instanceof nodes.Interpolation) {
                            this.getVariableProposals(null, result);
                        }
                        else {
                            this.getCompletionsForExpression(node, result);
                        }
                    }
                    else if (node instanceof nodes.SimpleSelector) {
                        const parentRef = node.findAParent(nodes.NodeType.ExtendsReference, nodes.NodeType.Ruleset);
                        if (parentRef) {
                            if (parentRef.type === nodes.NodeType.ExtendsReference) {
                                this.getCompletionsForExtendsReference(parentRef, node, result);
                            }
                            else {
                                const parentRuleSet = parentRef;
                                this.getCompletionsForSelector(parentRuleSet, parentRuleSet && parentRuleSet.isNested(), result);
                            }
                        }
                    }
                    else if (node instanceof nodes.FunctionArgument) {
                        this.getCompletionsForFunctionArgument(node, node.getParent(), result);
                    }
                    else if (node instanceof nodes.Declarations) {
                        this.getCompletionsForDeclarations(node, result);
                    }
                    else if (node instanceof nodes.VariableDeclaration) {
                        this.getCompletionsForVariableDeclaration(node, result);
                    }
                    else if (node instanceof nodes.RuleSet) {
                        this.getCompletionsForRuleSet(node, result);
                    }
                    else if (node instanceof nodes.Interpolation) {
                        this.getCompletionsForInterpolation(node, result);
                    }
                    else if (node instanceof nodes.FunctionDeclaration) {
                        this.getCompletionsForFunctionDeclaration(node, result);
                    }
                    else if (node instanceof nodes.MixinReference) {
                        this.getCompletionsForMixinReference(node, result);
                    }
                    else if (node instanceof nodes.Function) {
                        this.getCompletionsForFunctionArgument(null, node, result);
                    }
                    else if (node instanceof nodes.Supports) {
                        this.getCompletionsForSupports(node, result);
                    }
                    else if (node instanceof nodes.SupportsCondition) {
                        this.getCompletionsForSupportsCondition(node, result);
                    }
                    else if (node instanceof nodes.ExtendsReference) {
                        this.getCompletionsForExtendsReference(node, null, result);
                    }
                    else if (node.type === nodes.NodeType.URILiteral) {
                        this.getCompletionForUriLiteralValue(node, result);
                    }
                    else if (node.type === nodes.NodeType.StringLiteral && node.parent.type === nodes.NodeType.Import) {
                        this.getCompletionForImportPath(node, result);
                    }
                    else if (node.parent === null) {
                        this.getCompletionForTopLevel(result);
                    }
                    else {
                        continue;
                    }
                    if (result.items.length > 0 || this.offset > node.offset) {
                        return this.finalize(result);
                    }
                }
                this.getCompletionsForStylesheet(result);
                if (result.items.length === 0) {
                    if (this.variablePrefix && this.currentWord.indexOf(this.variablePrefix) === 0) {
                        this.getVariableProposals(null, result);
                    }
                }
                return this.finalize(result);
            }
            finally {
                this.position = null;
                this.currentWord = null;
                this.textDocument = null;
                this.styleSheet = null;
                this.symbolContext = null;
                this.defaultReplaceRange = null;
                this.nodePath = null;
            }
        }
        finalize(result) {
            const needsSortText = result.items.some(i => !!i.sortText || i.label[0] === '-');
            if (needsSortText) {
                for (const i of result.items) {
                    if (!i.sortText) {
                        if (i.label[0] === '-') {
                            i.sortText = 'x';
                        }
                        else {
                            i.sortText = 'd';
                        }
                    }
                }
            }
            return result;
        }
        findInNodePath(...types) {
            for (let i = this.nodePath.length - 1; i >= 0; i--) {
                const node = this.nodePath[i];
                if (types.indexOf(node.type) !== -1) {
                    return node;
                }
            }
            return null;
        }
        getCompletionsForDeclarationProperty(declaration, result) {
            return this.getPropertyProposals(declaration, result);
        }
        getPropertyProposals(declaration, result) {
            const triggerPropertyValueCompletion = this.isTriggerPropertyValueCompletionEnabled;
            const properties = languageFacts.cssDataManager.getProperties();
            properties.forEach(entry => {
                let range;
                let insertText;
                let retrigger = false;
                if (declaration) {
                    range = this.getCompletionRange(declaration.getProperty());
                    insertText = entry.name;
                    if (!isDefined(declaration.colonPosition)) {
                        insertText += ': ';
                        retrigger = true;
                    }
                }
                else {
                    range = this.getCompletionRange(null);
                    insertText = entry.name + ': ';
                    retrigger = true;
                }
                const item = {
                    label: entry.name,
                    documentation: languageFacts.getEntryDescription(entry),
                    textEdit: vscode_languageserver_types_1.TextEdit.replace(range, insertText),
                    kind: vscode_languageserver_types_1.CompletionItemKind.Property
                };
                if (!entry.restrictions) {
                    retrigger = false;
                }
                if (triggerPropertyValueCompletion && retrigger) {
                    item.command = {
                        title: 'Suggest',
                        command: 'editor.action.triggerSuggest'
                    };
                }
                if (strings.startsWith(entry.name, '-')) {
                    item.sortText = 'x';
                }
                result.items.push(item);
            });
            this.completionParticipants.forEach(participant => {
                if (participant.onCssProperty) {
                    participant.onCssProperty({
                        propertyName: this.currentWord,
                        range: this.defaultReplaceRange
                    });
                }
            });
            return result;
        }
        get isTriggerPropertyValueCompletionEnabled() {
            if (!this.settings ||
                !this.settings.completion ||
                this.settings.completion.triggerPropertyValueCompletion === undefined) {
                return true;
            }
            return this.settings.completion.triggerPropertyValueCompletion;
        }
        getCompletionsForDeclarationValue(node, result) {
            const propertyName = node.getFullPropertyName();
            const entry = languageFacts.cssDataManager.getProperty(propertyName);
            let existingNode = node.getValue();
            while (existingNode && existingNode.hasChildren()) {
                existingNode = existingNode.findChildAtOffset(this.offset, false);
            }
            this.completionParticipants.forEach(participant => {
                if (participant.onCssPropertyValue) {
                    participant.onCssPropertyValue({
                        propertyName,
                        propertyValue: this.currentWord,
                        range: this.getCompletionRange(existingNode)
                    });
                }
            });
            if (entry) {
                if (entry.restrictions) {
                    for (const restriction of entry.restrictions) {
                        switch (restriction) {
                            case 'color':
                                this.getColorProposals(entry, existingNode, result);
                                break;
                            case 'position':
                                this.getPositionProposals(entry, existingNode, result);
                                break;
                            case 'repeat':
                                this.getRepeatStyleProposals(entry, existingNode, result);
                                break;
                            case 'line-style':
                                this.getLineStyleProposals(entry, existingNode, result);
                                break;
                            case 'line-width':
                                this.getLineWidthProposals(entry, existingNode, result);
                                break;
                            case 'geometry-box':
                                this.getGeometryBoxProposals(entry, existingNode, result);
                                break;
                            case 'box':
                                this.getBoxProposals(entry, existingNode, result);
                                break;
                            case 'image':
                                this.getImageProposals(entry, existingNode, result);
                                break;
                            case 'timing-function':
                                this.getTimingFunctionProposals(entry, existingNode, result);
                                break;
                            case 'shape':
                                this.getBasicShapeProposals(entry, existingNode, result);
                                break;
                        }
                    }
                }
                this.getValueEnumProposals(entry, existingNode, result);
                this.getCSSWideKeywordProposals(entry, existingNode, result);
                this.getUnitProposals(entry, existingNode, result);
            }
            else {
                const existingValues = collectValues(this.styleSheet, node);
                for (const existingValue of existingValues.getEntries()) {
                    result.items.push({
                        label: existingValue,
                        textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), existingValue),
                        kind: vscode_languageserver_types_1.CompletionItemKind.Value
                    });
                }
            }
            this.getVariableProposals(existingNode, result);
            this.getTermProposals(entry, existingNode, result);
            return result;
        }
        getValueEnumProposals(entry, existingNode, result) {
            if (entry.values) {
                for (const value of entry.values) {
                    let insertString = value.name;
                    let insertTextFormat;
                    if (strings.endsWith(insertString, ')')) {
                        const from = insertString.lastIndexOf('(');
                        if (from !== -1) {
                            insertString = insertString.substr(0, from) + '($1)';
                            insertTextFormat = SnippetFormat;
                        }
                    }
                    const item = {
                        label: value.name,
                        documentation: languageFacts.getEntryDescription(value),
                        textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), insertString),
                        kind: vscode_languageserver_types_1.CompletionItemKind.Value,
                        insertTextFormat
                    };
                    result.items.push(item);
                }
            }
            return result;
        }
        getCSSWideKeywordProposals(entry, existingNode, result) {
            for (const keywords in languageFacts.cssWideKeywords) {
                result.items.push({
                    label: keywords,
                    documentation: languageFacts.cssWideKeywords[keywords],
                    textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), keywords),
                    kind: vscode_languageserver_types_1.CompletionItemKind.Value
                });
            }
            return result;
        }
        getCompletionsForInterpolation(node, result) {
            if (this.offset >= node.offset + 2) {
                this.getVariableProposals(null, result);
            }
            return result;
        }
        getVariableProposals(existingNode, result) {
            const symbols = this.getSymbolContext().findSymbolsAtOffset(this.offset, nodes.ReferenceType.Variable);
            for (const symbol of symbols) {
                const insertText = strings.startsWith(symbol.name, '--') ? `var(${symbol.name})` : symbol.name;
                const suggest = {
                    label: symbol.name,
                    documentation: symbol.value ? strings.getLimitedString(symbol.value) : symbol.value,
                    textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), insertText),
                    kind: vscode_languageserver_types_1.CompletionItemKind.Variable,
                    sortText: 'z'
                };
                if (symbol.node.type === nodes.NodeType.FunctionParameter) {
                    const mixinNode = (symbol.node.getParent());
                    if (mixinNode.type === nodes.NodeType.MixinDeclaration) {
                        suggest.detail = localize('completion.argument', 'argument from \'{0}\'', mixinNode.getName());
                    }
                }
                result.items.push(suggest);
            }
            return result;
        }
        getVariableProposalsForCSSVarFunction(result) {
            let symbols = this.getSymbolContext().findSymbolsAtOffset(this.offset, nodes.ReferenceType.Variable);
            symbols = symbols.filter((symbol) => {
                return strings.startsWith(symbol.name, '--');
            });
            for (const symbol of symbols) {
                result.items.push({
                    label: symbol.name,
                    documentation: symbol.value ? strings.getLimitedString(symbol.value) : symbol.value,
                    textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(null), symbol.name),
                    kind: vscode_languageserver_types_1.CompletionItemKind.Variable
                });
            }
            return result;
        }
        getUnitProposals(entry, existingNode, result) {
            let currentWord = '0';
            if (this.currentWord.length > 0) {
                const numMatch = this.currentWord.match(/^-?\d[\.\d+]*/);
                if (numMatch) {
                    currentWord = numMatch[0];
                    result.isIncomplete = currentWord.length === this.currentWord.length;
                }
            }
            else if (this.currentWord.length === 0) {
                result.isIncomplete = true;
            }
            if (existingNode && existingNode.parent && existingNode.parent.type === nodes.NodeType.Term) {
                existingNode = existingNode.getParent();
            }
            if (entry.restrictions) {
                for (const restriction of entry.restrictions) {
                    const units = languageFacts.units[restriction];
                    if (units) {
                        for (const unit of units) {
                            const insertText = currentWord + unit;
                            result.items.push({
                                label: insertText,
                                textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), insertText),
                                kind: vscode_languageserver_types_1.CompletionItemKind.Unit
                            });
                        }
                    }
                }
            }
            return result;
        }
        getCompletionRange(existingNode) {
            if (existingNode && existingNode.offset <= this.offset) {
                const end = existingNode.end !== -1 ? this.textDocument.positionAt(existingNode.end) : this.position;
                return vscode_languageserver_types_1.Range.create(this.textDocument.positionAt(existingNode.offset), end);
            }
            return this.defaultReplaceRange;
        }
        getColorProposals(entry, existingNode, result) {
            for (const color in languageFacts.colors) {
                result.items.push({
                    label: color,
                    documentation: languageFacts.colors[color],
                    textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), color),
                    kind: vscode_languageserver_types_1.CompletionItemKind.Color
                });
            }
            for (const color in languageFacts.colorKeywords) {
                result.items.push({
                    label: color,
                    documentation: languageFacts.colorKeywords[color],
                    textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), color),
                    kind: vscode_languageserver_types_1.CompletionItemKind.Value
                });
            }
            const colorValues = new Set();
            this.styleSheet.acceptVisitor(new ColorValueCollector(colorValues, this.offset));
            for (const color of colorValues.getEntries()) {
                result.items.push({
                    label: color,
                    textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), color),
                    kind: vscode_languageserver_types_1.CompletionItemKind.Color
                });
            }
            for (const p of languageFacts.colorFunctions) {
                let tabStop = 1;
                const replaceFunction = (match, p1) => '${' + tabStop++ + ':' + p1 + '}';
                const insertText = p.func.replace(/\[?\$(\w+)\]?/g, replaceFunction);
                result.items.push({
                    label: p.func.substr(0, p.func.indexOf('(')),
                    detail: p.func,
                    documentation: p.desc,
                    textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), insertText),
                    insertTextFormat: SnippetFormat,
                    kind: vscode_languageserver_types_1.CompletionItemKind.Function
                });
            }
            return result;
        }
        getPositionProposals(entry, existingNode, result) {
            for (const position in languageFacts.positionKeywords) {
                result.items.push({
                    label: position,
                    documentation: languageFacts.positionKeywords[position],
                    textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), position),
                    kind: vscode_languageserver_types_1.CompletionItemKind.Value
                });
            }
            return result;
        }
        getRepeatStyleProposals(entry, existingNode, result) {
            for (const repeat in languageFacts.repeatStyleKeywords) {
                result.items.push({
                    label: repeat,
                    documentation: languageFacts.repeatStyleKeywords[repeat],
                    textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), repeat),
                    kind: vscode_languageserver_types_1.CompletionItemKind.Value
                });
            }
            return result;
        }
        getLineStyleProposals(entry, existingNode, result) {
            for (const lineStyle in languageFacts.lineStyleKeywords) {
                result.items.push({
                    label: lineStyle,
                    documentation: languageFacts.lineStyleKeywords[lineStyle],
                    textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), lineStyle),
                    kind: vscode_languageserver_types_1.CompletionItemKind.Value
                });
            }
            return result;
        }
        getLineWidthProposals(entry, existingNode, result) {
            for (const lineWidth of languageFacts.lineWidthKeywords) {
                result.items.push({
                    label: lineWidth,
                    textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), lineWidth),
                    kind: vscode_languageserver_types_1.CompletionItemKind.Value
                });
            }
            return result;
        }
        getGeometryBoxProposals(entry, existingNode, result) {
            for (const box in languageFacts.geometryBoxKeywords) {
                result.items.push({
                    label: box,
                    documentation: languageFacts.geometryBoxKeywords[box],
                    textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), box),
                    kind: vscode_languageserver_types_1.CompletionItemKind.Value
                });
            }
            return result;
        }
        getBoxProposals(entry, existingNode, result) {
            for (const box in languageFacts.boxKeywords) {
                result.items.push({
                    label: box,
                    documentation: languageFacts.boxKeywords[box],
                    textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), box),
                    kind: vscode_languageserver_types_1.CompletionItemKind.Value
                });
            }
            return result;
        }
        getImageProposals(entry, existingNode, result) {
            for (const image in languageFacts.imageFunctions) {
                const insertText = moveCursorInsideParenthesis(image);
                result.items.push({
                    label: image,
                    documentation: languageFacts.imageFunctions[image],
                    textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), insertText),
                    kind: vscode_languageserver_types_1.CompletionItemKind.Function,
                    insertTextFormat: image !== insertText ? SnippetFormat : void 0
                });
            }
            return result;
        }
        getTimingFunctionProposals(entry, existingNode, result) {
            for (const timing in languageFacts.transitionTimingFunctions) {
                const insertText = moveCursorInsideParenthesis(timing);
                result.items.push({
                    label: timing,
                    documentation: languageFacts.transitionTimingFunctions[timing],
                    textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), insertText),
                    kind: vscode_languageserver_types_1.CompletionItemKind.Function,
                    insertTextFormat: timing !== insertText ? SnippetFormat : void 0
                });
            }
            return result;
        }
        getBasicShapeProposals(entry, existingNode, result) {
            for (const shape in languageFacts.basicShapeFunctions) {
                const insertText = moveCursorInsideParenthesis(shape);
                result.items.push({
                    label: shape,
                    documentation: languageFacts.basicShapeFunctions[shape],
                    textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), insertText),
                    kind: vscode_languageserver_types_1.CompletionItemKind.Function,
                    insertTextFormat: shape !== insertText ? SnippetFormat : void 0
                });
            }
            return result;
        }
        getCompletionsForStylesheet(result) {
            const node = this.styleSheet.findFirstChildBeforeOffset(this.offset);
            if (!node) {
                return this.getCompletionForTopLevel(result);
            }
            if (node instanceof nodes.RuleSet) {
                return this.getCompletionsForRuleSet(node, result);
            }
            if (node instanceof nodes.Supports) {
                return this.getCompletionsForSupports(node, result);
            }
            return result;
        }
        getCompletionForTopLevel(result) {
            languageFacts.cssDataManager.getAtDirectives().forEach(entry => {
                result.items.push({
                    label: entry.name,
                    textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(null), entry.name),
                    documentation: languageFacts.getEntryDescription(entry),
                    kind: vscode_languageserver_types_1.CompletionItemKind.Keyword
                });
            });
            this.getCompletionsForSelector(null, false, result);
            return result;
        }
        getCompletionsForRuleSet(ruleSet, result) {
            const declarations = ruleSet.getDeclarations();
            const isAfter = declarations && declarations.endsWith('}') && this.offset >= declarations.end;
            if (isAfter) {
                return this.getCompletionForTopLevel(result);
            }
            const isInSelectors = !declarations || this.offset <= declarations.offset;
            if (isInSelectors) {
                return this.getCompletionsForSelector(ruleSet, ruleSet.isNested(), result);
            }
            return this.getCompletionsForDeclarations(ruleSet.getDeclarations(), result);
        }
        getCompletionsForSelector(ruleSet, isNested, result) {
            const existingNode = this.findInNodePath(nodes.NodeType.PseudoSelector, nodes.NodeType.IdentifierSelector, nodes.NodeType.ClassSelector, nodes.NodeType.ElementNameSelector);
            if (!existingNode && this.offset - this.currentWord.length > 0 && this.textDocument.getText()[this.offset - this.currentWord.length - 1] === ':') {
                this.currentWord = ':' + this.currentWord;
                this.defaultReplaceRange = vscode_languageserver_types_1.Range.create(vscode_languageserver_types_1.Position.create(this.position.line, this.position.character - this.currentWord.length), this.position);
            }
            const pseudoClasses = languageFacts.cssDataManager.getPseudoClasses();
            pseudoClasses.forEach(entry => {
                const insertText = moveCursorInsideParenthesis(entry.name);
                const item = {
                    label: entry.name,
                    textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), insertText),
                    documentation: languageFacts.getEntryDescription(entry),
                    kind: vscode_languageserver_types_1.CompletionItemKind.Function,
                    insertTextFormat: entry.name !== insertText ? SnippetFormat : void 0
                };
                if (strings.startsWith(entry.name, ':-')) {
                    item.sortText = 'x';
                }
                result.items.push(item);
            });
            const pseudoElements = languageFacts.cssDataManager.getPseudoElements();
            pseudoElements.forEach(entry => {
                const insertText = moveCursorInsideParenthesis(entry.name);
                const item = {
                    label: entry.name,
                    textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), insertText),
                    documentation: languageFacts.getEntryDescription(entry),
                    kind: vscode_languageserver_types_1.CompletionItemKind.Function,
                    insertTextFormat: entry.name !== insertText ? SnippetFormat : void 0
                };
                if (strings.startsWith(entry.name, '::-')) {
                    item.sortText = 'x';
                }
                result.items.push(item);
            });
            if (!isNested) {
                for (const entry of languageFacts.html5Tags) {
                    result.items.push({
                        label: entry,
                        textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), entry),
                        kind: vscode_languageserver_types_1.CompletionItemKind.Keyword
                    });
                }
                for (const entry of languageFacts.svgElements) {
                    result.items.push({
                        label: entry,
                        textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), entry),
                        kind: vscode_languageserver_types_1.CompletionItemKind.Keyword
                    });
                }
            }
            const visited = {};
            visited[this.currentWord] = true;
            const textProvider = this.styleSheet.getTextProvider();
            this.styleSheet.accept(n => {
                if (n.type === nodes.NodeType.SimpleSelector && n.length > 0) {
                    const selector = textProvider(n.offset, n.length);
                    if (selector.charAt(0) === '.' && !visited[selector]) {
                        visited[selector] = true;
                        result.items.push({
                            label: selector,
                            textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), selector),
                            kind: vscode_languageserver_types_1.CompletionItemKind.Keyword
                        });
                    }
                    return false;
                }
                return true;
            });
            if (ruleSet && ruleSet.isNested()) {
                const selector = ruleSet.getSelectors().findFirstChildBeforeOffset(this.offset);
                if (selector && ruleSet.getSelectors().getChildren().indexOf(selector) === 0) {
                    this.getPropertyProposals(null, result);
                }
            }
            return result;
        }
        getCompletionsForDeclarations(declarations, result) {
            if (!declarations || this.offset === declarations.offset) {
                return result;
            }
            const node = declarations.findFirstChildBeforeOffset(this.offset);
            if (!node) {
                return this.getCompletionsForDeclarationProperty(null, result);
            }
            if (node instanceof nodes.AbstractDeclaration) {
                const declaration = node;
                if (!isDefined(declaration.colonPosition) || this.offset <= declaration.colonPosition) {
                    return this.getCompletionsForDeclarationProperty(declaration, result);
                }
                else if ((isDefined(declaration.semicolonPosition) && declaration.semicolonPosition < this.offset)) {
                    if (this.offset === declaration.semicolonPosition + 1) {
                        return result;
                    }
                    return this.getCompletionsForDeclarationProperty(null, result);
                }
                if (declaration instanceof nodes.Declaration) {
                    return this.getCompletionsForDeclarationValue(declaration, result);
                }
            }
            else if (node instanceof nodes.ExtendsReference) {
                this.getCompletionsForExtendsReference(node, null, result);
            }
            else if (this.currentWord && this.currentWord[0] === '@') {
                this.getCompletionsForDeclarationProperty(null, result);
            }
            return result;
        }
        getCompletionsForVariableDeclaration(declaration, result) {
            if (this.offset > declaration.colonPosition) {
                this.getVariableProposals(declaration.getValue(), result);
            }
            return result;
        }
        getCompletionsForExpression(expression, result) {
            if (expression.getParent() instanceof nodes.FunctionArgument) {
                this.getCompletionsForFunctionArgument(expression.getParent(), expression.getParent().getParent(), result);
                return result;
            }
            const declaration = expression.findParent(nodes.NodeType.Declaration);
            if (!declaration) {
                this.getTermProposals(null, null, result);
                return result;
            }
            const node = expression.findChildAtOffset(this.offset, true);
            if (!node) {
                return this.getCompletionsForDeclarationValue(declaration, result);
            }
            if (node instanceof nodes.NumericValue || node instanceof nodes.Identifier) {
                return this.getCompletionsForDeclarationValue(declaration, result);
            }
            return result;
        }
        getCompletionsForFunctionArgument(arg, func, result) {
            if (func.getIdentifier().getText() === 'var') {
                if (!func.getArguments().hasChildren() || func.getArguments().getChild(0) === arg) {
                    this.getVariableProposalsForCSSVarFunction(result);
                }
            }
            return result;
        }
        getCompletionsForFunctionDeclaration(decl, result) {
            const declarations = decl.getDeclarations();
            if (declarations && this.offset > declarations.offset && this.offset < declarations.end) {
                this.getTermProposals(null, null, result);
            }
            return result;
        }
        getCompletionsForMixinReference(ref, result) {
            const allMixins = this.getSymbolContext().findSymbolsAtOffset(this.offset, nodes.ReferenceType.Mixin);
            for (const mixinSymbol of allMixins) {
                if (mixinSymbol.node instanceof nodes.MixinDeclaration) {
                    result.items.push(this.makeTermProposal(mixinSymbol, mixinSymbol.node.getParameters(), null));
                }
            }
            return result;
        }
        getTermProposals(entry, existingNode, result) {
            const allFunctions = this.getSymbolContext().findSymbolsAtOffset(this.offset, nodes.ReferenceType.Function);
            for (const functionSymbol of allFunctions) {
                if (functionSymbol.node instanceof nodes.FunctionDeclaration) {
                    result.items.push(this.makeTermProposal(functionSymbol, functionSymbol.node.getParameters(), existingNode));
                }
            }
            return result;
        }
        makeTermProposal(symbol, parameters, existingNode) {
            const decl = symbol.node;
            const params = parameters.getChildren().map((c) => {
                return (c instanceof nodes.FunctionParameter) ? c.getName() : c.getText();
            });
            const insertText = symbol.name + '(' + params.map((p, index) => '${' + (index + 1) + ':' + p + '}').join(', ') + ')';
            return {
                label: symbol.name,
                detail: symbol.name + '(' + params.join(', ') + ')',
                textEdit: vscode_languageserver_types_1.TextEdit.replace(this.getCompletionRange(existingNode), insertText),
                insertTextFormat: SnippetFormat,
                kind: vscode_languageserver_types_1.CompletionItemKind.Function,
                sortText: 'z'
            };
        }
        getCompletionsForSupportsCondition(supportsCondition, result) {
            const child = supportsCondition.findFirstChildBeforeOffset(this.offset);
            if (child) {
                if (child instanceof nodes.Declaration) {
                    if (!isDefined(child.colonPosition || this.offset <= child.colonPosition)) {
                        return this.getCompletionsForDeclarationProperty(child, result);
                    }
                    else {
                        return this.getCompletionsForDeclarationValue(child, result);
                    }
                }
                else if (child instanceof nodes.SupportsCondition) {
                    return this.getCompletionsForSupportsCondition(child, result);
                }
            }
            if (isDefined(supportsCondition.lParent) && this.offset > supportsCondition.lParent && (!isDefined(supportsCondition.rParent) || this.offset <= supportsCondition.rParent)) {
                return this.getCompletionsForDeclarationProperty(null, result);
            }
            return result;
        }
        getCompletionsForSupports(supports, result) {
            const declarations = supports.getDeclarations();
            const inInCondition = !declarations || this.offset <= declarations.offset;
            if (inInCondition) {
                const child = supports.findFirstChildBeforeOffset(this.offset);
                if (child instanceof nodes.SupportsCondition) {
                    return this.getCompletionsForSupportsCondition(child, result);
                }
                return result;
            }
            return this.getCompletionForTopLevel(result);
        }
        getCompletionsForExtendsReference(extendsRef, existingNode, result) {
            return result;
        }
        getCompletionForUriLiteralValue(uriLiteralNode, result) {
            let uriValue;
            let position;
            let range;
            if (uriLiteralNode.getChildren().length === 0) {
                uriValue = '';
                position = this.position;
                const emptyURIValuePosition = this.textDocument.positionAt(uriLiteralNode.offset + 'url('.length);
                range = vscode_languageserver_types_1.Range.create(emptyURIValuePosition, emptyURIValuePosition);
            }
            else {
                const uriValueNode = uriLiteralNode.getChild(0);
                uriValue = uriValueNode.getText();
                position = this.position;
                range = this.getCompletionRange(uriValueNode);
            }
            this.completionParticipants.forEach(participant => {
                if (participant.onCssURILiteralValue) {
                    participant.onCssURILiteralValue({
                        uriValue,
                        position,
                        range
                    });
                }
            });
            return result;
        }
        getCompletionForImportPath(importPathNode, result) {
            this.completionParticipants.forEach(participant => {
                if (participant.onCssImportPath) {
                    participant.onCssImportPath({
                        pathValue: importPathNode.getText(),
                        position: this.position,
                        range: this.getCompletionRange(importPathNode)
                    });
                }
            });
            return result;
        }
    }
    exports.CSSCompletion = CSSCompletion;
    class Set {
        constructor() {
            this.entries = {};
        }
        add(entry) {
            this.entries[entry] = true;
        }
        getEntries() {
            return Object.keys(this.entries);
        }
    }
    function moveCursorInsideParenthesis(text) {
        return text.replace(/\(\)$/, "($1)");
    }
    function collectValues(styleSheet, declaration) {
        const fullPropertyName = declaration.getFullPropertyName();
        const entries = new Set();
        function visitValue(node) {
            if (node instanceof nodes.Identifier || node instanceof nodes.NumericValue || node instanceof nodes.HexColorValue) {
                entries.add(node.getText());
            }
            return true;
        }
        function matchesProperty(decl) {
            const propertyName = decl.getFullPropertyName();
            return fullPropertyName === propertyName;
        }
        function vistNode(node) {
            if (node instanceof nodes.Declaration && node !== declaration) {
                if (matchesProperty(node)) {
                    const value = node.getValue();
                    if (value) {
                        value.accept(visitValue);
                    }
                }
            }
            return true;
        }
        styleSheet.accept(vistNode);
        return entries;
    }
    class ColorValueCollector {
        constructor(entries, currentOffset) {
            this.entries = entries;
            this.currentOffset = currentOffset;
        }
        visitNode(node) {
            if (node instanceof nodes.HexColorValue || (node instanceof nodes.Function && languageFacts.isColorConstructor(node))) {
                if (this.currentOffset < node.offset || node.end < this.currentOffset) {
                    this.entries.add(node.getText());
                }
            }
            return true;
        }
    }
    function isDefined(obj) {
        return typeof obj !== 'undefined';
    }
    function getCurrentWord(document, offset) {
        let i = offset - 1;
        const text = document.getText();
        while (i >= 0 && ' \t\n\r":{[()]},*>+'.indexOf(text.charAt(i)) === -1) {
            i--;
        }
        return text.substring(i + 1, offset);
    }
});
