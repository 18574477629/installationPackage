(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    class CSSDataProvider {
        constructor(data) {
            this._properties = [];
            this._atDirectives = [];
            this._pseudoClasses = [];
            this._pseudoElements = [];
            this.addData(data);
        }
        provideProperties() {
            return this._properties;
        }
        provideAtDirectives() {
            return this._atDirectives;
        }
        providePseudoClasses() {
            return this._pseudoClasses;
        }
        providePseudoElements() {
            return this._pseudoElements;
        }
        addData(data) {
            if (data.properties) {
                this._properties = this._properties.concat(data.properties);
            }
            if (data.atDirectives) {
                this._atDirectives = this._atDirectives.concat(data.atDirectives);
            }
            if (data.pseudoClasses) {
                this._pseudoClasses = this._pseudoClasses.concat(data.pseudoClasses);
            }
            if (data.pseudoElements) {
                this._pseudoElements = this._pseudoElements.concat(data.pseudoElements);
            }
        }
    }
    exports.CSSDataProvider = CSSDataProvider;
});
