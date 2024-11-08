"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Escaper = void 0;
var Escaper;
(function (Escaper) {
    Escaper.variable = function (str) {
        return Escaper.reserved(str) === false && /^[a-zA-Z_$][a-zA-Z_$0-9]*$/g.test(str);
    };
    Escaper.reserved = function (str) { return RESERVED.has(str); };
})(Escaper || (exports.Escaper = Escaper = {}));
var RESERVED = new Set([
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "enum",
    "export",
    "extends",
    "false",
    "finally",
    "for",
    "function",
    "if",
    "import",
    "in",
    "instanceof",
    "module",
    "new",
    "null",
    "package",
    "public",
    "private",
    "protected",
    "return",
    "super",
    "switch",
    "this",
    "throw",
    "true",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "with",
]);
//# sourceMappingURL=Escaper.js.map