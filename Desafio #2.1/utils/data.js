import { DateTime } from 'luxon'

function formataData(dataNasc){
    return dataNasc.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
}

function verificaIdade(dataNasc){
    dataNasc = formataData(dataNasc);
    const hoje = DateTime.local();
    const idade = hoje.diff(dataNasc, 'years').years;
  
    return idade >= 18;
}

export default {formataData, verificaIdade};