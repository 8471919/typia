"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReflectMetadataTransformer = void 0;
var typescript_1 = __importDefault(require("typescript"));
var LiteralFactory_1 = require("../../../factories/LiteralFactory");
var MetadataCollection_1 = require("../../../factories/MetadataCollection");
var MetadataFactory_1 = require("../../../factories/MetadataFactory");
var TransformerError_1 = require("../../TransformerError");
var ReflectMetadataTransformer;
(function (ReflectMetadataTransformer) {
    ReflectMetadataTransformer.transform = function (project) {
        return function (expression) {
            var _a;
            if (!((_a = expression.typeArguments) === null || _a === void 0 ? void 0 : _a.length))
                throw new TransformerError_1.TransformerError({
                    code: "typia.reflect.metadata",
                    message: "no generic argument.",
                });
            // VALIDATE TUPLE ARGUMENTS
            var top = expression.typeArguments[0];
            if (!typescript_1.default.isTupleTypeNode(top))
                return expression;
            else if (top.elements.some(function (child) { return !typescript_1.default.isTypeNode(child); }))
                return expression;
            // GET TYPES
            var types = top.elements.map(function (child) {
                return project.checker.getTypeFromTypeNode(child);
            });
            if (types.some(function (t) { return t.isTypeParameter(); }))
                throw new TransformerError_1.TransformerError({
                    code: "typia.reflect.metadata",
                    message: "non-specified generic argument(s).",
                });
            // METADATA
            var collection = new MetadataCollection_1.MetadataCollection();
            var metadatas = types.map(function (type) {
                var result = MetadataFactory_1.MetadataFactory.analyze(project.checker, project.context)({
                    escape: true,
                    constant: true,
                    absorb: true,
                    functional: true,
                })(collection)(type);
                if (result.success === false)
                    throw TransformerError_1.TransformerError.from("typia.reflect.metadata")(result.errors);
                return result.data;
            });
            // CONVERT TO PRIMITIVE TYPE
            var app = {
                metadatas: metadatas.map(function (metadata) { return metadata.toJSON(); }),
                components: collection.toJSON(),
            };
            return LiteralFactory_1.LiteralFactory.generate(app);
        };
    };
})(ReflectMetadataTransformer || (exports.ReflectMetadataTransformer = ReflectMetadataTransformer = {}));
//# sourceMappingURL=ReflectMetadataTransformer.js.map