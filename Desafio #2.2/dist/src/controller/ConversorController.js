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
Object.defineProperty(exports, "__esModule", { value: true });
class ConversorController {
    /**
     * Construtor do controller.
     * @param conversorModel = instância do model do conversor
     * @param conversorView = instância da view do conversor
     */
    constructor(conversorModel, conversorView) {
        this.conversorModel = conversorModel;
        this.conversorView = conversorView;
    }
    /**
     * Realiza operação de conversão da moeda.
     */
    iniciaConversao() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                while (true) {
                    const atualMoeda = yield this.conversorView.getAtualMoeda();
                    if (atualMoeda === "") {
                        console.log("Encerrando a aplicação.");
                        return;
                    }
                    const moedaDesejada = yield this.conversorView.getMoedaDesejada();
                    const quantia = yield this.conversorView.getQuantia();
                    const resultado = yield this.conversorModel.converteMoeda(atualMoeda, moedaDesejada, quantia);
                    this.conversorView.displayResultado(atualMoeda, moedaDesejada, resultado);
                }
            }
            catch (error) {
                this.conversorView.displayError(error);
            }
        });
    }
}
exports.default = ConversorController;
