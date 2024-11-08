"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disable_function_importer_declare = void 0;
var disable_function_importer_declare = function (importer) { return disable(importer); };
exports.disable_function_importer_declare = disable_function_importer_declare;
var disable = function (importer) { return ({
    method: importer.method,
    empty: function () { return importer.empty(); },
    use: function (name) { return importer.use(name); },
    useLocal: function (name) { return importer.useLocal(name); },
    hasLocal: function (name) { return importer.hasLocal(name); },
    declare: function (_modulo) { return []; },
    declareUnions: function () { return []; },
    increment: function () { return importer.increment(); },
    emplaceUnion: function (prefix, name, factory) { return importer.emplaceUnion(prefix, name, factory); },
    emplaceVariable: function (key, value) { return importer.emplaceVariable(key, value); },
    trace: function () { return importer.trace(); },
}); };
//# sourceMappingURL=disable_function_importer_declare.js.map