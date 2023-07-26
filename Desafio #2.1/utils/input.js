import PromptSync from 'prompt-sync';
import Output from './output';

class Input{
    #prompt
    #output

    constructor(){
        this.#prompt = PromptSync({ sigint: true });
        this.#output = new Output();
    }

    

}