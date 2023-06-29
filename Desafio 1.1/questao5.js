import PromptSync from 'prompt-sync';
import { Pessoa } from './model/Pessoa.js';
const prompt = PromptSync({ sigint: true }); // Entrada de dados pro termis

console.log('Cadastro de Cliente')
let p1 = null;
while(p1 == null){

    let nome = prompt('Insira seu nome:')
    let cpf = prompt('Insira seu cpf:')
    let dataNasc = prompt('Insira sua data de nascimento:');
    dataNasc = new Date(dataNasc);
    let rendaMensal = prompt('Insira sua renda mensal:')
    let estadoCivil = prompt('Insira seu estado civil(Apenas um digito, C, S, V ou D):')
    let dependentes = prompt('Insira a quantidade de dependentes:')

    p1 = new Pessoa(nome, cpf, dataNasc, rendaMensal, estadoCivil, dependentes);
    if(p1.nome === null || p1.cpf === null || p1.dataNasc === null || p1.rendaMensal === null || p1.estadoCivil === null || p1.dependentes === null){
        console.log('Cadastro não efetivado, verifique as informações incorretas e tente novamente.')
        p1 = null
    }
    
}

console.log(`Cliente ${p1.nome}, portador do CPF: ${p1.formataCPF}, nascido em ${p1.dataNasc}, com renda de R$${p1.formataRenda}, com estado civil de ${p1.formataEstado} tem ${p1.dependentes} dependentes.`)

