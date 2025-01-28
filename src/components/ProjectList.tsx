import React, { useState } from "react";
import { useProjects } from "../context/ProjectContext"; // Hook personalizado
import { FolderComponent } from "./FolderComponent"; // Componente do card
import { ModalComponent } from "./ModalComponent";
import { ModalAddProject } from "./ModalAddProject";

import styled from "styled-components";

const ProjectList = () => {
  const { projects, addProject } = useProjects(); // Acessa o array de projetos do contexto

  const [selectedProject, setSelectedProject] = useState(null); // Projeto atualmente selecionado
  const [isProjectModalOpen, setProjectModalOpen] = useState(false); // Modal de detalhes
  const [isNewProjectModalOpen, setNewProjectModalOpen] = useState(false); // Modal de novo projeto

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setProjectModalOpen(false);
    setSelectedProject(null);
  };

  const openNewProjectModal = () => {
    setNewProjectModalOpen(true);
  };

  const closeNewProjectModal = () => {
    setNewProjectModalOpen(false);
  };

  const debugConsole = () => {
    console.log(projects);
  };

  return (
    <ProjectListStyled className="project-list">
      <button
        style={{ position: "fixed", top: "1rem", left: "1rem" }}
        onClick={debugConsole}
      >
        Debug Console
      </button>

      {projects.map((project) => (
        <FolderComponent
          key={project.id}
          project={project}
          onClick={() => openProjectModal(project)}
        />
      ))}

      <NewProjectStyled onClick={openNewProjectModal}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray="10, 5"
            d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"
          />
        </svg>
        <p>Add Project</p>
      </NewProjectStyled>

      {/* Modal de Detalhes */}
      {isProjectModalOpen && (
        <ModalComponent project={selectedProject} onClose={closeProjectModal} />
      )}

      {/* Modal de Novo Projeto */}
      {isNewProjectModalOpen && (
        <ModalAddProject onClose={closeNewProjectModal} onSave={addProject} />
      )}
    </ProjectListStyled>
  );
};

const ProjectListStyled = styled.div`
display: grid;
width: 100vw;
grid-template-columns: repeat(
  auto-fit,
  minmax(200px, 1fr)
); /* Cada coluna terá pelo menos 200px */
gap: 16px; /* Espaço entre os itens */
padding: 16px;
border: 2px solid gold;
/* Centralização */
justify-items: center; 
align-items: center; 
`;

const NewProjectStyled = styled.div`
  border:2px solid red;
  color: hsl(235, 46%, 20%);
  cursor: pointer;
  opacity: 0.3;
  transition: 0.3s ease;
  position: relative;
  width: 200px;
  height: 200px;
  
  &:hover {
    opacity: 1;
  }

  p {
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 1rem;
  border-radius: 2rem;
  font-size: 0.8rem;
  background-color: hsl(235, 46%, 20%);
  color: white;
  transform: translate(-50%, -50%);
  `;
export { ProjectList };
