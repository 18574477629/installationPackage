var path = require('path');
var fs = require('fs-extra');
var argv = require('yargs').argv;
var babel = require("babel-core");
var glob = require('glob');

var esprima = require('esprima');
var SourceMapGenerator = require('source-map').SourceMapGenerator;
var SourceMapConsumer = require('source-map').SourceMapConsumer;

var util = require('./util/util');
var generate = require('./compile/wap2appconfig');
var parseSitemap = require('./compile/sitemap');
var parseResource = require('./compile/parseResource');
var parseNView = require('./compile/nview');
var page = require('./plugin/page');
global.__dirname = __dirname;

process.on('uncaughtException', function (err) {
  if (err) {
    var matches = err.toString().match(/\$\$([\s\S]*)\$\$/);
    if (matches && matches.length === 2) {
      console.log(matches[1]);
    } else {
      console.log(err.stack);
    }
  }
  process.exit(1);
});

var __old_compile__ = function (projectPath, curFile, toPath) {
  var oldNViewCompile = require('./compile/nview.old.js');
  var excludePaths = [];
  var compilePaths = [];
  if (curFile && curFile !== 'null') {
    if (~curFile.indexOf('.nview')) {
      var curPath = util.normalizePath(path.relative(projectPath, curFile));
      excludePaths.push(curPath);
      compilePaths.push(curPath + '.js');
      oldNViewCompile(projectPath, curFile, path.join(toPath, curPath + '.js'));
    }
  } else {
    excludePaths = glob.sync('**/*.nview', {
      nodir: true,
      cwd: projectPath,
      ignore: ['./node_modules/**/*']
    });
    for (var i = 0; i < excludePaths.length; i++) {
      curFile = util.normalizePath(path.join(projectPath, excludePaths[i]));
      compilePaths.push(excludePaths[i] + '.js');
      oldNViewCompile(projectPath, curFile, path.join(toPath, excludePaths[i] + '.js'));
    }
  }
  compilePaths.push('sitemap.json');
  console.log(JSON.stringify({
    exclude: excludePaths,
    compile: compilePaths
  }));
};
var __createAppendJsSourceMap__ = function (projectPath, appendJs) {
  var appendJsGenerator = new SourceMapGenerator({
    file: appendJs,
    sourceRoot: ''
  });
  var tokens = esprima.tokenize(fs.readFileSync(path.join(projectPath, appendJs), 'utf-8'), {
    loc: true
  });

  tokens.forEach(function (token) {
    var loc = token.loc.start;
    appendJsGenerator.addMapping({
      source: appendJs,
      original: loc,
      generated: loc
    });
  });
  return appendJsGenerator;
};
var __createSourceMapByMap__ = function (lineno, generator, map) {
//console.log('mapping:' + lineno);
  map = new SourceMapConsumer(map);
  map.eachMapping(function (m) {
    if (m.generatedLine > 2) { //临时解决nview的sourcemap不准确的问题
      m.generatedLine = m.generatedLine - 2;
    }
    generator.addMapping({
      source: m.source,
      original: {
        line: m.originalLine,
        column: m.originalColumn
      },
      generated: {
        line: m.generatedLine + (lineno || 0),
        column: m.generatedColumn
      }
    });
    //  console.log({
    //    source: m.source,
    //    original: {
    //      line: m.originalLine,
    //      column: m.originalColumn
    //    },
    //    generated: {
    //      line: m.generatedLine + (lineno || 0),
    //      column: m.generatedColumn
    //    }
    //  });
  });
};
var __createSourceMap__ = function (lineno, generator, mapping, oriLinenoOffset) {
  //console.log('mapping[' + mapping.source + ']:' + lineno);
  mapping.tokens.forEach(function (token) {
    var loc = token.loc.start;
    generator.addMapping({
      source: mapping.source,
      original: {
        line: loc.line + (oriLinenoOffset || 0),
        column: loc.column
      },
      generated: {
        line: loc.line + (lineno || 0),
        column: loc.column
      }
    });
  });
  return mapping.tokens[mapping.tokens.length - 1].loc.start.line;
}
var __compile__ = function (projectPath, curFile, toPath, env) {
  //console.log(toPath);
  if (!fs.pathExistsSync(path.join(projectPath, 'app.js'))) { //旧版本,不包含app.js
    var config = parseSitemap(projectPath, true);
    if (config) {
      fs.outputFileSync(path.join(toPath, 'sitemap.json'), JSON.stringify(config), {
        override: true
      });
    }
    __old_compile__(projectPath, curFile, toPath);
    return;
  }
  if (!fs.pathExistsSync(path.join(projectPath, './sitemap.json'))) { //非新版本wap2app项目
    return;
  }
  var config = parseSitemap(projectPath);

  fs.outputFileSync(path.join(toPath, 'sitemap.json'), JSON.stringify(config), {
    override: true
  });

  var lineno = 13;
  var sitemapCode = '';
  var utilCodes = [];
  var nviewCodes = [];
  var pageCodes = [];

  var resource = parseResource(projectPath);

  var appid = resource.appid;
  var pagePaths = resource.pagePaths;
  var utilPaths = resource.utilPaths;
  var nviewPaths = resource.nviewPaths;
  var appendJsPaths = resource.appendJsPaths;

  var defineCode = fs.readFileSync(path.join(global.__dirname, './template/define.js'), 'utf-8');
  var options = {
    file: '__wap2appconfig.js',
    sourceRoot: ''
  };

  var generator = env !== 'production' ? new SourceMapGenerator(options) : false;
  /**
   * 生成sitemap代码
   */
  sitemapCode = 'window.__wap2app_sitemap = ' + JSON.stringify(config) + ';';
  //console.log('..................util.....' + lineno);
  /**
   * 生成util模块代码
   */
  if (utilPaths && utilPaths.length) {
    for (var i = 0; i < utilPaths.length; i++) {
      var module = utilPaths[i];
      var code = fs.readFileSync(path.join(projectPath, module), 'utf-8');
      utilCodes.push(defineCode.replace('/*{MODULE}*/', module).replace('/*{CODE}*/', function () {
        if (generator) {
          lineno = lineno + 1; //define start
          //        console.log('util[' + module + ']:' + lineno);
          __createSourceMap__(lineno, generator, {
            source: module,
            tokens: esprima.tokenize(code, {
              loc: true
            })
          });
          lineno = lineno + code.split(/(?:\r\n|\r|\n)/g).length;
          lineno = lineno + 1; //define end
        }
        return code;
      }));
    }
  } else {
    lineno = lineno + 1;
  }

  lineno = lineno + 2;
  //console.log('..................nview.....' + lineno);
  /**
   * 生成nview模块代码
   */
  if (nviewPaths && nviewPaths.length) {
    for (var i = 0; i < nviewPaths.length; i++) {
      var module = nviewPaths[i];
      var nviewStr = fs.readFileSync(path.join(projectPath, module), 'utf-8');
      var res = parseNView(nviewStr, generator, module);
      var code = res.code;
      var map = res.map;
      if (code) {
        nviewCodes.push(defineCode.replace('/*{MODULE}*/', module).replace('/*{CODE}*/', function () {
          if (map) {
            lineno = lineno + 1; //define start
            __createSourceMapByMap__(lineno, generator, map);
            lineno = lineno + code.split(/(?:\r\n|\r|\n)/g).length;
            lineno = lineno + 1; //define end
          }
          return code;
        }));
      }
    }
  } else {
    lineno = lineno + 1;
  }
  lineno = lineno + 2;
  //console.log('..................app.....' + lineno);
  /**
   * 生成app及页面模块代码
   */
  if (pagePaths && pagePaths.length) {
    for (var i = 0; i < pagePaths.length; i++) {
      var module = pagePaths[i];
      var isPage = module !== 'app.js';
      var code = fs.readFileSync(path.join(projectPath, module), 'utf-8');
      if (isPage) {
        var result = babel.transform(code, {
          plugins: [
            [page, {
              module: module
            }]
          ]
        });
        if (result && result.code) {
          code = result.code;
        }
      }
      pageCodes.push(defineCode.replace('/*{MODULE}*/', module).replace('/*{CODE}*/', function () {
        if (generator) {
          lineno = lineno + 1; //define start
          //        console.log('page[' + module + ']:' + lineno);
          __createSourceMap__(lineno, generator, {
            source: module,
            tokens: esprima.tokenize(code, {
              loc: true
            })
          });
          lineno = lineno + code.split(/(?:\r\n|\r|\n)/g).length;
          lineno = lineno + 1; //define end
        }
        return code;
      }) + '\nrequire("' + module + '");');
      lineno = lineno + 1; //require end
    }
  }
  generate(env, appid, sitemapCode, utilCodes.join('\n'), nviewCodes.join('\n'), pageCodes.join('\n'), toPath);
  if (generator) {
    var sourceMap = ['__wap2appconfig.js.map'];
    //  if (appendJsPaths.length) {
    //    appendJsPaths.forEach(function (appendJs) {
    //      var appendJsSourceMap = __createAppendJsSourceMap__(projectPath, appendJs);
    //      fs.outputFileSync(path.join(toPath, appendJs + '.map'), appendJsSourceMap.toString(), {
    //        override: true
    //      });
    //      sourceMap.push(appendJs + '.map');
    //    });
    //  }
    fs.outputFileSync(path.join(toPath, '__wap2appconfig.js.map'), generator.toString(), {
      override: true
    });
    console.log(JSON.stringify({
      exclude: pagePaths.concat(utilPaths).concat(nviewPaths),
      compile: ['__wap2appconfig.js', 'sitemap.json'],
      sourceMap: sourceMap
    }));
  } else {
    console.log(JSON.stringify({
      exclude: pagePaths.concat(utilPaths).concat(nviewPaths),
      compile: ['__wap2appconfig.js', 'sitemap.json'],
      sourceMap: []
    }));
  }
};
//if (process.argv.length === 5) {
//__compile__(process.argv[2], process.argv[3], process.argv[4]);
//} else {
//throw new Error('$$参数不正确$$');
//}
if (process.argv.length === 6) {
  __compile__(process.argv[2], process.argv[3], process.argv[4], process.argv[5]);
} else {
  throw new Error('$$参数不正确$$');
}