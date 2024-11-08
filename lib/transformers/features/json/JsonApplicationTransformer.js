"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonApplicationTransformer = void 0;
var typescript_1 = __importDefault(require("typescript"));
var LiteralFactory_1 = require("../../../factories/LiteralFactory");
var MetadataCollection_1 = require("../../../factories/MetadataCollection");
var MetadataFactory_1 = require("../../../factories/MetadataFactory");
var JsonApplicationProgrammer_1 = require("../../../programmers/json/JsonApplicationProgrammer");
var TransformerError_1 = require("../../TransformerError");
var JsonApplicationTransformer;
(function (JsonApplicationTransformer) {
    JsonApplicationTransformer.transform = function (project) {
        return function (expression) {
            var e_1, _a;
            var _b;
            if (!((_b = expression.typeArguments) === null || _b === void 0 ? void 0 : _b.length))
                throw new TransformerError_1.TransformerError({
                    code: "typia.json.application",
                    message: "no generic argument.",
                });
            //----
            // GET ARGUMENTS
            //----
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
                    code: "typia.json.application",
                    message: "non-specified generic argument(s).",
                });
            // ADDITIONAL PARAMETERS
            var version = get_parameter({
                checker: project.checker,
                name: "Version",
                is: function (str) { return str === "3.0" || str === "3.1"; },
                cast: function (str) { return str; },
                default: function () { return "3.1"; },
            })(expression.typeArguments[1]);
            //----
            // GENERATORS
            //----
            // METADATA
            var collection = new MetadataCollection_1.MetadataCollection({
                replace: MetadataCollection_1.MetadataCollection.replace,
            });
            var results = types.map(function (type) {
                return MetadataFactory_1.MetadataFactory.analyze(project.checker, project.context)({
                    escape: true,
                    constant: true,
                    absorb: false,
                    validate: JsonApplicationProgrammer_1.JsonApplicationProgrammer.validate,
                })(collection)(type);
            });
            // REPORT BUG IF REQUIRED
            var metadatas = [];
            var errors = [];
            try {
                for (var results_1 = __values(results), results_1_1 = results_1.next(); !results_1_1.done; results_1_1 = results_1.next()) {
                    var r = results_1_1.value;
                    if (r.success === false)
                        errors.push.apply(errors, __spreadArray([], __read(r.errors), false));
                    else
                        metadatas.push(r.data);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (results_1_1 && !results_1_1.done && (_a = results_1.return)) _a.call(results_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (errors.length)
                throw TransformerError_1.TransformerError.from("typia.json.application")(errors);
            // APPLICATION
            var app = JsonApplicationProgrammer_1.JsonApplicationProgrammer.write(version)(metadatas);
            return LiteralFactory_1.LiteralFactory.generate(app);
        };
    };
    var get_parameter = function (props) {
        return function (node) {
            if (!node)
                return props.default();
            // CHECK LITERAL TYPE
            var type = props.checker.getTypeFromTypeNode(node);
            if (!type.isLiteral() &&
                (type.getFlags() & typescript_1.default.TypeFlags.BooleanLiteral) === 0)
                throw new TransformerError_1.TransformerError({
                    code: "typia.json.application",
                    message: "generic argument \"".concat(props.name, "\" must be constant."),
                });
            // GET VALUE AND VALIDATE IT
            var value = type.isLiteral()
                ? type.value
                : props.checker.typeToString(type);
            if (typeof value !== "string" || props.is(value) === false)
                throw new TransformerError_1.TransformerError({
                    code: "typia.json.application",
                    message: "invalid value on generic argument \"".concat(props.name, "\"."),
                });
            return props.cast(value);
        };
    };
})(JsonApplicationTransformer || (exports.JsonApplicationTransformer = JsonApplicationTransformer = {}));
//# sourceMappingURL=JsonApplicationTransformer.js.map