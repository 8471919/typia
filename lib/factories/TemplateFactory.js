"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateFactory = void 0;
var typescript_1 = __importDefault(require("typescript"));
var TemplateFactory;
(function (TemplateFactory) {
    TemplateFactory.generate = function (expressions) {
        if (expressions.every(function (exp) { return typescript_1.default.isStringLiteral(exp); }))
            return typescript_1.default.factory.createStringLiteral(expressions.map(function (str) { return str.text; }).join(""));
        var it = {
            value: "",
            index: 0,
        };
        gather(expressions)(it);
        var head = typescript_1.default.factory.createTemplateHead(it.value);
        var spans = [];
        while (true) {
            var elem = expressions[it.index++];
            gather(expressions)(it);
            var broken = it.index === expressions.length;
            spans.push(typescript_1.default.factory.createTemplateSpan(elem, broken
                ? typescript_1.default.factory.createTemplateTail(it.value)
                : typescript_1.default.factory.createTemplateMiddle(it.value)));
            if (broken === true)
                break;
        }
        return typescript_1.default.factory.createTemplateExpression(head, spans);
    };
    var gather = function (expressions) {
        return function (it) {
            var found = expressions.findIndex(function (elem, index) { return index >= it.index && !typescript_1.default.isStringLiteral(elem); });
            var last = found !== -1 ? found : expressions.length;
            it.value = expressions
                .slice(it.index, last)
                .map(function (elem) { return elem.text; })
                .reduce(function (x, y) { return x + y; }, "");
            it.index = last;
        };
    };
})(TemplateFactory || (exports.TemplateFactory = TemplateFactory = {}));
//# sourceMappingURL=TemplateFactory.js.map