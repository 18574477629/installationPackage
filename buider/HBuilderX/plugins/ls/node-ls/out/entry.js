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
    exports.browserNames = {
        E: 'Edge',
        FF: 'Firefox',
        S: 'Safari',
        C: 'Chrome',
        IE: 'IE',
        O: 'Opera'
    };
    function getEntryStatus(status) {
        switch (status) {
            case 'experimental':
                return '⚠️ Property is experimental. Be cautious when using it.️\n\n';
            case 'nonstandard':
                return '🚨️ Property is nonstandard. Avoid using it.\n\n';
            case 'obsolete':
                return '🚨️️️ Property is obsolete. Avoid using it.\n\n';
            default:
                return '';
        }
    }
    function getEntryDescription(entry) {
        if (!entry.description || entry.description === '') {
            return null;
        }
        let result = '';
        if (entry.status) {
            result += getEntryStatus(entry.status);
        }
        result += entry.description;
        const browserLabel = getBrowserLabel(entry.browsers);
        if (browserLabel) {
            result += '\n(' + browserLabel + ')';
        }
        if ('syntax' in entry) {
            result += `\n\nSyntax: ${entry.syntax}`;
        }
        return result;
    }
    exports.getEntryDescription = getEntryDescription;
    function getBrowserLabel(browsers) {
        if (!browsers || browsers.length === 0) {
            return null;
        }
        return browsers
            .map(b => {
            let result = '';
            const matches = b.match(/([A-Z]+)(\d+)?/);
            const name = matches[1];
            const version = matches[2];
            if (name in exports.browserNames) {
                result += exports.browserNames[name];
            }
            if (version) {
                result += ' ' + version;
            }
            return result;
        })
            .join(', ');
    }
    exports.getBrowserLabel = getBrowserLabel;
});
