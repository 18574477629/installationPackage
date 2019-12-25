var path = require('path');
var fs = require('fs-extra');
var merge = require('merge');
var strip = require('strip-json-comments');

var wildcard = require('../util/wildcard');

var parseExpr = function(expr) {
    if (!expr) {
        return false;
    }
    if (expr.indexOf('EXACT:') === 0) {
        return '^' + expr.replace('EXACT:', '').replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\\$&') + '$';
    } else if (expr.indexOf('E:') === 0) {
        return '^' + expr.replace('E:', '').replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\\$&') + '$';
    } else if (expr.indexOf('REGEX:') === 0) {
        return expr.replace('REGEX:', '');
    } else if (expr.indexOf('R:') === 0) {
        return expr.replace('R:', '');
    } else if (expr.indexOf('WILDCARD:') === 0) {
        return wildcard(expr.replace('WILDCARD:', ''));
    } else if (expr.indexOf('W:') === 0) {
        return wildcard(expr.replace('W:', ''));
    } else {
        return '^' + expr.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\\$&') + '$';
    }
    return expr;
};
var parseExprs = function(exprs) {
    if (typeof exprs === 'string') {
        exprs = [exprs];
    }
    var result = [];
    for (var i = 0; i < exprs.length; i++) {
        result.push(parseExpr(exprs[i]));
    }
    return result;
}

var parseAppendCssAndJsAndNView = function(projectPath, options) {
    if (options.webviewParameter && options.webviewParameter.appendCss) {
        var appendCss = options.webviewParameter.appendCss.trim();
        if (appendCss.substr(-4) === '.css') {
            var appendCssFile = path.join(projectPath, appendCss);
            options.webviewParameter.appendCss = fs.readFileSync(appendCssFile, 'utf8');
        }
    } else {
        if (options.webviewId) {
            var appendCssFile = path.join(projectPath, options.webviewId + '.append.css');
            if (fs.pathExistsSync(appendCssFile)) {
                if (!options.webviewParameter) {
                    options.webviewParameter = {};
                }
                options.webviewParameter.appendCss = fs.readFileSync(appendCssFile, 'utf8');
            }
        }
    }
    if (options.webviewId) {
        var appendJsFile = path.join(projectPath, options.webviewId + '.append.js');
        if (fs.pathExistsSync(appendJsFile)) {
            if (!options.webviewParameter) {
                options.webviewParameter = {};
            }
            if (!options.webviewParameter.appendJs) {
                options.webviewParameter.appendJs = options.webviewId + '.append.js';
            } else {
                if (!fs.pathExistsSync(path.join(projectPath, options.webviewParameter.appendJs))) {
                    throw new Error('$$page[' + options.webviewId + '].webviewParameter.appendJs:' + options.webviewParameter.appendJs + ' not found$$');
                }
            }
        }
        var subNViewsFile = path.join(projectPath, options.webviewId + '.nview');
        if (fs.pathExistsSync(subNViewsFile)) {
            if (!options.webviewParameter) {
                options.webviewParameter = {};
            }
            if (!options.webviewParameter.subNViews) {
                options.webviewParameter.subNViews = options.webviewId + '.nview';
            }
        }
    }
}

var nodes = ['global', 'webviewParameter', 'statusbar', 'immersed', 'titleNView', 'backgroundColor', 'titleColor', 'titleSize', 'borderColor', 'appendCss', 'appendJs', 'easyConfig', 'pages', 'webviewId', 'matchUrls', 'hash', 'host', 'hostname', 'href', 'pathname', 'port', 'protocol', 'search']
var props = {};
for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    props[node.toLowerCase()] = node;
}
var isObject = function(obj) {
    return obj !== null && typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype;
};
var normalize = function(config) {
    if (!isObject(config)) {
        return;
    }
    for (var prop in config) {
        var newProp = props[prop.toLowerCase()];
        if (newProp) {
            var value = config[prop];
            delete config[prop];
            config[newProp] = value;
            if (Array.isArray(value)) {
                for (var i = 0; i < value.length; i++) {
                    normalize(value[i]);
                }
            } else if (isObject(value)) {
                normalize(value);
            }
        }
    }
};
module.exports = function(projectPath, isIgnoreSitemap) {
    var sitemapFile = path.join(projectPath, './sitemap.json');
    if (isIgnoreSitemap && !fs.pathExistsSync(sitemapFile)) {
        return false;
    }
    try {
        var config = JSON.parse(strip(fs.readFileSync(sitemapFile, 'utf8')));
        normalize(config);
    } catch (e) {
        throw new Error('$$sitemap.json 解析失败$$');
    }

    if (config.global) {
        parseAppendCssAndJsAndNView(projectPath, config.global);
    }
    //转换pages的matchUrls配置
    var pages = config.pages;
    if (pages) {
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            if (!page.webviewId) {
                throw new Error('$$pages[' + i + '] webviewId is undefined$$');
            }
            if (!page.matchUrls) {
                throw new Error('$$pages[' + i + '] matchUrls is undefined$$');
            }
            parseAppendCssAndJsAndNView(projectPath, page);
            var matchUrls = page.matchUrls;
            if (!matchUrls) {
                continue;
            }
            for (var j = 0; j < matchUrls.length; j++) {
                var matchUrl = matchUrls[j];
                if (!matchUrl) {
                    continue;
                }
                for (var prop in matchUrl) {
                    matchUrl[prop] = parseExprs(matchUrl[prop]);
                }
            }
        }
    }
    return config;
};