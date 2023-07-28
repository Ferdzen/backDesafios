function entradaString(dadoString, msg, erro) {
    
    /**
     * Valida tamanho correto da String
     */
    if (dadoString.length >= 6 && dadoString.length <= 60) {
        msg = '';
        erro = '';
    } else {
        msg = erro;
        dadoString = '';
    }
}

function entradaChar(dadoChar, msg, erro){
    dadoChar = dadoChar.toUpperCase();
    if(dadoChar.length == 1){
        if(dadoChar != 'C' || dadoChar != 'S' || dadoChar != 'V' || dadoChar != 'D'){
            msg = erro;
            dadoChar = '';
        }else{
            msg = '';
            erro = '';
        }
    }else{
        msg = erro;
            dadoChar = '';
    }
}

function entradaNumber(dadoNumber, msg, erro){
    if (dadoNumber <= 0){
        msg = erro;
        dadoNumber = '';
    }else{
        msg = '';
    }
}

export default {entradaString, entradaChar, entradaNumber};