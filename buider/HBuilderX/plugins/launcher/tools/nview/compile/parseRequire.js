var path = require('path');
var fs = require('fs-extra');

var util = require('../util/util');

var parseRequireByStr = function(string, options) {

    var regex, matchingDeps, matchingName = '\\s*(?:[\\w${},\\s*]+)\\s*';

    options = options || {};

    if (options.matchInternal !== false) {
        matchingDeps = '\\s*[\'"`]([^\'"`]+)[\'"`]\\s*';
    } else {
        matchingDeps = '\\s*[\'"`]([^\'"`.]+)[\'"`]\\s*';
    }

    regex = '(?:(?:var|const|let)' + matchingName + '=\\s*)?require\\(' + matchingDeps + '\\);?';

    if (options.matchES6 !== false) {
        regex += '|import(?:' + matchingName + 'from\\s*)?' + matchingDeps + ';?';
    }

    if (options.matchCoffeescript !== false) {
        regex += '|(?:' + matchingName + '=\\s*)?require' + matchingDeps + ';?';
    }

    if (options.matchGruntTask !== false) {
        regex += '|grunt(?:.tasks)?.loadNpmTasks\\(' + matchingDeps + '\\);?';
    }
    this.regex = function() {
        return new RegExp(regex, 'g');
    };
    var matches = [],
        m = this.regex().exec(string);
    while (m) {
        matches.push(m[1] || m[2] || m[3] || m[4]);
        string = string.slice(m.index + m[0].length);
        m = this.regex().exec(string);
    }
    return matches;
};

module.exports = function(filePath, basePath, options) {
    var resultRequirePaths = [];
    var parsedPaths = [];
    var parse = function(filePath, resultRequirePaths) {
        if (~parsedPaths.indexOf(filePath)) {
            return;
        }
        parsedPaths.push(filePath);
        var requirePaths = parseRequireByStr(fs.readFileSync(filePath, 'utf8'));
        if (requirePaths && requirePaths.length) {
            var dirname = path.dirname(filePath);
            for (var j = 0; j < requirePaths.length; j++) {
                //util.js
                var requireFilePath = util.normalizeJsPath(path.join(dirname, requirePaths[j]));
                if (!fs.pathExistsSync(requireFilePath)) {
                    throw new Error('$$'+requireFilePath + ' not found$$');
                }
                var requirePath = path.relative(basePath, requireFilePath);
                var resultRequirePath = util.normalizePath(requirePath);
                parse(requireFilePath, resultRequirePaths);
                resultRequirePaths.push(resultRequirePath);
            }
        }
    }
    parse(filePath, resultRequirePaths);
    return Array.from(new Set(resultRequirePaths));
}