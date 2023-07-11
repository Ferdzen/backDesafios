import MenuPricipal from "../view/MenuPrincipal.js";
import MenuCadastro from "../view/MenuCadastro.js";
import MenuAgenda from "../view/MenuAgenda.js";
const prompt = PromptSync({ sigint: true }); // Entrada de dados
import PromptSync from 'prompt-sync';

export default class ControllerMenus{

    constructor(){
        this.menuPricipal = new MenuPricipal();
        this.menuCadastro = new MenuCadastro();
        this.menuAgenda = new MenuAgenda();
    }

    iniciarMenu(){
        let on = true;

        while (on) {
            this.menuPricipal.imprimeOpcoes();
            const opcao = prompt('Opção desejada:');

            switch (opcao) {
                case '1':
                    this.iniciarMenuCadastro();
                    break;
                case '2':
                    this.iniciarMenuAgenda();
                    break;
                case '3':
                    this.menuPricipal.mensagemFim();
                    on = false;
                    break;
            
                default:
                    this.menuPricipal.mensagemPadrao();
                    break;
            }
        }
    }

    iniciarMenuCadastro() {
        let on = true;
        while (on) {
            this.menuCadastro.imprimeOpcoesCadastro();
            const opcao = prompt('Opção desejada:');
            switch (opcao) {
                case '1':
                    console.log('Cadastrado')
                    break;
                case '2':
                    console.log('Excluido')
                    break;
                case '3':
                    console.log('Listado paciente (por CPF)')
                    break;
                case '4':
                    console.log('Listado paciente (por nome)')
                    break;
                case '5':
                    console.log('Voltando para o principal')
                    on = false;
                    break;
                default:
                    this.menuPricipal.mensagemPadrao();
                    break;
            }
        }
    }

    iniciarMenuAgenda(){
        let on = true;
        while(on) {
            this.menuAgenda.imprimeOpcoesAgenda();
            const opcao = prompt('Opção desejada:');
            switch (opcao) {
                case '1':
                    console.log('Consulta agendada.');
                    break;
                case '2':
                    console.log('Cancela agendamento');
                    break;
                case '3':
                    console.log('Listando agenda');
                    break;
                case '4':
                    console.log('Voltando ao principal')
                    on = false;
                    break;
                default:
                    this.menuPricipal.mensagemPadrao();
                    break;
            }
        }
    }
}