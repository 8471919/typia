#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var USAGE = "Wrong command has been detected. Use like below:\n\n  npx typia setup \\\n    --manager (npm|pnpm|yarn) \\\n    --project {tsconfig.json file path}\n\n    - npx typia setup\n    - npx typia setup --manager pnpm\n    - npx typia setup --project tsconfig.test.json\n\n  npx typia generate \n    --input {directory} \\\n    --output {directory}\n\n    --npx typia generate --input src/templates --output src/functinoal\n";
var halt = function (desc) {
    console.error(desc);
    process.exit(-1);
};
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, type, TypiaSetupWizard, TypiaPatchWizard, _b, TypiaGenerateWizard;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("comment-json")); })];
            case 1:
                _c.sent();
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("inquirer")); })];
            case 2:
                _c.sent();
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("commander")); })];
            case 3:
                _c.sent();
                return [3 /*break*/, 5];
            case 4:
                _a = _c.sent();
                halt("typia has not been installed. Run \"npm i typia\" before.");
                return [3 /*break*/, 5];
            case 5:
                type = process.argv[2];
                if (!(type === "setup")) return [3 /*break*/, 8];
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./TypiaSetupWizard")); })];
            case 6:
                TypiaSetupWizard = (_c.sent()).TypiaSetupWizard;
                return [4 /*yield*/, TypiaSetupWizard.setup()];
            case 7:
                _c.sent();
                return [3 /*break*/, 19];
            case 8:
                if (!(type === "patch")) return [3 /*break*/, 11];
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./TypiaPatchWizard")); })];
            case 9:
                TypiaPatchWizard = (_c.sent()).TypiaPatchWizard;
                return [4 /*yield*/, TypiaPatchWizard.main()];
            case 10:
                _c.sent();
                return [3 /*break*/, 19];
            case 11:
                if (!(type === "generate")) return [3 /*break*/, 18];
                _c.label = 12;
            case 12:
                _c.trys.push([12, 14, , 15]);
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("typescript")); })];
            case 13:
                _c.sent();
                return [3 /*break*/, 15];
            case 14:
                _b = _c.sent();
                halt("typescript has not been installed. Run \"npm i -D typescript\" before.");
                return [3 /*break*/, 15];
            case 15: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./TypiaGenerateWizard")); })];
            case 16:
                TypiaGenerateWizard = (_c.sent()).TypiaGenerateWizard;
                return [4 /*yield*/, TypiaGenerateWizard.generate()];
            case 17:
                _c.sent();
                return [3 /*break*/, 19];
            case 18:
                halt(USAGE);
                _c.label = 19;
            case 19: return [2 /*return*/];
        }
    });
}); };
main().catch(function (exp) {
    console.error(exp);
    process.exit(-1);
});
//# sourceMappingURL=typia.js.map