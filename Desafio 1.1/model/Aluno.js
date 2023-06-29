export class Aluno{
    constructor(matricula, nome){
        
        try {
            if(nome == '' || nome == null && matricula == null || matricula == ''){
                throw "Nome e matricula estão faltando!";
            }else{
                this.matricula = matricula
                this.nome = nome
                this.p1 = null
                this.p2 = null
                this.nf = null
            }
        } catch (error) {
            console.log(error)
        }
    }

}