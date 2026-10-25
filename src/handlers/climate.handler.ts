import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process'

const rl = readline.createInterface({ input, output });
/**
 * Essa funcao é generica ela servira para pegar um numero 
 * retorna true ou false caso a tentativa de pegar de errado
*/
type ParamhandlerTerminalGetNumber = {
    question: string
}

export async function handlerTerminalGetNumber({
    question
}: ParamhandlerTerminalGetNumber): Promise<number> {
    while (true) {
        const value = await rl.question(question)
        const valueNumber = Number(value)
        if (!Number.isNaN(valueNumber)){
            console.clear()
            return valueNumber
        }
        console.clear()
        console.log("Apenas numeros,", value, 'nao é um numero.')
    }
}


export function showMenuHero() {
    console.log('==================================================');
    console.log('         🌤️  CONSULTA DE CLIMA - MENU  🌤️');
    console.log('==================================================');
    console.log('📌 Insira a latitude e longitude do local desejado.');
    console.log('💡 Dica: Você pode pegar as coordenadas direto no Google Maps:');
    console.log('👉 https://www.google.com.br/maps\n');
}

export function showMenuSave() {
    console.log('==================================================');
    console.log('           📄 SALVAR RELATÓRIO 📄');
    console.log('==================================================');
    console.log('1. Salvar como CSV');
    console.log('2. Salvar como TEXT');
    console.log('3. Salvar como JSON');
    console.log('0. Não salvar');
    console.log('==================================================');
}