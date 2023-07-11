export class ControllerPaciente{

    //O objetivo desta classe é receber os dados do usuário e fazer a primeira leva de tratamento de dados, que consiste na verificação se o input foi feito corretamente e conversão para posteriores validações na classe Paciente.

    //Entrada de dados
    //TODO: 


    //Validação do nome
    validaNome(nomePessoa){
        if(nomePessoa.length >= 5){
            return true;
        }else{
            return false;
        }
    }
    
    //Tratamento para entrada do CPF
    //devido a constante necessidade de conversão para array, um método para agilizar e evitar duplicação de código
    converteCPF(cpf){
        const numerosCPF = cpf.replace(/\D/g, "");
        const cpfArray = [...numerosCPF].map(Number);
        return cpfArray;
    }

    //Método para verificar se CPF tem a quantidade certa de caracteres
    qtdCaracteresCPF(cpf){
        if(this.converteCPF(cpf).length == 11){
            return true;
        }else{
            return false;
        }
    }

    //Método para verificar se todos os digitos são iguais
    verificaDigitosCPF(cpf){
        const cpfArray = this.converteCPF(cpf);

        const caracteresIguais = cpfArray.every((caractere) => caractere === cpfArray[0]);

        if(caracteresIguais){
            return true;
        }else{
            return false;
        }
    }

    //Tratamento para entrada da data de Nascimento
    //TODO: Desenvolver métodos semelhantes para entrada da data de nascimento
    
}