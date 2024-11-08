"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericTransformer = void 0;
var typescript_1 = __importDefault(require("typescript"));
var TransformerError_1 = require("../TransformerError");
var GenericTransformer;
(function (GenericTransformer) {
    GenericTransformer.scalar = function (method) {
        return function (programmer) {
            return function (project) {
                return function (modulo) {
                    return function (expression) {
                        // CHECK PARAMETER
                        if (expression.arguments.length === 0)
                            throw new TransformerError_1.TransformerError({
                                code: "typia.".concat(method),
                                message: "no input value.",
                            });
                        // GET TYPE INFO
                        var _a = __read(expression.typeArguments && expression.typeArguments[0]
                            ? [
                                project.checker.getTypeFromTypeNode(expression.typeArguments[0]),
                                expression.typeArguments[0],
                                true,
                            ]
                            : [
                                project.checker.getTypeAtLocation(expression.arguments[0]),
                                expression.arguments[0],
                                false,
                            ], 3), type = _a[0], node = _a[1], generic = _a[2];
                        if (type.isTypeParameter())
                            throw new TransformerError_1.TransformerError({
                                code: "typia.".concat(method),
                                message: "non-specified generic argument.",
                            });
                        // DO TRANSFORM
                        return typescript_1.default.factory.createCallExpression(programmer(project)(modulo)(type, generic
                            ? node.getFullText().trim()
                            : name(project.checker)(type)(node)), undefined, expression.arguments);
                    };
                };
            };
        };
    };
    GenericTransformer.factory = function (method) {
        return function (programmer) {
            return function (project) {
                return function (modulo) {
                    return function (expression) {
                        var _a;
                        // CHECK GENERIC ARGUMENT EXISTENCE
                        if (!((_a = expression.typeArguments) === null || _a === void 0 ? void 0 : _a[0]))
                            throw new TransformerError_1.TransformerError({
                                code: "typia.".concat(method),
                                message: "generic argument is not specified.",
                            });
                        // GET TYPE INFO
                        var node = expression.typeArguments[0];
                        var type = project.checker.getTypeFromTypeNode(node);
                        if (type.isTypeParameter())
                            throw new TransformerError_1.TransformerError({
                                code: "typia.".concat(method),
                                message: "non-specified generic argument.",
                            });
                        // DO TRANSFORM
                        return programmer(project)(modulo)(type, node.getFullText().trim(), expression.arguments[0]);
                    };
                };
            };
        };
    };
    var name = function (checker) {
        return function (type) {
            return function (node) {
                return checker.typeToString(type, node, typescript_1.default.TypeFormatFlags.NodeBuilderFlagsMask);
            };
        };
    };
})(GenericTransformer || (exports.GenericTransformer = GenericTransformer = {}));
//# sourceMappingURL=GenericTransformer.js.map