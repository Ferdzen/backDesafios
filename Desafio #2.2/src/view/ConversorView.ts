/**
 * Classe UI = inputs e outputs para o usuário
 */
export default class ConversorView {
  async getAtualMoeda(): Promise<string> {
    return this.getUserInput(
      "Digite a moeda de origem (3 caracteres) ou digite vazio para sair: "
    );
  }

  async getMoedaDesejada(): Promise<string> {
    return this.getUserInput("Digite a moeda de destino (3 caracteres): ");
  }

  async getQuantia(): Promise<number> {
    const input = await this.getUserInput("Digite o valor monetário: ");
    return parseFloat(input);
  }

  displayResultado(atualMoeda: string, moedaDesejada: string, resultado: {
    quantiaConvertida: number;
    taxaCambio: number;
  }): void {
    console.log(
      `Valor convertido de ${atualMoeda} para ${moedaDesejada}: ${resultado.quantiaConvertida}`
    );
    console.log(`Taxa de conversão: ${resultado.taxaCambio}`);
  }

  displayError(error: Error): void {
    console.error("Erro:", error.message);
  }

  private async getUserInput(promptMessage: string): Promise<string> {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise<string>((resolve) => {
      readline.question(promptMessage, (input: string) => {
        readline.close();
        resolve(input.trim());
      });
    });
  }
}
