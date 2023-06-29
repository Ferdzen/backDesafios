import { Vertice } from "./model/Vertice.js";
import { Poligono } from "./model/Poligono.js";
import PromptSync from 'prompt-sync';
const prompt = PromptSync({ sigint: true }); // Entrada de dados pro termis

let x, y;

x = parseFloat(prompt("Digite o valor para x:"))
y = parseFloat(prompt("Digite o valor para x:"))
let v1 = new Vertice(x, y)

x = parseFloat(prompt("Digite o valor para x:"))
y = parseFloat(prompt("Digite o valor para x:"))
let v2 = new Vertice(x, y)
x = parseFloat(prompt("Digite o valor para x:"))
y = parseFloat(prompt("Digite o valor para x:"))
let v3 = new Vertice(x, y)

let p1 = new Poligono(v1, v2)
let p2 = new Poligono(v1, v2, v3)

p2.addVertice(v1)

x = parseFloat(prompt("Digite o valor para x:"))
y = parseFloat(prompt("Digite o valor para x:"))
let v4 = new Vertice(x, y)
p2.addVertice(v4)


console.log(p2.qtdVertices)

console.log(p2.perimetro)

