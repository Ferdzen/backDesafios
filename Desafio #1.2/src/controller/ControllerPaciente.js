import MenuCadastro from "../view/MenuCadastro.js";
import Paciente from "../model/Paciente.js"
import Table from 'cli-table'; //impressão de listagens

export default class ControllerPaciente {

    //O objetivo desta classe é receber os dados do usuário e fazer a primeira leva de tratamento de dados, que consiste na verificação se o input foi feito corretamente e conversão para posteriores validações na classe Paciente.
    constructor() {
        this.viewCadastro = new MenuCadastro();
        this.modelPaciente = new Paciente();
    }

    //Métodos de processos principais do menu de cadastro\\
    //Método de cadastro de paciente
    iniciaCadastro() {
        let nome = this.viewCadastro.recebeNome();
        let cpf = this.viewCadastro.recebeCpf();
        let dataNasc = this.viewCadastro.recebeDataNascimento();

        //Verificando se inputs foram corretos
        if (this.validaNome(nome) == true && (this.qtdCaracteresCPF(cpf) == true && this.verificaDigitosCPF(cpf) == false)) {
            //Validação de dados
            if (this.modelPaciente.validaDvsCpf(cpf) == true &&
                this.modelPaciente.verificaIdade(dataNasc[0], dataNasc[1], dataNasc[2]) >= 13) {
                if (this.modelPaciente.verificaRegistro(this.modelPaciente.formataCPF(cpf)) == false) {
                    //Enviando dados tratados para Model

                    this.modelPaciente.nomePaciente = nome;
                    this.modelPaciente.cpfPessoa = cpf;
                    this.modelPaciente.nascimentoPaciente = this.modelPaciente.formataData(dataNasc[0], dataNasc[1], dataNasc[2]);

                    //Cadastrando paciente
                    this.modelPaciente.cadastraPaciente();
                    this.viewCadastro.mensagemCadastroSucesso();
                } else {
                    //Verificação final, se o paciente já está cadastrado pelo CPF
                    this.viewCadastro.mensagemErroValidacao(nome, cpf, this.modelPaciente.formataData(dataNasc[0], dataNasc[1], dataNasc[2]));
                    //Mensagem de erro para CPF existente.
                    this.viewCadastro.mensagemErroCpfExistente();
                }
            } else {
                //Caso retorne algum erro de validação, será verificado e retornado a mensagem correta.
                this.viewCadastro.mensagemErroValidacao(nome, cpf, this.modelPaciente.formataData(dataNasc[0], dataNasc[1], dataNasc[2]));

                if (this.modelPaciente.validaDvsCpf(cpf) == false) {
                    this.viewCadastro.mensagemErroCpfInvalido();
                }

                if (this.modelPaciente.verificaIdade(dataNasc[0], dataNasc[1], dataNasc[2]) < 13) {
                    this.viewCadastro.mensagemErroIdade();
                }

            }
        } else {
            //Caso retorne algum erro de input, será verificado e retornado a mensagem correta.
            this.viewCadastro.mensagemErroInput(nome, cpf);
            if (this.validaNome(nome) == false) {
                this.viewCadastro.mensagemErroNome();
            }

            if (this.qtdCaracteresCPF(cpf) == false) {
                this.viewCadastro.mensagemErroQtdCpf();
            }

            if (this.verificaDigitosCPF(cpf) == true) {
                this.viewCadastro.mensagemErroDigitosIguaisCpf();
            }
        }
    }

    //Método que lista paciente ordenado por nome
    listaPacienteNome() {
        const table = new Table({
            head: ['CPF', 'Nome', 'Dt.Nasc']
        })

        let ordenacaoPaciente = this.modelPaciente.ordenaPacientesNome()

        ordenacaoPaciente.forEach(paciente => {
            table.push([paciente.cpf, paciente.nome, paciente.dataNasc]);
        });

        return console.log(table.toString());
    }

    //Método que lista paciente ordenado por CPF
    listaPacienteCPF() {
        const table = new Table({
            head: ['CPF', 'Nome', 'Dt.Nasc']
        })

        let ordenacaoPaciente = this.modelPaciente.ordenaPacientesNome();

        ordenacaoPaciente.forEach(paciente => {
            table.push([paciente.cpf, paciente.nome, paciente.dataNasc]);
        });

        return console.log(table.toString());
    }

    //Método que deleta o paciente
    iniciaDelete(){
        //Mensagem de entrada para captação do input
        this.viewCadastro.mensagemDeletaPacienteInput();
        let cpf = this.viewCadastro.recebeCpf();

        let deletaPaciente = this.modelPaciente.deletaPaciente(cpf);
        if(deletaPaciente === false){ //verifica se existe na base de dados
            this.viewCadastro.mensagemNaoEncontrado();
        }else{  
            this.viewCadastro.mensagemDeletaSucesso();
        }

    }

    //Tratamento dos dados obtidos\\
    //Validação do nome
    validaNome(nomePessoa) {
        if (nomePessoa.length >= 5) {
            return true;
        } else {
            return false;
        }
    }

    //Tratamento para entrada do CPF
    //devido a constante necessidade de conversão para array, um método para agilizar e evitar duplicação de código
    converteCPF(cpf) {
        const numerosCPF = cpf.replace(/\D/g, "");
        const cpfArray = [...numerosCPF].map(Number);
        return cpfArray;
    }

    //Método para verificar se CPF tem a quantidade certa de caracteres
    qtdCaracteresCPF(cpf) {
        if (this.converteCPF(cpf).length == 11) {
            return true;
        } else {
            return false;
        }
    }

    //Método para verificar se todos os digitos são iguais
    verificaDigitosCPF(cpf) {
        const cpfArray = this.converteCPF(cpf);

        const caracteresIguais = cpfArray.every((caractere) => caractere === cpfArray[0]);

        if (caracteresIguais) {
            return true;
        } else {
            return false;
        }
    }
}