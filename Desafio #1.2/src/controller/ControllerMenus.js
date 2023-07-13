import MenuPricipal from "../view/MenuPrincipal.js";
import ControllerPaciente from "./ControllerPaciente.js";
import ControllerAgenda from "./ControllerAgenda.js";
import PromptSync from 'prompt-sync';
const prompt = PromptSync({ sigint: true }); // Entrada de dados

export default class ControllerMenus{

    constructor(){
        this.viewMenuPricipal = new MenuPricipal();
        this.menuCadastro = new ControllerPaciente();
        this.menuAgenda = null; // Será o controller de agenda, precisa da referência dos dados obtidos no cadastro de paciente
    }

    iniciarMenu(){
        let on = true;

        while (on) {
            this.viewMenuPricipal.imprimeOpcoes();
            const opcao = prompt('Opção desejada:');

            switch (opcao) {
                case '1':
                    this.iniciarMenuCadastro();
                    break;
                case '2':
                    this.iniciarMenuAgenda();
                    break;
                case '3':
                    this.viewMenuPricipal.mensagemFim();
                    on = false;
                    break;
            
                default:
                    this.viewMenuPricipal.mensagemPadrao();
                    break;
            }
        }
    }

    iniciarMenuCadastro() {
        let on = true;
        
        while (on) {
            this.menuCadastro.viewCadastro.imprimeOpcoesCadastro();
            const opcao = prompt('Opção desejada:');
            switch (opcao) {
                case '1':
                    this.menuCadastro.iniciaCadastro();
                    break;
                case '2':
                    this.menuCadastro.iniciaDelete();
                    break;
                case '3':
                    this.menuCadastro.listaPacienteCPF();
                    break;
                case '4':
                    this.menuCadastro.listaPacienteNome();
                    break;
                case '5':
                    console.log('Voltando para o principal')
                    this.menuAgenda = new ControllerAgenda(this.menuCadastro.modelPaciente.pacientes);
                    on = false;
                    break;
                default:
                    this.viewMenuPricipal.mensagemPadrao();
                    break;
            }
        }
    }

    iniciarMenuAgenda(){
        let on = true;
        while(on) {
            this.menuAgenda.viewAgenda.imprimeOpcoesAgenda();
            const opcao = prompt('Opção desejada:');
            switch (opcao) {
                case '1':
                    this.menuAgenda.iniciaAgendamento();
                    break;
                case '2':
                    this.menuAgenda.iniciaDelete();
                    break;
                case '3':
                    this.menuAgenda.listaAgenda();
                    break;
                case '4':
                    console.log('Voltando ao principal')
                    on = false;
                    break;
                default:
                    this.viewMenuPricipal.mensagemPadrao();
                    break;
            }
        }
    }
}