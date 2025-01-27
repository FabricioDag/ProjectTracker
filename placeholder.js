// <PaperSheet>
//     <h1>Dashboard</h1>
//     <h2>Resumo dos Projetos</h2>
//     <p>Projetos Registrados: {projects.length}</p>
//     <p>Projetos Pendentes</p>
//     <p>Projetos Concluídos</p>
//     <p>Data de entrega mais próxima: {nextDeliveryDate}</p>

//     <h2>Progresso Geral</h2>
//     <p>Progresso Médio de Todos os Projetos:</p>
//     <p>Tarefas Concluídas vs Tarefas Pendentes:</p>

//     <h2>Registro de Horas</h2>
//     <p>Total de Horas Trabalhadas: {totalWorkedHours}</p>
//     <p>Média de hotas por projeto: {meanHoursWorked}</p>
//     <p>Horário de Trabalho por Data:</p>

//     {/* <h2>Análise de Progresso por Tarefa</h2>
//     <p>Tarefas Não Iniciadas:</p>
//     <p>Tarefas Atrasadas{meanHoursWorked}</p>
//     <p>Tarefas Completas</p> */}

//     <h2>Eficiencia do trabalho</h2>
//     <p>Horas Trabalhadas vs Tarefas Concluidas: {efiency}</p>

//     <h2>Gráficos</h2>
//     <p>Gráfico de Horas Trabalhadas por Projeto:</p>
//     <p>Gráfico de Tarefas Concluídas por Data:</p>
// </PaperSheet>

let p = [
  {
    id: 1,
    title: "Redesign do Site",
    description: "Atualização completa do site da empresa",
    deadline: "2025-01-15",
    color: "red",
    todos: [
      { id: 1, text: "Criar wireframes", completed: true },
      { id: 2, text: "Desenvolver landing page", completed: false },
      { id: 3, text: "Poggers", completed: true },
    ],
    records: [
      { date: "2025-01-02", hours: 10 },
      { date: "2025-01-03", hours: 20 },
      { date: "2025-01-07", hours: 4 },
    ],
  },
  {
    id: 2,
    title: "Dev App",
    description: "Atualização completa do site da empresa",
    deadline: "2025-01-15",
    color: "red",
    todos: [
      { id: 1, text: "Criar wireframes", completed: true },
      { id: 2, text: "Desenvolver landing page", completed: false },
      { id: 3, text: "Poggers", completed: false },
    ],
    records: [
      { date: "2025-01-02", hours: 8 },
      { date: "2025-01-03", hours: 25 },
      { date: "2025-01-07", hours: 4 },
    ],
  },
  {
    id: 3,
    title: "Dev Backend",
    description: "Atualização completa do site da empresa",
    deadline: "2025-01-15",
    color: "red",
    todos: [
      { id: 1, text: "Criar wireframes", completed: true },
      { id: 2, text: "Desenvolver landing page", completed: true },
      { id: 3, text: "Poggers", completed: true },
    ],
    records: [
      { date: "2025-01-02", hours: 5 },
      { date: "2025-01-03", hours: 1 },
      { date: "2025-01-07", hours: 5 },
    ],
  },
];
