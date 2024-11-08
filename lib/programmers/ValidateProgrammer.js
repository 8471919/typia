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
exports.ValidateProgrammer = void 0;
var typescript_1 = __importDefault(require("typescript"));
var ExpressionFactory_1 = require("../factories/ExpressionFactory");
var IdentifierFactory_1 = require("../factories/IdentifierFactory");
var StatementFactory_1 = require("../factories/StatementFactory");
var TypeFactory_1 = require("../factories/TypeFactory");
var CheckerProgrammer_1 = require("./CheckerProgrammer");
var FeatureProgrammer_1 = require("./FeatureProgrammer");
var IsProgrammer_1 = require("./IsProgrammer");
var FunctionImporter_1 = require("./helpers/FunctionImporter");
var OptionPredicator_1 = require("./helpers/OptionPredicator");
var check_everything_1 = require("./internal/check_everything");
var check_object_1 = require("./internal/check_object");
var ValidateProgrammer;
(function (ValidateProgrammer) {
    ValidateProgrammer.decompose = function (props) {
        var _a;
        var is = IsProgrammer_1.IsProgrammer.decompose(props);
        var composed = CheckerProgrammer_1.CheckerProgrammer.compose(__assign(__assign({}, props), { config: {
                prefix: "$v",
                path: true,
                trace: true,
                numeric: OptionPredicator_1.OptionPredicator.numeric(props.project.options),
                equals: props.equals,
                atomist: function (explore) { return function (entry) { return function (input) {
                    return __spreadArray(__spreadArray([], __read((entry.expression ? [entry.expression] : [])), false), __read((entry.conditions.length === 0
                        ? []
                        : entry.conditions.length === 1
                            ? entry.conditions[0].map(function (cond) {
                                return typescript_1.default.factory.createLogicalOr(cond.expression, create_report_call(explore.from === "top"
                                    ? typescript_1.default.factory.createTrue()
                                    : typescript_1.default.factory.createIdentifier("_exceptionable"))(typescript_1.default.factory.createIdentifier(explore.postfix
                                    ? "_path + ".concat(explore.postfix)
                                    : "_path"), cond.expected, input));
                            })
                            : [
                                typescript_1.default.factory.createLogicalOr(entry.conditions
                                    .map(function (set) {
                                    return set
                                        .map(function (s) { return s.expression; })
                                        .reduce(function (a, b) {
                                        return typescript_1.default.factory.createLogicalAnd(a, b);
                                    });
                                })
                                    .reduce(function (a, b) { return typescript_1.default.factory.createLogicalOr(a, b); }), create_report_call(explore.from === "top"
                                    ? typescript_1.default.factory.createTrue()
                                    : typescript_1.default.factory.createIdentifier("_exceptionable"))(typescript_1.default.factory.createIdentifier(explore.postfix
                                    ? "_path + ".concat(explore.postfix)
                                    : "_path"), entry.expected, input)),
                            ])), false).reduce(function (x, y) { return typescript_1.default.factory.createLogicalAnd(x, y); });
                }; }; },
                combiner: combine(props.equals)(props.project)(props.importer),
                joiner: joiner(props.equals)(props.project)(props.importer),
                success: typescript_1.default.factory.createTrue(),
            } }));
        var arrow = typescript_1.default.factory.createArrowFunction(undefined, undefined, [IdentifierFactory_1.IdentifierFactory.parameter("input", TypeFactory_1.TypeFactory.keyword("any"))], typescript_1.default.factory.createTypeReferenceNode("typia.IValidation<".concat((_a = props.name) !== null && _a !== void 0 ? _a : TypeFactory_1.TypeFactory.getFullName(props.project.checker)(props.type), ">")), undefined, typescript_1.default.factory.createBlock([
            // validate when false === is<T>(input)
            typescript_1.default.factory.createIfStatement(typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createFalse(), typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("__is"), undefined, [typescript_1.default.factory.createIdentifier("input")])), typescript_1.default.factory.createBlock([
                // prepare errors
                typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createIdentifier("errors"), typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.EqualsToken), typescript_1.default.factory.createArrayLiteralExpression([]))),
                typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createIdentifier("$report"), typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.EqualsToken), typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(typescript_1.default.factory.createParenthesizedExpression(typescript_1.default.factory.createAsExpression(props.modulo, TypeFactory_1.TypeFactory.keyword("any"))))("report"), [], [typescript_1.default.factory.createIdentifier("errors")]))),
                typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createArrowFunction(undefined, undefined, composed.parameters, undefined, undefined, composed.body), undefined, [
                    typescript_1.default.factory.createIdentifier("input"),
                    typescript_1.default.factory.createStringLiteral("$input"),
                    typescript_1.default.factory.createTrue(),
                ])),
                StatementFactory_1.StatementFactory.constant("success", typescript_1.default.factory.createStrictEquality(ExpressionFactory_1.ExpressionFactory.number(0), typescript_1.default.factory.createIdentifier("errors.length"))),
                typescript_1.default.factory.createReturnStatement(typescript_1.default.factory.createAsExpression(create_output(), TypeFactory_1.TypeFactory.keyword("any"))),
            ])),
            typescript_1.default.factory.createReturnStatement(typescript_1.default.factory.createAsExpression(typescript_1.default.factory.createObjectLiteralExpression([
                typescript_1.default.factory.createPropertyAssignment("success", typescript_1.default.factory.createTrue()),
                typescript_1.default.factory.createPropertyAssignment("errors", typescript_1.default.factory.createArrayLiteralExpression([])),
                typescript_1.default.factory.createPropertyAssignment("data", typescript_1.default.factory.createIdentifier("input")),
            ], true), TypeFactory_1.TypeFactory.keyword("any"))),
        ], true));
        return {
            functions: __assign(__assign({}, is.functions), composed.functions),
            statements: __spreadArray(__spreadArray(__spreadArray([], __read(is.statements), false), __read(composed.statements), false), [
                StatementFactory_1.StatementFactory.constant("__is", is.arrow),
                StatementFactory_1.StatementFactory.mut("errors"),
                StatementFactory_1.StatementFactory.mut("$report"),
            ], false),
            arrow: arrow,
        };
    };
    ValidateProgrammer.write = function (project) {
        return function (modulo) {
            return function (equals) {
                return function (type, name) {
                    var importer = new FunctionImporter_1.FunctionImporter(modulo.getText());
                    var result = ValidateProgrammer.decompose({
                        equals: equals,
                        project: project,
                        modulo: modulo,
                        importer: importer,
                        type: type,
                        name: name,
                    });
                    return FeatureProgrammer_1.FeatureProgrammer.writeDecomposed({
                        modulo: modulo,
                        importer: importer,
                        result: result,
                    });
                };
            };
        };
    };
})(ValidateProgrammer || (exports.ValidateProgrammer = ValidateProgrammer = {}));
var combine = function (equals) {
    return function (project) {
        return function (importer) {
            return function (explore) {
                if (explore.tracable === false)
                    return IsProgrammer_1.IsProgrammer.configure({
                        object: validate_object(equals)(project)(importer),
                        numeric: true,
                    })(project)(importer).combiner(explore);
                var path = explore.postfix
                    ? "_path + ".concat(explore.postfix)
                    : "_path";
                return function (logic) { return function (input, binaries, expected) {
                    return logic === "and"
                        ? binaries
                            .map(function (binary) {
                            return binary.combined
                                ? binary.expression
                                : typescript_1.default.factory.createLogicalOr(binary.expression, create_report_call(explore.source === "top"
                                    ? typescript_1.default.factory.createTrue()
                                    : typescript_1.default.factory.createIdentifier("_exceptionable"))(typescript_1.default.factory.createIdentifier(path), expected, input));
                        })
                            .reduce(typescript_1.default.factory.createLogicalAnd)
                        : typescript_1.default.factory.createLogicalOr(binaries
                            .map(function (binary) { return binary.expression; })
                            .reduce(typescript_1.default.factory.createLogicalOr), create_report_call(explore.source === "top"
                            ? typescript_1.default.factory.createTrue()
                            : typescript_1.default.factory.createIdentifier("_exceptionable"))(typescript_1.default.factory.createIdentifier(path), expected, input));
                }; };
            };
        };
    };
};
var validate_object = function (equals) { return function (project) { return function (importer) {
    return (0, check_object_1.check_object)({
        equals: equals,
        undefined: true,
        assert: false,
        reduce: typescript_1.default.factory.createLogicalAnd,
        positive: typescript_1.default.factory.createTrue(),
        superfluous: function (value) {
            return create_report_call()(typescript_1.default.factory.createAdd(typescript_1.default.factory.createIdentifier("_path"), typescript_1.default.factory.createCallExpression(importer.use("join"), undefined, [
                typescript_1.default.factory.createIdentifier("key"),
            ])), "undefined", value);
        },
        halt: function (expr) {
            return typescript_1.default.factory.createLogicalOr(typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createFalse(), typescript_1.default.factory.createIdentifier("_exceptionable")), expr);
        },
    })(project)(importer);
}; }; };
var joiner = function (equals) {
    return function (project) {
        return function (importer) { return ({
            object: validate_object(equals)(project)(importer),
            array: function (input, arrow) {
                return (0, check_everything_1.check_everything)(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(input)("map"), undefined, [arrow]));
            },
            failure: function (value, expected, explore) {
                return create_report_call((explore === null || explore === void 0 ? void 0 : explore.from) === "top"
                    ? typescript_1.default.factory.createTrue()
                    : typescript_1.default.factory.createIdentifier("_exceptionable"))(typescript_1.default.factory.createIdentifier((explore === null || explore === void 0 ? void 0 : explore.postfix) ? "_path + ".concat(explore.postfix) : "_path"), expected, value);
            },
            tuple: function (binaries) {
                return (0, check_everything_1.check_everything)(typescript_1.default.factory.createArrayLiteralExpression(binaries, true));
            },
        }); };
    };
};
var create_output = function () {
    return typescript_1.default.factory.createObjectLiteralExpression([
        typescript_1.default.factory.createShorthandPropertyAssignment("success"),
        typescript_1.default.factory.createShorthandPropertyAssignment("errors"),
        typescript_1.default.factory.createPropertyAssignment("data", typescript_1.default.factory.createConditionalExpression(typescript_1.default.factory.createIdentifier("success"), undefined, typescript_1.default.factory.createIdentifier("input"), undefined, typescript_1.default.factory.createIdentifier("undefined"))),
    ], true);
};
var create_report_call = function (exceptionable) {
    return function (path, expected, value) {
        return typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("$report"), undefined, [
            exceptionable !== null && exceptionable !== void 0 ? exceptionable : typescript_1.default.factory.createIdentifier("_exceptionable"),
            typescript_1.default.factory.createObjectLiteralExpression([
                typescript_1.default.factory.createPropertyAssignment("path", path),
                typescript_1.default.factory.createPropertyAssignment("expected", typescript_1.default.factory.createStringLiteral(expected)),
                typescript_1.default.factory.createPropertyAssignment("value", value),
            ], true),
        ]);
    };
};
//# sourceMappingURL=ValidateProgrammer.js.map