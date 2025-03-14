import React, { useState } from "react";
import PIBTable from "../components/PIBTable";
import { Link } from "react-router-dom";
import "./Pages.css"; 

const PIBTablePage = () => {
  const [filtroAno, setFiltroAno] = useState({ inicio: 2000, fim: 2023 });

  return (
    <div className="container-pagina-tabela">
      <PIBTable filtroAno={filtroAno} />
      <Link to="/" className="botao-voltar-grafico">Voltar para o Gráfico</Link>
    </div>
  );
};

export default PIBTablePage;
