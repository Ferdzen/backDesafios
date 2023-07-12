import ControllerPaciente from "../controller/ControllerPaciente.js";
export default class Paciente {
    #nome;
    #cpf;
    #dataNasc;

    constructor() {
        this.#nome = null;
        this.#cpf = null;
        this.#dataNasc = null;
        this.pacientes = []
    }

    //Método para cadastro de paciente
    cadastraPaciente() {
        const paciente = {
            nome: this.#nome,
            dataNasc: this.#dataNasc,
            cpf: this.#cpf,
        }
        this.pacientes.push(paciente)
    }

    //Método busca paciente
    buscaPaciente(cpf){
        //Busca matricula e verifica se ela existe
        let indexPaciente = this.pacientes.findIndex(paciente => paciente.cpf === cpf);

        if (indexPaciente === -1) {
            return false;
        }else{
            return indexPaciente; //retorna posição do array se paciente é encontrado
        }
    }

    //TODO: Método delete
    deletaPaciente(cpf){
        //formata entrada do CPF, caso seja digitado com ou sem a pontuação.
        let cpfVerificado = this.formataCPF(cpf);
        //procura paciente na base de dados
        let buscaPaciente = this.buscaPaciente(cpfVerificado);

        if(buscaPaciente === false){ //verifica se existe na base de dados
            return false;
        }else{
            //deleta paciente encontrado
            this.pacientes.splice(buscaPaciente, 1);
            return true;
        }
    }
    
    //Método lista paciente ordenado por CPF
    ordenaPacientesCPF(){
        let pacientesOrdenados = this.pacientes;
        pacientesOrdenados = pacientesOrdenados.slice().sort((a, b) => a.cpf.localeCompare(b.cpf));

        return pacientesOrdenados;
    }
    //Método lista paciente ordenado por Nome
    ordenaPacientesNome(){
        let pacientesOrdenados = this.pacientes;
        pacientesOrdenados = pacientesOrdenados.slice().sort((a, b) => a.nome.localeCompare(b.nome))
    
        return pacientesOrdenados;   
    }


    //Métodos para formatações
    formataCPF(cpf){
        if(cpf.lenght >11){
            return cpf;
        }else{
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }
    }

    formataDataNasc(dia, mes, ano){
        return `${dia}/${mes}/${ano}`
    }

    //Setagem variaveis
    set nomePaciente(nomePaciente) {
        this.#nome = nomePaciente;
    }

    set cpfPessoa(cpfPessoa) {
        this.#cpf = cpfPessoa;
    }
    set nascimentoPaciente(dataPaciente) {
        this.#dataNasc = dataPaciente;
    }

    //retornos
    get nome() {
        return this.#nome;
    }
    get cpf() {
        return this.#cpf;
    }
    get dataNasc() {
        return this.#dataNasc;
    }

    //Métodos para validações

    //Validação do CPF pela verificação dos DVs
    validaDvsCpf(cpf) {
        const cp = new ControllerPaciente()
        const cpfArray = cp.converteCPF(cpf);
        let soma = 0;
        let j = null;
        let dv1 = null;
        let dv2 = null;

        //verifição do 1° digito
        if (dv1 == null) {
            j = 10;
            for (let i = 0; i < 9; i++) {
                soma = soma + (cpfArray[i] * j);
                j--;
            }

            if (soma % 11 == 0 || soma % 11 == 1) {
                dv1 = 0;
            } else {
                dv1 = 11 - (soma % 11)
            }
        }

        //verifição do 2° digito
        if (dv2 == null) {
            j = 11;
            soma = 0;
            for (let i = 0; i < 10; i++) {
                soma = soma + (cpfArray[i] * j);
                j--;
            }

            if (soma % 11 == 0 || soma % 11 == 1) {
                dv2 = 0;
            } else {
                let resto = parseInt(soma % 11)
                dv2 = 11 - resto;
            }
        }

        //Se o CPF fror válido, o retorno será TRUE e vice versa.
        if (cpfArray[9] === dv1 && cpfArray[10] === dv2) {
            return true;
        } else {
            return false;
        }
    }

    //Método que verifica se paciente já foi cadastrado
    verificaRegistro(cpfPaciente){
        let verificacao = this.pacientes.find(paciente => paciente.cpf === cpfPaciente);
        //Se houver registro o retorno será TRUE e vice versa.
        if(verificacao != null){
            return true;
        }else{
            return false;
        }
    }

    //Método que verifica idade do paciente para cadastro
    verificaIdade(dia, mes, ano){
        let dataHoje = new Date();

        let idade = dataHoje.getFullYear() - ano;
        let mesAtual = parseInt(dataHoje.getMonth());
        let diaAtual = parseInt(dataHoje.getDay());

        if (mesAtual < mes || (mesAtual === mes && diaAtual < dia)) {
            idade--;
        }

        return idade;
    }

}