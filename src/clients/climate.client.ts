import { ClimateData, Coordinate } from "../type.js"

const url = ({
    latitude,
    longitude
}: Coordinate) => `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&timezone=auto`

export async function fetchClimateData({
    latitude,
    longitude
}: Coordinate): Promise<ClimateData | null> {
    try {
        const res = await fetch(url({latitude, longitude}))
        if (res.status == 200) {
            const data = await res.json() as ClimateData
            return data
        }
        return null
    }
    catch (error) {
        console.log(error)
        return null
    }
}