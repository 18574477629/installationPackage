// nview.validate.js

var renamesAll = {
    'cachemaxage': 'cacheMaxAge',
    'autoclose': 'autoClose'
}
var renames = {
    'nviews': 'NViews',
    'nview': 'NView',
    'title': 'Title',
    'imageslider': 'ImageSlider',
    'list': 'List',
    'item': 'Item',
    'canvas': 'Canvas',
    'richtext': 'RichText',
    'font': 'Font',
    'span': 'Span',
    'img': 'Img',
    'a': 'A',
    'hr': 'HR',
    'button': 'Button',
    'input': 'Input',
    'onclick': 'onClick',
    'oncomplete': 'onComplete'
}
module.exports = {
    template: function(babel) {
        var t = babel.types;
        var id = 0;
        return {
            visitor: {
                JSXIdentifier: function(path) {
                    if (path.node.name === 'nviews') {
                        if (Array.isArray(path.parentPath.node.attributes)) {
                            path.parentPath.node.attributes.push(t.jSXAttribute(t.JSXIdentifier('version'), t.StringLiteral('1.0.0')))
                        }
                    }
                    if (~['nview', 'imageslider'].indexOf(path.node.name)) {
                        if (Array.isArray(path.parentPath.node.attributes)) {
                            var hasId = false;
                            path.parentPath.node.attributes.forEach(function(attr) {
                                if (attr.name.name === 'id') {
                                    hasId = true;
                                }
                            });
                            if (!hasId) {
                                path.parentPath.node.attributes.push(t.jSXAttribute(t.JSXIdentifier('id'), t.StringLiteral('NVIEW' + (id++))))
                            }
                        }
                    }
                    if (renamesAll[path.node.name]) {
                        path.node.name = renamesAll[path.node.name]
                    } else if (renames[path.node.name]) {
                        var parentPath = path.parentPath.parentPath.parentPath;
                        if (parentPath && parentPath.node && parentPath.node.openingElement) {
                            var name = parentPath.node.openingElement.name.name.toLowerCase();
                            if (name === 'richtext' && path.node.name !== 'onclick') {
                                return;
                            }
                            while (parentPath = parentPath.parentPath) {
                                if (parentPath && parentPath.node && parentPath.node.openingElement) {
                                    var name = parentPath.node.openingElement.name.name.toLowerCase();
                                    if (name === 'richtext') {
                                        return;
                                    }
                                } else {
                                    break;
                                }
                            }
                        }
                        path.node.name = renames[path.node.name]
                    }
                }
            }
        };
    }
}