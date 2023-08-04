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
/**
 * Classe UI = inputs e outputs para o usuário
 */
class ConversorView {
    getAtualMoeda() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getUserInput("Digite a moeda de origem (3 caracteres) ou digite vazio para sair: ");
        });
    }
    getMoedaDesejada() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getUserInput("Digite a moeda de destino (3 caracteres): ");
        });
    }
    getQuantia() {
        return __awaiter(this, void 0, void 0, function* () {
            const input = yield this.getUserInput("Digite o valor monetário: ");
            return parseFloat(input);
        });
    }
    displayResultado(atualMoeda, moedaDesejada, resultado) {
        console.log(`Valor convertido de ${atualMoeda} para ${moedaDesejada}: ${resultado.quantiaConvertida}`);
        console.log(`Taxa de conversão: ${resultado.taxaCambio}`);
    }
    displayError(error) {
        console.error("Erro:", error.message);
    }
    getUserInput(promptMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            const readline = require("readline").createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            return new Promise((resolve) => {
                readline.question(promptMessage, (input) => {
                    readline.close();
                    resolve(input.trim());
                });
            });
        });
    }
}
exports.default = ConversorView;
