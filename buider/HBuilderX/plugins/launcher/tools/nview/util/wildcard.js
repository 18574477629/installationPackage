/**
 * 通配符转正则,仅wildcardStr时,返回RegExp对象,传入subject时,返回匹配结果(当wildcardStr解析失败,返回false)
 * *        通配所有
 * ?        通配单个字符
 * [0+]     通配数字
 * [a|b|c]  通配a或b或c
 * @param {Object} wildcardStr
 * @param {Object} subject
 */
module.exports = function(wildcardStr, subject) {
    if (!wildcardStr || typeof wildcardStr !== 'string') {
        return false;
    }

    var regex = false;
    var regexpStr = '';
    var len = wildcardStr.length;
    var pos = 0;
    var escapeChar = '\\';
    while (pos < len) {
        var ch = wildcardStr[pos];
        switch (ch) {
            case '\\':
                pos += 1;
                regexpStr += ch + (pos < len ? wildcardStr[pos] : '');
                break;
            case '$':
            case '(':
            case ')':
            case '+':
            case '.':
            case '/':
            case '^':
            case '|':
            case '{':
            case '}':
                regexpStr += escapeChar + ch;
                break;
            case '[':
                pos = parseBrackets(wildcardStr, pos);
                break;
            case ']':
                regexpStr += escapeChar + ch;
                break;
            case '*':
                regexpStr += '[\\s\\S]*';
                break;
            case '?':
                regexpStr += '[\\s\\S]';
                break;
            default:
                regexpStr += ch;
        }
        pos += 1;
    }

    function parseBrackets(str, start) {
        var pos = start + 1;
        var len = str.length;
        var matched = '';
        if (len > pos + 2 && (str[start] + str[pos] + str[pos + 1] + str[pos + 2]) === '[0+]') { //数字匹配
            regexpStr += '\\d+';
            return pos + 2;
        }
        while (pos < len) {
            var ch = str[pos];
            switch (ch) {
                case '\\':
                    pos += 1;
                    matched += ch + (pos < len ? str[pos] : '');
                    break;
                case '$':
                case '(':
                case ')':
                case '+':
                case '.':
                case '/':
                case '^':
                case '{':
                case '}':
                case '[':
                    matched += escapeChar + ch;
                    break;
                case ']':
                    if (matched === '') {
                        matched = escapeChar + ch;
                    } else {
                        regexpStr += '(' + matched + ')';
                    }
                    return pos;
                default:
                    matched += ch;
            }
            pos += 1;
        }
        return start + matched.length;
    }
    regexpStr = '^' + regexpStr + '$';
    try {
        regex = new RegExp(regexpStr);
    } catch (e) {
        console.error('$$'+e+'$$');
    }
    if (typeof subject === 'string') {
        if (subject) {
            return regex.test(subject);
        } else {
            return false;
        }
    }
    return regexpStr;
}