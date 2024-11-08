"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypiaProgrammer = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var typescript_1 = __importDefault(require("typescript"));
var ImportTransformer_1 = require("../transformers/ImportTransformer");
var transform_1 = __importDefault(require("../transform"));
var TypiaProgrammer;
(function (TypiaProgrammer) {
    var _this = this;
    TypiaProgrammer.build = function (props) { return __awaiter(_this, void 0, void 0, function () {
        var parent_1, compilerOptions, program, _a, _b, diagnostics, result, _loop_1, diagnostics_1, diagnostics_1_1, diag, printer, _c, _d, file, to, content, e_1_1;
        var e_2, _e, e_1, _f;
        var _this = this;
        var _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    props.input = path_1.default.resolve(props.input);
                    props.output = path_1.default.resolve(props.output);
                    return [4 /*yield*/, is_directory(props.input)];
                case 1:
                    if (!((_j.sent()) === false)) return [3 /*break*/, 2];
                    throw new URIError("Error on TypiaGenerator.generate(): input path is not a directory.");
                case 2:
                    if (!(fs_1.default.existsSync(props.output) === false)) return [3 /*break*/, 4];
                    return [4 /*yield*/, fs_1.default.promises.mkdir(props.output, { recursive: true })];
                case 3:
                    _j.sent();
                    return [3 /*break*/, 8];
                case 4: return [4 /*yield*/, is_directory(props.output)];
                case 5:
                    if (!((_j.sent()) === false)) return [3 /*break*/, 8];
                    parent_1 = path_1.default.join(props.output, "..");
                    return [4 /*yield*/, is_directory(parent_1)];
                case 6:
                    if ((_j.sent()) === false)
                        throw new URIError("Error on TypiaGenerator.generate(): output path is not a directory.");
                    return [4 /*yield*/, fs_1.default.promises.mkdir(props.output)];
                case 7:
                    _j.sent();
                    _j.label = 8;
                case 8:
                    compilerOptions = typescript_1.default.parseJsonConfigFileContent(typescript_1.default.readConfigFile(props.project, typescript_1.default.sys.readFile).config, {
                        fileExists: typescript_1.default.sys.fileExists,
                        readFile: typescript_1.default.sys.readFile,
                        readDirectory: typescript_1.default.sys.readDirectory,
                        useCaseSensitiveFileNames: typescript_1.default.sys.useCaseSensitiveFileNames,
                    }, path_1.default.dirname(props.project)).options;
                    _b = (_a = typescript_1.default).createProgram;
                    return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                            var container;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        container = [];
                                        return [4 /*yield*/, gather(props)(container)(props.input)(props.output)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/, container];
                                }
                            });
                        }); })()];
                case 9:
                    program = _b.apply(_a, [_j.sent(), compilerOptions]);
                    diagnostics = [];
                    result = typescript_1.default.transform(program
                        .getSourceFiles()
                        .filter(function (file) {
                        return !file.isDeclarationFile &&
                            path_1.default.resolve(file.fileName).indexOf(props.input) !== -1;
                    }), [
                        ImportTransformer_1.ImportTransformer.transform(props.input)(props.output),
                        (0, transform_1.default)(program, (_h = ((_g = compilerOptions.plugins) !== null && _g !== void 0 ? _g : []).find(function (p) {
                            return p.transform === "typia/lib/transform" ||
                                p.transform === "../src/transform.ts";
                        })) !== null && _h !== void 0 ? _h : {}, {
                            addDiagnostic: function (diag) { return diagnostics.push(diag); },
                        }),
                    ], program.getCompilerOptions());
                    _loop_1 = function (diag) {
                        var file = diag.file
                            ? path_1.default.relative(diag.file.fileName, process.cwd())
                            : "(unknown file)";
                        var category = diag.category === typescript_1.default.DiagnosticCategory.Warning
                            ? "warning"
                            : diag.category === typescript_1.default.DiagnosticCategory.Error
                                ? "error"
                                : diag.category === typescript_1.default.DiagnosticCategory.Suggestion
                                    ? "suggestion"
                                    : diag.category === typescript_1.default.DiagnosticCategory.Message
                                        ? "message"
                                        : "unkown";
                        var _k = __read(diag.file
                            ? (function () {
                                var lines = diag
                                    .file.text.substring(0, diag.start)
                                    .split("\n");
                                if (lines.length === 0)
                                    return [0, 0];
                                return [lines.length, lines.at(-1).length + 1];
                            })()
                            : [0, 0], 2), line = _k[0], pos = _k[1];
                        console.error("".concat(file, ":").concat(line, ":").concat(pos, " - ").concat(category, " TS").concat(diag.code, ": ").concat(diag.messageText));
                    };
                    try {
                        // TRACE ERRORS
                        for (diagnostics_1 = __values(diagnostics), diagnostics_1_1 = diagnostics_1.next(); !diagnostics_1_1.done; diagnostics_1_1 = diagnostics_1.next()) {
                            diag = diagnostics_1_1.value;
                            _loop_1(diag);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (diagnostics_1_1 && !diagnostics_1_1.done && (_e = diagnostics_1.return)) _e.call(diagnostics_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    if (diagnostics.length)
                        process.exit(-1);
                    printer = typescript_1.default.createPrinter({
                        newLine: typescript_1.default.NewLineKind.LineFeed,
                    });
                    _j.label = 10;
                case 10:
                    _j.trys.push([10, 15, 16, 17]);
                    _c = __values(result.transformed), _d = _c.next();
                    _j.label = 11;
                case 11:
                    if (!!_d.done) return [3 /*break*/, 14];
                    file = _d.value;
                    to = path_1.default
                        .resolve(file.fileName)
                        .replace(props.input, props.output);
                    content = printer.printFile(file);
                    return [4 /*yield*/, fs_1.default.promises.writeFile(to, content, "utf8")];
                case 12:
                    _j.sent();
                    _j.label = 13;
                case 13:
                    _d = _c.next();
                    return [3 /*break*/, 11];
                case 14: return [3 /*break*/, 17];
                case 15:
                    e_1_1 = _j.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 17];
                case 16:
                    try {
                        if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 17: return [2 /*return*/];
            }
        });
    }); };
    var is_directory = function (current) { return __awaiter(_this, void 0, void 0, function () {
        var stat;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_1.default.promises.stat(current)];
                case 1:
                    stat = _a.sent();
                    return [2 /*return*/, stat.isDirectory()];
            }
        });
    }); };
    var gather = function (props) {
        return function (container) {
            return function (from) {
                return function (to) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b, file, next, stat, e_3_1;
                    var e_3, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                if (!(from === props.output)) return [3 /*break*/, 1];
                                return [2 /*return*/];
                            case 1:
                                if (!(fs_1.default.existsSync(to) === false)) return [3 /*break*/, 3];
                                return [4 /*yield*/, fs_1.default.promises.mkdir(to)];
                            case 2:
                                _d.sent();
                                _d.label = 3;
                            case 3:
                                _d.trys.push([3, 11, 12, 13]);
                                return [4 /*yield*/, fs_1.default.promises.readdir(from)];
                            case 4:
                                _a = __values.apply(void 0, [_d.sent()]), _b = _a.next();
                                _d.label = 5;
                            case 5:
                                if (!!_b.done) return [3 /*break*/, 10];
                                file = _b.value;
                                next = path_1.default.join(from, file);
                                return [4 /*yield*/, fs_1.default.promises.stat(next)];
                            case 6:
                                stat = _d.sent();
                                if (!stat.isDirectory()) return [3 /*break*/, 8];
                                return [4 /*yield*/, gather(props)(container)(next)(path_1.default.join(to, file))];
                            case 7:
                                _d.sent();
                                return [3 /*break*/, 9];
                            case 8:
                                if (is_supported_extension(file))
                                    container.push(next);
                                _d.label = 9;
                            case 9:
                                _b = _a.next();
                                return [3 /*break*/, 5];
                            case 10: return [3 /*break*/, 13];
                            case 11:
                                e_3_1 = _d.sent();
                                e_3 = { error: e_3_1 };
                                return [3 /*break*/, 13];
                            case 12:
                                try {
                                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                }
                                finally { if (e_3) throw e_3.error; }
                                return [7 /*endfinally*/];
                            case 13: return [2 /*return*/];
                        }
                    });
                }); };
            };
        };
    };
    var is_supported_extension = function (filename) {
        return ((filename.endsWith(".ts") && !filename.endsWith(".d.ts")) ||
            (filename.endsWith(".tsx") && !filename.endsWith(".d.tsx")));
    };
})(TypiaProgrammer || (exports.TypiaProgrammer = TypiaProgrammer = {}));
//# sourceMappingURL=TypiaProgrammer.js.map