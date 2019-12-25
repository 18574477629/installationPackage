var generateRender = function(babel) {
    var t = babel.types;
    return {
        FunctionExpression: function(path) {
            if (path.parentPath.node.key.name === 'init') {
                path.parentPath.insertAfter(t.objectProperty(t.identifier('render'), t.stringLiteral('/*{RENDER_FUNCTION}*/')));
            }
        }
    }
};
module.exports = function(babel) {
    var t = babel.types;
    return {
        visitor: {
            CallExpression: function(path, state) {
                if (path.node.callee.name === 'Page') {
                    var arg = path.node.arguments[0];
                    if (t.isObjectExpression(arg)) {
                        path.node.arguments.unshift(t.stringLiteral(state.opts.module));
                        path.parentPath.replaceWith(t.callExpression(t.identifier('Page'), path.node.arguments));
                    }
                }
            }
        }
    };
}