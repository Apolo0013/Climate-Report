# Climate-Report 🌦️

Projeto em desenvolvimento, criado para praticar o consumo de APIs externas utilizando Node.js e TypeScript.

A aplicação utiliza a API [Open-Meteo](https://open-meteo.com/) para consultar dados meteorológicos com base na latitude e longitude informadas pelo usuário, por meio do terminal.

## Tecnologias

- Node.js
- TypeScript
- Open-Meteo API

## Funcionalidades atuais

- Consulta de dados meteorológicos por coordenadas geográficas.
- Verificação dos resultados retornados pela API.

## Funcionalidades planejadas

- Exibição de um relatório meteorológico formatado no terminal.
- Opções para salvar os dados nos formatos CSV, TXT e JSON.
- Tratamento de erros e melhorias na experiência de uso.

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado.
- npm.

## Instalação

Clone o repositório:

```bash
git clone https://github.com/Apolo0013/Climate-Report.git
```

Entre na pasta do projeto:

```bash
cd Climate-Report
```

Instale as dependências:

```bash
npm install
```

## Execução

Execute o comando configurado no `package.json`. Caso o script `dev` esteja disponível:

```bash
npm run dev
```

## API utilizada

[Open-Meteo](https://open-meteo.com/en/docs) — API de dados meteorológicos que permite consultar informações climáticas por coordenadas geográficas.

## Objetivo

Praticar requisições HTTP, consumo de APIs, tipagem com TypeScript e organização de código em um projeto simples.

## Status

Em desenvolvimento.
