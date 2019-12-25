// nview.js
var template = require('babel-template');

var listItemOnClickWrapper = template(`
(function(item, $index) {
    return function($event) {
        return this.ONCLICK($event, item, $index)
    }.bind(this)
}.bind(this))(item, $index)
`);

var transformCode = function (codeExpr, path, t) {
  console.log('----------------------');
  console.log(codeExpr);
};

var transformFor = function (forExpr, path, t, name) {
  var splits = forExpr.replace(/\s+/g, ' ').trim().split(' ');
  var itemVar = splits[0];
  var listVar = splits[2];
  var parent = path.parentPath.parent;
  if (name === 'Item') {
    var propsExpression = parent.arguments[1];
    if (propsExpression && t.isObjectExpression(propsExpression)) {
      var properties = propsExpression.properties;
      if (properties && properties.length) {
        for (var i = 0; i < properties.length; i++) {
          var prop = properties[i];
          if (prop && t.isIdentifier(prop.key)) {
            if (prop.key.name === 'onClick') {
              if (prop.value && t.isMemberExpression(prop.value)) {
                var isThisExpression = prop.value.object && t.isThisExpression(prop.value.object);
                var isIdentifier = prop.value.property && t.isIdentifier(prop.value.property);
                if (isThisExpression && isIdentifier) {
                  prop.value = listItemOnClickWrapper({
                    ONCLICK: t.identifier(prop.value.property.name)
                  }).expression;
                }
              }
              break;
            }
          }
        }
      }
    }
  }
  var functionExpression = t.functionExpression(null, [t.identifier(itemVar), t.identifier('$index')], t.blockStatement([t.returnStatement(t.callExpression(parent.callee, parent.arguments))]));
  path.parentPath.parentPath.replaceWith(
    t.callExpression(
      t.memberExpression(t.identifier(listVar), t.identifier("map")), [
        t.callExpression(t.memberExpression(functionExpression, t.identifier('bind')), [t.thisExpression()])
      ])
  );
};
var transformIf = function (ifExpr, path, t) {
  var parent = path.parentPath.parent;
  path.parentPath.parentPath.replaceWith(t.conditionalExpression(template(ifExpr)().expression, t.callExpression(parent.callee, parent.arguments), t.nullLiteral()));
};

var generateRender = function (babel) {
  var t = babel.types;
  return {
    FunctionExpression: function (path) {
      if (path.parentPath.node.key && path.parentPath.node.key.name === 'init') {
        var properties = path.parentPath.parentPath.node.properties;
        properties.push(t.objectProperty(t.identifier('render'), t.stringLiteral('/*{RENDER_FUNCTION}*/')));
      }
    }
  }
};
module.exports = {
  template: function (babel) {
    var t = babel.types;
    return {
      visitor: {
        Identifier: function (path) {
          if (path.node.name === 'createElement') {
            var args = path.parentPath.parentPath.node.arguments;
            if (args && args.length >= 2) {
              var identifierArg = args[0];
              if (t.isIdentifier(identifierArg)) {
                args[0] = t.stringLiteral(identifierArg.name);
              }
              var propsArg = args[1];
              if (propsArg && t.isObjectExpression(propsArg)) {
                var properties = propsArg.properties;
                if (properties && properties.length) {
                  for (var i = 0; i < properties.length; i++) {
                    var prop = properties[i];
                    if (prop && t.isStringLiteral(prop.key)) {
                      if (prop.key.value === 'n-for') {
                        properties.splice(i, 1);
                        transformFor(prop.value.value, path, t, identifierArg.name);
                      } else if (prop.key.value === 'n-if') {
                        properties.splice(i, 1);
                        transformIf(prop.value.value, path, t);
                      } else if (prop.key.value.indexOf(':') === 0) {
                        transformCode(prop.value.value, path, t);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
  },
  render: function (babel) {
    var t = babel.types;
    return {
      visitor: {
        Identifier: function (path) {
          if (path.node.name === 'exports') {
            var rootPath = path.parentPath.parentPath;
            rootPath.traverse(generateRender(babel));
          }
        }
      }
    };
  },
  exports: function (babel) {
    var t = babel.types;
    return {
      visitor: {
        ObjectExpression: function (path, state) {
          var parentNode = path.parentPath.node;
          if (t.isAssignmentExpression(parentNode) && t.isMemberExpression(parentNode.left)) {
            if (parentNode.left.object && parentNode.left.object.name === 'module') {
              if (parentNode.left.property && parentNode.left.property.name === 'exports') {
                path.replaceWith(t.functionExpression(null, [], t.blockStatement([t.returnStatement(path.node)])));
              }
            }
          }
          //                  if (path.node.name === 'exports') {
          //                      var rootPath = path.parentPath.parentPath;
          //                      var moduleExportsExpression = t.memberExpression(t.identifier('module'), t.identifier('exports'));
          //                      var functionExpression = t.functionExpression(null, [], t.blockStatement([t.returnStatement(t.identifier('sdfdsf'))]))
          //                      rootPath.replaceWith(t.assignmentExpression('=', moduleExportsExpression, functionExpression))
          //                  }
        }
      }
    }
  }
}