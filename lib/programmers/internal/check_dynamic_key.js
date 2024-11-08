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
exports.check_dynamic_key = void 0;
var typescript_1 = __importDefault(require("typescript"));
var check_bigint_1 = require("./check_bigint");
var check_number_1 = require("./check_number");
var check_string_1 = require("./check_string");
var check_template_1 = require("./check_template");
var check_dynamic_key = function (project) {
    return function (importer) {
        return function (input, metadata) {
            var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
            // IF PURE STRING EXISTS, THEN SKIP VALIDATION
            if ((metadata.atomics.length !== 0 &&
                metadata.atomics.some(function (a) {
                    return a.type === "string" &&
                        a.tags.filter(function (row) { return row.every(function (t) { return t.validate !== undefined; }); })
                            .length === 0;
                })) ||
                (metadata.natives.length !== 0 &&
                    metadata.natives.some(function (type) { return type === "String"; })))
                return typescript_1.default.factory.createTrue();
            var conditions = [];
            // NULLISH COALESCING
            if (metadata.nullable === true)
                conditions.push(typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createStringLiteral("null"), input));
            if (metadata.isRequired() === false)
                conditions.push(typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createStringLiteral("undefined"), input));
            try {
                // ATOMICS
                for (var _e = __values(metadata.atomics), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var atom = _f.value;
                    if (atom.type === "boolean")
                        conditions.push(typescript_1.default.factory.createLogicalOr(typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createStringLiteral("false"), input), typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createStringLiteral("true"), input)));
                    else if (atom.type === "bigint")
                        conditions.push(typescript_1.default.factory.createLogicalAnd(typescript_1.default.factory.createCallExpression(importer.use("is_bigint_string"), undefined, [input]), atomist((0, check_bigint_1.check_bigint)(project)(atom)(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("BigInt"), undefined, [input])))));
                    else if (atom.type === "number")
                        conditions.push(atomist((0, check_number_1.check_number)(project, true)(atom)(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("Number"), undefined, [input]))));
                    else
                        conditions.push(atomist((0, check_string_1.check_string)(project)(atom)(input)));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                // CONSTANTS
                for (var _g = __values(metadata.constants), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var constant = _h.value;
                    try {
                        for (var _j = (e_3 = void 0, __values(constant.values)), _k = _j.next(); !_k.done; _k = _j.next()) {
                            var value = _k.value.value;
                            conditions.push(typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createStringLiteral(String(value)), input));
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                }
                finally { if (e_2) throw e_2.error; }
            }
            // TEMPLATES
            if (!!metadata.templates.length)
                conditions.push(atomist((0, check_template_1.check_template)(metadata.templates)(input)));
            try {
                // NATIVES
                for (var _l = __values(metadata.natives), _m = _l.next(); !_m.done; _m = _l.next()) {
                    var native = _m.value;
                    if (native === "Boolean")
                        conditions.push(typescript_1.default.factory.createLogicalOr(typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createStringLiteral("false"), input), typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createStringLiteral("true"), input)));
                    else if (native === "BigInt")
                        conditions.push(typescript_1.default.factory.createCallExpression(importer.use("is_bigint_string"), undefined, [input]));
                    else if (native === "Number")
                        conditions.push(typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createFalse(), typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("Number.isNaN"), undefined, [
                            typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("Number"), undefined, [input]),
                        ])));
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return conditions.length === 0
                ? typescript_1.default.factory.createTrue()
                : conditions.length === 1
                    ? conditions[0]
                    : conditions.reduce(typescript_1.default.factory.createLogicalOr);
        };
    };
};
exports.check_dynamic_key = check_dynamic_key;
var atomist = function (entry) {
    return __spreadArray(__spreadArray([], __read((entry.expression ? [entry.expression] : [])), false), __read((entry.conditions.length === 0
        ? []
        : [
            entry.conditions
                .map(function (set) {
                return set
                    .map(function (s) { return s.expression; })
                    .reduce(function (a, b) { return typescript_1.default.factory.createLogicalAnd(a, b); });
            })
                .reduce(function (a, b) { return typescript_1.default.factory.createLogicalOr(a, b); }),
        ])), false).reduce(function (x, y) { return typescript_1.default.factory.createLogicalAnd(x, y); });
};
//# sourceMappingURL=check_dynamic_key.js.map