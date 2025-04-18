"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Gallows = function (_a) {
    var _b = _a.tries, tries = _b === void 0 ? 0 : _b;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Hangman"),
        react_1.default.createElement("p", null,
            "Count: ",
            tries)));
};
exports.default = Gallows;
