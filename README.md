# Desafio Técnico - Desenvolvedor Fullstack

Este é o código de uma aplicação para o teste técnico da vaga de Desenvolvedor Fullstack Front-End. A aplicação consome dados da API do IBGE para exibir a evolução do PIB brasileiro e compara com o PIB dos Estados Unidos. Ela é composta por duas telas principais: um gráfico de linha mostrando a evolução do PIB e uma tabela com os dados do PIB por ano.

## Tecnologias Utilizadas

- **React.js com Vite:** A integração com o Vite foi feita para usar seus tempos de build mais velozes e eficientes, melhorando a experiência do desenvolvimento, o React permite uma construção de fácil manutenção, além de ser eficiente nos gerenciamentos de estado.

- **Recharts:** Utilizado para gerar o gráfico de linha que exibe a evolução do PIB, a biblioteca foi escolhida por ser fácil de integrar com o React e por oferecer suporte a gráficos interativos e responsivos.

- **CSS Puro**: Para o estilo da aplicação, optei por usar CSS puro com classes específicas para cada componente, mantendo a separação, a ideia foi evitar frameworks pesados, garantindo uma estilização personalizada e leve.

-- **API do IBGE e API do Banco Central:** A API do IBGE foi usada para obter os dados do PIB, e a API do Banco Central foi utilizada para pegar a cotação média anual do dólar, os dados do PIB foram convertidos para dólares utilizando a cotação anual do dólar, garantindo maior precisão nos valores apresentados.

## Como Rodar o Projeto

### Instalação das Dependências

git clone https://github.com/paulodebarrosgalletti/pib-evolucao

cd pib-evolucao

npm install


### Execução do Projeto

npm run dev

A aplicação estará disponível em **http://localhost:5173**.


## Estrutura do Projeto

```
/pib-evolucao
  ├── /src
  │   ├── /components
  │   │   ├── ChartPIB.jsx  → Gráfico do PIB
  │   │   ├── ChartPIB.css  → CSS do Gráfico
  │   │   ├── PIBTable.jsx  → Gráfico do PIB
  │   │   ├── PIBTable.css  → CSS da Tabela 
  │   ├── /pages
  │   │   ├── Home.jsx  → Página inicial
  │   │   ├── Pages.css  → CSS das Páginas
  │   │   ├── PIBTablePage.jsx  → Página da tabela do PIB
  │   ├── /services
  │   │   ├── api.js  → Consumo da API do IBGE e conversão de moeda
  │   ├── App.jsx  → Configuração das rotas
  │   ├── main.jsx  → Inicialização do React
  │   ├── index.css  → Estilos gerais da aplicação
  ├── package.json  → Dependências do projeto
  ├── README.md  → Documentação do projeto
```

## Funcionalidades

**Tela 1 - Gráfico de Evolução do PIB:**
Exibe um gráfico de linha com a evolução do PIB brasileiro (em dólares) e do PIB per capita (em dólares) ao longo dos anos, os usuários podem selecionar o intervalo de anos e alternar a exibição de ambos os gráficos.

**Tela 2 - Tabela de PIB por Ano:**
Exibe uma tabela com o PIB total e o PIB per capita de cada ano, possui uma funcionalidade de busca por ano, com paginação para navegação entre os dados.

## Escolhas de Desenvolvimento

**Responsividade:** A aplicação foi projetada para ser completamente responsiva, utilizando (como exemplo rem e %) e adaptando o layout para diferentes tamanhos de tela, o gráfico e a tabela se ajustam de forma dinâmica com base no tamanho da tela, proporcionando uma boa experiência em dispositivos móveis.

**Gestão de Estado:** Utilizei o useState e useEffect para gerenciar o estado da aplicação de forma simples, já que não há a necessidade de uma solução mais complexa como o Redux, o estado do PIB e dos dados de cotação do dólar são controlados localmente em cada componente.

**Boas Práticas de Código:** O código foi escrito com a intenção de ser reutilizável, cada componente tem responsabilidades bem definidas, e as funções de formatação de dados foram abstraídas para facilitar a manutenção, também me preocupei em garantir que o código fosse legível e bem estruturado, com nomes de variáveis e funções autoexplicativos.


## Considerações Finais

O objetivo desse projeto foi demonstrar minhas habilidades em React.js, integração com APIs externas e criação de interfaces responsivas, a escolha das bibliotecas e das ferramentas foi feita com base na simplicidade, eficiência e flexibilidade para atender aos requisitos do desafio.

## Link para o Deploy
O projeto estará disponível em:
https://pib-evolucao.vercel.app