import PromptSync from 'prompt-sync';
import Turma from './model/Turma.js'
const prompt = PromptSync({ sigint: true }); // Entrada de dados pro termis



let turma = new Turma();

turma.addAluno(123, 'Carlos')
turma.addAluno(123, 'Carlos')
turma.addAluno(456, 'Joana')
turma.addAluno(789, 'Lina')

turma.removeAluno(123)

turma.lancaNota(456, 1, 7.5)
turma.lancaNota(456, 2, 9)
turma.lancaNota(789, 2, 10)

turma.imprimirAlunos()