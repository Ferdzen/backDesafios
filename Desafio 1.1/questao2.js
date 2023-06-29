import { Vertice } from './model/Vertice.js'
import { Triangulo } from './model/Triangulo.js'
import PromptSync from 'prompt-sync';
const prompt = PromptSync({ sigint: true }); // Entrada de dados pro termis

let x = prompt('Digite um valor para x:');
let y = prompt('Digite um valor para y:');
let v1 = new Vertice(x, y)


x = prompt('Digite um valor para x:');
y = prompt('Digite um valor para y:');
let v2 = new Vertice(x, y)

x = prompt('Digite um valor para x:');
y = prompt('Digite um valor para y:');
let v3 = new Vertice(x, y)

let t1 = new Triangulo(v1, v2, v3)

console.log('\n----------------------------------------------')
t1.tipoTriangulo()
//console.log(t1.tipoTriangulo())

let t2 = t1.clone()
let t3 = t1.clone()

t3.v1.move(8, 4)
t3.v2.move(16, 4)
t3.v3.move(14, 7)

console.log('----------------------------------------------')
console.log(t2.v2.x)
console.log('----------------------------------------------')
//Verificando igualdade entre triangulos distintos
console.log(t1.equals(t2))
//Verificando igualdade entre triangulos iguais
console.log(t1.equals(t3))
console.log('----------------------------------------------\n')


console.log(`Perimetro: ${t1.perimetro}`)
console.log('----------------------------------------------\n')
console.log(t3.area)
