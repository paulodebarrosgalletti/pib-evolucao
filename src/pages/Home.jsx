import React from "react";
import ChartPIB from "../components/ChartPIB";
import { Link } from "react-router-dom";
import "./Pages.css"; 

const Home = () => {
  return (
    <div className="container-home">
      <ChartPIB />
      <Link to="/table" className="botao-ver-tabela">Ver Tabela de PIB</Link>
    </div>
  );
};

export default Home;
