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
exports.FunctionImporter = void 0;
var typescript_1 = __importDefault(require("typescript"));
var IdentifierFactory_1 = require("../../factories/IdentifierFactory");
var StatementFactory_1 = require("../../factories/StatementFactory");
var TypeFactory_1 = require("../../factories/TypeFactory");
var FunctionImporter = /** @class */ (function () {
    function FunctionImporter(method) {
        this.method = method;
        this.used_ = new Set();
        this.local_ = new Set();
        this.unions_ = new Map();
        this.variables_ = new Map();
        this.sequence_ = 0;
    }
    FunctionImporter.prototype.empty = function () {
        return this.used_.size === 0;
    };
    FunctionImporter.prototype.use = function (name) {
        this.used_.add(name);
        return typescript_1.default.factory.createIdentifier("$" + name);
    };
    FunctionImporter.prototype.useLocal = function (name) {
        this.local_.add(name);
        return name;
    };
    FunctionImporter.prototype.hasLocal = function (name) {
        return this.local_.has(name);
    };
    FunctionImporter.prototype.declare = function (modulo, includeUnions) {
        if (includeUnions === void 0) { includeUnions = true; }
        return __spreadArray(__spreadArray(__spreadArray([], __read(__spreadArray([], __read(this.used_), false).map(function (name) {
            return StatementFactory_1.StatementFactory.constant("$" + name, IdentifierFactory_1.IdentifierFactory.access(typescript_1.default.factory.createParenthesizedExpression(typescript_1.default.factory.createAsExpression(modulo, TypeFactory_1.TypeFactory.keyword("any"))))(name));
        })), false), __read(__spreadArray([], __read(this.variables_.entries()), false).map(function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            return StatementFactory_1.StatementFactory.constant(key, value);
        })), false), __read((includeUnions === true
            ? __spreadArray([], __read(this.unions_.values()), false).map(function (_a) {
                var _b = __read(_a, 2), key = _b[0], arrow = _b[1];
                return StatementFactory_1.StatementFactory.constant(key, arrow);
            })
            : [])), false);
    };
    FunctionImporter.prototype.declareUnions = function () {
        return __spreadArray([], __read(this.unions_.values()), false).map(function (_a) {
            var _b = __read(_a, 2), key = _b[0], arrow = _b[1];
            return StatementFactory_1.StatementFactory.constant(key, arrow);
        });
    };
    FunctionImporter.prototype.increment = function () {
        return ++this.sequence_;
    };
    FunctionImporter.prototype.emplaceUnion = function (prefix, name, factory) {
        var key = "".concat(prefix, "::").concat(name);
        var oldbie = this.unions_.get(key);
        if (oldbie)
            return oldbie[0];
        var index = this.unions_.size;
        var accessor = "".concat(prefix, "p").concat(index);
        var tuple = [accessor, null];
        this.unions_.set(key, tuple);
        tuple[1] = factory();
        return accessor;
    };
    FunctionImporter.prototype.emplaceVariable = function (name, value) {
        this.variables_.set(name, value);
        return typescript_1.default.factory.createIdentifier(name);
    };
    FunctionImporter.prototype.trace = function () {
        console.log.apply(console, __spreadArray([], __read(this.used_), false));
        console.log.apply(console, __spreadArray([], __read(this.local_), false));
    };
    return FunctionImporter;
}());
exports.FunctionImporter = FunctionImporter;
//# sourceMappingURL=FunctionImporter.js.map