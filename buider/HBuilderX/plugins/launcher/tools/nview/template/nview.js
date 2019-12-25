define('test.nview.js', function(require, module) {
    module.exports = {
        data: {},
        init: function() {

        },
        methods: {

        },
        render: function(data) {
            return /*NVIEWS*/
        }
    };
});

var module = {
    exports: {}
};
/*模板SCRIPT开始*/
/*SCRIPT*/
/*模板SCRIPT结束*/
NView({
    _data: module.exports.data,
    _init: module.exports.init,
    render: function(data) {
        return /*NVIEWS*/
    }
});
(function(name) {
    window['__subnview_' + name] = function() {
        var module = {
            exports: {}
        };
        /*模板SCRIPT开始*/
        /*SCRIPT*/
        /*模板SCRIPT结束*/
        var result = {
            _data: module.exports.data,
            _init: module.exports.init,
            render: function(data) {
                return /*NVIEWS*/
            }
        };
        if (module.exports.methods) {
            for (var method in module.exports.methods) {
                if (~['data', 'init', 'render', 'setData', '_update', 'evalJS', 'bindJS'].indexOf(method)) {
                    throw new Error('$$'+method + '为内置属性,不允许覆盖$$');
                }
                if (typeof module.exports.methods[method] === 'function') {
                    result[method] = module.exports.methods[method];
                } else {
                    throw new Error('$$'+method + '必须为function$$');
                }
            }
        }
        return result;
    };
})('/*NAME*/');