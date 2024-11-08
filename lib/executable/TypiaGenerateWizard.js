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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypiaGenerateWizard = void 0;
var fs_1 = __importDefault(require("fs"));
var TypiaProgrammer_1 = require("../programmers/TypiaProgrammer");
var ArgumentParser_1 = require("./setup/ArgumentParser");
var PackageManager_1 = require("./setup/PackageManager");
var TypiaGenerateWizard;
(function (TypiaGenerateWizard) {
    var _this = this;
    function generate() {
        return __awaiter(this, void 0, void 0, function () {
            var pack, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("----------------------------------------");
                        console.log(" Typia Generate Wizard");
                        console.log("----------------------------------------");
                        return [4 /*yield*/, PackageManager_1.PackageManager.mount()];
                    case 1:
                        pack = _a.sent();
                        return [4 /*yield*/, ArgumentParser_1.ArgumentParser.parse(pack)(inquiry)];
                    case 2:
                        options = _a.sent();
                        return [4 /*yield*/, TypiaProgrammer_1.TypiaProgrammer.build(options)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    TypiaGenerateWizard.generate = generate;
    var inquiry = function (_pack, command, prompt, action) { return __awaiter(_this, void 0, void 0, function () {
        var questioned, input, select, configure;
        var _this = this;
        return __generator(this, function (_a) {
            // PREPARE ASSETS
            command.option("--input [path]", "input directory");
            command.option("--output [directory]", "output directory");
            command.option("--project [project]", "tsconfig.json file location");
            questioned = { value: false };
            input = function (name) { return function (message) { return __awaiter(_this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, prompt()({
                                type: "input",
                                name: name,
                                message: message,
                                default: "",
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result[name]];
                    }
                });
            }); }; };
            select = function (name) {
                return function (message) {
                    return function (choices) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    questioned.value = true;
                                    return [4 /*yield*/, prompt()({
                                            type: "list",
                                            name: name,
                                            message: message,
                                            choices: choices,
                                        })];
                                case 1: return [2 /*return*/, (_a.sent())[name]];
                            }
                        });
                    }); };
                };
            };
            configure = function () { return __awaiter(_this, void 0, void 0, function () {
                var files;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fs_1.default.promises.readdir(process.cwd())];
                        case 1: return [4 /*yield*/, (_a.sent()).filter(function (str) {
                                return str.substring(0, 8) === "tsconfig" &&
                                    str.substring(str.length - 5) === ".json";
                            })];
                        case 2:
                            files = _a.sent();
                            if (files.length === 0)
                                throw new URIError("Unable to find \"tsconfig.json\" file.");
                            else if (files.length === 1)
                                return [2 /*return*/, files[0]];
                            return [2 /*return*/, select("tsconfig")("TS Config File")(files)];
                    }
                });
            }); };
            return [2 /*return*/, action(function (options) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b, _c, _d, _e, _f;
                    var _g, _h, _j;
                    return __generator(this, function (_k) {
                        switch (_k.label) {
                            case 0:
                                if (!((_g = options.input) !== null && _g !== void 0)) return [3 /*break*/, 1];
                                _a = _g;
                                return [3 /*break*/, 3];
                            case 1:
                                _b = options;
                                return [4 /*yield*/, input("input")("input directory")];
                            case 2:
                                _a = (_b.input = _k.sent());
                                _k.label = 3;
                            case 3:
                                _a;
                                if (!((_h = options.output) !== null && _h !== void 0)) return [3 /*break*/, 4];
                                _c = _h;
                                return [3 /*break*/, 6];
                            case 4:
                                _d = options;
                                return [4 /*yield*/, input("output")("output directory")];
                            case 5:
                                _c = (_d.output = _k.sent());
                                _k.label = 6;
                            case 6:
                                _c;
                                if (!((_j = options.project) !== null && _j !== void 0)) return [3 /*break*/, 7];
                                _e = _j;
                                return [3 /*break*/, 9];
                            case 7:
                                _f = options;
                                return [4 /*yield*/, configure()];
                            case 8:
                                _e = (_f.project = _k.sent());
                                _k.label = 9;
                            case 9:
                                _e;
                                return [2 /*return*/, options];
                        }
                    });
                }); })];
        });
    }); };
})(TypiaGenerateWizard || (exports.TypiaGenerateWizard = TypiaGenerateWizard = {}));
//# sourceMappingURL=TypiaGenerateWizard.js.map