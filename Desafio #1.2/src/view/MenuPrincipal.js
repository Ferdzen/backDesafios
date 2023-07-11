const prompt = PromptSync({ sigint: true }); // Entrada de dados
import PromptSync from 'prompt-sync';

 export default class MenuPricipal{  
    
    //Menu de entrada de opções
    imprimeOpcoes(){
        console.log('Menu Principal')
        console.log('1-Cadastro de Pacientes')
        console.log('2-Agenda')
        console.log('3-Fim')
    }

    //Mensagem tratamento de entrada adversa
    mensagemPadrao(){
        console.log('Opção não existente.');
    }

    //Mensagem de fim de programa
    mensagemFim(){
        console.log('Fim de programa!');
    }

}