import React, { useState } from 'react';
import { useProjects } from '../context/ProjectContext'; // Hook personalizado
import { FolderComponent } from './FolderComponent'; // Componente do card
import { ModalComponent } from './ModalComponent';
import { ModalAddProject } from './ModalAddProject';

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

  return (
    <div className="project-list">
      {projects.map((project) => (
        <FolderComponent
          key={project.id}
          project={project}
          onClick={() => openProjectModal(project)}
        />
      ))}

      <div className="newProject" onClick={openNewProjectModal}>
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
      </div>

      {/* Modal de Detalhes */}
      {isProjectModalOpen && (
        <ModalComponent project={selectedProject} onClose={closeProjectModal} />
      )}

      {/* Modal de Novo Projeto */}
      {isNewProjectModalOpen && (
        <ModalAddProject onClose={closeNewProjectModal} onSave={addProject} />
      )}
    </div>
  );
};

export { ProjectList };
