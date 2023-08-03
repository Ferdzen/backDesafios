import IConversor from "../interface/Interface";
import axios from "axios";

export default class ConversorModel implements IConversor {
  private apiBaseUrl: string = "https://api.exchangerate-api.com/v4/latest/";

  /**
   * Faz a conversão do valor para a moeda desejada. Apresenta mensagem de erro caso inputs estejam * incorretos.
   * @param {String} atualMoeda = Moeda inserida para conversão
   * @param {String} moedaDesejada = Moeda ao qual deseja para conversão 
   * @param {Number} quantia = Quantia a qual será convertida 
   * @returns {Number} = duas variaveis do tipo number, uma com valor convertido e a outra com a taxa de conversão. 
   */
  async converteMoeda(
    atualMoeda: string,
    moedaDesejada: string,
    quantia: number
  ): Promise<{ quantiaConvertida: number; taxaCambio: number }> {
    if (atualMoeda === moedaDesejada) {
      throw new Error("As moedas de origem e destino devem ser diferentes.");
    }

    if (atualMoeda.length !== 3 || moedaDesejada.length !== 3) {
      throw new Error("As moedas devem ter exatamente 3 caracteres.");
    }

    if (quantia <= 0) {
      throw new Error("O valor de entrada deve ser maior que zero.");
    }

    const response = await axios.get(`${this.apiBaseUrl}${atualMoeda}`);
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
  }
}
