import fs from 'fs'


const objData = fs.readFileSync('./dados.json', 'utf-8')
const dados = JSON.parse(objData);

//capturar os dados deste array
console.log(dados)