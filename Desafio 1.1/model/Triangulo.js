import { Vertice } from "./Vertice.js"

export class Triangulo {

    #v1
    #v2
    #v3

    constructor(v1, v2, v3) {

        try{
            const ladoA = v1.distanceCalc(v2)
            const ladoB = v2.distanceCalc(v3)
            const ladoC = v3.distanceCalc(v1)
    
            if (ladoA < ladoB + ladoC && ladoB < ladoA + ladoC && ladoC < ladoA + ladoB) {
                console.log(`Triangulo formado!\nLado A: ${ladoA}\nLado B: ${ladoB}\nLado C:${ladoC}\n`);
                this.#v1 = v1;
                this.#v2 = v2;
                this.#v3 = v3;
            } else {
                throw "Vértices fornecidos não compõe um triângulo!";
            }

        }catch(err){
            console.log(err);
        }

    }

    get v1() {
        return this.#v1
    }
    get v2() {
        return this.#v2
    }
    get v3() {
        return this.#v3
    }

    get perimetro() {
        let ladoA = this.#v1.distanceCalc(this.#v2)
        let ladoB = this.#v2.distanceCalc(this.#v3)
        let ladoC = this.#v3.distanceCalc(this.#v1)

        return ladoA + ladoB + ladoC
    }

    get area() {
        let ladoA = this.#v1.distanceCalc(this.#v2)
        let ladoB = this.#v2.distanceCalc(this.#v3)
        let ladoC = this.#v3.distanceCalc(this.#v1)

        let area = (ladoA + ladoB + ladoC) / 2

        return `Area do triângulo: ${area}`
    }

    equals(trianguloB){
        if(parseFloat(trianguloB.v1) === parseFloat(this.#v1) && 
        parseFloat(trianguloB.v2) === parseFloat(this.#v2) && 
        parseFloat(trianguloB.v3) === parseFloat(this.#v3)
        ){
            return "Triangulos são iguais!"
        }else{
            return "Triangulos são diferentes!"
        }
    }

    tipoTriangulo(){
        let ladoA = parseFloat(this.#v1.distanceCalc(this.#v2))
        let ladoB = parseFloat(this.#v2.distanceCalc(this.#v3))
        let ladoC = parseFloat(this.#v3.distanceCalc(this.#v1))

        if(ladoA === ladoB || ladoA === ladoC || ladoB === ladoC){
            return "Isósceles"; 
        }else if(ladoA === ladoB && ladoA === ladoC){
            return "Equilátero";
        }else{
            return "Escaleno";
        }
    }

    clone(){
        let novoVertice1 = this.#v1;
        let novoVertice2 = this.#v2;
        let novoVertice3 = this.#v3;

        return new Triangulo(novoVertice1, novoVertice2, novoVertice3)
    }
}