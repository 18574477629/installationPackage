var path = require('path');
var fs = require('fs-extra');
module.exports = function (env, appid, sitemapCode, utilCode, nviewCode, pagesCode, toPath) {

  var templateConfigStr = fs.readFileSync(path.join(global.__dirname, './template/__wap2appconfig.js'), 'utf-8');

  templateConfigStr = templateConfigStr.replace('/*{sitemap}*/', function () {
    return sitemapCode;
  });
  templateConfigStr = templateConfigStr.replace('/*{util}*/', function () {
    return utilCode;
  });
  templateConfigStr = templateConfigStr.replace('/*{nviews}*/', function () {
    return nviewCode;
  });
  templateConfigStr = templateConfigStr.replace('/*{pages}*/', function () {
    return pagesCode;
  });
  templateConfigStr = templateConfigStr.replace('/*{appid}*/', function () {
    return appid;
  });
  //var addSourceMap = (env !== 'production' ? '\n//# sourceMappingURL=__wap2appconfig.js.map\n' : '');
  var addSourceMap = '';
  fs.outputFileSync(path.join(toPath, '__wap2appconfig.js'), templateConfigStr + addSourceMap, {
    override: true
  });
};