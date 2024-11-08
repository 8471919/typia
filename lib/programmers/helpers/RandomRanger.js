"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomRanger = void 0;
var typescript_1 = __importDefault(require("typescript"));
var ExpressionFactory_1 = require("../../factories/ExpressionFactory");
var RandomRanger;
(function (RandomRanger) {
    RandomRanger.length = function (coalesce) {
        return function (defs) {
            return function (acc) {
                return function (tags) {
                    var _a, _b;
                    var props = {
                        minimum: getter(tags)(acc.minimum),
                        maximum: getter(tags)(acc.maximum),
                    };
                    if (props.minimum === undefined && props.maximum === undefined)
                        return undefined;
                    if (props.maximum !== undefined && props.minimum === undefined) {
                        if (props.maximum <= 0) {
                            props.maximum = 0;
                            props.minimum = 0;
                        }
                        else if (props.maximum < defs.gap)
                            props.minimum = defs.minimum === 0 ? 0 : 1;
                    }
                    (_a = props.minimum) !== null && _a !== void 0 ? _a : (props.minimum = defs.minimum);
                    (_b = props.maximum) !== null && _b !== void 0 ? _b : (props.maximum = defs.maximum);
                    if (props.maximum < props.minimum)
                        props.maximum += defs.gap;
                    return typescript_1.default.factory.createCallExpression(coalesce("integer"), undefined, [
                        ExpressionFactory_1.ExpressionFactory.number(props.minimum),
                        ExpressionFactory_1.ExpressionFactory.number(props.maximum),
                    ]);
                };
            };
        };
    };
    RandomRanger.number = function (config) {
        return function (defs) {
            return function (tags) {
                var _a, _b, _c, _d;
                var range = {
                    minimum: {
                        value: (_a = getter(tags)("minimum")) !== null && _a !== void 0 ? _a : getter(tags)("exclusiveMinimum"),
                        exclusive: getter(tags)("exclusiveMinimum") !== undefined,
                    },
                    maximum: {
                        value: (_b = getter(tags)("maximum")) !== null && _b !== void 0 ? _b : getter(tags)("exclusiveMaximum"),
                        exclusive: getter(tags)("exclusiveMaximum") !== undefined,
                    },
                    stepper: undefined,
                    multiply: getter(tags)("multipleOf"),
                };
                //----
                // MULTIPLIERS
                //----
                if (range.multiply !== undefined) {
                    var _e = multiplier(defs.gap)(range)(range.multiply), minimum_1 = _e.minimum, maximum_1 = _e.maximum;
                    return typescript_1.default.factory.createMultiply(config.transform(range.multiply), config.setter([minimum_1, maximum_1]));
                }
                //----
                // RANGE
                //----
                // INT
                var integer = function (value) { return value === Math.floor(value); };
                if (config.type === "int" || config.type === "uint") {
                    if (range.minimum.value !== undefined) {
                        if (range.minimum.exclusive) {
                            range.minimum.exclusive = false;
                            if (integer(range.minimum.value))
                                range.minimum.value += 1;
                        }
                        range.minimum.value = Math.ceil(range.minimum.value);
                    }
                    if (range.maximum.value !== undefined) {
                        if (range.maximum.exclusive) {
                            range.maximum.exclusive = false;
                            if (integer(range.maximum.value))
                                range.maximum.value -= 1;
                        }
                        range.maximum.value = Math.floor(range.maximum.value);
                    }
                }
                // UNSIGNED INT
                if (config.type === "uint") {
                    if (range.minimum.value === undefined)
                        range.minimum.value = 0;
                    else if (range.minimum.value <= 0) {
                        range.minimum.value = 0;
                        range.minimum.exclusive = false;
                    }
                }
                var minimum = (_c = range.minimum.value) !== null && _c !== void 0 ? _c : (range.maximum.value !== undefined
                    ? range.maximum.value - defs.gap
                    : defs.minimum);
                var maximum = (_d = range.maximum.value) !== null && _d !== void 0 ? _d : (range.minimum.value !== undefined
                    ? range.minimum.value + defs.gap
                    : defs.maximum);
                return config.setter([minimum, maximum]);
            };
        };
    };
})(RandomRanger || (exports.RandomRanger = RandomRanger = {}));
var getter = function (tags) {
    return function (kind) {
        var _a;
        var value = (_a = tags.find(function (t) {
            return t.kind === kind &&
                (typeof t.value === "number" || typeof t.value === "bigint");
        })) === null || _a === void 0 ? void 0 : _a.value;
        return value !== undefined ? Number(value) : undefined;
    };
};
var multiplier = function (gap) { return function (range) { return function (m) {
    var minimum = range.minimum.value === undefined
        ? 0
        : (function () {
            var x = m * Math.ceil(range.minimum.value / m);
            return range.minimum.exclusive && x === range.minimum.value
                ? x + m
                : x;
        })() / m;
    var maximum = range.maximum.value === undefined
        ? gap
        : (function () {
            var y = m * Math.floor(range.maximum.value / m);
            return range.maximum.exclusive && y === range.maximum.value
                ? y - m
                : y;
        })() / m;
    return { minimum: minimum, maximum: maximum };
}; }; };
//# sourceMappingURL=RandomRanger.js.map