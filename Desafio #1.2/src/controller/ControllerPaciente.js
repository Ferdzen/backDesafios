import MenuCadastro from "../view/MenuCadastro.js";
import Paciente from "../model/Paciente.js"

export default class ControllerPaciente{

    //O objetivo desta classe é receber os dados do usuário e fazer a primeira leva de tratamento de dados, que consiste na verificação se o input foi feito corretamente e conversão para posteriores validações na classe Paciente.
    constructor(){
        this.viewCadastro = new MenuCadastro();
        this.modelPaciente = new Paciente();
    }

    iniciaCadastro(){
        let nome = this.viewCadastro.recebeNome();
        let cpf = this.viewCadastro.recebeCpf();
        let dataNasc = this.viewCadastro.recebeDataNascimento();

        //Verificando se inputs foram corretos
        if(this.validaNome(nome) == true && (this.qtdCaracteresCPF(cpf) == true && this.verificaDigitosCPF(cpf) == false)){
            //Validação de dados
            if(this.modelPaciente.validaDvsCpf(cpf) == true && 
            this.modelPaciente.verificaIdade(dataNasc[0], dataNasc[1], dataNasc[2]) >= 13){
                if(this.modelPaciente.verificaRegistro(this.modelPaciente.formataCPF(cpf)) == false){
                    //Enviando dados tratados para Model
                    this.modelPaciente.nomePaciente = nome;
                    this.modelPaciente.cpfPessoa = this.modelPaciente.formataCPF(this.converteCPF(cpf));
                    this.modelPaciente.nascimentoPaciente = this.modelPaciente.formataDataNasc(dataNasc[0], dataNasc[1], dataNasc[2]);

                    //Cadastrando paciente
                    this.modelPaciente.cadastraPaciente();
                    this.viewCadastro.mensagemCadastro();
                }else{
                    //Verificação final, se o paciente já está cadastrado pelo CPF
                    this.viewCadastro.mensagemErroValidacao(nome, cpf, this.modelPaciente.formataDataNasc(dataNasc[0], dataNasc[1], dataNasc[2]));
                    //Mensagem de erro para CPF existente.
                    this.viewCadastro.mensagemErroCpfExistente();
                }
            }else{
                //Caso retorne algum erro de validação, será verificado e retornado a mensagem correta.
                this.viewCadastro.mensagemErroValidacao(nome, cpf, this.modelPaciente.formataDataNasc(dataNasc[0], dataNasc[1], dataNasc[2]));

                if(this.modelPaciente.validaDvsCpf(cpf) == false){
                    this.viewCadastro.mensagemErroCpfInvalido();
                }

                if(this.modelPaciente.verificaIdade(dataNasc[0], dataNasc[1], dataNasc[2]) < 13){
                    this.viewCadastro.mensagemErroIdade();
                }

            }
        }else{
            //Caso retorne algum erro de input, será verificado e retornado a mensagem correta.
            this.viewCadastro.mensagemErroInput(nome, cpf);
            if(this.validaNome(nome) == false){
                this.viewCadastro.mensagemErroNome();
            }

            if(this.qtdCaracteresCPF(cpf) == false){
                this.viewCadastro.mensagemErroQtdCpf();
            }
            
            if(this.verificaDigitosCPF(cpf) == true){
                this.viewCadastro.mensagemErroDigitosIguaisCpf();
            }
        }
    }

    //Tratamento dos dados obtidos
    //Validação do nome
    validaNome(nomePessoa){
        if(nomePessoa.length >= 5){
            return true;
        }else{
            return false;
        }
    }

    //Tratamento para entrada do CPF
    //devido a constante necessidade de conversão para array, um método para agilizar e evitar duplicação de código
    converteCPF(cpf){
        const numerosCPF = cpf.replace(/\D/g, "");
        const cpfArray = [...numerosCPF].map(Number);
        return cpfArray;
    }

    //Método para verificar se CPF tem a quantidade certa de caracteres
    qtdCaracteresCPF(cpf){
        if(this.converteCPF(cpf).length == 11){
            return true;
        }else{
            return false;
        }
    }

    //Método para verificar se todos os digitos são iguais
    verificaDigitosCPF(cpf){
        const cpfArray = this.converteCPF(cpf);

        const caracteresIguais = cpfArray.every((caractere) => caractere === cpfArray[0]);

        if(caracteresIguais){
            return true;
        }else{
            return false;
        }
    }

    //Tratamento para entrada da data de Nascimento
    //TODO: Desenvolver métodos semelhantes para entrada da data de nascimento
}