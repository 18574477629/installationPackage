/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var TokenType;
(function (TokenType) {
	TokenType[TokenType["Dollar"] = 0] = "Dollar";
	TokenType[TokenType["Colon"] = 1] = "Colon";
	TokenType[TokenType["CurlyOpen"] = 2] = "CurlyOpen";
	TokenType[TokenType["CurlyClose"] = 3] = "CurlyClose";
	TokenType[TokenType["Backslash"] = 4] = "Backslash";
	TokenType[TokenType["Int"] = 5] = "Int";
	TokenType[TokenType["VariableName"] = 6] = "VariableName";
	TokenType[TokenType["Format"] = 7] = "Format";
	TokenType[TokenType["EOF"] = 8] = "EOF";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
var Scanner = (function () {
	function Scanner() {
		this.text('');
	}
	Scanner.isDigitCharacter = function (ch) {
		return ch >= 48 /* Digit0 */ && ch <= 57 /* Digit9 */;
	};
	Scanner.isVariableCharacter = function (ch) {
		return ch === 95 /* Underline */
			|| (ch >= 97 /* a */ && ch <= 122 /* z */)
			|| (ch >= 65 /* A */ && ch <= 90 /* Z */);
	};
	Scanner.prototype.text = function (value) {
		this.value = value;
		this.pos = 0;
	};
	Scanner.prototype.tokenText = function (token) {
		return this.value.substr(token.pos, token.len);
	};
	Scanner.prototype.next = function () {
		if (this.pos >= this.value.length) {
			return { type: TokenType.EOF, pos: this.pos, len: 0 };
		}
		var pos = this.pos;
		var len = 0;
		var ch = this.value.charCodeAt(pos);
		var type;
		// static types
		type = Scanner._table[ch];
		if (typeof type === 'number') {
			this.pos += 1;
			return { type: type, pos: pos, len: 1 };
		}
		// number
		if (Scanner.isDigitCharacter(ch)) {
			type = TokenType.Int;
			do {
				len += 1;
				ch = this.value.charCodeAt(pos + len);
			} while (Scanner.isDigitCharacter(ch));
			this.pos += len;
			return { type: type, pos: pos, len: len };
		}
		// variable name
		if (Scanner.isVariableCharacter(ch)) {
			type = TokenType.VariableName;
			do {
				ch = this.value.charCodeAt(pos + (++len));
			} while (Scanner.isVariableCharacter(ch) || Scanner.isDigitCharacter(ch));
			this.pos += len;
			return { type: type, pos: pos, len: len };
		}
		// format
		type = TokenType.Format;
		do {
			len += 1;
			ch = this.value.charCodeAt(pos + len);
		} while (!isNaN(ch)
			&& typeof Scanner._table[ch] === 'undefined' // not static token
			&& !Scanner.isDigitCharacter(ch) // not number
			&& !Scanner.isVariableCharacter(ch) // not variable
		);
		this.pos += len;
		return { type: type, pos: pos, len: len };
	};
	return Scanner;
}());
Scanner._table = (_a = {},
	_a[36 /* DollarSign */] = TokenType.Dollar,
	_a[58 /* Colon */] = TokenType.Colon,
	_a[123 /* OpenCurlyBrace */] = TokenType.CurlyOpen,
	_a[125 /* CloseCurlyBrace */] = TokenType.CurlyClose,
	_a[92 /* Backslash */] = TokenType.Backslash,
	_a);
exports.Scanner = Scanner;
var Marker = (function () {
	function Marker() {
	}
	Marker.toString = function (marker) {
		var result = '';
		for (var _i = 0, marker_1 = marker; _i < marker_1.length; _i++) {
			var m = marker_1[_i];
			result += m.toString();
		}
		return result;
	};
	Marker.prototype.toString = function () {
		return '';
	};
	return Marker;
}());
exports.Marker = Marker;
var Text = (function (_super) {
	__extends(Text, _super);
	function Text(string) {
		var _this = _super.call(this) || this;
		_this.string = string;
		return _this;
	}
	Text.prototype.toString = function () {
		return this.string;
	};
	return Text;
}(Marker));
exports.Text = Text;
var Placeholder = (function (_super) {
	__extends(Placeholder, _super);
	function Placeholder(name, defaultValue) {
		if (name === void 0) { name = ''; }
		var _this = _super.call(this) || this;
		_this.name = name;
		_this.defaultValue = defaultValue;
		return _this;
	}
	Placeholder.prototype.toString = function () {
		return Marker.toString(this.defaultValue);
	};
	return Placeholder;
}(Marker));
exports.Placeholder = Placeholder;
var Variable = (function (_super) {
	__extends(Variable, _super);
	function Variable(name, defaultValue) {
		if (name === void 0) { name = ''; }
		var _this = _super.call(this) || this;
		_this.name = name;
		_this.defaultValue = defaultValue;
		return _this;
	}
	Object.defineProperty(Variable.prototype, "isDefined", {
		get: function () {
			return this.resolvedValue !== undefined;
		},
		enumerable: true,
		configurable: true
	});
	Variable.prototype.toString = function () {
		return this.isDefined ? this.resolvedValue : Marker.toString(this.defaultValue);
	};
	return Variable;
}(Marker));
exports.Variable = Variable;
var SnippetParser = (function () {
	function SnippetParser(enableTextMate, enableInternal) {
		if (enableTextMate === void 0) { enableTextMate = true; }
		if (enableInternal === void 0) { enableInternal = true; }
		this._scanner = new Scanner();
		this._enableTextMate = enableTextMate;
		this._enableInternal = enableInternal;
	}
	SnippetParser.prototype.escape = function (value) {
		return Marker.toString(this.parse(value));
	};
	SnippetParser.prototype.parse = function (value) {
		var marker = [];
		this._scanner.text(value);
		this._token = this._scanner.next();
		while (this._parseAny(marker) || this._parseText(marker)) {
			// nothing
		}
		// * fill in default for empty placeHolders
		// * compact sibling Text markers
		function compact(marker, placeholders) {
			for (var i = 0; i < marker.length; i++) {
				var thisMarker = marker[i];
				if (thisMarker instanceof Placeholder) {
					if (placeholders[thisMarker.name] === undefined) {
						placeholders[thisMarker.name] = thisMarker.defaultValue;
					}
					else if (thisMarker.defaultValue.length === 0) {
						thisMarker.defaultValue = placeholders[thisMarker.name].slice(0);
					}
					if (thisMarker.defaultValue.length > 0) {
						compact(thisMarker.defaultValue, placeholders);
					}
				}
				else if (thisMarker instanceof Variable) {
					compact(thisMarker.defaultValue, placeholders);
				}
				else if (i > 0 && thisMarker instanceof Text && marker[i - 1] instanceof Text) {
					marker[i - 1].string += marker[i].string;
					marker.splice(i, 1);
					i--;
				}
			}
		}
		compact(marker, Object.create(null));
		return marker;
	};
	SnippetParser.prototype._accept = function (type) {
		if (type === undefined || this._token.type === type) {
			this._prevToken = this._token;
			this._token = this._scanner.next();
			return true;
		}
		return false;
	};
	SnippetParser.prototype._return = function (token) {
		this._prevToken = undefined;
		this._token = token;
		this._scanner.pos = token.pos + token.len;
	};
	SnippetParser.prototype._parseAny = function (marker) {
		if (this._parseEscaped(marker)) {
			return true;
		}
		else if (this._enableInternal && this._parseInternal(marker)) {
			return true;
		}
		else if (this._enableTextMate && this._parseTM(marker)) {
			return true;
		}
		return false;
	};
	SnippetParser.prototype._parseText = function (marker) {
		if (this._token.type !== TokenType.EOF) {
			marker.push(new Text(this._scanner.tokenText(this._token)));
			this._accept(undefined);
			return true;
		}
		return false;
	};
	SnippetParser.prototype._parseTM = function (marker) {
		if (this._accept(TokenType.Dollar)) {
			if (this._accept(TokenType.VariableName) || this._accept(TokenType.Int)) {
				// $FOO, $123
				var idOrName = this._scanner.tokenText(this._prevToken);
				marker.push(/^\d+$/.test(idOrName) ? new Placeholder(idOrName, []) : new Variable(idOrName, []));
				return true;
			}
			else if (this._accept(TokenType.CurlyOpen)) {
				// ${name:children}
				var name_1 = [];
				var children = [];
				var target = name_1;
				while (true) {
					if (target !== children && this._accept(TokenType.Colon)) {
						target = children;
						continue;
					}
					if (this._accept(TokenType.CurlyClose)) {
						var idOrName = Marker.toString(name_1);
						marker.push(/^\d+$/.test(idOrName) ? new Placeholder(idOrName, children) : new Variable(idOrName, children));
						return true;
					}
					if (this._parseAny(target) || this._parseText(target)) {
						continue;
					}
					// fallback
					if (children.length > 0) {
						marker.push(new Text('${' + Marker.toString(name_1) + ':'));
						marker.push.apply(marker, children);
					}
					else {
						marker.push(new Text('${'));
						marker.push.apply(marker, name_1);
					}
					return true;
				}
			}
			marker.push(new Text('$'));
			return true;
		}
		return false;
	};
	SnippetParser.prototype._parseInternal = function (marker) {
		if (this._accept(TokenType.CurlyOpen)) {
			if (!this._accept(TokenType.CurlyOpen)) {
				this._return(this._prevToken);
				return false;
			}
			// {{name:children}}, {{name}}, {{name:}}
			var name_2 = [];
			var children = [];
			var target = name_2;
			while (true) {
				if (this._accept(TokenType.Colon)) {
					target = children;
					continue;
				}
				if (this._accept(TokenType.CurlyClose)) {
					if (!this._accept(TokenType.CurlyClose)) {
						this._return(this._prevToken);
						continue;
					}
					if (children !== target) {
						// we have not seen the colon which
						// means use the ident also as
						// default value
						children = name_2;
					}
					marker.push(new Placeholder(Marker.toString(name_2), children));
					return true;
				}
				if (this._parseAny(target) || this._parseText(target)) {
					continue;
				}
				// fallback
				if (children.length > 0) {
					marker.push(new Text('{{' + Marker.toString(name_2) + ':'));
					marker.push.apply(marker, children);
				}
				else {
					marker.push(new Text('{{'));
					marker.push.apply(marker, name_2);
				}
				return true;
			}
		}
		return false;
	};
	SnippetParser.prototype._parseEscaped = function (marker) {
		if (this._accept(TokenType.Backslash)) {
			if ((this._enableInternal && (this._accept(TokenType.CurlyOpen) || this._accept(TokenType.CurlyClose) || this._accept(TokenType.Backslash)))
				|| (this._enableTextMate && (this._accept(TokenType.Dollar) || this._accept(TokenType.CurlyClose) || this._accept(TokenType.Backslash)))) {
				// just consume them
			}
			marker.push(new Text(this._scanner.tokenText(this._prevToken)));
			return true;
		}
		return false;
	};
	return SnippetParser;
}());
exports.SnippetParser = SnippetParser;
var _a;
//# sourceMappingURL=snippetParser.js.map