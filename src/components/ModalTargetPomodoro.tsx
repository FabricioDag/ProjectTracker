import { useState } from "react";
import styled from "styled-components";
import { useProjects } from "../context/ProjectContext"; // Hook personalizado

const ModalTargetPomodoro = ({ endSession,setIsEndingSession, currentSession }) => {
  const { projects } = useProjects();

  const [selectedProject, setSelectedProject] = useState(projects[0].id);

  const handleSelectProject = (e) => {
    setSelectedProject(e.target.value);
  };

  const debugClick = () =>{
    alert('chegou em debugclick, SelectedProject: '+ selectedProject)

    endSession(selectedProject)
  }

  return (
    <ModalBg>
      <ModalContainer>
        <h2>Seção Finalizada {currentSession}</h2>
        <p>Deseja atribuir essa seção à qual projeto?</p>
        {projects.map((project) => (
            <p key={project.id} value={project.id}>
              TitleProject:{project.title}
            </p>
          ))}

        <select onChange={handleSelectProject}>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}/{project.id}
            </option>
          ))}
        </select>

        <ButtonConfirm onClick={() => debugClick()}>
          Salvar
        </ButtonConfirm>

        <ButtonDiscart onClick={()=>setIsEndingSession(false)}>Descartar</ButtonDiscart>
      </ModalContainer>
    </ModalBg>
  );
};

const ModalBg = styled.div`
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  //   background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  color: black;
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 250px;
  transform: translate(-50%, -50%);
  background-color: #fbf39e;
  padding: 2rem;
  text-align: center;
`;

const ButtonConfirm = styled.button`
  background-color: transparent;
  border: none;
  letter-spacing: 12%;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
  text-transform: uppercase;

  &:hover {
    color: rgb(15, 71, 10);
  }
`;

const ButtonDiscart = styled.button`
  background-color: transparent;
  border: none;
  letter-spacing: 12%;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
  opacity: 0.5;
  text-transform: uppercase;

  &:hover {
    opacity: 1;
  }
`;

export { ModalTargetPomodoro };
