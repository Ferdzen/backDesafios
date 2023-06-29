import { Aluno } from './Aluno.js';

export default class Turma {

    constructor() {
        this.alunos = [];
    }

    addAluno(matricula, nome) {
        //verifica se já está cadastrado
        let verificaRegistro = this.alunos.find(aluno => aluno.matricula === matricula);
        if (verificaRegistro) {
            console.log('Já existe um registro sob está matrícula.');
            return;
        }

        //add novo aluno
        let novoAluno = new Aluno(matricula, nome);
        this.alunos.push(novoAluno);
        console.log('Aluno cadastrado!');
    }

    removeAluno(matricula) {

        //Busca matricula e verifica se ela existe
        let index = this.alunos.findIndex(aluno => aluno.matricula === matricula);
        if (index === -1) {
            console.log('Não há aluno cadastrado sob esta matrícula.');
            return;
        }

        //remove aluno se matricula for encontrada
        this.alunos.splice(index, 1);
        console.log('Aluno removido com sucesso!')
    }

    lancaNota(matricula, tipoProva, nota) {
        //Buscando e verificando se aluno existe.
        let aluno = this.alunos.find(aluno => aluno.matricula === matricula);
        if(!aluno){
            console.log('Aluno não encontrado na base de dados.');
            return;
        }

        //Verificação se a entrada do tipo de prova é a correta
        if(tipoProva !== 1 && tipoProva !== 2) {
            console.log('A opção selecionada não existe');
            return;
        }else if(parseInt(tipoProva) === 1){
            aluno.p1 = parseFloat(nota);
            console.log(`O aluno ${aluno.nome} teve a sua nota ${nota} registrada para prova ${tipoProva}`);
        }else{
            aluno.p2 = parseFloat(nota);
            console.log(`O aluno ${aluno.nome} teve a sua nota ${nota} registrada para prova ${tipoProva}`);
        }

    }

    imprimirAlunos() {
        let ordenacaoTurma = this.alunos.slice().sort((a, b) => a.nome.localeCompare(b.nome));

        console.log('-----------------------------------------------------------------------');
        console.log('Matricula \t\t| Nome \t\t\t\t| P1 | P2 | NF');
        console.log('-----------------------------------------------------------------------');

        ordenacaoTurma.forEach(aluno =>{

            if(aluno.p1 == null){
                aluno.p1 = 0;
            }else if(aluno.p2 == null){
                aluno.p2 = 0;
            }

            console.log(`${aluno.matricula}\t\t\t${aluno.nome}\t\t\t\t ${aluno.p1}    ${aluno.p2}   ${parseFloat(aluno.p1 + aluno.p2)/ 2}`)
        })
    }
}