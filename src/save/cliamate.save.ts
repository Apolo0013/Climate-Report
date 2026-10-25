import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const DIR = process.cwd()
const DIR_REPORT_NAME = "relatorios"
const DIR_REPORT = path.join(DIR, DIR_REPORT_NAME)

//criando a pasta
await mkdir(
    DIR_REPORT,
    {
        recursive: true
    }
)

const getPathDir = (name: string) => {return path.join(DIR_REPORT, name)}

export async function writeReportText(content: string) {
    await writeFile(
        getPathDir("report.txt"),
        content,
        'utf-8'
    )
}

export async function writeReportJson(json: any) {
    const jsonString = JSON.stringify(json, null, 4) // transformando em string
    await writeFile(getPathDir
        ("report.json"), jsonString, 'utf-8')
}

export async function writeReportCSV(content: string) {
    const csv: string = [
        "dataEhora,localizacao,temperatura,velocidade_vento",
        content
    ].join('\n')
    await writeFile(getPathDir("report.csv"), csv, 'utf-8')
}