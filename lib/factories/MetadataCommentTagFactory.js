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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataCommentTagFactory = void 0;
var Writable_1 = require("../typings/Writable");
var FormatCheatSheet_1 = require("../tags/internal/FormatCheatSheet");
var MetadataTypeTagFactory_1 = require("./MetadataTypeTagFactory");
/**
 * Extremely hard coded, but no reason to maintain.
 *
 * @internal
 */
var MetadataCommentTagFactory;
(function (MetadataCommentTagFactory) {
    MetadataCommentTagFactory.analyze = function (errors) {
        return function (metadata) {
            return function (commentList, explore) {
                var e_1, _a, e_2, _b;
                var _c, _d;
                // PREPARE MESSAGE CONTAINER
                var messages = [];
                var report = function (msg) {
                    messages.push(msg);
                    return null;
                };
                var validateReport = function (property) {
                    return function (msg) {
                        messages.push("the property ".concat(property === null ? "[\"typia.tag\"]" : "[\"typia.tag.".concat(property, "\"]"), " ").concat(msg, "."));
                        return false;
                    };
                };
                try {
                    // VALIDATE AND CONSTRUCT COMMENT TAGS
                    for (var commentList_1 = __values(commentList), commentList_1_1 = commentList_1.next(); !commentList_1_1.done; commentList_1_1 = commentList_1.next()) {
                        var comment = commentList_1_1.value;
                        var tagger = parse(report)(comment);
                        if (tagger === null)
                            continue;
                        var _loop_1 = function (key, value) {
                            var e_3, _h, e_4, _j, e_5, _k;
                            var filtered = value.filter(function (v) { return v.validate !== null; });
                            if (key === "array") {
                                if (metadata.arrays.length === 0) {
                                    report("requires array type");
                                    return "continue";
                                }
                                try {
                                    for (var _l = (e_3 = void 0, __values(metadata.arrays)), _m = _l.next(); !_m.done; _m = _l.next()) {
                                        var a = _m.value;
                                        (0, Writable_1.Writable)(a).tags = a.tags.filter(function (x) {
                                            return MetadataTypeTagFactory_1.MetadataTypeTagFactory.validate(validateReport)("array")(__spreadArray(__spreadArray([], __read(x), false), __read(filtered), false));
                                        });
                                        if (a.tags.length === 0)
                                            a.tags.push(filtered);
                                        else
                                            try {
                                                for (var _o = (e_4 = void 0, __values(a.tags)), _p = _o.next(); !_p.done; _p = _o.next()) {
                                                    var tags = _p.value;
                                                    tags.push.apply(tags, __spreadArray([], __read(filtered), false));
                                                }
                                            }
                                            catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                            finally {
                                                try {
                                                    if (_p && !_p.done && (_j = _o.return)) _j.call(_o);
                                                }
                                                finally { if (e_4) throw e_4.error; }
                                            }
                                    }
                                }
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (_m && !_m.done && (_h = _l.return)) _h.call(_l);
                                    }
                                    finally { if (e_3) throw e_3.error; }
                                }
                            }
                            else {
                                var atomic = metadata.atomics.find(function (a) { return a.type == key; });
                                if (atomic === undefined)
                                    if (key === "bigint" || key === "number") {
                                        var opposite_1 = key === "bigint" ? "number" : "bigint";
                                        if (tagger[opposite_1] !== undefined &&
                                            metadata.atomics.some(function (a) { return a.type === opposite_1; }))
                                            return "continue";
                                    }
                                    else if (key === "string" &&
                                        ((_c = value[0]) === null || _c === void 0 ? void 0 : _c.kind) === "format" &&
                                        ((_d = value[0]) === null || _d === void 0 ? void 0 : _d.value) === "date-time")
                                        return "continue";
                                    else
                                        report("requires ".concat(key, " type"));
                                else {
                                    (0, Writable_1.Writable)(atomic).tags = atomic.tags.filter(function (x) {
                                        return MetadataTypeTagFactory_1.MetadataTypeTagFactory.validate(validateReport)(key)(__spreadArray(__spreadArray([], __read(x), false), __read(filtered), false));
                                    });
                                    if (atomic.tags.length === 0)
                                        atomic.tags.push(filtered);
                                    else
                                        try {
                                            for (var _q = (e_5 = void 0, __values(atomic.tags)), _r = _q.next(); !_r.done; _r = _q.next()) {
                                                var tags = _r.value;
                                                tags.push.apply(tags, __spreadArray([], __read(filtered), false));
                                            }
                                        }
                                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                        finally {
                                            try {
                                                if (_r && !_r.done && (_k = _q.return)) _k.call(_q);
                                            }
                                            finally { if (e_5) throw e_5.error; }
                                        }
                                }
                            }
                        };
                        try {
                            for (var _e = (e_2 = void 0, __values(Object.entries(tagger))), _f = _e.next(); !_f.done; _f = _e.next()) {
                                var _g = __read(_f.value, 2), key = _g[0], value = _g[1];
                                _loop_1(key, value);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (commentList_1_1 && !commentList_1_1.done && (_a = commentList_1.return)) _a.call(commentList_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                // DO REPORT
                if (messages.length !== 0)
                    errors.push({
                        name: "comment tag(s)",
                        explore: explore,
                        messages: messages,
                    });
            };
        };
    };
    var parse = function (report) {
        return function (comment) {
            var _a;
            var parser = PARSER[comment.name];
            if (parser === undefined)
                return {};
            var text = (_a = (comment.text || [])[0]) === null || _a === void 0 ? void 0 : _a.text;
            if (text === undefined && comment.name !== "uniqueItems")
                return report("no comment tag value");
            return parser(report)(text);
        };
    };
})(MetadataCommentTagFactory || (exports.MetadataCommentTagFactory = MetadataCommentTagFactory = {}));
var PARSER = {
    /* -----------------------------------------------------------
          ARRAY
      ----------------------------------------------------------- */
    items: function (report) { return function (Value) { return ({
        array: [
            {
                name: "MinItems<".concat(Value, ">"),
                target: "array",
                kind: "minItems",
                value: parse_integer(report)(true)(Value),
                validate: "".concat(Value, " <= $input.length"),
                exclusive: true,
                schema: {
                    minItems: parse_integer(report)(true)(Value),
                },
            },
            {
                name: "MaxItems<".concat(Value, ">"),
                target: "array",
                kind: "maxItems",
                value: parse_integer(report)(true)(Value),
                validate: "$input.length <= ".concat(Value),
                exclusive: true,
                schema: {
                    maxItems: parse_integer(report)(true)(Value),
                },
            },
        ],
    }); }; },
    minItems: function (report) { return function (Value) { return ({
        array: [
            {
                name: "MinItems<".concat(Value, ">"),
                target: "array",
                kind: "minItems",
                value: parse_integer(report)(true)(Value),
                validate: "".concat(Value, " <= $input.length"),
                exclusive: true,
                schema: {
                    minItems: parse_integer(report)(true)(Value),
                },
            },
        ],
    }); }; },
    maxItems: function (report) { return function (Value) { return ({
        array: [
            {
                name: "MaxItems<".concat(Value, ">"),
                target: "array",
                kind: "maxItems",
                value: parse_integer(report)(true)(Value),
                validate: "$input.length <= ".concat(Value),
                exclusive: true,
                schema: {
                    maxItems: parse_integer(report)(true)(Value),
                },
            },
        ],
    }); }; },
    uniqueItems: function () { return function () { return ({
        array: [
            {
                name: "UniqueItems",
                target: "array",
                kind: "uniqueItems",
                value: true,
                validate: "$input.length <= 1 || (new Set($input).size === $input.length)",
                exclusive: true,
                schema: {
                    uniqueItems: true,
                },
            },
        ],
    }); }; },
    /* -----------------------------------------------------------
          NUMBER
      ----------------------------------------------------------- */
    type: function () { return function (Value) {
        // EMENDATIONS
        if (Value.startsWith("{") && Value.endsWith("}"))
            Value = Value.substring(1, Value.length - 1);
        if (Value === "int")
            Value = "int32";
        else if (Value === "uint")
            Value = "uint32";
        // MUST BE ONE OF THEM
        if (["int32", "uint32", "int64", "uint64", "float", "double"].includes(Value) === false)
            return {};
        return {
            number: [
                {
                    name: "Type<".concat(JSON.stringify(Value), ">"),
                    target: "number",
                    kind: "type",
                    value: Value,
                    validate: Value === "int32"
                        ? "Math.floor($input) === $input && -2147483648 <= $input && $input <= 2147483647"
                        : Value === "uint32"
                            ? "Math.floor($input) === $input && 0 <= $input && $input <= 4294967295"
                            : Value === "int64"
                                ? "Math.floor($input) === $input && -9223372036854775808 <= $input && $input <= 9223372036854775807"
                                : Value === "uint64"
                                    ? "Math.floor($input) === $input && 0 <= $input && $input <= 18446744073709551615"
                                    : Value === "float"
                                        ? "-1.175494351e38 <= $input && $input <= 3.4028235e38"
                                        : "true",
                    exclusive: true,
                    schema: ["int32", "uint32", "int64", "uint64"].includes(Value)
                        ? { type: "integer" }
                        : undefined,
                },
            ],
            bigint: Value === "int64" || "uint64"
                ? [
                    {
                        name: "Type<".concat(JSON.stringify(Value), ">"),
                        target: "bigint",
                        kind: "type",
                        value: Value,
                        validate: Value === "int64" ? "true" : "BigInt(0) <= $input",
                        exclusive: true,
                        schema: undefined,
                    },
                ]
                : [],
        };
    }; },
    minimum: function (report) { return function (Value) { return ({
        number: [
            {
                name: "Minimum<".concat(Value, ">"),
                target: "number",
                kind: "minimum",
                value: parse_number(report)(Value),
                validate: "".concat(Value, " <= $input"),
                exclusive: ["minimum", "exclusiveMinimum"],
                schema: {
                    minimum: parse_number(report)(Value),
                },
            },
        ],
        bigint: [
            {
                name: "Minimum<".concat(Value, "n>"),
                target: "bigint",
                kind: "minimum",
                value: (function () {
                    var value = parse_integer(report)(false)(Value);
                    return value === null ? null : BigInt(value);
                })(),
                validate: "".concat(Value, " <= $input"),
                exclusive: ["minimum", "exclusiveMinimum"],
                schema: undefined,
            },
        ],
    }); }; },
    maximum: function (report) { return function (Value) { return ({
        number: [
            {
                name: "Maximum<".concat(Value, ">"),
                target: "number",
                kind: "maximum",
                value: parse_number(report)(Value),
                validate: "$input <= ".concat(Value),
                exclusive: ["maximum", "exclusiveMaximum"],
                schema: {
                    maximum: parse_number(report)(Value),
                },
            },
        ],
        bigint: [
            {
                name: "Maximum<".concat(Value, "n>"),
                target: "bigint",
                kind: "maximum",
                value: (function () {
                    var value = parse_integer(report)(false)(Value);
                    return value === null ? null : BigInt(value);
                })(),
                validate: "$input <= ".concat(Value),
                exclusive: ["maximum", "exclusiveMaximum"],
                schema: undefined,
            },
        ],
    }); }; },
    exclusiveMinimum: function (report) { return function (Value) { return ({
        number: [
            {
                name: "ExclusiveMinimum<".concat(Value, ">"),
                target: "number",
                kind: "exclusiveMinimum",
                value: parse_number(report)(Value),
                validate: "".concat(Value, " < $input"),
                exclusive: ["minimum", "exclusiveMinimum"],
                schema: {
                    exclusiveMinimum: true,
                    minimum: parse_number(report)(Value),
                },
            },
        ],
        bigint: [
            {
                name: "ExclusiveMinimum<".concat(Value, "n>"),
                target: "bigint",
                kind: "exclusiveMinimum",
                value: (function () {
                    var value = parse_integer(report)(false)(Value);
                    return value === null ? null : BigInt(value);
                })(),
                validate: "".concat(Value, " < $input"),
                exclusive: ["minimum", "exclusiveMinimum"],
                schema: undefined,
            },
        ],
    }); }; },
    exclusiveMaximum: function (report) { return function (Value) { return ({
        number: [
            {
                name: "ExclusiveMaximum<".concat(Value, ">"),
                target: "number",
                kind: "exclusiveMaximum",
                value: parse_number(report)(Value),
                validate: "$input < ".concat(Value),
                exclusive: ["maximum", "exclusiveMaximum"],
                schema: {
                    exclusiveMaximum: true,
                    maximum: parse_number(report)(Value),
                },
            },
        ],
        bigint: [
            {
                name: "ExclusiveMaximum<".concat(Value, "n>"),
                target: "bigint",
                kind: "exclusiveMaximum",
                value: (function () {
                    var value = parse_integer(report)(false)(Value);
                    return value === null ? null : BigInt(value);
                })(),
                validate: "$input < ".concat(Value),
                exclusive: ["maximum", "exclusiveMaximum"],
                schema: undefined,
            },
        ],
    }); }; },
    multipleOf: function (report) { return function (Value) { return ({
        number: [
            {
                name: "MultipleOf<".concat(Value, ">"),
                target: "number",
                kind: "multipleOf",
                value: parse_number(report)(Value),
                validate: "$input % ".concat(Value, " === 0"),
                exclusive: true,
                schema: {
                    multipleOf: parse_number(report)(Value),
                },
            },
        ],
        bigint: [
            {
                name: "MultipleOf<".concat(Value, "n>"),
                target: "bigint",
                kind: "multipleOf",
                value: (function () {
                    var value = parse_integer(report)(false)(Value);
                    return value === null ? null : BigInt(value);
                })(),
                validate: "$input % ".concat(Value, "n === 0n"),
                exclusive: true,
                schema: undefined,
            },
        ],
    }); }; },
    /* -----------------------------------------------------------
          STRING
      ----------------------------------------------------------- */
    format: function () { return function (Value) {
        var matched = FORMATS.get(Value);
        if (matched === undefined)
            return {};
        return {
            string: [
                {
                    name: "Format<".concat(JSON.stringify(matched[0]), ">"),
                    target: "string",
                    kind: "format",
                    value: matched[0],
                    validate: matched[1],
                    exclusive: true,
                    schema: {
                        format: matched[0],
                    },
                },
            ],
        };
    }; },
    pattern: function () { return function (Value) { return ({
        string: [
            {
                name: "Pattern<".concat(JSON.stringify(Value), ">"),
                target: "string",
                kind: "pattern",
                value: Value,
                validate: "RegExp(".concat(JSON.stringify(Value), ").test($input)"),
                exclusive: ["format"],
                schema: {
                    pattern: Value,
                },
            },
        ],
    }); }; },
    length: function (report) { return function (Value) { return ({
        string: [
            {
                name: "MinLength<".concat(Value, ">"),
                target: "string",
                kind: "minLength",
                value: parse_number(report)(Value),
                validate: "".concat(Value, " <= $input.length"),
                exclusive: true,
                schema: {
                    minLength: parse_number(report)(Value),
                },
            },
            {
                name: "MaxLength<".concat(Value, ">"),
                target: "string",
                kind: "maxLength",
                value: parse_number(report)(Value),
                validate: "$input.length <= ".concat(Value),
                exclusive: true,
                schema: {
                    maxLength: parse_number(report)(Value),
                },
            },
        ],
    }); }; },
    minLength: function (report) { return function (Value) { return ({
        string: [
            {
                name: "MinLength<".concat(Value, ">"),
                target: "string",
                kind: "minLength",
                value: parse_number(report)(Value),
                validate: "".concat(Value, " <= $input.length"),
                exclusive: true,
                schema: {
                    minLength: parse_number(report)(Value),
                },
            },
        ],
    }); }; },
    maxLength: function (report) { return function (Value) { return ({
        string: [
            {
                name: "MaxLength<".concat(Value, ">"),
                target: "string",
                kind: "maxLength",
                value: parse_number(report)(Value),
                validate: "$input.length <= ".concat(Value),
                exclusive: true,
                schema: {
                    maxLength: parse_number(report)(Value),
                },
            },
        ],
    }); }; },
};
var parse_number = function (report) {
    return function (str) {
        var value = Number(str);
        if (isNaN(value) === true)
            return report("invalid number");
        return value;
    };
};
var parse_integer = function (report) {
    return function (unsigned) {
        return function (str) {
            var value = parse_number(report)(str);
            if (value === null)
                return null;
            else if (Math.floor(value) !== value)
                return report("invalid integer");
            else if (unsigned === true && value < 0)
                return report("invalid unsigned integer");
            return value;
        };
    };
};
var FORMATS = new Map(__spreadArray(__spreadArray([], __read(Object.entries(FormatCheatSheet_1.FormatCheatSheet).map(function (_a) {
    var _b = __read(_a, 2), key = _b[0], value = _b[1];
    return [key, [key, value]];
})), false), [
    ["datetime", ["date-time", "!isNaN(new Date($input).getTime())"]],
    ["dateTime", ["date-time", "!isNaN(new Date($input).getTime())"]],
], false));
//# sourceMappingURL=MetadataCommentTagFactory.js.map