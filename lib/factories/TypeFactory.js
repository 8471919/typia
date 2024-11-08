"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeFactory = void 0;
var typescript_1 = __importDefault(require("typescript"));
var TypeFactory;
(function (TypeFactory) {
    TypeFactory.isFunction = function (type) {
        return TypeFactory.getFunction(type) !== null;
    };
    TypeFactory.getFunction = function (type) {
        var _a, _b;
        var node = (_b = (_a = type.symbol) === null || _a === void 0 ? void 0 : _a.declarations) === null || _b === void 0 ? void 0 : _b[0];
        if (node === undefined)
            return null;
        return typescript_1.default.isFunctionLike(node)
            ? node
            : typescript_1.default.isPropertyAssignment(node) || typescript_1.default.isPropertyDeclaration(node)
                ? typescript_1.default.isFunctionLike(node.initializer)
                    ? node.initializer
                    : null
                : null;
    };
    TypeFactory.getReturnType = function (checker) {
        return function (type) {
            return function (name) {
                // FIND TO-JSON METHOD
                var symbol = type.getProperty(name);
                if (!symbol)
                    return null;
                else if (!symbol.valueDeclaration)
                    return null;
                // GET FUNCTION DECLARATION
                var functor = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);
                // RETURNS THE RETURN-TYPE
                var signature = checker.getSignaturesOfType(functor, typescript_1.default.SignatureKind.Call)[0];
                return signature ? signature.getReturnType() : null;
            };
        };
    };
    TypeFactory.getFullName = function (checker) {
        return function (type, symbol) {
            var _a;
            // PRIMITIVE
            symbol !== null && symbol !== void 0 ? symbol : (symbol = (_a = type.aliasSymbol) !== null && _a !== void 0 ? _a : type.getSymbol());
            if (symbol === undefined)
                return checker.typeToString(type);
            // UNION OR INTERSECT
            if (type.aliasSymbol === undefined && type.isUnionOrIntersection()) {
                var joiner = type.isIntersection() ? " & " : " | ";
                return type.types
                    .map(function (child) { return TypeFactory.getFullName(checker)(child); })
                    .join(joiner);
            }
            //----
            // SPECIALIZATION
            //----
            var name = get_name(symbol);
            // CHECK GENERIC
            var generic = type.aliasSymbol
                ? type.aliasTypeArguments || []
                : checker.getTypeArguments(type);
            return generic.length
                ? name === "Promise"
                    ? TypeFactory.getFullName(checker)(generic[0])
                    : "".concat(name, "<").concat(generic
                        .map(function (child) { return TypeFactory.getFullName(checker)(child); })
                        .join(", "), ">")
                : name;
        };
    };
    var explore_name = function (decl) {
        return function (name) {
            return typescript_1.default.isModuleBlock(decl)
                ? explore_name(decl.parent.parent)("".concat(decl.parent.name.getFullText().trim(), ".").concat(name))
                : name;
        };
    };
    var get_name = function (symbol) {
        var _a, _b;
        var parent = (_b = (_a = symbol.getDeclarations()) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.parent;
        return parent
            ? explore_name(parent)(symbol.escapedName.toString())
            : "__type";
    };
    TypeFactory.keyword = function (type) {
        return typescript_1.default.factory.createKeywordTypeNode(type === "void"
            ? typescript_1.default.SyntaxKind.VoidKeyword
            : type === "any"
                ? typescript_1.default.SyntaxKind.AnyKeyword
                : type === "unknown"
                    ? typescript_1.default.SyntaxKind.UnknownKeyword
                    : type === "boolean"
                        ? typescript_1.default.SyntaxKind.BooleanKeyword
                        : type === "number"
                            ? typescript_1.default.SyntaxKind.NumberKeyword
                            : type === "bigint"
                                ? typescript_1.default.SyntaxKind.BigIntKeyword
                                : typescript_1.default.SyntaxKind.StringKeyword);
    };
})(TypeFactory || (exports.TypeFactory = TypeFactory = {}));
//# sourceMappingURL=TypeFactory.js.map