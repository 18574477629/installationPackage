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
    function findFirst(array, p) {
        let low = 0, high = array.length;
        if (high === 0) {
            return 0;
        }
        while (low < high) {
            let mid = Math.floor((low + high) / 2);
            if (p(array[mid])) {
                high = mid;
            }
            else {
                low = mid + 1;
            }
        }
        return low;
    }
    exports.findFirst = findFirst;
    function includes(array, item) {
        return array.indexOf(item) !== -1;
    }
    exports.includes = includes;
    function union(...arrays) {
        const result = [];
        for (const array of arrays) {
            for (const item of array) {
                if (!includes(result, item)) {
                    result.push(item);
                }
            }
        }
        return result;
    }
    exports.union = union;
});
