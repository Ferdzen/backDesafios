import { ControllerPaciente } from "../controller/controllerPaciente.js";
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
        if(controladorPaciente.validaNome(nomePaciente) == true){
            this.#nome = nomePaciente;
        }

        this.#cpf = cpfPessoa;
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

    //métodos
    adicionaPaciente(){

    }

    deletaPaciente(){

    }

    listaPaciente(){

    }
}