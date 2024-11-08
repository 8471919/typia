"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatementFactory = void 0;
var typescript_1 = __importDefault(require("typescript"));
var TypeFactory_1 = require("./TypeFactory");
var StatementFactory;
(function (StatementFactory) {
    StatementFactory.mut = function (name, initializer) {
        return typescript_1.default.factory.createVariableStatement(undefined, typescript_1.default.factory.createVariableDeclarationList([
            typescript_1.default.factory.createVariableDeclaration(name, undefined, initializer === undefined ? TypeFactory_1.TypeFactory.keyword("any") : undefined, initializer),
        ], typescript_1.default.NodeFlags.Let));
    };
    StatementFactory.constant = function (name, initializer) {
        return typescript_1.default.factory.createVariableStatement(undefined, typescript_1.default.factory.createVariableDeclarationList([
            typescript_1.default.factory.createVariableDeclaration(name, undefined, undefined, initializer),
        ], typescript_1.default.NodeFlags.Const));
    };
    StatementFactory.entry = function (key) { return function (value) {
        return typescript_1.default.factory.createVariableDeclarationList([
            typescript_1.default.factory.createVariableDeclaration(typescript_1.default.factory.createArrayBindingPattern([
                typescript_1.default.factory.createBindingElement(undefined, undefined, typescript_1.default.factory.createIdentifier(key), undefined),
                typescript_1.default.factory.createBindingElement(undefined, undefined, typescript_1.default.factory.createIdentifier(value), undefined),
            ]), undefined, undefined, undefined),
        ], typescript_1.default.NodeFlags.Const);
    }; };
    StatementFactory.transpile = function (script) {
        return typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createIdentifier(typescript_1.default.transpile(script)));
    };
    StatementFactory.block = function (expression) {
        return typescript_1.default.factory.createBlock([typescript_1.default.factory.createExpressionStatement(expression)], true);
    };
})(StatementFactory || (exports.StatementFactory = StatementFactory = {}));
//# sourceMappingURL=StatementFactory.js.map