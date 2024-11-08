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
exports.TypiaSetupWizard = void 0;
var fs_1 = __importDefault(require("fs"));
var package_manager_detector_1 = require("package-manager-detector");
var ArgumentParser_1 = require("./setup/ArgumentParser");
var CommandExecutor_1 = require("./setup/CommandExecutor");
var PackageManager_1 = require("./setup/PackageManager");
var PluginConfigurator_1 = require("./setup/PluginConfigurator");
var TypiaSetupWizard;
(function (TypiaSetupWizard) {
    var _this = this;
    TypiaSetupWizard.setup = function () { return __awaiter(_this, void 0, void 0, function () {
        var pack, args, _a, _b;
        var _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    console.log("----------------------------------------");
                    console.log(" Typia Setup Wizard");
                    console.log("----------------------------------------");
                    return [4 /*yield*/, PackageManager_1.PackageManager.mount()];
                case 1:
                    pack = _e.sent();
                    return [4 /*yield*/, ArgumentParser_1.ArgumentParser.parse(pack)(inquiry)];
                case 2:
                    args = _e.sent();
                    // INSTALL TYPESCRIPT COMPILERS
                    _b = (_a = pack).install;
                    _c = {
                        dev: true,
                        modulo: "typescript"
                    };
                    return [4 /*yield*/, getTypeScriptVersion()];
                case 3:
                    // INSTALL TYPESCRIPT COMPILERS
                    _b.apply(_a, [(_c.version = _e.sent(),
                            _c)]);
                    pack.install({ dev: true, modulo: "ts-patch", version: "latest" });
                    (_d = args.project) !== null && _d !== void 0 ? _d : (args.project = (function () {
                        var runner = pack.manager === "npm" ? "npx" : pack.manager;
                        CommandExecutor_1.CommandExecutor.run("".concat(runner, " tsc --init"));
                        return (args.project = "tsconfig.json");
                    })());
                    // SETUP TRANSFORMER
                    return [4 /*yield*/, pack.save(function (data) {
                            var _a;
                            // COMPOSE PREPARE COMMAND
                            (_a = data.scripts) !== null && _a !== void 0 ? _a : (data.scripts = {});
                            if (typeof data.scripts.prepare === "string" &&
                                data.scripts.prepare.trim().length) {
                                if (data.scripts.prepare.indexOf("ts-patch install") === -1 &&
                                    data.scripts.prepare.indexOf("typia patch") === -1)
                                    data.scripts.prepare =
                                        "ts-patch install && typia patch && " + data.scripts.prepare;
                                else if (data.scripts.prepare.indexOf("ts-patch install") === -1)
                                    data.scripts.prepare = "ts-patch install && " + data.scripts.prepare;
                                else if (data.scripts.prepare.indexOf("typia patch") === -1)
                                    data.scripts.prepare = data.scripts.prepare.replace("ts-patch install", "ts-patch install && typia patch");
                            }
                            else
                                data.scripts.prepare = "ts-patch install && typia patch";
                            // FOR OLDER VERSIONS
                            if (typeof data.scripts.postinstall === "string") {
                                data.scripts.postinstall = data.scripts.postinstall
                                    .split("&&")
                                    .map(function (str) { return str.trim(); })
                                    .filter(function (str) { return str.indexOf("ts-patch install") === -1; })
                                    .join(" && ");
                                if (data.scripts.postinstall.length === 0)
                                    delete data.scripts.postinstall;
                            }
                        })];
                case 4:
                    // SETUP TRANSFORMER
                    _e.sent();
                    // CONFIGURE TYPIA
                    return [4 /*yield*/, PluginConfigurator_1.PluginConfigurator.configure(args)];
                case 5:
                    // CONFIGURE TYPIA
                    _e.sent();
                    CommandExecutor_1.CommandExecutor.run("".concat(pack.manager, " run prepare"));
                    return [2 /*return*/];
            }
        });
    }); };
    var inquiry = function (pack, command, prompt, action) { return __awaiter(_this, void 0, void 0, function () {
        var questioned, select, configure;
        var _this = this;
        return __generator(this, function (_a) {
            // PREPARE ASSETS
            command.option("--manager [manager", "package manager");
            command.option("--project [project]", "tsconfig.json file location");
            questioned = { value: false };
            select = function (name) {
                return function (message) {
                    return function (choices, filter) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    questioned.value = true;
                                    return [4 /*yield*/, prompt()(__assign({ type: "list", name: name, message: message, choices: choices }, (filter
                                            ? {
                                                filter: filter,
                                            }
                                            : {})))];
                                case 1: return [2 /*return*/, (_a.sent())[name]];
                            }
                        });
                    }); };
                };
            };
            configure = function () { return __awaiter(_this, void 0, void 0, function () {
                var fileList;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fs_1.default.promises.readdir(process.cwd())];
                        case 1: return [4 /*yield*/, (_a.sent())
                                .filter(function (str) {
                                return str.substring(0, 8) === "tsconfig" &&
                                    str.substring(str.length - 5) === ".json";
                            })
                                .sort(function (x, y) {
                                return x === "tsconfig.json"
                                    ? -1
                                    : y === "tsconfig.json"
                                        ? 1
                                        : x < y
                                            ? -1
                                            : 1;
                            })];
                        case 2:
                            fileList = _a.sent();
                            if (fileList.length === 0) {
                                if (process.cwd() !== pack.directory)
                                    throw new URIError("Unable to find \"tsconfig.json\" file.");
                                return [2 /*return*/, null];
                            }
                            else if (fileList.length === 1)
                                return [2 /*return*/, fileList[0]];
                            return [2 /*return*/, select("tsconfig")("TS Config File")(fileList)];
                    }
                });
            }); };
            // DO CONSTRUCT
            return [2 /*return*/, action(function (options) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b, _c, _d, _e, _f;
                    var _g, _h, _j;
                    return __generator(this, function (_k) {
                        switch (_k.label) {
                            case 0:
                                _a = pack;
                                if (!((_g = options.manager) !== null && _g !== void 0)) return [3 /*break*/, 1];
                                _b = _g;
                                return [3 /*break*/, 6];
                            case 1:
                                _c = options;
                                return [4 /*yield*/, detectManager()];
                            case 2:
                                if (!((_h = (_k.sent())) !== null && _h !== void 0)) return [3 /*break*/, 3];
                                _d = _h;
                                return [3 /*break*/, 5];
                            case 3: return [4 /*yield*/, select("manager")("Package Manager")([
                                    "npm",
                                    "pnpm",
                                    "bun",
                                    "yarn (berry is not supported)",
                                ], function (value) { return value.split(" ")[0]; })];
                            case 4:
                                _d = (_k.sent());
                                _k.label = 5;
                            case 5:
                                _b = (_c.manager = _d);
                                _k.label = 6;
                            case 6:
                                _a.manager = _b;
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
                                if (questioned.value)
                                    console.log("");
                                return [2 /*return*/, options];
                        }
                    });
                }); })];
        });
    }); };
    var detectManager = function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, package_manager_detector_1.detect)({ cwd: process.cwd() })];
                case 1:
                    result = _b.sent();
                    if ((result === null || result === void 0 ? void 0 : result.name) === "npm")
                        return [2 /*return*/, null]; // NPM case is still selectable
                    return [2 /*return*/, (_a = result === null || result === void 0 ? void 0 : result.name) !== null && _a !== void 0 ? _a : null];
            }
        });
    }); };
    var getTypeScriptVersion = function () { return __awaiter(_this, void 0, void 0, function () {
        var content, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_1.default.promises.readFile("".concat(__dirname, "/../../package.json"), "utf-8")];
                case 1:
                    content = _a.sent();
                    json = JSON.parse(content);
                    return [2 /*return*/, json.devDependencies.typescript];
            }
        });
    }); };
})(TypiaSetupWizard || (exports.TypiaSetupWizard = TypiaSetupWizard = {}));
//# sourceMappingURL=TypiaSetupWizard.js.map