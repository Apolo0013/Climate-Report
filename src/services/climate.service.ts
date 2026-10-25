import { fetchClimateData } from "../clients/climate.client.js";
import { writeReportCSV, writeReportJson, writeReportText } from "../save/cliamate.save.js";
import { ClimateData, Coordinate, ParamsaveCliamteReportOption, Report } from "../type.js";

type ParamReportClimaString = {
    dataEhora: string,
    temperatura: string,
    velocidadeDoVento: string,
    localizacao: string
}

const getDataEHora = (time: string) => {
    const date = new Date(time)
    return date.toLocaleString("pt-BR", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).replaceAll(",", ' às')
}

const relatorioClima = ({
    dataEhora,
    localizacao,
    temperatura,
    velocidade_vento
}: Report) => `📊 **Relatório Meteorológico** 📊
📅 **Data/Hora:** ${dataEhora}
🌡️ **Temperatura:** ${temperatura} °C
💨 **Velocidade do Vento:** ${velocidade_vento} km/h
📍 **Localização:** ${localizacao}`;

export async function getClimateReportText(climateData: ClimateData): Promise<string | null> {
    //pegando data e hora
    const dataEhora = getDataEHora(climateData.current.time)
    const localizacao: string = climateData.timezone
    const temperatura: string = climateData.current.temperature_2m
    const velocidade_vento: string = climateData.current.wind_speed_10m
    return relatorioClima({
        dataEhora,
        localizacao,
        temperatura,
        velocidade_vento
    }) 
} 

export async function getClimateReportJson(climateData: ClimateData): Promise<Report | null>{    
    return {
        dataEhora: getDataEHora(climateData.current.time),
        localizacao: climateData.timezone,
        temperatura: climateData.current.temperature_2m + ' °C',
        velocidade_vento: climateData.current.wind_speed_10m + ' km/h'
    }
}

export async function getClimateReportCSV(climateData: ClimateData) {
    return (
        `"${getDataEHora(climateData.current.time)}",` +
        `"${climateData.timezone}",` +
        `"${climateData.current.temperature_2m + ' °C'}",` +
        `"${climateData.current.wind_speed_10m + ' km/h'}"`
    )
}

export type ReturnsaveCliamteReportOption = 
    "API_ISSUE" | // PROBLEMA COM API
    "ISSUE_SAVING_REPORT" | // PROBLEMA AO TENTAR SALVAR O RELATORIO
    "SUCESS" // DEU TUDO CERTO

/**
 * Essa funcao vai criar os relatorio em salvar e retorna um valor booleano
 * @param coordinate latitude e longitude em [Object]
 * @param option 1, 2, 3 e 0 [Number]
 * 1 = Salvar em .csv
 * 2 = Salvar em .txt
 * 3 = Salvar em .json
 * 0 = Sair
*/
export async function saveCliamteReportOption({
    coordinate,
    option
}: ParamsaveCliamteReportOption): Promise<ReturnsaveCliamteReportOption> {
    const climateData = await fetchClimateData(coordinate)
    if (!climateData) return 'API_ISSUE'
    switch (option) {
        case 1:
            //console.log("Salvando relatório em CSV...");
            const csv = await getClimateReportCSV(climateData)
            if (!csv) {
                //console.log("Erro ao salvar o relatório em .csv. Tente novamente.")
                return 'ISSUE_SAVING_REPORT'
            }
            await writeReportCSV(csv)
            //console.log("Relatório salvo em .csv com sucesso!")
            return 'SUCESS'
        case 2:
            //console.log("Salvando relatório em texto...")
            const text = await getClimateReportText(climateData)
            if (!text) {
                //console.log("Erro ao salvar o relatório em .txt. Tente novamente.")
                return 'ISSUE_SAVING_REPORT'
            }
            await writeReportText(text)
            //console.log("Relatório salvo em .txt com sucesso!")
            return 'SUCESS'
        case 3:
            //console.log("Salvando relatório em JSON...")
            const json = await getClimateReportJson(climateData)
            if (!json) {
                //console.log("Erro ao salvar o relatório em .json. Tente novamente.")
                return 'ISSUE_SAVING_REPORT'
            }
            await writeReportJson(json)
            //console.log("Relatório salvo em .json com sucesso!")
            return 'SUCESS'
        case 0:
            //console.log("Relatório não salvo. Você optou por não salvar o arquivo.");
            return 'SUCESS'
    }
}


export function isValidCoordinate({ 
    latitude,
    longitude,
}: Coordinate) {
    return (
        latitude >= -90.0 && latitude <= 90.0 &&
        longitude >= -180.0 && longitude <= 180.0
    )
}

export function isValidLatitude(latitude: number) {
    return latitude >= -90.0 && latitude <= 90.0
}

export function isValidLongitude(longitude: number) {
    return longitude >= -180.0 && longitude <= 180.0
}