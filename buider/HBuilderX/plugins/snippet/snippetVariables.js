/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var SnippetVariablesResolver = (function () {
	function SnippetVariablesResolver() { }
	SnippetVariablesResolver.prototype.resolve = function (name) {
		switch (name) {
			case 'SELECTION':
			case 'TM_SELECTED_TEXT': return this._tmSelectedText();
			case 'TM_CURRENT_LINE': return this._tmCurrentLine();
			case 'TM_CURRENT_WORD': return this._tmCurrentWord();
			case 'TM_LINE_INDEX': return this._tmLineIndex();
			case 'TM_LINE_NUMBER': return this._tmLineNumber();
			case 'TM_FILENAME': return this._tmFilename();
			case 'TM_DIRECTORY': return this._tmDirectory();
			case 'TM_FILEPATH': return this._tmFilepath();
		}
		return undefined;
	};
	SnippetVariablesResolver.prototype._tmCurrentLine = function () {
		return "todo_tmCurrentLine";
	};
	SnippetVariablesResolver.prototype._tmCurrentWord = function () {
		return "todo_tmCurrentWord";
	};
	SnippetVariablesResolver.prototype._tmFilename = function () {
		return "todo_tmFilename";
	};
	SnippetVariablesResolver.prototype._tmDirectory = function () {
		return "todo_tmDirectory";
	};
	SnippetVariablesResolver.prototype._tmFilepath = function () {
		return "todo_tmFilepath";
	};
	SnippetVariablesResolver.prototype._tmLineIndex = function () {
		return "todo_tmLineIndex";
	};
	SnippetVariablesResolver.prototype._tmLineNumber = function () {
		return "todo_tmLineNumber";
	};
	SnippetVariablesResolver.prototype._tmSelectedText = function () {
		return "todo_tmSelectedText";
	};
	return SnippetVariablesResolver;
}());
exports.SnippetVariablesResolver = SnippetVariablesResolver;
//# sourceMappingURL=snippetVariables.js.map