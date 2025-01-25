import { useState } from "react";
import { useProjects } from "../context/ProjectContext";
import styled from "styled-components";
import { h1 } from "motion/react-client";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const { projects } = useProjects(); // Acessa o array de projetos do contexto
  let nextDeliveryDate = projects.reduce((acc, project) => {
    if (project.deadline < acc) {
      return project.deadline;
    }
    return acc;
  }, projects[0].deadline);

  let totalWorkedHours = projects.reduce((acc, project) => {
    return (
      acc +
      project.records.reduce((acc, record) => {
        return acc + record.hours;
      }, 0)
    );
  }, 0);

  let meanHoursWorked = (totalWorkedHours / projects.length).toFixed(2);

  let efiency = projects.reduce((acc, project) => {
    let totalTodos = project.todos.length;
    let totalCompletedTodos = project.todos.reduce((acc, todo) => {
      return todo.completed ? acc + 1 : acc;
    }, 0);
    return acc + totalCompletedTodos / totalTodos;
  }, 0);

  let tabs = [
    {
      label: "Resumo dos Projetos",
      content: (
        <div>
          <h2>Resumo dos Projetos</h2>
          <p>Projetos Registrados: {projects.length}</p>
          <p>Projetos Pendentes</p>
          <p>Projetos Concluídos</p>
          <p>Data de entrega mais próxima: {nextDeliveryDate}</p>
        </div>
      ),
    },
    {
      label: "Progresso Geral",
      content: (
        <div>
          <h2>Progresso Geral</h2>
          <p>Progresso Médio de Todos os Projetos:</p>
          <p>Tarefas Concluídas vs Tarefas Pendentes:</p>
        </div>
      ),
    },
    {
      label: "Registro de Horas",
      content: (
        <div>
          <h2>Registro de Horas</h2>
          <p>Total de Horas Trabalhadas: {totalWorkedHours}</p>
          <p>Média de hotas por projeto: {meanHoursWorked}</p>
          <p>Horário de Trabalho por Data:</p>
        </div>
      ),
    },
  ];
  return (
    <>
      <DashboardWrapper>
        <TabsWrapper>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex-1 px-4 py-2 text-center border-b-2 ${
                activeTab === index
                  ? "border-red-500 bg-red-100"
                  : "border-transparent bg-gray-50"
              }`}
            >
              {tab.label}
            </Tab>
          ))}
        </TabsWrapper>

        <MainContent className="p-4 bg-beige h-48 flex justify-center items-center">
          {tabs[activeTab].content}
        </MainContent>
      </DashboardWrapper>
    </>
  );
};

const PaperSheet = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
`;

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid red;
  width: 70vw;
  height: 70vh;
`;

const TabsWrapper = styled.div`
  display: flex;
`;

const Tab = styled.button`
  padding: 1rem;
  border-radius: 1rem 1rem 0 0;
  border: none;
  cursor: pointer;
`;

const MainContent = styled.div`
  border-radius: 0 1rem 1rem 1rem;
  background-color: #f5f5f5;
  padding: 1rem;
  height: 100%;
`;

export { DashboardPage };
