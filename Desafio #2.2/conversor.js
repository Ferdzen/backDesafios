"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConversorModel_1 = __importDefault(require("./src/model/ConversorModel"));
const ConversorController_1 = __importDefault(require("./src/controller/ConversorController"));
const ConversorView_1 = __importDefault(require("./src/view/ConversorView"));
const currencyConverter = new ConversorModel_1.default();
const currencyConverterView = new ConversorView_1.default();
const currencyConverterController = new ConversorController_1.default(currencyConverter, currencyConverterView);
currencyConverterController.handleConversion();
