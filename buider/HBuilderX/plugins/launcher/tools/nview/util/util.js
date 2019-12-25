var isWin = /^win/.test(process.platform);
var normalizePath = function(path) {
    if (path && isWin) return path.replace(/\\/g, '/')
    return path
};
var parsePath = function(path) {
    if (isWin) return path.replace(/\//g, '\\')
    return path
};
var normalizeJsPath = function(path) {
    if (path && !path.endsWith('.js')) {
        path = path + '.js';
    }
    return path;
};
module.exports = {
    isWin: isWin,
    parsePath: parsePath,
    normalizePath: normalizePath,
    normalizeJsPath: normalizeJsPath
};