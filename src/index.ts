
import { Coordinate } from './type.js';
import { isValidLatitude, isValidLongitude, saveCliamteReportOption } from './services/climate.service.js';
import { handlerTerminalGetNumber, showMenuHero, showMenuSave } from './handlers/climate.handler.js';


import './save/cliamate.save.js'

async function main() {
    //criando a interface no terminal
    const coordinate: Coordinate = {
        latitude: 48.857742,
        longitude: 2.295158
    }
    while (true) {
        showMenuHero()
        while (true) {
            const latitude = await handlerTerminalGetNumber({
                question: "Latitude: "
            })
            if (isValidLatitude(latitude)) {
                coordinate.latitude = latitude
                break
            }
            console.log("Latitude invalido pae")
        }
        showMenuHero()
        //longitude pego com sucesso
        console.log("Latitude ✅")    
        while (true) {
            //handler vai pedir no terminal o longitude
            const longitude = await handlerTerminalGetNumber({
                question: "Longitude: "
            })
            if (isValidLongitude(longitude)) {
                coordinate.longitude = longitude
                break
            }
            console.log("Longitude invalido pae")
        }
        showMenuHero()
        //latitude pego
        console.log("Latitude ✅")
        console.log("Longitude ✅")
        //pergunta e salva o tipo de salvamente do relatorio
        // - .json
        // - .txt
        // - .csv
        showMenuSave()
        while (true) {
            const typeReport = await handlerTerminalGetNumber({
                question: "Opção de salvar: "
            })
            if ([0, 1, 2, 3].some(n => n == typeReport)) {
                //
                const result = await saveCliamteReportOption({
                    coordinate,
                    option: typeReport as 0 | 1 | 2 | 3
                })
                //se for 0 (Sair), ou seja sair da opcao de salvar.
                if (typeReport == 0) {
                    break
                }
                //error
                if (result == 'API_ISSUE') { 
                    console.log("❌ Erro ao consultar a API meteorológica. Tente novamente mais tarde.");
                    break
                }
                if (result == 'ISSUE_SAVING_REPORT') {
                    console.log('❌ Erro ao salvar o relatório')
                }
                if (result == "SUCESS") {
                    console.log('✅ Relatório salvo')
                }
                showMenuSave()
            }
            else {
                console.clear()
                showMenuSave()
                console.log(`"${typeReport}" nao é um opcao valida`)
            }
        }
        //aqui cabo tudo vamos reniciar o coordanite
        coordinate.latitude = 0
        coordinate.longitude = 0
        //
        console.clear()
        console.log("⚠️ COORDENADAS RESETADAS")
    }
}

main();