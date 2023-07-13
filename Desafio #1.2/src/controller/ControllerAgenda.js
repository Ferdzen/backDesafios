import Agenda from "../model/Agenda.js";
import Paciente from "../model/Paciente.js";
import MenuAgenda from "../view/MenuAgenda.js";
import Table from 'cli-table'; //impressão de listagens

export default class ControllerAgenda {
    constructor(listaPacientes) {
        this.viewAgenda = new MenuAgenda();
        this.modelAgenda = new Agenda(listaPacientes);
        this.modelPaciente = new Paciente();
    }

    //Métodos de cadastramento\\
    //Método para cadastro de paciente
    iniciaAgendamento() {
        let cpf = this.viewAgenda.recebeCpf();
        let dataConsulta = this.viewAgenda.recebeDataConsulta();
        let horaConsulta = this.viewAgenda.recebeHoraConsulta();

        //Formata a data
        dataConsulta = this.modelPaciente.formataData(dataConsulta[0], dataConsulta[1], dataConsulta[2]);

        //trata entrada CPF
        cpf = this.modelPaciente.formataCPF(cpf);

        //Validação: se há paciente registrado sob o cpf fornecido
        if (this.modelPaciente.buscaPaciente(cpf) === false) {
            this.viewAgenda.mensagemErroNaoEncontrado();
        } else {
            //Validação: se a data da consulta está no passado ou não
            if (this.comparaData(this.dataHoje(), dataConsulta) == false) {
                this.viewAgenda.mensagemErroDataInvalida();
            } else {
                //Validação: se a hora da consulta é no futuro
                if ((this.comparaHora(this.hrAtual(), horaConsulta[0]) == false) && this.comparaHora(this.hrAtual(), horaConsulta[1])) {
                    this.viewAgenda.mensagemErroHoraInvalida();
                } else {
                    //Validação: Se o horário da consulta é no horário de atendimento
                    if (this.modelAgenda.validaHorarioAgendamento(horaConsulta[0], horaConsulta[1]) == false) {
                        this.viewAgenda.mensagemErroAgendamento();
                    } else {
                        //Validação: se não há consulta no horário fornecido
                        if (this.modelAgenda.verificAgenda(dataConsulta, horaConsulta[0], horaConsulta[1]) == false) {
                            this.viewAgenda.mensagemErroAgenda();
                        } else {
                            //Setando valores para objeto
                            this.modelAgenda.cpfPessoa = cpf;
                            this.modelAgenda.dataConsulta = dataConsulta;
                            this.modelAgenda.horaInicial = horaConsulta[0];
                            this.modelAgenda.horaFinal = horaConsulta[1];

                            //Cadastrando agendamento
                            this.modelAgenda.addAgendamento();
                            this.viewAgenda.mensagemAgendamentoSucesso();
                        }
                    }
                }
            }
        }
    }

    iniciaDelete() {
        let cpf = this.viewAgenda.recebeCpf();
        let dataConsulta = this.viewAgenda.recebeDataConsulta();
        let horaConsulta = this.viewAgenda.recebeHoraInicial();

        if (this.comparaData(this.dataHoje(), dataConsulta) == false) {
            this.viewAgenda.mensagemErroCancelamentoData()
        } else {
            if (this.comparaHora(this.hrAtual(), horaConsulta) == false) {
                this.viewAgenda.mensagemErroCancelamentoData()
            } else {
                if(this.modelAgenda.buscaAgendamento(cpf) == false){
                    this.viewAgenda.mensagemErroCancelamentoSemRegistro()
                }else{
                    this.modelAgenda.removeAgendamento(cpf, dataConsulta);
                    this.viewAgenda.mensagemSucessoCancelamento();
                }
            }
        }


    }

    listaAgenda() {
        const table = new Table({
            head: ['Data', 'H.Ini', 'H.Fim', 'Tempo', 'Nome', 'Dt.Nasc']
        })

        const agenda = this.modelAgenda.listAgenda();

        table.push(agenda);
        return console.log(table.toString());
    }

    //Tratamento dos dados obtidos\\
    //Validação da hora, respeitando o tipo exigido, que são horas de 00:15
    validaInputHoraInicial(hrInicial) {
        //este método tem por objetivo capturar a parte de minuto da entrada, converter pra int e ser usada para validação. Se o resto da parte capturada divido por 5 for diferente de 0, o horário é inválido e a função retorna false.
        let minutoInicial = parseInt(hrInicial.slice(2, 4));

        if (minutoInicial % 5 != 0) {
            return false;
        } else {
            return true;
        }
    }

    //Validação da hora, respeitando o tipo exigido, que são horas de 00:15
    validaInputHoraFinal(hrFinal) {
        let minutoFinal = parseInt(hrFinal.slice(2, 4));

        if (minutoFinal % 5 != 0) {
            return false;
        } else {
            return true;
        }
    }

    dataHoje() {
        let data = new Date();
        let dia = String(data.getDate()).padStart(2, '0');
        let mes = String(data.getMonth() + 1).padStart(2, '0');
        let ano = String(data.getFullYear());
        let dataAtual = dia + '/' + mes + '/' + ano;

        return dataAtual;
    }

    hrAtual() {
        let horaAtual = new Date();
        let hora = String(horaAtual.getHours());
        let minuto = String(horaAtual.getMinutes());

        return hora + minuto;
    }

    //Verificar se a data a ser agendada não está no passado.
    //Como estou trabalhando com datas String, tive que buscar uma maneira de separar a String da Data e reorganiza-la no Padrão Americano para só então poder realizar a verificação. Para separar, utilizei a função split, que reparte a String de acordo com o delimitador passado e coloca em um array. Depois, reorganizei em outra variável a data. 
    comparaData(atual, agendada) {
        //Separando String
        let dataAtualSeparada = atual.split('/');
        let dataConsultaSeparada = agendada.split('/');

        //Reorganizando String no formato americano
        let dataAtual = dataAtualSeparada[2] + '-' + dataAtualSeparada[1] + '-' + dataAtualSeparada[0];
        let dataConsulta = dataConsultaSeparada[2] + '-' + dataConsultaSeparada[1] + '-' + dataConsultaSeparada[0];

        //Tornando Date
        dataAtual = new Date(dataAtual);
        dataConsulta = new Date(dataConsulta);

        //Validando
        if (dataConsulta < dataAtual) {
            return false;
        } else {
            return true;
        }

    }

    //Verificando se a hora agendada é maior que a data atual. A mesma funcionalidade da comparaData, só que com horas. Mais fácil de lidar por conta de só lidar com os numeros e não ter pontuação separando.
    comparaHora(atual, agendada) {
        let horaAtual = parseInt(atual.slice(0, 2));
        let minutoAtual = parseInt(atual.slice(2, 4));
        let horaAgendada = parseInt(agendada.slice(0, 2));
        let minutoAgendada = parseInt(agendada.slice(2, 4));

        if (horaAgendada >= horaAtual && minutoAgendada > minutoAtual) {
            return true;
        } else {
            return false;
        }
    }


}