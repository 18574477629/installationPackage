(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    var NodeType;
    (function (NodeType) {
        NodeType[NodeType["Undefined"] = 0] = "Undefined";
        NodeType[NodeType["Identifier"] = 1] = "Identifier";
        NodeType[NodeType["Stylesheet"] = 2] = "Stylesheet";
        NodeType[NodeType["Ruleset"] = 3] = "Ruleset";
        NodeType[NodeType["Selector"] = 4] = "Selector";
        NodeType[NodeType["SimpleSelector"] = 5] = "SimpleSelector";
        NodeType[NodeType["SelectorInterpolation"] = 6] = "SelectorInterpolation";
        NodeType[NodeType["SelectorCombinator"] = 7] = "SelectorCombinator";
        NodeType[NodeType["SelectorCombinatorParent"] = 8] = "SelectorCombinatorParent";
        NodeType[NodeType["SelectorCombinatorSibling"] = 9] = "SelectorCombinatorSibling";
        NodeType[NodeType["SelectorCombinatorAllSiblings"] = 10] = "SelectorCombinatorAllSiblings";
        NodeType[NodeType["SelectorCombinatorShadowPiercingDescendant"] = 11] = "SelectorCombinatorShadowPiercingDescendant";
        NodeType[NodeType["Page"] = 12] = "Page";
        NodeType[NodeType["PageBoxMarginBox"] = 13] = "PageBoxMarginBox";
        NodeType[NodeType["ClassSelector"] = 14] = "ClassSelector";
        NodeType[NodeType["IdentifierSelector"] = 15] = "IdentifierSelector";
        NodeType[NodeType["ElementNameSelector"] = 16] = "ElementNameSelector";
        NodeType[NodeType["PseudoSelector"] = 17] = "PseudoSelector";
        NodeType[NodeType["AttributeSelector"] = 18] = "AttributeSelector";
        NodeType[NodeType["Declaration"] = 19] = "Declaration";
        NodeType[NodeType["Declarations"] = 20] = "Declarations";
        NodeType[NodeType["Property"] = 21] = "Property";
        NodeType[NodeType["Expression"] = 22] = "Expression";
        NodeType[NodeType["BinaryExpression"] = 23] = "BinaryExpression";
        NodeType[NodeType["Term"] = 24] = "Term";
        NodeType[NodeType["Operator"] = 25] = "Operator";
        NodeType[NodeType["Value"] = 26] = "Value";
        NodeType[NodeType["StringLiteral"] = 27] = "StringLiteral";
        NodeType[NodeType["URILiteral"] = 28] = "URILiteral";
        NodeType[NodeType["EscapedValue"] = 29] = "EscapedValue";
        NodeType[NodeType["Function"] = 30] = "Function";
        NodeType[NodeType["NumericValue"] = 31] = "NumericValue";
        NodeType[NodeType["HexColorValue"] = 32] = "HexColorValue";
        NodeType[NodeType["MixinDeclaration"] = 33] = "MixinDeclaration";
        NodeType[NodeType["MixinReference"] = 34] = "MixinReference";
        NodeType[NodeType["VariableName"] = 35] = "VariableName";
        NodeType[NodeType["VariableDeclaration"] = 36] = "VariableDeclaration";
        NodeType[NodeType["Prio"] = 37] = "Prio";
        NodeType[NodeType["Interpolation"] = 38] = "Interpolation";
        NodeType[NodeType["NestedProperties"] = 39] = "NestedProperties";
        NodeType[NodeType["ExtendsReference"] = 40] = "ExtendsReference";
        NodeType[NodeType["SelectorPlaceholder"] = 41] = "SelectorPlaceholder";
        NodeType[NodeType["Debug"] = 42] = "Debug";
        NodeType[NodeType["If"] = 43] = "If";
        NodeType[NodeType["Else"] = 44] = "Else";
        NodeType[NodeType["For"] = 45] = "For";
        NodeType[NodeType["Each"] = 46] = "Each";
        NodeType[NodeType["While"] = 47] = "While";
        NodeType[NodeType["MixinContent"] = 48] = "MixinContent";
        NodeType[NodeType["Media"] = 49] = "Media";
        NodeType[NodeType["Keyframe"] = 50] = "Keyframe";
        NodeType[NodeType["FontFace"] = 51] = "FontFace";
        NodeType[NodeType["Import"] = 52] = "Import";
        NodeType[NodeType["Namespace"] = 53] = "Namespace";
        NodeType[NodeType["Invocation"] = 54] = "Invocation";
        NodeType[NodeType["FunctionDeclaration"] = 55] = "FunctionDeclaration";
        NodeType[NodeType["ReturnStatement"] = 56] = "ReturnStatement";
        NodeType[NodeType["MediaQuery"] = 57] = "MediaQuery";
        NodeType[NodeType["FunctionParameter"] = 58] = "FunctionParameter";
        NodeType[NodeType["FunctionArgument"] = 59] = "FunctionArgument";
        NodeType[NodeType["KeyframeSelector"] = 60] = "KeyframeSelector";
        NodeType[NodeType["ViewPort"] = 61] = "ViewPort";
        NodeType[NodeType["Document"] = 62] = "Document";
        NodeType[NodeType["AtApplyRule"] = 63] = "AtApplyRule";
        NodeType[NodeType["CustomPropertyDeclaration"] = 64] = "CustomPropertyDeclaration";
        NodeType[NodeType["CustomPropertySet"] = 65] = "CustomPropertySet";
        NodeType[NodeType["ListEntry"] = 66] = "ListEntry";
        NodeType[NodeType["Supports"] = 67] = "Supports";
        NodeType[NodeType["SupportsCondition"] = 68] = "SupportsCondition";
        NodeType[NodeType["NamespacePrefix"] = 69] = "NamespacePrefix";
        NodeType[NodeType["GridLine"] = 70] = "GridLine";
        NodeType[NodeType["Plugin"] = 71] = "Plugin";
        NodeType[NodeType["UnknownAtRule"] = 72] = "UnknownAtRule";
    })(NodeType = exports.NodeType || (exports.NodeType = {}));
    var ReferenceType;
    (function (ReferenceType) {
        ReferenceType[ReferenceType["Mixin"] = 0] = "Mixin";
        ReferenceType[ReferenceType["Rule"] = 1] = "Rule";
        ReferenceType[ReferenceType["Variable"] = 2] = "Variable";
        ReferenceType[ReferenceType["Function"] = 3] = "Function";
        ReferenceType[ReferenceType["Keyframe"] = 4] = "Keyframe";
        ReferenceType[ReferenceType["Unknown"] = 5] = "Unknown";
    })(ReferenceType = exports.ReferenceType || (exports.ReferenceType = {}));
    function getNodeAtOffset(node, offset) {
        let candidate = null;
        if (!node || offset < node.offset || offset > node.end) {
            return null;
        }
        node.accept((node) => {
            if (node.offset === -1 && node.length === -1) {
                return true;
            }
            if (node.offset <= offset && node.end >= offset) {
                if (!candidate) {
                    candidate = node;
                }
                else if (node.length <= candidate.length) {
                    candidate = node;
                }
                return true;
            }
            return false;
        });
        return candidate;
    }
    exports.getNodeAtOffset = getNodeAtOffset;
    function getNodePath(node, offset) {
        let candidate = getNodeAtOffset(node, offset);
        const path = [];
        while (candidate) {
            path.unshift(candidate);
            candidate = candidate.parent;
        }
        return path;
    }
    exports.getNodePath = getNodePath;
    function getParentDeclaration(node) {
        const decl = node.findParent(NodeType.Declaration);
        if (decl && decl.getValue() && decl.getValue().encloses(node)) {
            return decl;
        }
        return null;
    }
    exports.getParentDeclaration = getParentDeclaration;
    class Node {
        get end() { return this.offset + this.length; }
        constructor(offset = -1, len = -1, nodeType) {
            this.parent = null;
            this.offset = offset;
            this.length = len;
            if (nodeType) {
                this.nodeType = nodeType;
            }
        }
        set type(type) {
            this.nodeType = type;
        }
        get type() {
            return this.nodeType || NodeType.Undefined;
        }
        getTextProvider() {
            let node = this;
            while (node && !node.textProvider) {
                node = node.parent;
            }
            if (node) {
                return node.textProvider;
            }
            return () => { return 'unknown'; };
        }
        getText() {
            return this.getTextProvider()(this.offset, this.length);
        }
        matches(str) {
            return this.length === str.length && this.getTextProvider()(this.offset, this.length) === str;
        }
        startsWith(str) {
            return this.length >= str.length && this.getTextProvider()(this.offset, str.length) === str;
        }
        endsWith(str) {
            return this.length >= str.length && this.getTextProvider()(this.end - str.length, str.length) === str;
        }
        accept(visitor) {
            if (visitor(this) && this.children) {
                for (const child of this.children) {
                    child.accept(visitor);
                }
            }
        }
        acceptVisitor(visitor) {
            this.accept(visitor.visitNode.bind(visitor));
        }
        adoptChild(node, index = -1) {
            if (node.parent && node.parent.children) {
                const idx = node.parent.children.indexOf(node);
                if (idx >= 0) {
                    node.parent.children.splice(idx, 1);
                }
            }
            node.parent = this;
            let children = this.children;
            if (!children) {
                children = this.children = [];
            }
            if (index !== -1) {
                children.splice(index, 0, node);
            }
            else {
                children.push(node);
            }
            return node;
        }
        attachTo(parent, index = -1) {
            if (parent) {
                parent.adoptChild(this, index);
            }
            return this;
        }
        collectIssues(results) {
            if (this.issues) {
                results.push.apply(results, this.issues);
            }
        }
        addIssue(issue) {
            if (!this.issues) {
                this.issues = [];
            }
            this.issues.push(issue);
        }
        hasIssue(rule) {
            return Array.isArray(this.issues) && this.issues.some(i => i.getRule() === rule);
        }
        isErroneous(recursive = false) {
            if (this.issues && this.issues.length > 0) {
                return true;
            }
            return recursive && Array.isArray(this.children) && this.children.some(c => c.isErroneous(true));
        }
        setNode(field, node, index = -1) {
            if (node) {
                node.attachTo(this, index);
                this[field] = node;
                return true;
            }
            return false;
        }
        addChild(node) {
            if (node) {
                if (!this.children) {
                    this.children = [];
                }
                node.attachTo(this);
                this.updateOffsetAndLength(node);
                return true;
            }
            return false;
        }
        updateOffsetAndLength(node) {
            if (node.offset < this.offset || this.offset === -1) {
                this.offset = node.offset;
            }
            const nodeEnd = node.end;
            if ((nodeEnd > this.end) || this.length === -1) {
                this.length = nodeEnd - this.offset;
            }
        }
        hasChildren() {
            return this.children && this.children.length > 0;
        }
        getChildren() {
            return this.children ? this.children.slice(0) : [];
        }
        getChild(index) {
            if (this.children && index < this.children.length) {
                return this.children[index];
            }
            return null;
        }
        addChildren(nodes) {
            for (const node of nodes) {
                this.addChild(node);
            }
        }
        findFirstChildBeforeOffset(offset) {
            if (this.children) {
                let current = null;
                for (let i = this.children.length - 1; i >= 0; i--) {
                    current = this.children[i];
                    if (current.offset <= offset) {
                        return current;
                    }
                }
            }
            return null;
        }
        findChildAtOffset(offset, goDeep) {
            const current = this.findFirstChildBeforeOffset(offset);
            if (current && current.end >= offset) {
                if (goDeep) {
                    return current.findChildAtOffset(offset, true) || current;
                }
                return current;
            }
            return null;
        }
        encloses(candidate) {
            return this.offset <= candidate.offset && this.offset + this.length >= candidate.offset + candidate.length;
        }
        getParent() {
            let result = this.parent;
            while (result instanceof Nodelist) {
                result = result.parent;
            }
            return result;
        }
        findParent(type) {
            let result = this;
            while (result && result.type !== type) {
                result = result.parent;
            }
            return result;
        }
        findAParent(...types) {
            let result = this;
            while (result && !types.some(t => result.type === t)) {
                result = result.parent;
            }
            return result;
        }
        setData(key, value) {
            if (!this.options) {
                this.options = {};
            }
            this.options[key] = value;
        }
        getData(key) {
            if (!this.options || !this.options.hasOwnProperty(key)) {
                return null;
            }
            return this.options[key];
        }
    }
    exports.Node = Node;
    class Nodelist extends Node {
        constructor(parent, index = -1) {
            super(-1, -1);
            this.attachTo(parent, index);
            this.offset = -1;
            this.length = -1;
        }
    }
    exports.Nodelist = Nodelist;
    class Identifier extends Node {
        constructor(offset, length) {
            super(offset, length);
            this.isCustomProperty = false;
        }
        get type() {
            return NodeType.Identifier;
        }
        containsInterpolation() {
            return this.hasChildren();
        }
    }
    exports.Identifier = Identifier;
    class Stylesheet extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.Stylesheet;
        }
        setName(value) {
            this.name = value;
        }
    }
    exports.Stylesheet = Stylesheet;
    class Declarations extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.Declarations;
        }
    }
    exports.Declarations = Declarations;
    class BodyDeclaration extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        getDeclarations() {
            return this.declarations;
        }
        setDeclarations(decls) {
            return this.setNode('declarations', decls);
        }
    }
    exports.BodyDeclaration = BodyDeclaration;
    class RuleSet extends BodyDeclaration {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.Ruleset;
        }
        getSelectors() {
            if (!this.selectors) {
                this.selectors = new Nodelist(this);
            }
            return this.selectors;
        }
        isNested() {
            return !!this.parent && this.parent.findParent(NodeType.Declarations) !== null;
        }
    }
    exports.RuleSet = RuleSet;
    class Selector extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.Selector;
        }
    }
    exports.Selector = Selector;
    class SimpleSelector extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.SimpleSelector;
        }
    }
    exports.SimpleSelector = SimpleSelector;
    class AtApplyRule extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.AtApplyRule;
        }
        setIdentifier(node) {
            return this.setNode('identifier', node, 0);
        }
        getIdentifier() {
            return this.identifier;
        }
        getName() {
            return this.identifier ? this.identifier.getText() : '';
        }
    }
    exports.AtApplyRule = AtApplyRule;
    class AbstractDeclaration extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
    }
    exports.AbstractDeclaration = AbstractDeclaration;
    class CustomPropertyDeclaration extends AbstractDeclaration {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.CustomPropertyDeclaration;
        }
        setProperty(node) {
            return this.setNode('property', node);
        }
        getProperty() {
            return this.property;
        }
        setValue(value) {
            return this.setNode('value', value);
        }
        getValue() {
            return this.value;
        }
        setPropertySet(value) {
            return this.setNode('propertySet', value);
        }
        getPropertySet() {
            return this.propertySet;
        }
    }
    exports.CustomPropertyDeclaration = CustomPropertyDeclaration;
    class CustomPropertySet extends BodyDeclaration {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.CustomPropertySet;
        }
    }
    exports.CustomPropertySet = CustomPropertySet;
    class Declaration extends AbstractDeclaration {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.Declaration;
        }
        setProperty(node) {
            return this.setNode('property', node);
        }
        getProperty() {
            return this.property;
        }
        getFullPropertyName() {
            const propertyName = this.property ? this.property.getName() : 'unknown';
            if (this.parent instanceof Declarations && this.parent.getParent() instanceof NestedProperties) {
                const parentDecl = this.parent.getParent().getParent();
                if (parentDecl instanceof Declaration) {
                    return parentDecl.getFullPropertyName() + propertyName;
                }
            }
            return propertyName;
        }
        getNonPrefixedPropertyName() {
            const propertyName = this.getFullPropertyName();
            if (propertyName && propertyName.charAt(0) === '-') {
                const vendorPrefixEnd = propertyName.indexOf('-', 1);
                if (vendorPrefixEnd !== -1) {
                    return propertyName.substring(vendorPrefixEnd + 1);
                }
            }
            return propertyName;
        }
        setValue(value) {
            return this.setNode('value', value);
        }
        getValue() {
            return this.value;
        }
        setNestedProperties(value) {
            return this.setNode('nestedProperties', value);
        }
        getNestedProperties() {
            return this.nestedProperties;
        }
    }
    exports.Declaration = Declaration;
    class Property extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.Property;
        }
        setIdentifier(value) {
            return this.setNode('identifier', value);
        }
        getIdentifier() {
            return this.identifier;
        }
        getName() {
            return this.getText();
        }
        isCustomProperty() {
            return this.identifier.isCustomProperty;
        }
    }
    exports.Property = Property;
    class Invocation extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.Invocation;
        }
        getArguments() {
            if (!this.arguments) {
                this.arguments = new Nodelist(this);
            }
            return this.arguments;
        }
    }
    exports.Invocation = Invocation;
    class Function extends Invocation {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.Function;
        }
        setIdentifier(node) {
            return this.setNode('identifier', node, 0);
        }
        getIdentifier() {
            return this.identifier;
        }
        getName() {
            return this.identifier ? this.identifier.getText() : '';
        }
    }
    exports.Function = Function;
    class FunctionParameter extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.FunctionParameter;
        }
        setIdentifier(node) {
            return this.setNode('identifier', node, 0);
        }
        getIdentifier() {
            return this.identifier;
        }
        getName() {
            return this.identifier ? this.identifier.getText() : '';
        }
        setDefaultValue(node) {
            return this.setNode('defaultValue', node, 0);
        }
        getDefaultValue() {
            return this.defaultValue;
        }
    }
    exports.FunctionParameter = FunctionParameter;
    class FunctionArgument extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.FunctionArgument;
        }
        setIdentifier(node) {
            return this.setNode('identifier', node, 0);
        }
        getIdentifier() {
            return this.identifier;
        }
        getName() {
            return this.identifier ? this.identifier.getText() : '';
        }
        setValue(node) {
            return this.setNode('value', node, 0);
        }
        getValue() {
            return this.value;
        }
    }
    exports.FunctionArgument = FunctionArgument;
    class IfStatement extends BodyDeclaration {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.If;
        }
        setExpression(node) {
            return this.setNode('expression', node, 0);
        }
        setElseClause(elseClause) {
            return this.setNode('elseClause', elseClause);
        }
    }
    exports.IfStatement = IfStatement;
    class ForStatement extends BodyDeclaration {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.For;
        }
        setVariable(node) {
            return this.setNode('variable', node, 0);
        }
    }
    exports.ForStatement = ForStatement;
    class EachStatement extends BodyDeclaration {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.Each;
        }
        getVariables() {
            if (!this.variables) {
                this.variables = new Nodelist(this);
            }
            return this.variables;
        }
    }
    exports.EachStatement = EachStatement;
    class WhileStatement extends BodyDeclaration {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.While;
        }
    }
    exports.WhileStatement = WhileStatement;
    class ElseStatement extends BodyDeclaration {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.Else;
        }
    }
    exports.ElseStatement = ElseStatement;
    class FunctionDeclaration extends BodyDeclaration {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.FunctionDeclaration;
        }
        setIdentifier(node) {
            return this.setNode('identifier', node, 0);
        }
        getIdentifier() {
            return this.identifier;
        }
        getName() {
            return this.identifier ? this.identifier.getText() : '';
        }
        getParameters() {
            if (!this.parameters) {
                this.parameters = new Nodelist(this);
            }
            return this.parameters;
        }
    }
    exports.FunctionDeclaration = FunctionDeclaration;
    class ViewPort extends BodyDeclaration {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.ViewPort;
        }
    }
    exports.ViewPort = ViewPort;
    class FontFace extends BodyDeclaration {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.FontFace;
        }
    }
    exports.FontFace = FontFace;
    class NestedProperties extends BodyDeclaration {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.NestedProperties;
        }
    }
    exports.NestedProperties = NestedProperties;
    class Keyframe extends BodyDeclaration {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.Keyframe;
        }
        setKeyword(keyword) {
            return this.setNode('keyword', keyword, 0);
        }
        getKeyword() {
            return this.keyword;
        }
        setIdentifier(node) {
            return this.setNode('identifier', node, 0);
        }
        getIdentifier() {
            return this.identifier;
        }
        getName() {
            return this.identifier ? this.identifier.getText() : '';
        }
    }
    exports.Keyframe = Keyframe;
    class KeyframeSelector extends BodyDeclaration {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.KeyframeSelector;
        }
    }
    exports.KeyframeSelector = KeyframeSelector;
    class Import extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.Import;
        }
        setMedialist(node) {
            if (node) {
                node.attachTo(this);
                this.medialist = node;
                return true;
            }
            return false;
        }
    }
    exports.Import = Import;
    class Namespace extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.Namespace;
        }
    }
    exports.Namespace = Namespace;
    class Media extends BodyDeclaration {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.Media;
        }
    }
    exports.Media = Media;
    class Supports extends BodyDeclaration {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.Supports;
        }
    }
    exports.Supports = Supports;
    class Document extends BodyDeclaration {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.Document;
        }
    }
    exports.Document = Document;
    class Medialist extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        getMediums() {
            if (!this.mediums) {
                this.mediums = new Nodelist(this);
            }
            return this.mediums;
        }
    }
    exports.Medialist = Medialist;
    class MediaQuery extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.MediaQuery;
        }
    }
    exports.MediaQuery = MediaQuery;
    class SupportsCondition extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.SupportsCondition;
        }
    }
    exports.SupportsCondition = SupportsCondition;
    class Page extends BodyDeclaration {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.Page;
        }
    }
    exports.Page = Page;
    class PageBoxMarginBox extends BodyDeclaration {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.PageBoxMarginBox;
        }
    }
    exports.PageBoxMarginBox = PageBoxMarginBox;
    class Expression extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.Expression;
        }
    }
    exports.Expression = Expression;
    class BinaryExpression extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.BinaryExpression;
        }
        setLeft(left) {
            return this.setNode('left', left);
        }
        getLeft() {
            return this.left;
        }
        setRight(right) {
            return this.setNode('right', right);
        }
        getRight() {
            return this.right;
        }
        setOperator(value) {
            return this.setNode('operator', value);
        }
        getOperator() {
            return this.operator;
        }
    }
    exports.BinaryExpression = BinaryExpression;
    class Term extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.Term;
        }
        setOperator(value) {
            return this.setNode('operator', value);
        }
        getOperator() {
            return this.operator;
        }
        setExpression(value) {
            return this.setNode('expression', value);
        }
        getExpression() {
            return this.expression;
        }
    }
    exports.Term = Term;
    class AttributeSelector extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.AttributeSelector;
        }
        setNamespacePrefix(value) {
            return this.setNode('namespacePrefix', value);
        }
        getNamespacePrefix() {
            return this.namespacePrefix;
        }
        setIdentifier(value) {
            return this.setNode('identifier', value);
        }
        getIdentifier() {
            return this.identifier;
        }
        setOperator(operator) {
            return this.setNode('operator', operator);
        }
        getOperator() {
            return this.operator;
        }
        setValue(value) {
            return this.setNode('value', value);
        }
        getValue() {
            return this.value;
        }
    }
    exports.AttributeSelector = AttributeSelector;
    class Operator extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.Operator;
        }
    }
    exports.Operator = Operator;
    class HexColorValue extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.HexColorValue;
        }
    }
    exports.HexColorValue = HexColorValue;
    const _dot = '.'.charCodeAt(0), _0 = '0'.charCodeAt(0), _9 = '9'.charCodeAt(0);
    class NumericValue extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.NumericValue;
        }
        getValue() {
            const raw = this.getText();
            let unitIdx = 0;
            let code;
            for (let i = 0, len = raw.length; i < len; i++) {
                code = raw.charCodeAt(i);
                if (!(_0 <= code && code <= _9 || code === _dot)) {
                    break;
                }
                unitIdx += 1;
            }
            return {
                value: raw.substring(0, unitIdx),
                unit: unitIdx < raw.length ? raw.substring(unitIdx) : undefined
            };
        }
    }
    exports.NumericValue = NumericValue;
    class VariableDeclaration extends AbstractDeclaration {
        constructor(offset, length) {
            super(offset, length);
            this.needsSemicolon = true;
        }
        get type() {
            return NodeType.VariableDeclaration;
        }
        setVariable(node) {
            if (node) {
                node.attachTo(this);
                this.variable = node;
                return true;
            }
            return false;
        }
        getVariable() {
            return this.variable;
        }
        getName() {
            return this.variable ? this.variable.getName() : '';
        }
        setValue(node) {
            if (node) {
                node.attachTo(this);
                this.value = node;
                return true;
            }
            return false;
        }
        getValue() {
            return this.value;
        }
    }
    exports.VariableDeclaration = VariableDeclaration;
    class Interpolation extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.Interpolation;
        }
    }
    exports.Interpolation = Interpolation;
    class Variable extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.VariableName;
        }
        getName() {
            return this.getText();
        }
    }
    exports.Variable = Variable;
    class ExtendsReference extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.ExtendsReference;
        }
        getSelectors() {
            if (!this.selectors) {
                this.selectors = new Nodelist(this);
            }
            return this.selectors;
        }
    }
    exports.ExtendsReference = ExtendsReference;
    class MixinReference extends Node {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.MixinReference;
        }
        getNamespaces() {
            if (!this.namespaces) {
                this.namespaces = new Nodelist(this);
            }
            return this.namespaces;
        }
        setIdentifier(node) {
            return this.setNode('identifier', node, 0);
        }
        getIdentifier() {
            return this.identifier;
        }
        getName() {
            return this.identifier ? this.identifier.getText() : '';
        }
        getArguments() {
            if (!this.arguments) {
                this.arguments = new Nodelist(this);
            }
            return this.arguments;
        }
        setContent(node) {
            return this.setNode('content', node);
        }
        getContent() {
            return this.content;
        }
    }
    exports.MixinReference = MixinReference;
    class MixinDeclaration extends BodyDeclaration {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.MixinDeclaration;
        }
        setIdentifier(node) {
            return this.setNode('identifier', node, 0);
        }
        getIdentifier() {
            return this.identifier;
        }
        getName() {
            return this.identifier ? this.identifier.getText() : '';
        }
        getParameters() {
            if (!this.parameters) {
                this.parameters = new Nodelist(this);
            }
            return this.parameters;
        }
        setGuard(node) {
            if (node) {
                node.attachTo(this);
                this.guard = node;
            }
            return false;
        }
    }
    exports.MixinDeclaration = MixinDeclaration;
    class UnknownAtRule extends BodyDeclaration {
        constructor(offset, length) {
            super(offset, length);
        }
        get type() {
            return NodeType.UnknownAtRule;
        }
        setAtRuleName(atRuleName) {
            this.atRuleName = atRuleName;
        }
        getAtRuleName(atRuleName) {
            return this.atRuleName;
        }
    }
    exports.UnknownAtRule = UnknownAtRule;
    class ListEntry extends Node {
        get type() {
            return NodeType.ListEntry;
        }
        setKey(node) {
            return this.setNode('key', node, 0);
        }
        setValue(node) {
            return this.setNode('value', node, 1);
        }
    }
    exports.ListEntry = ListEntry;
    class LessGuard extends Node {
        getConditions() {
            if (!this.conditions) {
                this.conditions = new Nodelist(this);
            }
            return this.conditions;
        }
    }
    exports.LessGuard = LessGuard;
    class GuardCondition extends Node {
        setVariable(node) {
            return this.setNode('variable', node);
        }
    }
    exports.GuardCondition = GuardCondition;
    var Level;
    (function (Level) {
        Level[Level["Ignore"] = 1] = "Ignore";
        Level[Level["Warning"] = 2] = "Warning";
        Level[Level["Error"] = 4] = "Error";
    })(Level = exports.Level || (exports.Level = {}));
    class Marker {
        constructor(node, rule, level, message, offset = node.offset, length = node.length) {
            this.node = node;
            this.rule = rule;
            this.level = level;
            this.message = message || rule.message;
            this.offset = offset;
            this.length = length;
        }
        getRule() {
            return this.rule;
        }
        getLevel() {
            return this.level;
        }
        getOffset() {
            return this.offset;
        }
        getLength() {
            return this.length;
        }
        getNode() {
            return this.node;
        }
        getMessage() {
            return this.message;
        }
    }
    exports.Marker = Marker;
    class ParseErrorCollector {
        static entries(node) {
            const visitor = new ParseErrorCollector();
            node.acceptVisitor(visitor);
            return visitor.entries;
        }
        constructor() {
            this.entries = [];
        }
        visitNode(node) {
            if (node.isErroneous()) {
                node.collectIssues(this.entries);
            }
            return true;
        }
    }
    exports.ParseErrorCollector = ParseErrorCollector;
});
