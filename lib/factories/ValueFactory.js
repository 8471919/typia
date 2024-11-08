"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueFactory = void 0;
var typescript_1 = __importDefault(require("typescript"));
var ValueFactory;
(function (ValueFactory) {
    ValueFactory.NULL = function () { return typescript_1.default.factory.createNull(); };
    ValueFactory.UNDEFINED = function () { return typescript_1.default.factory.createIdentifier("undefined"); };
    ValueFactory.BOOLEAN = function (value) {
        return value ? typescript_1.default.factory.createTrue() : typescript_1.default.factory.createFalse();
    };
    ValueFactory.INPUT = function (str) {
        if (str === void 0) { str = "input"; }
        return typescript_1.default.factory.createIdentifier(str);
    };
    ValueFactory.TYPEOF = function (input) {
        return typescript_1.default.factory.createTypeOfExpression(input);
    };
})(ValueFactory || (exports.ValueFactory = ValueFactory = {}));
//# sourceMappingURL=ValueFactory.js.map