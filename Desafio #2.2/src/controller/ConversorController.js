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
class CurrencyConverterController {
    constructor(currencyConverter, currencyConverterView) {
        this.currencyConverter = currencyConverter;
        this.currencyConverterView = currencyConverterView;
    }
    handleConversion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                while (true) {
                    const fromCurrency = yield this.currencyConverterView.getFromCurrency();
                    if (fromCurrency === "") {
                        console.log("Encerrando a aplicação.");
                        return;
                    }
                    const toCurrency = yield this.currencyConverterView.getToCurrency();
                    const amount = yield this.currencyConverterView.getAmount();
                    const result = yield this.currencyConverter.convertCurrency(fromCurrency, toCurrency, amount);
                    this.currencyConverterView.displayResult(fromCurrency, toCurrency, result);
                }
            }
            catch (error) {
                this.currencyConverterView.displayError(error);
            }
        });
    }
}
exports.default = CurrencyConverterController;
