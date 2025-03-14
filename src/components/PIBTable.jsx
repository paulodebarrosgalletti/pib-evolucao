import React, { useEffect, useState } from "react";
import { fetchPIBData } from "../services/api";
import "./PIBTable.css";

/* PIB dos EUA, só pra ter uma comparação */
const pibEUA = {
  2002: 10.93, 2003: 11.46, 2004: 12.22, 2005: 13.04, 2006: 13.82,
  2007: 14.47, 2008: 14.77, 2009: 14.48, 2010: 15.05, 2011: 15.60,
  2012: 16.25, 2013: 16.88, 2014: 17.61, 2015: 18.30, 2016: 18.80,
  2017: 19.61, 2018: 20.66, 2019: 21.54, 2020: 21.35, 2021: 23.68
};

/* Funça~~o pra formatar valores */
const formatarNumero = (valor) => {
  return `$${(valor / 1e12).toFixed(3)}T`;
};

const formatarPerCapita = (valor) => {
  return `$${valor.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const PIBTable = () => {
  const [data, setData] = useState([]);
  const [searchYear, setSearchYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchPIBData().then((pibData) => setData(pibData));
  }, []);

  /* Filtragem básica */
  const filteredData = data.filter(
    (item) => searchYear === "" || item.ano.toString().includes(searchYear)
  );

  /* Paginação simples */
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  /* Comparação com os EUA */
  const calcularComparacao = (ano, pibBrasil) => {
    const pibEuaAno = pibEUA[ano];
    if (pibEuaAno) {
      const percentual = ((pibBrasil) / (pibEuaAno * 1e12)) * 100;
      return `${percentual.toFixed(2)}% do PIB dos EUA`;
    }
    return "N/A";
  };

  return (
    <div className="container-da-tabela-pib">
      <h2 className="titulo-grafico">Tabela do PIB</h2>
      
      {/* Campo de busca */}
      <input
        type="text"
        className="input-search"
        placeholder="Buscar ano..."
        value={searchYear}
        onChange={(e) => {
          setSearchYear(e.target.value);
          setCurrentPage(1);
        }}
      />

      <div className="tabela-container">
        <table className="tabela-pib">
          <thead>
            <tr>
              <th>Ano</th>
              <th>PIB Total (USD)</th>
              <th>PIB Per Capita (USD)</th>
              <th>Comparação com EUA</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.ano}>
                <td>{item.ano}</td>
                <td className="pib-total">{formatarNumero(item.pibTotal)}</td>
                <td className="pib-percapita">{formatarPerCapita(item.pibPerCapita)}</td>
                <td className="pib-comparacao">{calcularComparacao(item.ano, item.pibTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação corrigida */}
      <div className="pagination">
        <button 
          className="pagination-btn"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ◀
        </button>

        <input
          type="number"
          className="pagination-input"
          value={currentPage}
          onChange={(e) => {
            let page = Number(e.target.value);
            if (page >= 1 && page <= totalPages) setCurrentPage(page);
          }}
        />

        <button 
          className="pagination-btn"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default PIBTable;
