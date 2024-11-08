"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterate_metadata_template = void 0;
var typescript_1 = __importDefault(require("typescript"));
var MetadataTemplate_1 = require("../../../schemas/metadata/MetadataTemplate");
var MetadataHelper_1 = require("./MetadataHelper");
var explore_metadata_1 = require("./explore_metadata");
var iterate_metadata_template = function (checker) {
    return function (options) {
        return function (collection) {
            return function (errors) {
                return function (meta, type, explore) {
                    var filter = function (flag) { return (type.getFlags() & flag) !== 0; };
                    if (!filter(typescript_1.default.TypeFlags.TemplateLiteral))
                        return false;
                    var template = type;
                    var row = [];
                    template.texts.forEach(function (text, i) {
                        // TEXT LITERAL TYPE
                        if (text !== "")
                            row.push(MetadataHelper_1.MetadataHelper.literal_to_metadata(text));
                        // BINDED TEMPLATE TYPE
                        var binded = template.types[i];
                        if (binded)
                            row.push((0, explore_metadata_1.explore_metadata)(checker)(options)(collection)(errors)(binded, __assign(__assign({}, explore), { escaped: false, aliased: false })));
                    });
                    meta.templates.push(MetadataTemplate_1.MetadataTemplate.create({ row: row, tags: undefined }));
                    return true;
                };
            };
        };
    };
};
exports.iterate_metadata_template = iterate_metadata_template;
//# sourceMappingURL=iterate_metadata_template.js.map