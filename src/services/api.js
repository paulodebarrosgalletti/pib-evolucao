import axios from "axios";

//  API do IBGE para pegar o PIB em milhares de reais (BRL)
const IBGE_API_URL = "https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/2002|2003|2004|2005|2006|2007|2008|2009|2010|2011|2012|2013|2014|2015|2016|2017|2018|2019|2020|2021/variaveis/37?localidades=N1[all]";

//  API do Banco Central para pegar a cotação anual do dólar
const BCB_API_URL = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.1/dados?formato=json"; 

//  Função para buscar a cotação média anual do dólar no Banco Central
const fetchExchangeRates = async () => {
  try {
    const response = await axios.get(BCB_API_URL);
    const exchangeRates = response.data.reduce((acc, item) => {
      const [year] = item.data.split("-");
      acc[year] = parseFloat(item.valor); // Cotação do dólar naquele ano
      return acc;
    }, {});

    return exchangeRates; // Exemplo: { "2021": 5.39, "2020": 5.16, ... }
  } catch (error) {
    console.error("Erro ao buscar cotação do dólar:", error);
    return {};
  }
};

// Função para buscar o PIB do IBGE e converter para dólares 
export const fetchPIBData = async () => {
  try {
    const responsePIB = await axios.get(IBGE_API_URL);
    const dataPIB = responsePIB.data[0].resultados[0].series[0].serie;

    const exchangeRates = await fetchExchangeRates(); // Pega a cotação anual do dólar

    return Object.keys(dataPIB).map((year) => {
      const pibReais = parseFloat(dataPIB[year]) * 1000; // PIB convertido de milhares de reais para reais
      const exchangeRate = exchangeRates[year] || 5.0; // Se não tiver cotação, usa um valor médio

      return {
        ano: parseInt(year),
        pibTotal: pibReais / exchangeRate,  // Mantém o PIB em dólares sem converter para trilhões
        pibPerCapita: (pibReais / exchangeRate) / 211000000, // Ajuste populacional
      };
    });
  } catch (error) {
    console.error("Erro ao buscar dados do PIB ou câmbio:", error);
    return [];
  }
};
