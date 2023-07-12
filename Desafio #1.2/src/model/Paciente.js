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

    //TODO: Método delete
    
    //Método lista paciente ordenado por CPF
    ordenaPacientesCPF(){
        let pacientesOrdenados = this.pacientes;
        pacientesOrdenados = pacientesOrdenados.sort((a, b) => a.cpf.localeCompare(b.cpf));

        return pacientesOrdenados;
    }
    //Método lista paciente ordenado por Nome
    ordenaPacientesNome(nome){
        let pacientesOrdenados = this.pacientes;
        pacientesOrdenados = pacientesOrdenados.sort((a, b) => a.nome.localeCompare(b.nome));
    
        return pacientesOrdenados;
        
    }


    //Métodos para formatações
    formataCPF(cpf){
        let cpfFormatado = cpf.join('');
        return cpfFormatado.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
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

// TESTES
/*
let p = new Paciente();
/*
let cpf = "944.585.130-79" // CPF gerado em ferramenta online para teste
let cpf2 = "944.130.585-79" 

console.log(p.validaDvsCpf(cpf))
console.log(p.validaDvsCpf(cpf2))


p.nomePaciente = "Juliano";
p.nascimentoPaciente = "20-05-1980";
p.cpfPessoa = "112.689.174-52";


p.cadastraPaciente();
p.cadastraPaciente();
p.cadastraPaciente();

console.log(p)*/