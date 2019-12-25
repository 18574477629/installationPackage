(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "vscode-languageserver-types"], factory);
    }
})(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    const vscode_languageserver_types_1 = require("vscode-languageserver-types");
    exports.Range = vscode_languageserver_types_1.Range;
    exports.TextEdit = vscode_languageserver_types_1.TextEdit;
    exports.Position = vscode_languageserver_types_1.Position;
});
