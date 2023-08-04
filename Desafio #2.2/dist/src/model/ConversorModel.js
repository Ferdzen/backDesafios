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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class ConversorModel {
    constructor() {
        this.apiBaseUrl = "https://api.exchangerate-api.com/v4/latest/";
    }
    /**
     * Faz a conversão do valor para a moeda desejada. Apresenta mensagem de erro caso inputs estejam * incorretos.
     * @param {String} atualMoeda = Moeda inserida para conversão
     * @param {String} moedaDesejada = Moeda ao qual deseja para conversão
     * @param {Number} quantia = Quantia a qual será convertida
     * @returns {Number} = duas variaveis do tipo number, uma com valor convertido e a outra com a taxa de conversão.
     */
    converteMoeda(atualMoeda, moedaDesejada, quantia) {
        return __awaiter(this, void 0, void 0, function* () {
            if (atualMoeda === moedaDesejada) {
                throw new Error("As moedas de origem e destino devem ser diferentes.");
            }
            if (atualMoeda.length !== 3 || moedaDesejada.length !== 3) {
                throw new Error("As moedas devem ter exatamente 3 caracteres.");
            }
            if (quantia <= 0) {
                throw new Error("O valor de entrada deve ser maior que zero.");
            }
            const response = yield axios_1.default.get(`${this.apiBaseUrl}${atualMoeda}`);
            const rates = response.data.rates;
            const taxaCambio = rates[moedaDesejada];
            if (!taxaCambio) {
                throw new Error("As moedas de origem e destino não são suportadas.");
            }
            const quantiaConvertida = quantia * taxaCambio;
            return {
                quantiaConvertida: Number(quantiaConvertida.toFixed(2)),
                taxaCambio: Number(taxaCambio.toFixed(6)),
            };
        });
    }
}
exports.default = ConversorModel;
