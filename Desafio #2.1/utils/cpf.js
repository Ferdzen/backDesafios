/**
 * Validação Dvs CPF
 * @param {String} cpf - CPF 
 * @returns {Boolean} CPF é válido ou não
 */
function validaDvsCpf(cpf) {
    const cpfArray = converteCPF(cpf);
    let soma = 0;
    let j = null;
    let dv1 = null;
    let dv2 = null;

    //verifição do 1° digito
    if (dv1 == null) {
        j = 10;
        for (let i = 0; i < 9; i++) {
            soma = soma + (cpfArray[i] * j);
            j--;
        }

        if (soma % 11 == 0 || soma % 11 == 1) {
            dv1 = 0;
        } else {
            dv1 = 11 - (soma % 11)
        }
    }

    //verifição do 2° digito
    if (dv2 == null) {
        j = 11;
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma = soma + (cpfArray[i] * j);
            j--;
        }

        if (soma % 11 == 0 || soma % 11 == 1) {
            dv2 = 0;
        } else {
            let resto = parseInt(soma % 11)
            dv2 = 11 - resto;
        }
    }

    //Se o CPF fror válido, o retorno será TRUE e vice versa.
    if (cpfArray[9] === dv1 && cpfArray[10] === dv2) {
        return true;
    } else {
        return false;
    }
}

/**
 * Converte a entrada do CPF de String para Number, para manipulação
 * @param {String} cpf 
 * @returns {Number} CPF dentro de um array de Integer
 */
function converteCPF(cpf) {
    const numerosCPF = cpf.replace(/\D/g, "");
    const cpfArray = [...numerosCPF].map(Number);
    return cpfArray;
}

/**
 * Formata CPF.
 * @param {String} cpf - CPF 
 * @returns {String} String CPF formatado em 111.111.111-11
 */
function formataCPF(cpf){
    if(cpf.lenght == 14){
        return cpf;
    }else{
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
}

//Método para verificar se CPF tem a quantidade certa de caracteres
function qtdCaracteresCPF(cpf) {
    if (this.converteCPF(cpf).length == 11) {
        return true;
    } else {
        return false;
    }
}

//Método para verificar se todos os digitos são iguais
function verificaDigitosCPF(cpf) {
    const cpfArray = this.converteCPF(cpf);

    const caracteresIguais = cpfArray.every((caractere) => caractere === cpfArray[0]);

    if (caracteresIguais) {
        return true;
    } else {
        return false;
    }
}