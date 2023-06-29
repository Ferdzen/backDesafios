export class Pessoa {
    constructor(nome, cpf, dataNasc, rendaMensal, estadoCivil, dependentes) {

        try {
            //verificação se nome tem pelo menos 5 caracteres
            if (nome.length < 5) {
                this.nome = null
                throw "O nome deve conter pelo menos 5 caracteres!";
            } else {
                this.nome = String(nome);
            }

        } catch (error) {
            console.log(error)
        }

        try{
            //verificacao cpf
            if (cpf.length != 11) {
                this.cpf = null
                throw "CPF incorreto!";
            } else {
                this.cpf = Number(cpf);
            }
        }catch(error){
            console.log(error)
        }

        try {
            //verificação Data de nascimento
            let dataHoje = new Date();
            //convertendo String em Date
            dataNasc = new Date(dataNasc); // Data vem com um dia a menos, referente ao fuso
            let idade = dataHoje.getFullYear() - dataNasc.getFullYear();
            let mesNasc = parseInt(dataNasc.getMonth());
            let diaNasc = parseInt(dataNasc.getDay()); // adicionando +1 referente ao fuso
            let mesAtual = parseInt(dataHoje.getMonth());
            let diaAtual = parseInt(dataHoje.getDay());

            if (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)) {
                idade--;
            }

            if (parseInt(idade) < 18) {
                this.dataNasc = null;
                throw "O cliente deve ter 18 anos completos."
            } else {
                dataNasc = dataNasc.toLocaleString('pt-BR')
                this.dataNasc = dataNasc;
            }
        } catch (error) {
            console.log(error)
        }

        try {
            //verificacao cpf
            if (rendaMensal >= 0) {
                this.rendaMensal = Number(rendaMensal);
            } else {
                this.rendaMensal = null
                throw "Valor inserido inválido!";
            }
        } catch (error) {
            console.log(error)
        }

        try {
            //estado civil
            if (estadoCivil.length != 1) {
                this.estadoCivil = null
                throw "Entrada inválida! Campo recebe 1 caractere somente.";
            } else if(estadoCivil === 'S' || estadoCivil === 's' || estadoCivil === 'C'|| estadoCivil === 'c' || estadoCivil === 'V' || estadoCivil === 'v' || estadoCivil === 'D' || estadoCivil === 'd'){
                this.estadoCivil = estadoCivil;
            } else{
                throw "Estado Civil inexistente, entrada inválida.";
            }
        } catch (error) {
            console.log(error)
        }

        try {
            //quantidade de dependentes
            if (parseInt(dependentes) >= 0 && parseInt(dependentes) <= 10) {
                this.dependentes = Number(dependentes);
            } else {
                this.dependentes = null
                throw "Entrada inválida! É possível cadastrar até 10 dependentes somente.";
            }
        } catch (error) {
            console.log(error)
        }

    }

    get formataCPF(){
        let cpfFormatado = String(this.cpf);
        return cpfFormatado.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');;
    }

    get formataRenda(){
        let rendaFormatada = this.rendaMensal.toFixed(2);
        return rendaFormatada.replace('.', ',')
    }

    get formataEstado(){
        if(this.estadoCivil === 'S' || this.estadoCivil === 's'){
            return "Solteiro(a)";
        }

        if(this.estadoCivil === 'C' || this.estadoCivil === 'c'){
            return "Casado(a)";
        }

        if(this.estadoCivil === 'V' || this.estadoCivil === 'v'){
            return "Viúvo(a)";
        }

        if(this.estadoCivil === 'D' || this.estadoCivil === 'd'){
            return "Divorciado(a)";
        }
    }
}