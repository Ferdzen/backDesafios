export class Vertice{
    #x;
    #y;
    constructor(x, y){
        this.#x = x;
        this.#y = y;
    }

    get x(){
        return this.#x;
    }

    get y(){
        return this.#y;
    }

    distanceCalc(verticeB){
        //Variaveis distancias já obtém atributos do vertice que foi recebido como parâmetro na função com a realização de uma parte do cálculo, que é a subtração com os atributos do vertice atual(que chama a função)
        let distanciaX = verticeB.x - this.#x;
        let distanciaY = verticeB.y - this.#y;

        //Realiza a segunda parte do cálculo no Return, que é a multiplicação dos valores dentro da função sqrt, que retornará já com a raiz.
        return Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);
    }

    move(x, y){
        this.#x = parseFloat(x);
        this.#y = parseFloat(y);
    }

    equals(verticeB){
        if (this.#x == verticeB.x && this.#y == verticeB.y){
            return console.log("Os vértices são iguais!")
        }else{
            return console.log("Os vértices não são iguais")
        }

    }
}