
/**
 * Classe de retorno de dados.
 */
class Output{
    /**
     * Impressão do dado sem pular linha
     * @param {*} dado - Dado a ser impresso 
     */
    write(dado){
        process.stdout.write(dado);
    }

    /**
     * Impressão do dado e pula uma linha
     * @param {*} dado - Dado a ser impresso 
     */
    writeNext(dado){
        process.stdout.write(`${dado}\n`);
    }
}

export default Output;