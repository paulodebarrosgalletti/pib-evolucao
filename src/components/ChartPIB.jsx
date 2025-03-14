import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchPIBData } from "../services/api";
import "./ChartPIB.css";

/* Função pra deixar os números mais bonitos */
const formatarNumero = (valor) => {
  return `$${(valor / 1e12).toFixed(3)}T`;
};

/* Função pra formatar o PIB per capita */
const formatarPerCapita = (valor) => {
  return `$${valor.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

/* Tooltip customizado */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const pibTotal = payload.find((item) => item.dataKey === "pibTotal");
    const pibPerCapita = payload.find((item) => item.dataKey === "pibPerCapita");

    return (
      <div className="tooltip-grafico">
        <p className="tooltip-ano">{label}</p>
        {pibTotal && <p className="tooltip-pib-total">PIB Total: <span style={{ color: "#F4A100" }}>{formatarNumero(pibTotal.value)}</span></p>}
        {pibPerCapita && <p className="tooltip-pib-percapita">PIB Per Capita: <span style={{ color: "#0073D9" }}>{formatarPerCapita(pibPerCapita.value)}</span></p>}
      </div>
    );
  }
  return null;
};

const ChartPIB = () => {
  const [data, setData] = useState([]);
  const [startYear, setStartYear] = useState(2002);
  const [endYear, setEndYear] = useState(2021);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showPIBTotal, setShowPIBTotal] = useState(true);
  const [showPIBPerCapita, setShowPIBPerCapita] = useState(true);

  useEffect(() => {
    fetchPIBData().then((pibData) => {
      setData(pibData);
      setStartYear(Math.min(...pibData.map((item) => item.ano)));
      setEndYear(Math.max(...pibData.map((item) => item.ano)));
    });

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredData = data.filter((d) => d.ano >= startYear && d.ano <= endYear);

  // Ajustando o eixo Y para evitar sobreposição
  const formatarEixoY = (valor) => {
    if (showPIBTotal && showPIBPerCapita) {
      return formatarNumero(valor);
    } else if (showPIBTotal) {
      return formatarNumero(valor);
    } else if (showPIBPerCapita) {
      return `$${valor.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
    } else {
      return valor;
    }
  };

  return (
    <div className="container-do-chart-pib">
      <div className="titulo-grafico-container">
        <h2 className="titulo-grafico">Evolução do PIB Brasileiro</h2>
      </div>

      {/* Seletor de anos */}
      <div className="seletor-anos">
        <label>Selecionar intervalo de anos:</label>
        <select value={startYear} onChange={(e) => setStartYear(Number(e.target.value))}>
          {data.map((item) => (
            <option key={item.ano} value={item.ano}>
              {item.ano}
            </option>
          ))}
        </select>
        <span> até </span>
        <select value={endYear} onChange={(e) => setEndYear(Number(e.target.value))}>
          {data.map((item) => (
            <option key={item.ano} value={item.ano}>
              {item.ano}
            </option>
          ))}
        </select>
      </div>

      {/* Alternância de exibição */}
      <div className="toggle-container">
        <label>
          <input
            type="checkbox"
            checked={showPIBTotal}
            onChange={() => {
              if (!showPIBPerCapita) {
                alert("É necessário ter pelo menos um gráfico ativo!");
                return;
              }
              setShowPIBTotal(!showPIBTotal);
            }}
          />
          PIB Total
        </label>
        <label>
          <input
            type="checkbox"
            checked={showPIBPerCapita}
            onChange={() => {
              if (!showPIBTotal) {
                alert("É necessário ter pelo menos um gráfico ativo!");
                return;
              }
              setShowPIBPerCapita(!showPIBPerCapita);
            }}
          />
          PIB Per Capita
        </label>
      </div>

      <ResponsiveContainer width="100%" height={windowWidth < 480 ? 400 : windowWidth < 768 ? 350 : 500}>
      <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
  <XAxis 
    dataKey="ano" 
    tick={{ fontSize: 12 }} 
    interval={0}
    angle={windowWidth < 480 ? -90 : -45}
    textAnchor="end"
  />
  <YAxis 
    tickFormatter={formatarEixoY}
    domain={[0, "auto"]}
    tick={{ fontSize: windowWidth < 480 ? 10 : 14 }}
    width={windowWidth < 480 ? 50 : 80}
    allowDataOverflow={true}
    tickMargin={10}
    padding={{ top: 10, bottom: 10 }}
    interval="preserveStartEnd"
  />
  <Tooltip content={<CustomTooltip />} />
  <Legend verticalAlign="top" align="center" />

  {showPIBTotal && (
    <Line
      type="monotone"
      dataKey="pibTotal"
      stroke="#F4A100"
      name="PIB Total"
      strokeWidth={3}
      dot={{ r: windowWidth < 480 ? 8 : 5 }}  
      activeDot={{ r: 12 }}  
    />
  )}
  {showPIBPerCapita && (
    <Line
      type="monotone"
      dataKey="pibPerCapita"
      stroke="#0073D9"
      name="PIB Per Capita"
      strokeWidth={3}
      dot={{ r: windowWidth < 480 ? 8 : 5 }} 
      activeDot={{ r: 12 }}  
    />
  )}
</LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartPIB;
