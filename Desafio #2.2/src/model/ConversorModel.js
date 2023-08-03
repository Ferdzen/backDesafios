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
class CurrencyConverter {
    constructor() {
        this.apiBaseUrl = "https://api.exchangerate-api.com/v4/latest/";
    }
    convertCurrency(fromCurrency, toCurrency, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            if (fromCurrency === toCurrency) {
                throw new Error("As moedas de origem e destino devem ser diferentes.");
            }
            if (fromCurrency.length !== 3 || toCurrency.length !== 3) {
                throw new Error("As moedas devem ter exatamente 3 caracteres.");
            }
            if (amount <= 0) {
                throw new Error("O valor de entrada deve ser maior que zero.");
            }
            const response = yield axios_1.default.get(`${this.apiBaseUrl}${fromCurrency}`);
            const rates = response.data.rates;
            const exchangeRate = rates[toCurrency];
            if (!exchangeRate) {
                throw new Error("As moedas de origem e destino não são suportadas.");
            }
            const convertedAmount = amount * exchangeRate;
            return {
                convertedAmount: Number(convertedAmount.toFixed(2)),
                exchangeRate: Number(exchangeRate.toFixed(6)),
            };
        });
    }
}
exports.default = CurrencyConverter;
