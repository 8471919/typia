"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.FeatureProgrammer = void 0;
var typescript_1 = __importDefault(require("typescript"));
var IdentifierFactory_1 = require("../factories/IdentifierFactory");
var StatementFactory_1 = require("../factories/StatementFactory");
var TypeFactory_1 = require("../factories/TypeFactory");
var ValueFactory_1 = require("../factories/ValueFactory");
var UnionExplorer_1 = require("./helpers/UnionExplorer");
var feature_object_entries_1 = require("./internal/feature_object_entries");
var FeatureProgrammer;
(function (FeatureProgrammer) {
    FeatureProgrammer.compose = function (props) {
        var _a, _b, _c, _d, _e, _f;
        var _g = __read(props.config.initializer(props.project)(props.importer)(props.type), 2), collection = _g[0], meta = _g[1];
        return {
            body: props.config.decoder()(ValueFactory_1.ValueFactory.INPUT(), meta, {
                tracable: props.config.path || props.config.trace,
                source: "top",
                from: "top",
                postfix: '""',
            }),
            statements: props.config.addition
                ? props.config.addition(collection)
                : [],
            functions: __assign(__assign(__assign(__assign({}, Object.fromEntries(((_c = (_b = (_a = props.config.generator).objects) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : FeatureProgrammer.write_object_functions(props.config)(props.importer))(collection).map(function (v, i) { return ["".concat(props.config.prefix, "o").concat(i), v]; }))), Object.fromEntries(((_f = (_e = (_d = props.config.generator).unions) === null || _e === void 0 ? void 0 : _e.call(_d)) !== null && _f !== void 0 ? _f : FeatureProgrammer.write_union_functions(props.config))(collection).map(function (v, i) { return ["".concat(props.config.prefix, "u").concat(i), v]; }))), Object.fromEntries(props.config.generator
                .arrays()(collection)
                .map(function (v, i) { return ["".concat(props.config.prefix, "a").concat(i), v]; }))), Object.fromEntries(props.config.generator
                .tuples()(collection)
                .map(function (v, i) { return ["".concat(props.config.prefix, "t").concat(i), v]; }))),
            parameters: FeatureProgrammer.parameterDeclarations(props.config)(props.config.types.input(props.type, props.name))(ValueFactory_1.ValueFactory.INPUT()),
            response: props.config.types.output(props.type, props.name),
        };
    };
    FeatureProgrammer.writeDecomposed = function (props) {
        return typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createArrowFunction(undefined, undefined, [], undefined, undefined, typescript_1.default.factory.createBlock(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], __read(props.importer.declare(props.modulo)), false), __read(Object.entries(props.result.functions)
            .filter(function (_a) {
            var _b = __read(_a, 1), k = _b[0];
            return props.importer.hasLocal(k);
        })
            .map(function (_a) {
            var _b = __read(_a, 2), _k = _b[0], v = _b[1];
            return v;
        })), false), __read(props.result.statements), false), [
            typescript_1.default.factory.createReturnStatement(props.result.arrow),
        ], false))), undefined, undefined);
    };
    FeatureProgrammer.write = function (project) {
        return function (config) {
            return function (importer) {
                return function (type, name) {
                    var _a, _b, _c, _d, _e, _f, _g;
                    var _h = __read(config.initializer(project)(importer)(type), 2), collection = _h[0], meta = _h[1];
                    // ITERATE OVER ALL METADATA
                    var output = config.decoder()(ValueFactory_1.ValueFactory.INPUT(), meta, {
                        tracable: config.path || config.trace,
                        source: "top",
                        from: "top",
                        postfix: '""',
                    });
                    // RETURNS THE OPTIMAL ARROW FUNCTION
                    var functions = {
                        objects: ((_c = (_b = (_a = config.generator).objects) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : FeatureProgrammer.write_object_functions(config)(importer))(collection),
                        unions: ((_f = (_e = (_d = config.generator).unions) === null || _e === void 0 ? void 0 : _e.call(_d)) !== null && _f !== void 0 ? _f : FeatureProgrammer.write_union_functions(config))(collection),
                        arrays: config.generator.arrays()(collection),
                        tuples: config.generator.tuples()(collection),
                    };
                    var added = ((_g = config.addition) !== null && _g !== void 0 ? _g : (function () { return []; }))(collection);
                    return typescript_1.default.factory.createArrowFunction(undefined, undefined, FeatureProgrammer.parameterDeclarations(config)(config.types.input(type, name))(ValueFactory_1.ValueFactory.INPUT()), config.types.output(type, name), undefined, typescript_1.default.factory.createBlock(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], __read(added), false), __read(functions.objects.filter(function (_, i) {
                        return importer.hasLocal("".concat(config.prefix, "o").concat(i));
                    })), false), __read(functions.unions.filter(function (_, i) {
                        return importer.hasLocal("".concat(config.prefix, "u").concat(i));
                    })), false), __read(functions.arrays.filter(function (_, i) {
                        return importer.hasLocal("".concat(config.prefix, "a").concat(i));
                    })), false), __read(functions.tuples.filter(function (_, i) {
                        return importer.hasLocal("".concat(config.prefix, "t").concat(i));
                    })), false), __read((typescript_1.default.isBlock(output)
                        ? output.statements
                        : [typescript_1.default.factory.createReturnStatement(output)])), false), true));
                };
            };
        };
    };
    FeatureProgrammer.write_object_functions = function (config) {
        return function (importer) {
            return function (collection) {
                return collection
                    .objects()
                    .map(function (obj) {
                    var _a;
                    return StatementFactory_1.StatementFactory.constant("".concat(config.prefix, "o").concat(obj.index), typescript_1.default.factory.createArrowFunction(undefined, undefined, FeatureProgrammer.parameterDeclarations(config)(TypeFactory_1.TypeFactory.keyword("any"))(ValueFactory_1.ValueFactory.INPUT()), (_a = config.objector.type) !== null && _a !== void 0 ? _a : TypeFactory_1.TypeFactory.keyword("any"), undefined, config.objector.joiner(typescript_1.default.factory.createIdentifier("input"), (0, feature_object_entries_1.feature_object_entries)(config)(importer)(obj)(typescript_1.default.factory.createIdentifier("input")), obj)));
                });
            };
        };
    };
    FeatureProgrammer.write_union_functions = function (config) { return function (collection) {
        return collection
            .unions()
            .map(function (union, i) {
            return StatementFactory_1.StatementFactory.constant("".concat(config.prefix, "u").concat(i), write_union(config)(union));
        });
    }; };
    var write_union = function (config) {
        var explorer = UnionExplorer_1.UnionExplorer.object(config);
        var input = ValueFactory_1.ValueFactory.INPUT();
        return function (meta) {
            return typescript_1.default.factory.createArrowFunction(undefined, undefined, FeatureProgrammer.parameterDeclarations(config)(TypeFactory_1.TypeFactory.keyword("any"))(ValueFactory_1.ValueFactory.INPUT()), TypeFactory_1.TypeFactory.keyword("any"), undefined, explorer(input, meta, {
                tracable: config.path || config.trace,
                source: "function",
                from: "object",
                postfix: "",
            }));
        };
    };
    /* -----------------------------------------------------------
          DECODERS
      ----------------------------------------------------------- */
    FeatureProgrammer.decode_array = function (config) {
        return function (importer) {
            return function (combiner) {
                var rand = importer.increment().toString();
                var tail = config.path || config.trace
                    ? [
                        IdentifierFactory_1.IdentifierFactory.parameter("_index" + rand, TypeFactory_1.TypeFactory.keyword("number")),
                    ]
                    : [];
                return function (input, array, explore) {
                    var _a;
                    var arrow = typescript_1.default.factory.createArrowFunction(undefined, undefined, __spreadArray([
                        IdentifierFactory_1.IdentifierFactory.parameter("elem", TypeFactory_1.TypeFactory.keyword("any"))
                    ], __read(tail), false), undefined, undefined, config.decoder()(ValueFactory_1.ValueFactory.INPUT("elem"), array.type.value, {
                        tracable: explore.tracable,
                        source: explore.source,
                        from: "array",
                        postfix: FeatureProgrammer.index((_a = explore.start) !== null && _a !== void 0 ? _a : null)(explore.postfix)(rand),
                    }));
                    return combiner(input, arrow);
                };
            };
        };
    };
    FeatureProgrammer.decode_object = function (config) {
        return function (importer) {
            return function (input, obj, explore) {
                return typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier(importer.useLocal("".concat(config.prefix, "o").concat(obj.index))), undefined, FeatureProgrammer.argumentsArray(config)(explore)(input));
            };
        };
    };
    /* -----------------------------------------------------------
          UTILITIES FOR INTERNAL FUNCTIONS
      ----------------------------------------------------------- */
    FeatureProgrammer.index = function (start) { return function (prev) { return function (rand) {
        var tail = start !== null
            ? "\"[\" + (".concat(start, " + _index").concat(rand, ") + \"]\"")
            : "\"[\" + _index".concat(rand, " + \"]\"");
        if (prev === "")
            return tail;
        else if (prev[prev.length - 1] === "\"")
            return prev.substring(0, prev.length - 1) + tail.substring(1);
        return prev + " + ".concat(tail);
    }; }; };
    FeatureProgrammer.argumentsArray = function (config) {
        return function (explore) {
            var tail = config.path === false && config.trace === false
                ? []
                : config.path === true && config.trace === true
                    ? [
                        typescript_1.default.factory.createIdentifier(explore.postfix ? "_path + ".concat(explore.postfix) : "_path"),
                        explore.source === "function"
                            ? typescript_1.default.factory.createIdentifier("".concat(explore.tracable, " && _exceptionable"))
                            : explore.tracable
                                ? typescript_1.default.factory.createTrue()
                                : typescript_1.default.factory.createFalse(),
                    ]
                    : config.path === true
                        ? [
                            typescript_1.default.factory.createIdentifier(explore.postfix ? "_path + ".concat(explore.postfix) : "_path"),
                        ]
                        : [
                            explore.source === "function"
                                ? typescript_1.default.factory.createIdentifier("".concat(explore.tracable, " && _exceptionable"))
                                : explore.tracable
                                    ? typescript_1.default.factory.createTrue()
                                    : typescript_1.default.factory.createFalse(),
                        ];
            return function (input) { return __spreadArray([input], __read(tail), false); };
        };
    };
    FeatureProgrammer.parameterDeclarations = function (props) {
        return function (type) {
            var tail = [];
            if (props.path)
                tail.push(IdentifierFactory_1.IdentifierFactory.parameter("_path", TypeFactory_1.TypeFactory.keyword("string")));
            if (props.trace)
                tail.push(IdentifierFactory_1.IdentifierFactory.parameter("_exceptionable", TypeFactory_1.TypeFactory.keyword("boolean"), typescript_1.default.factory.createTrue()));
            return function (input) { return __spreadArray([
                IdentifierFactory_1.IdentifierFactory.parameter(input, type)
            ], __read(tail), false); };
        };
    };
})(FeatureProgrammer || (exports.FeatureProgrammer = FeatureProgrammer = {}));
//# sourceMappingURL=FeatureProgrammer.js.map