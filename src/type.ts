export type ClimateData = {
    latitude: number,
    longitude: number,
    timezone: string,
    elevation: number,
    current_units: Units,
    current: Current
}

export interface Units {
    temperature_2m: string,
    wind_speed_10m: string
}

interface Current extends Units {
    time: string
}

export type Coordinate = {
    latitude: number,
    longitude: number
}

//type do relatorio
export type Report = {
    dataEhora: string,
    temperatura: string,
    velocidade_vento: string,
    localizacao: string
}

export type ParamsaveCliamteReportOption = {
    option: 0 | 1 | 2 | 3,
    coordinate: Coordinate
}
