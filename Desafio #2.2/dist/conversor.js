"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConversorModel_1 = __importDefault(require("./src/model/ConversorModel"));
const ConversorController_1 = __importDefault(require("./src/controller/ConversorController"));
const ConversorView_1 = __importDefault(require("./src/view/ConversorView"));
/**
 * Cria os objetos model e view e passa como instância para o objeto controller.
 */
const conversorModel = new ConversorModel_1.default();
const conversorView = new ConversorView_1.default();
const conversorController = new ConversorController_1.default(conversorModel, conversorView);
/**
 * Inicia execução do programa.
 */
conversorController.iniciaConversao();
