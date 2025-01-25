import { createContext, useContext, useState } from 'react';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Redesign do Site',
      description: 'Atualização completa do site da empresa',
      deadline: '2025-01-15',
      color: 'red',
      todos: [
        { id: 1, text: 'Criar wireframes', completed: true },
        { id: 2, text: 'Desenvolver landing page', completed: false },
        { id: 3, text: 'Poggers', completed: true },
      ],
      records: [
        { date: '2025-01-02', hours: 10 },
        { date: '2025-01-03', hours: 20 },
        { date: '2025-01-07', hours: 4 },
      ],
    },
    {
      id: 2,
      title: 'Dev App',
      description: 'Atualização completa do site da empresa',
      deadline: '2025-01-15',
      color: 'red',
      todos: [
        { id: 1, text: 'Criar wireframes', completed: true },
        { id: 2, text: 'Desenvolver landing page', completed: false },
        { id: 3, text: 'Poggers', completed: false },
      ],
      records: [
        { date: '2025-01-02', hours: 8 },
        { date: '2025-01-03', hours: 25 },
        { date: '2025-01-07', hours: 4 },
      ],
    },
    {
      id: 3,
      title: 'Dev Backend',
      description: 'Atualização completa do site da empresa',
      deadline: '2025-01-15',
      color: 'red',
      todos: [
        { id: 1, text: 'Criar wireframes', completed: true },
        { id: 2, text: 'Desenvolver landing page', completed: true },
        { id: 3, text: 'Poggers', completed: true },
      ],
      records: [
        { date: '2025-01-02', hours: 5 },
        { date: '2025-01-03', hours: 1 },
        { date: '2025-01-07', hours: 5 },
      ],
    },
  ]);

  const addProject = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
  };

 // Função para adicionar um novo registro de horas ao projeto
 const addRecord = (projectId, record) => {
  setProjects((prevProjects) =>
    prevProjects.map((project) =>
      project.id === projectId
        ? { ...project, records: [...project.records, record] }
        : project
    )
  );
};

  const getProjectById = (id) => {
    return projects.find((project) => project.id === id);
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, addRecord, getProjectById }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  return useContext(ProjectContext);
};
