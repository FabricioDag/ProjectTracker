import { useState, useCallback } from "react";
import { useProjects } from "../context/ProjectContext";
import styled from "styled-components";

const tabColors = ["#EEE6D5", "#FEC9D3", "#BAEEFF"];

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { projects } = useProjects();

  // Evitar bug se a lista estiver vazia
  const nextDeliveryDate = projects.length
    ? projects.reduce((acc, project) => (project.deadline < acc ? project.deadline : acc), projects[0].deadline)
    : "Sem prazos definidos";

  const totalWorkedHours = projects.reduce(
    (acc, project) => acc + project.records.reduce((acc, record) => acc + record.hours, 0),
    0
  );

  const meanHoursWorked = projects.length ? (totalWorkedHours / projects.length).toFixed(2) : "0";

  const efficiency = projects.length
    ? (
        projects.reduce((acc, project) => {
          const totalTodos = project.todos.length || 1; // Evita divisão por zero
          const totalCompletedTodos = project.todos.filter(todo => todo.completed).length;
          return acc + totalCompletedTodos / totalTodos;
        }, 0) / projects.length
      ).toFixed(2)
    : "0";

  const handleTabClick = useCallback((index: number) => {
    setActiveTab(index);
  }, []);

  const tabs = [
    {
      label: "Resumo dos Projetos",
      content: (
        <TabContent title="Resumo dos Projetos">
          <p>Projetos Registrados: {projects.length}</p>
          <p>Data de entrega mais próxima: {nextDeliveryDate}</p>
        </TabContent>
      ),
    },
    {
      label: "Progresso Geral",
      content: (
        <TabContent title="Progresso Geral">
          <p>Progresso Médio de Todos os Projetos: {efficiency}%</p>
        </TabContent>
      ),
    },
    {
      label: "Registro de Horas",
      content: (
        <TabContent title="Registro de Horas">
          <p>Total de Horas Trabalhadas: {totalWorkedHours}</p>
          <p>Média de horas por projeto: {meanHoursWorked}</p>
        </TabContent>
      ),
    },
  ];

  return (
    <DashboardWrapper>
      <TabsWrapper>
        {tabs.map((tab, index) => (
          <Tab key={index} isActive={activeTab === index} color={tabColors[index]} onClick={() => handleTabClick(index)}>
            {tab.label}
          </Tab>
        ))}
      </TabsWrapper>

      <MainContent color={tabColors[activeTab]}>{tabs[activeTab].content}</MainContent>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
  height: 70vh;
`;

const TabsWrapper = styled.div`
  display: flex;
`;

const Tab = styled.button<{ isActive: boolean; color: string }>`
  padding: 1rem;
  border-radius: 1rem 1rem 0 0;
  border: none;
  cursor: pointer;
  background-color: ${({ isActive, color }) => (isActive ? color : "#fff")};
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ color }) => color};
  }
`;

const MainContent = styled.div<{ color: string }>`
  border-radius: 0 1rem 1rem 1rem;
  background-color: ${({ color }) => color};
  padding: 1rem;
  height: 100%;
  transition: background-color 0.3s ease;
`;

// **Componente para Conteúdo das Abas**
const TabContent = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h2>{title}</h2>
    {children}
  </div>
);

export { DashboardPage };
