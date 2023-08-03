export default interface IConversor {
  converteMoeda(
    atualMoeda: string,
    moedaDesejada: string,
    quantia: number
  ): Promise<{ quantiaConvertida: number; taxaCambio: number }>;
}
