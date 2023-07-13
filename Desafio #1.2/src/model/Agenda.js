export default class Agenda{
    #cpf;
    #dtConsulta;
    #hrInicial;
    #hrFinal;
    constructor(listaPacientes){
        this.#cpf = null;
        this.#dtConsulta = null;
        this.#hrInicial = null;
        this.#hrFinal = null;
        this.pacientes = listaPacientes;
        this.agendamentos = [];
    }
    //Métodos de Agendamento
    //Método registra agendamento
    addAgendamento(){
        const agendamento = {
            cpf: this.#cpf,
            dtConsulta:this.#dtConsulta, 
            hrInicial:this.#hrInicial, 
            hrFinal:this.#hrFinal,
        }

        this.agendamentos.push(agendamento);
    }

    //Método cancela agendamento
    removeAgendamento(cpf, dataConsulta){
        let buscaAgenda = this.buscaAgendamentoData(cpf, dataConsulta);
        
        //verifica se há agendamento para remover
        if(buscaAgenda === false){
            return false;
        }else{
            this.agendamentos.splice(buscaAgenda, 1); //executa remoção
            return true;
        }
    }

    //Método que busca agendamento no sistema
    buscaAgendamentoData(cpf, dataConsulta){
        let indexAgendamento = this.agendamentos.findIndex(agendamento => agendamento.cpf === cpf && agendamento.dtConsulta === dataConsulta);

        if(indexAgendamento === -1){
            return false;
        }else{
            return indexAgendamento;
        }
    }
    
    //Método que busca todos os agendamentos registrados naquele CPF
    buscaAgendamento(cpf){
        let indexAgendamento = this.agendamentos.findIndex(agendamento => agendamento.cpf === cpf);

        if(indexAgendamento === -1){
            return false;
        }else{
            return indexAgendamento;
        }
    }


    listAgenda(){
        let listaconsultas = this.agendamentos;
        let listaPacientes = this.pacientes;

        const agenda = [];
        
        listaPacientes.forEach((paciente) =>{
            const pacienteId = paciente.cpf;

            const consultasPaciente = listaconsultas.filter(
                (consulta) => consulta.cpf === pacienteId
            );

            consultasPaciente.forEach((consulta) =>{

                const agendaItem = {
                    dataConsulta: consulta.dataConsulta,
                    hrInicial: consulta.horaInicial,
                    hrFinal: consulta.horaFinal,
                    tempoConsulta: this.tempoConsulta(consulta.horaInicial, consulta.horaFinal),
                    nome: paciente.nome,
                    dataNasc: paciente.dataNasc,
                }
                agenda.push(agendaItem);
            })
        })
        
        if(agenda == null){
            return false;
        }else{
            return agenda;
        }
    }

    //Manipulação de atributos privados\\
    //Setagem variaveis
    set cpfPessoa(cpf){
        this.#cpf = cpf;
    }

    set dataConsulta(data){
        this.#dtConsulta = data;
    }

    set horaInicial(hora){
        this.#hrInicial = hora;
    }

    set horaFinal(hora){
        this.#hrFinal = hora;
    }

    //Retornos
    get cpfPessoa(){
        return this.#cpf;
    }

    get dataConsulta(){
        return this.#dtConsulta;
    }

    get horaInicial(){
        return this.#hrInicial;
    }

    get horaFinal(){
        return this.#hrFinal;
    }

    //Métodos para formatação\\
    //Formata hora
    
    formataHora(horaRecebida){
        let hora = horaRecebida.slice(0, 2);
        let minuto = horaRecebida.slice(2, 4);
        
        let horaFormatada = hora + ':' + minuto;
        return horaFormatada;
    }

    //Métodos para validações\\

    //Método validação de horário de agendamento, para assegurar que só será agendado consultas dentro do horário de funcionamento.
    validaHorarioAgendamento(hrInicial, hrFinal) {
        let horaInicial = parseInt(hrInicial.slice(0, 2));
        let horaFinal = parseInt(hrFinal.slice(0, 2));
        let minutoInicial = parseInt(hrInicial.slice(2, 4));
        let minutoFinal = parseInt(hrFinal.slice(2, 4));
        let validaIni;
        let validaFim;

        if(Math.abs(minutoInicial - minutoFinal) >= 15){
            //Verificação se o horário inicial para agendamento é válido
            if (horaInicial >= 8 && horaInicial <= 18) {
                if(minutoInicial >= 0 && minutoInicial <= 45){
                    validaIni = true;
                }else{
                    validaIni = false;
                }
            }else{
                validaIni = false;
            }
    
            if(horaFinal >= 8 && horaFinal <= 19){
                if(horaFinal == 19){
                    if(minutoFinal == 0){
                        validaFim = true;
                    }else{
                        validaFim = false;
                    }
                }else{
                    if(minutoFinal >= 0 && minutoFinal <= 45){
                        validaFim = true;
                    }else{
                        validaFim = false;
                    }
                }
            }

        }else{
            validaIni = false;
            validaFim = false;
        }

        if(validaIni === true && validaFim === true){
            return true;
        }else{
            return false;
        }

    }

    //Método para verificar se a agenda está ocupada, para evitar agendamentos sobrepostos
    verificAgenda(data, hrInicial, hrFinal){
        let indexAgenda = this.agendamentos.findIndex(agendamento => agendamento.dataConsulta === data && (agendamento.horaInicial === hrInicial && agendamento.horaFinal === hrFinal));

        if(indexAgenda === -1){
            return true; //Agenda livre
        }else{
            return false; //Agenda ocupada
        }
    }

    //Método que retorna o tempo total da consulta
    tempoConsulta(hrInicial, hrFinal){
        let horaInicial = parseInt(hrInicial.slice(0, 2));
        let horaFinal = parseInt(hrFinal.slice(0, 2));
        let minutoInicial = parseInt(hrInicial.slice(2, 4));
        let minutoFinal = parseInt(hrFinal.slice(2, 4));
        let duracao = String(Math.abs(horaInicial - horaFinal)) + ':' + String(Math.abs(minutoInicial - minutoFinal))

        return duracao;
    }


}