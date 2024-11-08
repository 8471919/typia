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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataAtomic = void 0;
var MetadataAtomic = /** @class */ (function () {
    /**
     * @internal
     */
    function MetadataAtomic(props) {
        this.type = props.type;
        this.tags = props.tags;
    }
    MetadataAtomic.create = function (props) {
        return new MetadataAtomic(props);
    };
    MetadataAtomic.from = function (json) {
        return MetadataAtomic.create({
            type: json.type,
            tags: json.tags.map(function (row) {
                return row.map(function (tag) {
                    var _a;
                    return ({
                        target: tag.target,
                        name: tag.name,
                        kind: tag.kind,
                        value: typeof tag.value === "object" &&
                            ((_a = tag.value) === null || _a === void 0 ? void 0 : _a.type) === "bigint" &&
                            typeof tag.value.value === "string"
                            ? BigInt(tag.value.value)
                            : tag.value,
                        validate: tag.validate,
                        exclusive: tag.exclusive,
                        schema: tag.schema,
                    });
                });
            }),
        });
    };
    MetadataAtomic.prototype.getName = function () {
        var _a;
        return ((_a = this.name_) !== null && _a !== void 0 ? _a : (this.name_ = getName(this)));
    };
    MetadataAtomic.prototype.toJSON = function () {
        return {
            type: this.type,
            tags: this.tags.map(function (row) {
                return row.map(function (tag) { return ({
                    target: tag.target,
                    name: tag.name,
                    kind: tag.kind,
                    value: typeof tag.value === "bigint"
                        ? {
                            type: "bigint",
                            value: tag.value.toString(),
                        }
                        : tag.value,
                    validate: tag.validate,
                    exclusive: tag.exclusive,
                    schema: tag.schema,
                }); });
            }),
        };
    };
    return MetadataAtomic;
}());
exports.MetadataAtomic = MetadataAtomic;
var getName = function (obj) {
    if (obj.tags.length === 0)
        return obj.type;
    else if (obj.tags.length === 1) {
        var str = __spreadArray([obj.type], __read(obj.tags[0].map(function (t) { return t.name; })), false).join(" & ");
        return "(".concat(str, ")");
    }
    var rows = obj.tags.map(function (row) {
        var str = row.map(function (t) { return t.name; }).join(" & ");
        return row.length === 1 ? str : "(".concat(str, ")");
    });
    return "(".concat(obj.type, " & (").concat(rows.join(" | "), "))");
};
//# sourceMappingURL=MetadataAtomic.js.map