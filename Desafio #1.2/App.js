import PromptSync from 'prompt-sync';
const prompt = PromptSync({ sigint: true }); // Entrada de dados


let nome = prompt("Whats your name? ");

console.log(`Name: ${nome}`)