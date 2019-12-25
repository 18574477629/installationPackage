/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", "vs/base/common/arrays", "vs/platform/contextkey/common/contextkey", "vs/editor/common/core/editOperation", "vs/editor/common/core/range", "vs/editor/common/core/selection", "vs/editor/common/editorCommon", "vs/editor/common/editorCommonExtensions", "vs/base/common/lifecycle", "./snippet", "./snippetVariables", "vs/editor/common/editorContextKeys", "vs/editor/common/core/position"], function (require, exports, arrays_1, contextkey_1, editOperation_1, range_1, selection_1, editorCommon, editorCommonExtensions_1, lifecycle_1, snippet_1, snippetVariables_1, editorContextKeys_1, position_1) {
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    var InsertSnippetController = (function () {
        function InsertSnippetController(editor, adaptedSnippet, startLineNumber, initialAlternativeVersionId, onStop) {
            this.editor = editor;
            this._onStop = onStop;
            this.model = editor.getModel();
            this.finishPlaceHolderIndex = adaptedSnippet.finishPlaceHolderIndex;
            this.trackedPlaceHolders = [];
            this.placeHolderDecorations = [];
            this.currentPlaceHolderIndex = 0;
            this.highlightDecorationId = null;
            this.isFinished = false;
            this._initialAlternativeVersionId = initialAlternativeVersionId;
            this.initialize(adaptedSnippet, startLineNumber);
        }
        InsertSnippetController.prototype.dispose = function () {
            this.stopAll();
        };
        InsertSnippetController.prototype.initialize = function (adaptedSnippet, startLineNumber) {
            var _this = this;
            // sorted list of all placeholder occurences for subsequent lockups
            var sortedOccurrences = [];
            for (var _i = 0, _a = adaptedSnippet.placeHolders; _i < _a.length; _i++) {
                var occurences = _a[_i].occurences;
                for (var _b = 0, occurences_1 = occurences; _b < occurences_1.length; _b++) {
                    var range = occurences_1[_b];
                    sortedOccurrences.push(range);
                }
            }
            sortedOccurrences.sort(range_1.Range.compareRangesUsingStarts);
            // track each occurence
            this.model.changeDecorations(function (changeAccessor) {
                for (var i = 0; i < adaptedSnippet.placeHolders.length; i++) {
                    var occurences = adaptedSnippet.placeHolders[i].occurences;
                    var trackedRanges = [];
                    for (var _i = 0, occurences_2 = occurences; _i < occurences_2.length; _i++) {
                        var range = occurences_2[_i];
                        var stickiness = editorCommon.TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges;
                        if (i === adaptedSnippet.finishPlaceHolderIndex) {
                            // final tab stop decoration never grows
                            stickiness = editorCommon.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges;
                        }
                        else {
                            // Check if the previous range ends exactly where this range starts
                            // and iff so change the stickiness to avoid conflicts
                            var idx = arrays_1.binarySearch(sortedOccurrences, range, range_1.Range.compareRangesUsingStarts);
                            if (idx > 0
                                && sortedOccurrences[idx - 1].endLineNumber === range.startLineNumber
                                && sortedOccurrences[idx - 1].endColumn === range.startColumn) {
                                stickiness = editorCommon.TrackedRangeStickiness.GrowsOnlyWhenTypingAfter;
                            }
                        }
                        trackedRanges.push(changeAccessor.addDecoration(range, {
                            stickiness: stickiness
                        }));
                    }
                    _this.trackedPlaceHolders.push({
                        ranges: trackedRanges
                    });
                }
            });
            this.editor.changeDecorations(function (changeAccessor) {
                var newDecorations = [];
                var endLineNumber = startLineNumber + adaptedSnippet.lines.length - 1;
                var endLineNumberMaxColumn = _this.model.getLineMaxColumn(endLineNumber);
                newDecorations.push({
                    range: new range_1.Range(startLineNumber, 1, endLineNumber, endLineNumberMaxColumn),
                    options: {
                        className: 'new-snippet',
                        isWholeLine: true
                    }
                });
                for (var i = 0, len = _this.trackedPlaceHolders.length; i < len; i++) {
                    var className = (i === _this.finishPlaceHolderIndex) ? 'finish-snippet-placeholder' : 'snippet-placeholder';
                    newDecorations.push({
                        range: _this.model.getDecorationRange(_this.trackedPlaceHolders[i].ranges[0]),
                        options: {
                            stickiness: _this.model.getDecorationOptions(_this.trackedPlaceHolders[i].ranges[0]).stickiness,
                            className: className
                        }
                    });
                }
                var decorations = changeAccessor.deltaDecorations([], newDecorations);
                _this.highlightDecorationId = decorations[0];
                _this.placeHolderDecorations = decorations.slice(1);
            });
            // let print = () => {
            // 	console.log('trackedPlaceHolders: ' + this.trackedPlaceHolders.map((placeholder, index) => 'placeHolder index ' + index + ': ' + placeholder.ranges.map(id => id + '(' + this.model.getDecorationRange(id) + ')').join(', ')).join('\n'));
            // 	console.log('highlightDecoration: ' + this.highlightDecorationId + '(' + this.model.getDecorationRange(this.highlightDecorationId) + ')');
            // 	console.log('placeHolderDecorations: ' + this.placeHolderDecorations.map(id => id + '(' + this.model.getDecorationRange(id) + ')').join(', '));
            // };
            // print();
            var _highlightRange = this.model.getDecorationRange(this.highlightDecorationId);
            this.listenersToRemove = [];
            this.listenersToRemove.push(this.editor.onDidChangeModelContent(function (e) {
                // console.log('-------MODEL CHANGED');
                // print();
                if (_this.isFinished) {
                    return;
                }
                if (e.isFlush) {
                    // a model.setValue() was called
                    _this.stopAll();
                    return;
                }
                var newAlternateVersionId = _this.editor.getModel().getAlternativeVersionId();
                if (_this._initialAlternativeVersionId === newAlternateVersionId) {
                    // We executed undo until we reached the same version we started with
                    _this.stopAll();
                    return;
                }
                for (var i = 0, len = e.changes.length; i < len; i++) {
                    var change = e.changes[i];
                    var intersection = _highlightRange.intersectRanges(change.range);
                    if (intersection === null) {
                        // Did an edit outside of the snippet
                        _this.stopAll();
                        return;
                    }
                }
                // Keep the highlightRange for the next round of model change events
                _highlightRange = _this.model.getDecorationRange(_this.highlightDecorationId);
            }));
            this.listenersToRemove.push(this.editor.onDidChangeCursorPosition(function (e) {
                if (_this.isFinished) {
                    return;
                }
                var highlightRange = _this.model.getDecorationRange(_this.highlightDecorationId);
                if (!highlightRange) {
                    _this.stopAll();
                    return;
                }
                var lineNumber = e.position.lineNumber;
                if (lineNumber < highlightRange.startLineNumber || lineNumber > highlightRange.endLineNumber) {
                    _this.stopAll();
                }
            }));
            this.listenersToRemove.push(this.editor.onDidChangeModel(function () {
                _this.stopAll();
            }));
            var blurTimeout = -1;
            this.listenersToRemove.push(this.editor.onDidBlurEditor(function () {
                // Blur if within 100ms we do not focus back
                blurTimeout = setTimeout(function () {
                    _this.stopAll();
                }, 100);
            }));
            this.listenersToRemove.push(this.editor.onDidFocusEditor(function () {
                // Cancel the blur timeout (if any)
                if (blurTimeout !== -1) {
                    clearTimeout(blurTimeout);
                    blurTimeout = -1;
                }
            }));
            this.listenersToRemove.push(this.model.onDidChangeDecorations(function (e) {
                if (_this.isFinished) {
                    return;
                }
                var modelEditableRange = _this.model.getEditableRange(), previousRange = null, allCollapsed = true, allEqualToEditableRange = true;
                for (var i = 0; (allCollapsed || allEqualToEditableRange) && i < _this.trackedPlaceHolders.length; i++) {
                    var ranges = _this.trackedPlaceHolders[i].ranges;
                    for (var j = 0; (allCollapsed || allEqualToEditableRange) && j < ranges.length; j++) {
                        var range = _this.model.getDecorationRange(ranges[j]);
                        if (allCollapsed) {
                            if (!range.isEmpty()) {
                                allCollapsed = false;
                            }
                            else if (previousRange === null) {
                                previousRange = range;
                            }
                            else if (!previousRange.equalsRange(range)) {
                                allCollapsed = false;
                            }
                        }
                        if (allEqualToEditableRange && !modelEditableRange.equalsRange(range)) {
                            allEqualToEditableRange = false;
                        }
                    }
                }
                if (allCollapsed || allEqualToEditableRange) {
                    _this.stopAll();
                }
                else {
                    if (_this.finishPlaceHolderIndex !== -1) {
                        var finishPlaceHolderDecorationId = _this.placeHolderDecorations[_this.finishPlaceHolderIndex];
                        var finishPlaceHolderRange = _this.model.getDecorationRange(finishPlaceHolderDecorationId);
                        var finishPlaceHolderOptions = _this.model.getDecorationOptions(finishPlaceHolderDecorationId);
                        var finishPlaceHolderRangeIsEmpty = finishPlaceHolderRange.isEmpty();
                        var finishPlaceHolderClassNameIsForEmpty = (finishPlaceHolderOptions.className === 'finish-snippet-placeholder');
                        // Remember xor? :)
                        var needsChanging = Number(finishPlaceHolderRangeIsEmpty) ^ Number(finishPlaceHolderClassNameIsForEmpty);
                        if (needsChanging) {
                            _this.editor.changeDecorations(function (changeAccessor) {
                                var className = finishPlaceHolderRangeIsEmpty ? 'finish-snippet-placeholder' : 'snippet-placeholder';
                                changeAccessor.changeDecorationOptions(finishPlaceHolderDecorationId, {
                                    className: className
                                });
                            });
                        }
                    }
                }
            }));
            this.doLinkEditing();
        };
        InsertSnippetController.prototype.onNextPlaceHolder = function () {
            return this.changePlaceHolder(true);
        };
        InsertSnippetController.prototype.onPrevPlaceHolder = function () {
            return this.changePlaceHolder(false);
        };
        InsertSnippetController.prototype.changePlaceHolder = function (goToNext) {
            if (this.isFinished) {
                return false;
            }
            var oldPlaceHolderIndex = this.currentPlaceHolderIndex;
            var oldRange = this.model.getDecorationRange(this.trackedPlaceHolders[oldPlaceHolderIndex].ranges[0]);
            var sameRange = true;
            do {
                if (goToNext) {
                    this.currentPlaceHolderIndex = (this.currentPlaceHolderIndex + 1) % this.trackedPlaceHolders.length;
                }
                else {
                    this.currentPlaceHolderIndex = (this.trackedPlaceHolders.length + this.currentPlaceHolderIndex - 1) % this.trackedPlaceHolders.length;
                }
                var newRange = this.model.getDecorationRange(this.trackedPlaceHolders[this.currentPlaceHolderIndex].ranges[0]);
                sameRange = oldRange.equalsRange(newRange);
            } while (this.currentPlaceHolderIndex !== oldPlaceHolderIndex && sameRange);
            this.doLinkEditing();
            return true;
        };
        InsertSnippetController.prototype.onAccept = function () {
            if (this.isFinished) {
                return false;
            }
            if (this.finishPlaceHolderIndex !== -1) {
                var finishRange = this.model.getDecorationRange(this.trackedPlaceHolders[this.finishPlaceHolderIndex].ranges[0]);
                // Let's just position cursor at the end of the finish range
                this.editor.setPosition({
                    lineNumber: finishRange.endLineNumber,
                    column: finishRange.endColumn
                });
            }
            this.stopAll();
            return true;
        };
        InsertSnippetController.prototype.onEscape = function () {
            if (this.isFinished) {
                return false;
            }
            this.stopAll();
            // Cancel multi-cursor
            this.editor.setSelections([this.editor.getSelections()[0]]);
            return true;
        };
        InsertSnippetController.prototype.doLinkEditing = function () {
            var selections = [];
            for (var i = 0, len = this.trackedPlaceHolders[this.currentPlaceHolderIndex].ranges.length; i < len; i++) {
                var range = this.model.getDecorationRange(this.trackedPlaceHolders[this.currentPlaceHolderIndex].ranges[i]);
                selections.push(new selection_1.Selection(range.startLineNumber, range.startColumn, range.endLineNumber, range.endColumn));
            }
            this.editor.setSelections(selections);
            this.editor.revealRangeInCenterIfOutsideViewport(this.editor.getSelection());
        };
        InsertSnippetController.prototype.stopAll = function () {
            var _this = this;
            if (this.isFinished) {
                return;
            }
            this.isFinished = true;
            this._onStop();
            this.listenersToRemove = lifecycle_1.dispose(this.listenersToRemove);
            this.model.changeDecorations(function (changeAccessor) {
                for (var i = 0; i < _this.trackedPlaceHolders.length; i++) {
                    var ranges = _this.trackedPlaceHolders[i].ranges;
                    for (var j = 0; j < ranges.length; j++) {
                        changeAccessor.removeDecoration(ranges[j]);
                    }
                }
            });
            this.trackedPlaceHolders = [];
            this.editor.changeDecorations(function (changeAccessor) {
                var toRemove = [];
                toRemove.push(_this.highlightDecorationId);
                for (var i = 0; i < _this.placeHolderDecorations.length; i++) {
                    toRemove.push(_this.placeHolderDecorations[i]);
                }
                changeAccessor.deltaDecorations(toRemove, []);
                _this.placeHolderDecorations = [];
                _this.highlightDecorationId = null;
            });
        };
        return InsertSnippetController;
    }());
    exports.InsertSnippetController = InsertSnippetController;
    var BeforeAfterData = (function () {
        function BeforeAfterData(_model, _contentBefore, _contentAfter, overwriteBefore, overwriteAfter) {
            this._model = _model;
            this._contentBefore = _contentBefore;
            this._contentAfter = _contentAfter;
            this.overwriteBefore = overwriteBefore;
            this.overwriteAfter = overwriteAfter;
            //
        }
        BeforeAfterData.create = function (model, selection, overwriteBefore, overwriteAfter) {
            var contentBefore = '';
            if (overwriteBefore > 0) {
                contentBefore = model.getLineContent(selection.startLineNumber).substring(selection.startColumn - 1 - overwriteBefore, selection.startColumn - 1);
            }
            var contentAfter = '';
            if (overwriteAfter > 0) {
                contentAfter = model.getLineContent(selection.endLineNumber).substring(selection.endColumn - 1, selection.endColumn - 1 + overwriteAfter);
            }
            return new BeforeAfterData(model, contentBefore, contentAfter, overwriteBefore, overwriteAfter);
        };
        BeforeAfterData.prototype.next = function (selection) {
            var data = BeforeAfterData.create(this._model, selection, this.overwriteBefore, this.overwriteAfter);
            var overwriteBefore = data.overwriteBefore, overwriteAfter = data.overwriteAfter;
            if (data._contentBefore !== this._contentBefore) {
                overwriteBefore = 0;
            }
            if (data._contentAfter !== this._contentAfter) {
                overwriteAfter = 0;
            }
            return new BeforeAfterData(this._model, null, null, overwriteBefore, overwriteAfter);
        };
        return BeforeAfterData;
    }());
    var SnippetController = SnippetController_1 = (function () {
        function SnippetController(editor, contextKeyService) {
            this._editor = editor;
            this._variableResolver = new snippetVariables_1.SnippetVariablesResolver(editor);
            this._currentController = null;
            this._inSnippetMode = exports.CONTEXT_SNIPPET_MODE.bindTo(contextKeyService);
        }
        SnippetController.get = function (editor) {
            return editor.getContribution(SnippetController_1.ID);
        };
        SnippetController.prototype.dispose = function () {
            if (this._currentController) {
                this._currentController.dispose();
                this._currentController = null;
            }
        };
        SnippetController.prototype.getId = function () {
            return SnippetController_1.ID;
        };
        SnippetController.prototype.insertSnippet = function (template, overwriteBefore, overwriteAfter) {
            var snippet = snippet_1.CodeSnippet.fromTextmate(template, this._variableResolver);
            this.run(snippet, overwriteBefore, overwriteAfter);
        };
        SnippetController.prototype.run = function (snippet, overwriteBefore, overwriteAfter) {
            var _this = this;
            this._runAndRestoreController(function () {
                if (snippet.isInsertOnly || snippet.isSingleTabstopOnly) {
                    // Only inserts text, not placeholders, tabstops etc
                    // Only cursor endposition
                    _this._runForAllSelections(snippet, overwriteBefore, overwriteAfter);
                }
                else {
                    var prepared = SnippetController_1._prepareSnippet(_this._editor, _this._editor.getSelection(), snippet, overwriteBefore, overwriteAfter);
                    _this._runPreparedSnippetForPrimarySelection(prepared, true);
                }
            });
        };
        /**
         * Inserts once `snippet` at the start of `replaceRange`, after deleting `replaceRange`.
         */
        SnippetController.prototype.runWithReplaceRange = function (snippet, replaceRange) {
            var _this = this;
            this._runAndRestoreController(function () {
                _this._runPreparedSnippetForPrimarySelection({
                    typeRange: replaceRange,
                    adaptedSnippet: SnippetController_1._getAdaptedSnippet(_this._editor.getModel(), snippet, replaceRange)
                }, false);
            });
        };
        SnippetController.prototype._runAndRestoreController = function (callback) {
            var prevController = this._currentController;
            this._currentController = null;
            callback();
            if (!this._currentController) {
                // we didn't end up in snippet mode again => restore previous controller
                this._currentController = prevController;
            }
            else {
                // we ended up in snippet mode => dispose previous controller if necessary
                if (prevController) {
                    prevController.dispose();
                }
            }
        };
        SnippetController._addCommandForSnippet = function (model, adaptedSnippet, typeRange, out) {
            var insertText = adaptedSnippet.lines.join('\n');
            var currentText = model.getValueInRange(typeRange, editorCommon.EndOfLinePreference.LF);
            if (insertText !== currentText) {
                out.push(editOperation_1.EditOperation.replaceMove(typeRange, insertText));
            }
        };
        SnippetController.prototype._runPreparedSnippetForPrimarySelection = function (prepared, undoStops) {
            var _this = this;
            var initialAlternativeVersionId = this._editor.getModel().getAlternativeVersionId();
            var edits = [];
            SnippetController_1._addCommandForSnippet(this._editor.getModel(), prepared.adaptedSnippet, prepared.typeRange, edits);
            if (edits.length > 0) {
                if (undoStops) {
                    this._editor.pushUndoStop();
                }
                this._editor.executeEdits('editor.contrib.insertSnippetHelper', edits);
                if (undoStops) {
                    this._editor.pushUndoStop();
                }
            }
            var cursorOnly = SnippetController_1._getSnippetCursorOnly(prepared.adaptedSnippet);
            if (cursorOnly) {
                this._editor.setSelection(new selection_1.Selection(cursorOnly.lineNumber, cursorOnly.column, cursorOnly.lineNumber, cursorOnly.column));
            }
            else if (prepared.adaptedSnippet.placeHolders.length > 0) {
                this._inSnippetMode.set(true);
                this._currentController = new InsertSnippetController(this._editor, prepared.adaptedSnippet, prepared.typeRange.startLineNumber, initialAlternativeVersionId, function () {
                    _this._inSnippetMode.reset();
                    if (_this._currentController) {
                        _this._currentController.dispose();
                        _this._currentController = null;
                    }
                });
            }
        };
        SnippetController.prototype._runForAllSelections = function (snippet, overwriteBefore, overwriteAfter) {
            var edits = [];
            var selections = this._editor.getSelections();
            var model = this._editor.getModel();
            var primaryBeforeAfter = BeforeAfterData.create(model, selections[0], overwriteBefore, overwriteAfter);
            var totalDelta = 0;
            var newSelections = [];
            // sort selections by start position but remember where
            // each selection came from
            var selectionEntries = selections
                .map(function (selection, i) { return ({ selection: selection, i: i }); })
                .sort(function (a, b) { return range_1.Range.compareRangesUsingStarts(a.selection, b.selection); });
            for (var _i = 0, selectionEntries_1 = selectionEntries; _i < selectionEntries_1.length; _i++) {
                var _a = selectionEntries_1[_i], selection = _a.selection, i = _a.i;
                // only use overwrite[Before|After] for secondary cursors
                // when the same text as with the primary cursor is selected
                var beforeAfter = i !== 0 ? primaryBeforeAfter.next(selection) : primaryBeforeAfter;
                var _b = SnippetController_1._prepareSnippet(this._editor, selection, snippet, beforeAfter.overwriteBefore, beforeAfter.overwriteAfter), adaptedSnippet = _b.adaptedSnippet, typeRange = _b.typeRange;
                SnippetController_1._addCommandForSnippet(this._editor.getModel(), adaptedSnippet, typeRange, edits);
                // compute new selection offset
                // * get current offset
                // * get length of snippet that we insert
                // * get final cursor position of snippet that we insert (might not exist)
                // * NEW selection offset is current + final cursor pos + inserts_until_here
                var offset = model.getOffsetAt(typeRange.getStartPosition());
                // inserts until here
                offset += totalDelta;
                // each snippet has a different length (because of whitespace changes)
                var snippetLength = (adaptedSnippet.lines.length - 1) * model.getEOL().length;
                for (var _c = 0, _d = adaptedSnippet.lines; _c < _d.length; _c++) {
                    var line = _d[_c];
                    snippetLength += line.length;
                }
                // each snippet has a different cursor offset
                var finalCursorPos = SnippetController_1._getSnippetCursorOnly(adaptedSnippet);
                if (finalCursorPos) {
                    var finalCursorOffset = void 0;
                    if (finalCursorPos.lineNumber === typeRange.startLineNumber) {
                        finalCursorOffset = finalCursorPos.column - typeRange.startColumn;
                    }
                    else {
                        finalCursorOffset = finalCursorPos.column - 1;
                        for (var i_1 = 0, lineNumber = typeRange.startLineNumber; lineNumber < finalCursorPos.lineNumber; i_1++, lineNumber++) {
                            finalCursorOffset += adaptedSnippet.lines[i_1].length + model.getEOL().length;
                        }
                    }
                    offset += finalCursorOffset;
                }
                else {
                    offset += snippetLength;
                }
                newSelections.push({ offset: offset, i: i });
                totalDelta += (snippetLength - model.getValueLengthInRange(typeRange));
            }
            if (edits.length === 0) {
                return;
            }
            var cursorStateComputer = function () {
                // create new selections from the new selection offsets
                // and restore the order we had at the beginning
                var result = [];
                for (var _i = 0, newSelections_1 = newSelections; _i < newSelections_1.length; _i++) {
                    var _a = newSelections_1[_i], offset = _a.offset, i = _a.i;
                    var pos = model.getPositionAt(offset);
                    result[i] = new selection_1.Selection(pos.lineNumber, pos.column, pos.lineNumber, pos.column);
                }
                return result;
            };
            model.pushStackElement();
            this._editor.setSelections(model.pushEditOperations(selections, edits, cursorStateComputer));
            model.pushStackElement();
        };
        SnippetController._prepareSnippet = function (editor, selection, snippet, overwriteBefore, overwriteAfter) {
            var model = editor.getModel();
            var typeRange = SnippetController_1._getTypeRangeForSelection(model, selection, overwriteBefore, overwriteAfter);
            var adaptedSnippet = SnippetController_1._getAdaptedSnippet(model, snippet, typeRange);
            return { typeRange: typeRange, adaptedSnippet: adaptedSnippet };
        };
        SnippetController._getTypeRangeForSelection = function (model, selection, overwriteBefore, overwriteAfter) {
            var typeRange;
            if (overwriteBefore || overwriteAfter) {
                typeRange = model.validateRange(range_1.Range.plusRange(selection, {
                    startLineNumber: selection.positionLineNumber,
                    startColumn: selection.positionColumn - overwriteBefore,
                    endLineNumber: selection.positionLineNumber,
                    endColumn: selection.positionColumn + overwriteAfter
                }));
            }
            else {
                typeRange = selection;
            }
            return typeRange;
        };
        SnippetController._getAdaptedSnippet = function (model, snippet, typeRange) {
            return snippet.bind(model.getLineContent(typeRange.startLineNumber), typeRange.startLineNumber - 1, typeRange.startColumn - 1, model);
        };
        SnippetController._getSnippetCursorOnly = function (snippet) {
            if (snippet.placeHolders.length !== 1) {
                return null;
            }
            var placeHolder = snippet.placeHolders[0];
            if (placeHolder.value !== '' || placeHolder.occurences.length !== 1) {
                return null;
            }
            var placeHolderRange = placeHolder.occurences[0];
            if (!range_1.Range.isEmpty(placeHolderRange)) {
                return null;
            }
            return new position_1.Position(placeHolderRange.startLineNumber, placeHolderRange.startColumn);
        };
        SnippetController.prototype.jumpToNextPlaceholder = function () {
            if (this._currentController) {
                this._currentController.onNextPlaceHolder();
            }
        };
        SnippetController.prototype.jumpToPrevPlaceholder = function () {
            if (this._currentController) {
                this._currentController.onPrevPlaceHolder();
            }
        };
        SnippetController.prototype.acceptSnippet = function () {
            if (this._currentController) {
                this._currentController.onAccept();
            }
        };
        SnippetController.prototype.leaveSnippet = function () {
            if (this._currentController) {
                this._currentController.onEscape();
            }
        };
        return SnippetController;
    }());
    SnippetController.ID = 'editor.contrib.snippetController';
    SnippetController = SnippetController_1 = __decorate([
        editorCommonExtensions_1.commonEditorContribution,
        __param(1, contextkey_1.IContextKeyService)
    ], SnippetController);
    exports.SnippetController = SnippetController;
    exports.CONTEXT_SNIPPET_MODE = new contextkey_1.RawContextKey('inSnippetMode', false);
    var SnippetCommand = editorCommonExtensions_1.EditorCommand.bindToContribution(SnippetController.get);
    editorCommonExtensions_1.CommonEditorRegistry.registerEditorCommand(new SnippetCommand({
        id: 'jumpToNextSnippetPlaceholder',
        precondition: exports.CONTEXT_SNIPPET_MODE,
        handler: function (x) { return x.jumpToNextPlaceholder(); },
        kbOpts: {
            weight: editorCommonExtensions_1.CommonEditorRegistry.commandWeight(30),
            kbExpr: editorContextKeys_1.EditorContextKeys.textFocus,
            primary: 2 /* Tab */
        }
    }));
    editorCommonExtensions_1.CommonEditorRegistry.registerEditorCommand(new SnippetCommand({
        id: 'jumpToPrevSnippetPlaceholder',
        precondition: exports.CONTEXT_SNIPPET_MODE,
        handler: function (x) { return x.jumpToPrevPlaceholder(); },
        kbOpts: {
            weight: editorCommonExtensions_1.CommonEditorRegistry.commandWeight(30),
            kbExpr: editorContextKeys_1.EditorContextKeys.textFocus,
            primary: 1024 /* Shift */ | 2 /* Tab */
        }
    }));
    editorCommonExtensions_1.CommonEditorRegistry.registerEditorCommand(new SnippetCommand({
        id: 'acceptSnippet',
        precondition: exports.CONTEXT_SNIPPET_MODE,
        handler: function (x) { return x.acceptSnippet(); },
        kbOpts: {
            weight: editorCommonExtensions_1.CommonEditorRegistry.commandWeight(30),
            kbExpr: editorContextKeys_1.EditorContextKeys.textFocus,
            primary: 3 /* Enter */
        }
    }));
    editorCommonExtensions_1.CommonEditorRegistry.registerEditorCommand(new SnippetCommand({
        id: 'leaveSnippet',
        precondition: exports.CONTEXT_SNIPPET_MODE,
        handler: function (x) { return x.leaveSnippet(); },
        kbOpts: {
            weight: editorCommonExtensions_1.CommonEditorRegistry.commandWeight(30),
            kbExpr: editorContextKeys_1.EditorContextKeys.textFocus,
            primary: 9 /* Escape */,
            secondary: [1024 /* Shift */ | 9 /* Escape */]
        }
    }));
    var SnippetController_1;
});
//# sourceMappingURL=snippetController.js.map