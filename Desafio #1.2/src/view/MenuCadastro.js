import PromptSync from 'prompt-sync';
const prompt = PromptSync({ sigint: true }); // Entrada de dados

export default class MenuCadastro {
    //Classe responsável pelo visual do menu cadastro
    imprimeOpcoesCadastro() {
        console.log('Menu do cadstro de Pacientes')
        console.log('1-Cadastrar novo paciente')
        console.log('2-Excluir paciente')
        console.log('3-Listar pacientes (ordenado por CPF)')
        console.log('4-Listar pacientes (ordenado por nome)')
        console.log('5-Voltar p/ menu principal')
    }

    //Entrada de dados
    recebeNome(){
        let nome = prompt("Nome:")
        return nome;
    }
    recebeCpf(){
        let cpf = prompt("CPF:")
        return cpf;
    }
    recebeDataNascimento(){
        console.log("Data de Nascimento")
        let dia = prompt("Dia:")
        let mes = prompt("Mes:")
        let ano = prompt("Ano:")
        let dtNasc = [dia, mes, ano]
        return dtNasc;
    }

    //Mensagens de processo de exclusão de paciente
    mensagemDeletaPacienteInput(){
        return console.log("Insira o dado do paciente para exclusão abaixo.");
    }

    mensagemNaoEncontrado(){
        return console.log("Não há paciente sob este CPF registrado no sistema");
    }

    mensagemDeletaSucesso(){
        return console.log("Paciente excluído com sucesso!")
    }

    //Mensagem de Cadastro bem sucedido
    mensagemCadastroSucesso(){
        return console.log("Paciente cadastrado com sucesso!");
    }

    //Mensagens de erro de input
    mensagemErroInput(nome, cpf){
        return console.log(`Nome: ${nome}\nCPF: ${cpf}\nEntrada de dados incorreta.`)
    }

    mensagemErroNome() {
        return console.log("Erro: Nome inválido, caracteres insuficientes.");
    }

    mensagemErroQtdCpf() {
        return console.log("Erro: CPF inválido, quantidade de caracteres insuficientes.")
    }

    mensagemErroDigitosIguaisCpf() {
        return console.log("Erro: Caracteres iguais não configuram um CPF.")
    }

    
    //Mensagens de erro de validação
    mensagemErroValidacao(nome, cpf, dataNasc){
        return console.log(`Nome: ${nome}\nCPF: ${cpf}\nData de Nascimento: ${dataNasc}\nErro de validação.`)
    }
    
    mensagemErroCpfExistente(){
        return console.log("Erro: CPF já cadastrado no sistema.")
    }
    
    mensagemErroCpfInvalido(){
        return console.log("Erro: CPF inválido, DVs não conferem.")
    }

    mensagemErroIdade(){
        return console.log("Erro: paciente deve ter pelo menos 13 anos.")
    }
}