export class Poligono{
    
    constructor(...vertices){     
        try{
            if(vertices.length < 3){
                throw "O polígono precisa de pelo menos 3 vértices!";
            }else{
                this.vertices = [...vertices];
            }

        }catch(err){
            console.log(err)
        }
    }

    addVertice(novoVertice){ 
        if(this.vertices.some(vertice => vertice.x === novoVertice.x && vertice.y === novoVertice.y)){
            return console.log(false)
        }else{
            this.vertices = [...this.vertices, novoVertice]
            return console.log(true)
        }

        
    }

    get perimetro(){
        let perimetro = 0;
        this.vertices.forEach((vertice, index) => {
            let v1 = this.vertices[index]
            let v2 = this.vertices[(index+1) % this.vertices.length];
            perimetro += v1.distanceCalc(v2);
        });

        return perimetro;
    }

    get qtdVertices(){
        return this.vertices.length
    }
}