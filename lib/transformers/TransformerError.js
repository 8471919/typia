"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformerError = void 0;
var Escaper_1 = require("../utils/Escaper");
var TransformerError = /** @class */ (function (_super) {
    __extends(TransformerError, _super);
    function TransformerError(props) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, props.message) || this;
        _this.code = props.code;
        // INHERITANCE POLYFILL
        var proto = _newTarget.prototype;
        if (Object.setPrototypeOf)
            Object.setPrototypeOf(_this, proto);
        else
            _this.__proto__ = proto;
        return _this;
    }
    return TransformerError;
}(Error));
exports.TransformerError = TransformerError;
(function (TransformerError) {
    TransformerError.from = function (method) {
        return function (errors) {
            var body = errors
                .map(function (e) {
                var subject = e.explore.object === null
                    ? ""
                    : join(e.explore.object)(e.explore.property);
                var middle = e.explore.parameter
                    ? "(parameter: ".concat(JSON.stringify(e.explore.parameter), ")")
                    : e.explore.output
                        ? "(return type)"
                        : "";
                var type = "".concat(subject.length ? "".concat(subject, ": ") : "").concat(e.name);
                return "- ".concat(type).concat(middle, "\n").concat(e.messages
                    .map(function (msg) { return "  - ".concat(msg); })
                    .join("\n"));
            })
                .join("\n\n");
            return new TransformerError({
                code: method,
                message: "unsupported type detected\n\n".concat(body),
            });
        };
    };
    var join = function (object) { return function (key) {
        if (key === null)
            return object.name;
        else if (typeof key === "object")
            return "".concat(object.name, "[key]");
        else if (Escaper_1.Escaper.variable(key))
            return "".concat(object.name, ".").concat(key);
        return "".concat(object.name, "[").concat(JSON.stringify(key), "]");
    }; };
})(TransformerError || (exports.TransformerError = TransformerError = {}));
//# sourceMappingURL=TransformerError.js.map