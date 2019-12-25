var path = require('path');
var fs = require('fs-extra');
var glob = require('glob');
var strip = require('strip-json-comments');

var util = require('../util/util');
var parseRequire = require('./parseRequire');

module.exports = function (projectPath) {
  var manifestStr = fs.readFileSync(path.join(projectPath, './manifest.json'), 'utf8');
  var matches = manifestStr.match(/\"id\"\s*[:]\s*\"(.*)\"/);
  var appid = false;
  if (matches && matches.length === 2) {
    appid = matches[1];
  } else {
    throw new Error('$$未检测到manifest.json中的appid$$');
  }
  var config = JSON.parse(strip(fs.readFileSync(path.join(projectPath, './sitemap.json'), 'utf8')));
  var appendJsPaths = [];
  var pagePaths = ['app.js'];

  if (config.global && config.global.webviewParameter && config.global.webviewParameter.appendJs) {
    config.global.webviewParameter.appendJs = config.global.webviewParameter.appendJs.trim();
    if (fs.pathExistsSync(path.join(projectPath, util.normalizeJsPath(config.global.webviewParameter.appendJs)))) {
      appendJsPaths.push(util.normalizeJsPath(config.global.webviewParameter.appendJs));
    }
  }

  var pages = config.pages;
  if (pages) {
    for (var i = 0; i < pages.length; i++) {
      var page = pages[i];
      if (fs.pathExistsSync(path.join(projectPath, util.normalizeJsPath(page.webviewId)))) {
        pagePaths.push(util.normalizeJsPath(page.webviewId));
      }
      if (page.webviewParameter && page.webviewParameter.appendJs) {
        page.webviewParameter.appendJs = page.webviewParameter.appendJs.trim();
        if (fs.pathExistsSync(path.join(projectPath, util.normalizeJsPath(page.webviewParameter.appendJs)))) {
          appendJsPaths.push(util.normalizeJsPath(page.webviewParameter.appendJs));
        }
      }
    }
  }
  appendJsPaths = Array.from(new Set(appendJsPaths));
  pagePaths = Array.from(new Set(pagePaths));

  var utilPaths = [];
  if (pagePaths.length) {
    for (var i = 0; i < pagePaths.length; i++) {
      var pagePath = path.join(projectPath, util.normalizeJsPath(pagePaths[i]));
      if (fs.pathExistsSync(pagePath)) {
        var requirePaths = parseRequire(pagePath, projectPath);
        utilPaths = utilPaths.concat(requirePaths);
      }
    }
  }
  var nviewPaths = glob.sync('**/*.nview', {
    nodir: true,
    cwd: projectPath,
    ignore: ['./node_modules/**/*']
  });

  if (nviewPaths.length) {
    for (var i = 0; i < nviewPaths.length; i++) {
      var nviewPath = path.join(projectPath, nviewPaths[i]);
      if (fs.pathExistsSync(nviewPath)) {
        var requirePaths = parseRequire(nviewPath, projectPath);
        utilPaths = utilPaths.concat(requirePaths);
      }
    }
  }

  utilPaths = Array.from(new Set(utilPaths));

  return {
    appid: appid,
    pagePaths: pagePaths,
    utilPaths: utilPaths,
    nviewPaths: nviewPaths,
    appendJsPaths: appendJsPaths
  };
};