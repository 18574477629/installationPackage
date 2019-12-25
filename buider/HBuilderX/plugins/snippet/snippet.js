/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
var range_1 = require('./core/range');
var snippetParser_1 = require('./snippetParser');
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var CodeSnippet = (function () {
	function CodeSnippet() {
		this.lines = [];
		this.placeHolders = [];
		this.finishPlaceHolderIndex = -1;
	}
	CodeSnippet.fromTextmate = function (template, variableResolver) {
		var marker = new snippetParser_1.SnippetParser(true, false).parse(template);
		var snippet = new CodeSnippet();
		_resolveSnippetVariables(marker, variableResolver);
		_fillCodeSnippetFromMarker(snippet, marker);
		return snippet;
	};
	CodeSnippet.fromInternal = function (template) {
		var marker = new snippetParser_1.SnippetParser(false, true).parse(template);
		var snippet = new CodeSnippet();
		_fillCodeSnippetFromMarker(snippet, marker);
		return snippet;
	};
	CodeSnippet.none = function (template) {
		var snippet = new CodeSnippet();
		snippet.lines = template.split(/\r\n|\n|\r/);
		return snippet;
	};
	CodeSnippet.fromEmmet = function (template) {
		var matchFinalStops = template.match(/\$\{0\}|\$0/g);
		if (!matchFinalStops || matchFinalStops.length === 1) {
			return CodeSnippet.fromTextmate(template);
		}
		// Emmet sometimes returns snippets with multiple ${0}
		// In such cases, replace ${0} with incremental tab stops
		var snippetMarkers = new snippetParser_1.SnippetParser(true, false).parse(template) || [];
		var getMaxTabStop = function (markers) {
			var currentMaxTabStop = -1;
			markers.forEach(function (marker) {
				if (marker instanceof snippetParser_1.Placeholder && /^\d+$/.test(marker['name'])) {
					var currentTabStop = Number(marker['name']);
					var nestedMaxTabStop = getMaxTabStop(marker['defaultValue'] || []);
					currentMaxTabStop = Math.max(currentMaxTabStop, currentTabStop, nestedMaxTabStop);
				}
			});
			return currentMaxTabStop;
		};
		var maxTabStop = getMaxTabStop(snippetMarkers);
		var setNextTabStop = function (markers) {
			markers.forEach(function (marker) {
				if (marker instanceof snippetParser_1.Placeholder) {
					if (marker['name'] === '0') {
						marker['name'] = ++maxTabStop + '';
					}
					setNextTabStop(marker['defaultValue'] || []);
				}
			});
		};
		setNextTabStop(snippetMarkers);
		var snippet = new CodeSnippet();
		_fillCodeSnippetFromMarker(snippet, snippetMarkers);
		return snippet;
	};
	Object.defineProperty(CodeSnippet.prototype, "isInsertOnly", {
		get: function () {
			return this.placeHolders.length === 0;
		},
		enumerable: true,
		configurable: true
	});
	Object.defineProperty(CodeSnippet.prototype, "isSingleTabstopOnly", {
		get: function () {
			if (this.placeHolders.length !== 1) {
				return false;
			}
			var placeHolder = this.placeHolders[0];
			if (placeHolder.value !== '' || placeHolder.occurences.length !== 1) {
				return false;
			}
			var placeHolderRange = placeHolder.occurences[0];
			if (!range_1.Range.isEmpty(placeHolderRange)) {
				return false;
			}
			return true;
		},
		enumerable: true,
		configurable: true
	});
	//CodeSnippet.prototype.extractLineIndentation = function (str, maxColumn) {
	//    if (maxColumn === void 0) { maxColumn = Number.MAX_VALUE; }
	//    var fullIndentation = strings.getLeadingWhitespace(str);
	//    if (fullIndentation.length > maxColumn - 1) {
	//        return fullIndentation.substring(0, maxColumn - 1);
	//    }
	//    return fullIndentation;
	//};
	CodeSnippet.prototype.bind = function (referenceLine, deltaLine, firstLineDeltaColumn, config) {
		var resultLines = [];
		var resultPlaceHolders = [];
		var referenceIndentation = this.extractLineIndentation(referenceLine, firstLineDeltaColumn + 1);
		// Compute resultLines & keep deltaColumns as a reference for adjusting placeholders
		var deltaColumns = [];
		for (var i = 0, len = this.lines.length; i < len; i++) {
			var originalLine = this.lines[i];
			if (i === 0) {
				deltaColumns[i + 1] = firstLineDeltaColumn;
				resultLines[i] = originalLine;
			}
			else {
				var originalLineIndentation = this.extractLineIndentation(originalLine);
				var remainingLine = originalLine.substr(originalLineIndentation.length);
				var indentation = config.normalizeIndentation(referenceIndentation + originalLineIndentation);
				deltaColumns[i + 1] = indentation.length - originalLineIndentation.length;
				resultLines[i] = indentation + remainingLine;
			}
		}
		// Compute resultPlaceHolders
		for (var _i = 0, _a = this.placeHolders; _i < _a.length; _i++) {
			var originalPlaceHolder = _a[_i];
			var resultOccurences = [];
			for (var _b = 0, _c = originalPlaceHolder.occurences; _b < _c.length; _b++) {
				var _d = _c[_b], startLineNumber = _d.startLineNumber, startColumn = _d.startColumn, endLineNumber = _d.endLineNumber, endColumn = _d.endColumn;
				if (startColumn > 1 || startLineNumber === 1) {
					// placeholders that aren't at the beginning of new snippet lines
					// will be moved by how many characters the indentation has been
					// adjusted
					startColumn = startColumn + deltaColumns[startLineNumber];
					endColumn = endColumn + deltaColumns[endLineNumber];
				}
				else {
					// placeholders at the beginning of new snippet lines
					// will be indented by the reference indentation
					startColumn += referenceIndentation.length;
					endColumn += referenceIndentation.length;
				}
				resultOccurences.push({
					startLineNumber: startLineNumber + deltaLine,
					startColumn: startColumn,
					endLineNumber: endLineNumber + deltaLine,
					endColumn: endColumn,
				});
			}
			resultPlaceHolders.push({
				id: originalPlaceHolder.id,
				value: originalPlaceHolder.value,
				occurences: resultOccurences
			});
		}
		return {
			lines: resultLines,
			placeHolders: resultPlaceHolders,
			finishPlaceHolderIndex: this.finishPlaceHolderIndex
		};
	};
	return CodeSnippet;
}());
exports.CodeSnippet = CodeSnippet;
function _resolveSnippetVariables(marker, resolver) {
	if (resolver) {
		var stack = marker.slice();
		while (stack.length > 0) {
			var marker_1 = stack.shift();
			if (marker_1 instanceof snippetParser_1.Variable) {
				try {
					marker_1.resolvedValue = resolver.resolve(marker_1.name);
				}
				catch (e) {
					//
				}
				if (marker_1.isDefined) {
					continue;
				}
			}
			if (marker_1 instanceof snippetParser_1.Variable || marker_1 instanceof snippetParser_1.Placeholder) {
				// 'recurse'
				stack.unshift.apply(stack, marker_1.defaultValue);
			}
		}
	}
}
function _isFinishPlaceHolder(v) {
	return (v.id === '' && v.value === '') || v.id === '0';
}
function _fillCodeSnippetFromMarker(snippet, marker) {
	var placeHolders = Object.create(null);
	var hasFinishPlaceHolder = false;
	var stack = marker.slice();
	snippet.lines = [''];
	while (stack.length > 0) {
		var marker_2 = stack.shift();
		if (marker_2 instanceof snippetParser_1.Text) {
			// simple text
			var lines = marker_2.string.split(/\r\n|\n|\r/);
			snippet.lines[snippet.lines.length - 1] += lines.shift();
			(_a = snippet.lines).push.apply(_a, lines);
		}
		else if (marker_2 instanceof snippetParser_1.Placeholder) {
			var placeHolder = placeHolders[marker_2.name];
			if (!placeHolder) {
				placeHolders[marker_2.name] = placeHolder = {
					id: marker_2.name,
					value: snippetParser_1.Marker.toString(marker_2.defaultValue),
					occurences: []
				};
				snippet.placeHolders.push(placeHolder);
			}
			hasFinishPlaceHolder = hasFinishPlaceHolder || _isFinishPlaceHolder(placeHolder);
			var line = snippet.lines.length;
			var column = snippet.lines[line - 1].length + 1;
			placeHolder.occurences.push(new range_1.Range(line, column, line, column + snippetParser_1.Marker.toString(marker_2.defaultValue).length // TODO multiline placeholders!
			));
			stack.unshift.apply(stack, marker_2.defaultValue);
		}
		else if (marker_2 instanceof snippetParser_1.Variable) {
			if (!marker_2.isDefined) {
				// contine as placeholder
				// THIS is because of us having falsy
				// advertised ${foo} as placeholder syntax
				stack.unshift(new snippetParser_1.Placeholder(marker_2.name, marker_2.defaultValue.length === 0
					? [new snippetParser_1.Text(marker_2.name)]
					: marker_2.defaultValue));
			}
			else if (marker_2.resolvedValue) {
				// contine with the value
				stack.unshift(new snippetParser_1.Text(marker_2.resolvedValue));
			}
			else {
				// continue with default values
				stack.unshift.apply(stack, marker_2.defaultValue);
			}
		}
		if (stack.length === 0 && !hasFinishPlaceHolder) {
			stack.push(new snippetParser_1.Placeholder('0', []));
		}
	}
	// Named variables (e.g. {greeting} and {greeting:Hello}) are sorted first, followed by
	// tab-stops and numeric variables (e.g. $1, $2, ${3:foo}) which are sorted in ascending order
	snippet.placeHolders.sort(function (a, b) {
		var nonIntegerId = function (v) { return !(/^\d+$/).test(v.id); };
		// Sort finish placeholder last
		if (_isFinishPlaceHolder(a)) {
			return 1;
		}
		else if (_isFinishPlaceHolder(b)) {
			return -1;
		}
		// Sort named placeholders first
		if (nonIntegerId(a) && nonIntegerId(b)) {
			return 0;
		}
		else if (nonIntegerId(a)) {
			return -1;
		}
		else if (nonIntegerId(b)) {
			return 1;
		}
		if (a.id === b.id) {
			return 0;
		}
		return Number(a.id) < Number(b.id) ? -1 : 1;
	});
	if (snippet.placeHolders.length > 0) {
		snippet.finishPlaceHolderIndex = snippet.placeHolders.length - 1;
		snippet.placeHolders[snippet.finishPlaceHolderIndex].id = '';
	}
	var _a;
}
//# sourceMappingURL=snippet.js.map