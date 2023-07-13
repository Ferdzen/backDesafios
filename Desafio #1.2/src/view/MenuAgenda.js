import PromptSync from 'prompt-sync';
const prompt = PromptSync({ sigint: true }); // Entrada de dados
export default class MenuAgenda{
    
    imprimeOpcoesAgenda(){
        console.log('Agenda')
        console.log('1-Agendar consulta')
        console.log('2-Cancelar agendamento')
        console.log('3-Listar Agenda')
        console.log('4-Voltar p/ menu principal')
    }

    //Entrada de dados\\
    recebeCpf(){
        let cpf = prompt("CPF:")
        return cpf;
    }

    recebeDataConsulta(){
        console.log("Data consulta");
        let dia = prompt("Dia:");
        let mes = prompt("Mes:");
        let ano = prompt("Ano:");
        let dtConsulta = [dia, mes, ano]
        return dtConsulta;
    }

    recebeHoraConsulta(){
        console.log("Hora a marcar para consulta");
        let horaInicial = prompt("Hora inicial:");
        let horaFinal = prompt("Hora final:");
        let periodoConsulta = [horaInicial, horaFinal];
        return periodoConsulta;
    }

    //Input para cancelamento
    recebeHoraInicial(){
        console.log("Hora agendada")
        let horaInicial = prompt("Horário:");

        return horaInicial;
    }


    //Mensagens de registo de agendamento\\
    //Mensagem inicio de agendamento
    mensagemInputAgendamento(){
        return console.log("Insira os dados abaixo para o agendamento");
    }

    mensagemAgendamentoSucesso(){
    return console.log("Consulta agendada!")
}

    //Mensagens de erro de Validação
    mensagemErroNaoEncontrado(){
        return console.log("Erro: Paciente não encontrado.")
    }

    mensagemErroDataInvalida(){
        return console.log("Erro: Data inválida.")
    }

    mensagemErroHoraInvalida(){
        return console.log("Erro: Horário inválido.")
    }

    mensagemErroAgendamento(){
        return console.log("Erro: Agendamento só é possível entre as 08h e 19h.")
    }

    mensagemErroAgenda(){
        return console.log("Erro: Horário indisponível na agenda.")
    }

    //Mensagem para cancelamentos
    mensagemErroCancelamentoData(){
        return console.log("Erro: não é possível cancelar um evento que já passou.");
    }

    mensagemErroCancelamentoSemRegistro(){
        return console.log("Erro: Não há agendamentos registrados neste CPF.");
    }

    //Mensagem Sucesso remoção
    mensagemSucessoCancelamento(){
        return console.log("Consulta cancelada com sucesso!");
    }
}