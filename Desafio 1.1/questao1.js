import PromptSync from 'prompt-sync';
import {Vertice} from './model/Vertice.js'
const prompt = PromptSync({ sigint: true }); // Entrada de dados pro termis


//TODO: FAZER LAÇO DE REPETIÇÃO PARA AUTOMATIZAR TESTES.

//Testes
console.log("Insira os valores para o Vértice 1")
let x1 = prompt("Digite o valor de X:")
let y1 = prompt("Digite o valor de Y:")
console.log("Insira os valores para o Vértice 2")
let x2 = prompt("Digite o valor de X:")
let y2 = prompt("Digite o valor de Y:")
console.log("Insira os valores para o Vértice 3")
let x3 = prompt("Digite o valor de X:")
let y3 = prompt("Digite o valor de Y:")

let v1 = new Vertice(x1,y1);
let v2 = new Vertice(x2,y2);
let v3 = new Vertice(x3,y3);

//Teste se valores foram atribuidos ao OBJ
console.log(`Valor X do Vértice 1: ${v1.x}`);
console.log(`Valor Y do Vértice 1: ${v1.y}`);

//Cálculo de distância entre o Vértice 1 e o Vértice 2
console.log(v1.distanceCalc(v2))
//Cálculo de distância entre o Vértice 2 e o Vértice 3
console.log(v2.distanceCalc(v3))

//Entradas para mover o Vértice 1 e chamada do método Move
x1 = prompt("Digite o valor de X para mover o vértice 1:");
y1 = prompt("Digite o valor de y para mover o vértice 1:");
v1.move(x1,y1)


console.log(v1.x)
console.log(v1.y)
//Comparando se vértices são iguais.
v1.equals(v2)