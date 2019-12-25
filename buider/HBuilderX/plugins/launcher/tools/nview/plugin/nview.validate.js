// nview.validate.js
var checks = {
    'nviews': ['nview'],
    'nview': ['title', 'tab', 'imageslider', 'list', 'canvas', 'richtext'],
    'title': ['canvas'],
    'imageslider': [],
    'list': ['item'],
    'item': ['canvas', 'richtext'],
    'canvas': ['font', 'img', 'a', 'hr', 'button', 'input', 'span'],
    'richtext': ['font', 'p', 'img', 'a', 'hr', 'button', 'input', 'br'],
    'font': [],
    'img': [],
    'a': [],
    'hr': [],
    'button': [],
    'input': [],
    'br': []
}
var checkChildren = function(t, name, children) {
    if (children && children.length) {
        for (var i = 0; i < children.length; i++) {
            var node = children[i];
            if (t.isJSXElement(node)) {
                var childrenName = node.openingElement.name.name;
                if (!checks[name]) {
                    throw new Error('$$不支持标签[' + name + ']$$');
                }
                if (!~checks[name].indexOf(childrenName)) {
                    if (checks[name].length) {
                        throw new Error('$$<' + name + '>标签不支持嵌套<' + name + '>,仅允许使用' + checks[name].join(',')+'$$');
                    } else {
                        throw new Error('$$<' + name + '>标签不支持嵌套<' + name + '>$$');
                    }
                }
                checkChildren(t, childrenName, node.children);
            }
        }
    }
};
module.exports = {
    template: function(babel) {
        var t = babel.types;
        return {
            visitor: {
                JSXIdentifier: function(path) {
                    if (path.node.name === 'nviews') {
                        checkChildren(t, path.node.name, path.parentPath.parentPath.node.children);
                    }
                    if (~['nview', 'imageslider', 'list'].indexOf(path.node.name)) {
                        if (Array.isArray(path.parentPath.node.attributes)) {
                            var hasFor = false;
                            path.parentPath.node.attributes.forEach(function(attr) {
                                if (attr.name.name === 'for') {
                                    hasFor = true;
                                }
                            });
                            if (hasFor) {
                                throw new Error('$$<' + path.node.name + '>不支持for指令$$');
                            }
                        }
                    }
                    if (path.node.name === 'NViews') {
                        throw new Error('$$根节点必须为<nviews>$$');
                    }
                }
            }
        };
    }
}