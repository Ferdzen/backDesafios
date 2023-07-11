import { ControllerPaciente } from "../controller/ControllerPaciente.js";
class Paciente{
    #nome;
    #cpf;
    #dataNasc;

    constructor() {
        this.#nome = null;
        this.#cpf = null;
        this.#dataNasc = null;
    }

    //Setagem variaveis
    set nomePaciente(nomePaciente){
        const controladorPaciente = new ControllerPaciente();
        if(controladorPaciente.validaNome(nomePaciente) == true){
            this.#nome = nomePaciente;
        }
    }
    
    set cpfPessoa(cpfPessoa){
        const controladorPaciente = new ControllerPaciente();
        if(controladorPaciente.validaCpf(cpfPessoa) == true){
            this.#cpf = cpfPessoa;
        }

    }
    set nascimentoPaciente(dataPaciente){
        this.#dataNasc = dataPaciente;
    }

    //retornos
    get nome(){
        return this.#nome;
    }
    get cpf(){
        return this.#cpf;
    }
    get dataNasc(){
        return this.#dataNasc;
    }

    //Métodos para validações
    validaDvsCpf(cpf){
        const controladorPaciente = new ControllerPaciente();
        const cpfArray = controladorPaciente.converteCPF(cpf);
        let soma = 0;
        let j = null;
        let dv1=null;
        let dv2 = null;

        //verifição do 1° digito
        if(dv1 == null){
            j = 10;
            for(let i=0; i<9; i++){
                soma = soma + (cpfArray[i] * j);
                j--;
            }

            if(soma % 11 == 0 || soma % 11 == 1){
                dv1 = 0;
            }else{
                dv1 = 11 - (soma % 11)
            }
        }
        
        //verifição do 2° digito
        if(dv2 == null){
            j = 11;
            soma=0;
            for(let i=0; i<10; i++){
                soma = soma + (cpfArray[i] * j);
                j--;
            }

            if(soma % 11 == 0 || soma % 11 == 1){
                dv2 = 0;
            }else{
                let resto = parseInt(soma % 11)
                dv2 = 11 - resto;
            }
        }

        //Se o CPF fror válido, o retorno será TRUE e vice versa.
        if(cpfArray[9] === dv1 && cpfArray[10] === dv2){
            return true;
        }else{
            return false;
        }
    }

}

// TESTES
let p = new Paciente();

let cpf = "944.585.130-79" // CPF gerado em ferramenta online para teste
let cpf2 = "944.130.585-79" 

console.log(p.validaDvsCpf(cpf))
console.log(p.validaDvsCpf(cpf2))