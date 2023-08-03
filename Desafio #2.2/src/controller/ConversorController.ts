import ConversorModel from "../model/ConversorModel";
import ConversorView from "../view/ConversorView";

export default class ConversorController {
  private conversorModel: ConversorModel;
  private conversorView: ConversorView;

  /**
   * Construtor do controller.
   * @param conversorModel = instância do model do conversor
   * @param conversorView = instância da view do conversor
   */
  constructor(conversorModel: ConversorModel, conversorView: ConversorView) {
    this.conversorModel = conversorModel;
    this.conversorView = conversorView;
  }

  /**
   * Realiza operação de conversão da moeda.
   */
  async iniciaConversao(): Promise<void> {
    try {
      while (true) {
        const atualMoeda = await this.conversorView.getAtualMoeda();

        if (atualMoeda === "") {
          console.log("Encerrando a aplicação.");
          return;
        }

        const moedaDesejada = await this.conversorView.getMoedaDesejada();
        const quantia = await this.conversorView.getQuantia();

        const resultado = await this.conversorModel.converteMoeda(
          atualMoeda,
          moedaDesejada,
          quantia
        );

        this.conversorView.displayResultado(atualMoeda, moedaDesejada, resultado);
      }
    } catch (error: any) {
      this.conversorView.displayError(error as Error);
    }
  }
}