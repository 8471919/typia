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
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterate_metadata_comment_tags = void 0;
var MetadataCommentTagFactory_1 = require("../../MetadataCommentTagFactory");
var iterate_metadata_comment_tags = function (errors) { return function (object) {
    var e_1, _a;
    if (object.tagged_ === true)
        return;
    object.tagged_ = true;
    try {
        for (var _b = __values(object.properties), _c = _b.next(); !_c.done; _c = _b.next()) {
            var property = _c.value;
            MetadataCommentTagFactory_1.MetadataCommentTagFactory.analyze(errors)(property.value)(property.jsDocTags, {
                top: false,
                object: object,
                property: property.key.isSoleLiteral()
                    ? property.key.getSoleLiteral()
                    : {},
                parameter: null,
                nested: null,
                aliased: false,
                escaped: false,
                output: false,
            });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
}; };
exports.iterate_metadata_comment_tags = iterate_metadata_comment_tags;
//# sourceMappingURL=iterate_metadata_comment_tags.js.map