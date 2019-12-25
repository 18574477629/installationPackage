(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./browsers", "./dataManager", "./dataProvider", "./entry", "./colors", "./builtinData", "./dataProvider", "./dataManager"], factory);
    }
})(function (require, exports) {
    'use strict';
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    const browsers = require("./browsers");
    const dataManager_1 = require("./dataManager");
    const dataProvider_1 = require("./dataProvider");
    __export(require("./entry"));
    __export(require("./colors"));
    __export(require("./builtinData"));
    __export(require("./dataProvider"));
    __export(require("./dataManager"));
    exports.cssDataManager = new dataManager_1.CSSDataManager([
        new dataProvider_1.CSSDataProvider(browsers.cssData)
    ]);
});
