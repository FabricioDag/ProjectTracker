import { motion } from "motion/react";
import styled from "styled-components";
import { useProjects } from "../context/ProjectContext";

const ModalComponent = ({ project, onClose }) => {
  const { getProjectById, toggleTodoCompletion } = useProjects();

  const updatedProject = getProjectById(project.id); // pega a versao atualizada // eu poderia nao passar o object como props e sim o id e pegar o objeto atualizado aqui

  const modalVariants = {
    hidden: { y: "100vh", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "ease", stiffness: 100 },
    },
    exit: { y: "100vh", opacity: 0, transition: { duration: 0.5 } },
  };

  const completedTodos = project.todos.filter((todo) => todo.completed).length;
  const TotalWorkedHours = project.records.reduce(
    (acc, record) => acc + record.hours,
    0
  );

  return (
    <StyledBg onClick={onClose}>
      <StyledModal
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <StyledButton onClick={onClose}>&times;</StyledButton>

        <ProjectHeader>
          <TitleWrapper>
            <span>Titulo:</span>
            <TitleHeader>{project.title}</TitleHeader>
          </TitleWrapper>

          <DeadlineWrapper>
            <span>Deadline:</span>
            <DeadlineHeader>
              {new Date(project.deadline).toLocaleDateString("pt-BR")}
            </DeadlineHeader>
          </DeadlineWrapper>

          <DescriptionWrapper>
            <span>Descrição:</span>
            <DescriptionHeader>{project.description}</DescriptionHeader>
          </DescriptionWrapper>
        </ProjectHeader>

        <StyledTotalWorkedHours>
          Total de horas trabalhadas: {TotalWorkedHours.toFixed(2)}
        </StyledTotalWorkedHours>

        <TodoContainer>
          <legend>Lista de Tarefas</legend>
          <p>
            Progresso: {completedTodos}/{project.todos.length}
          </p>
          <TodoList>
            {updatedProject.todos.map((todo) => (
              <TodoItem
                key={todo.id}
                onClick={() => toggleTodoCompletion(updatedProject.id, todo.id)}
                className={`${todo.completed ? "completed" : ""}`}
              >
                {todo.text}
              </TodoItem>
            ))}
          </TodoList>
        </TodoContainer>

        <hr />

        <RecordsContainer>
          <legend>Records</legend>
          {project.records.map((record, index) => (
            <div key={index}>
              <p>Data: {new Date(record.date).toLocaleDateString("pt-BR")}</p>
              <p>Horas: {record.hours.toFixed(2)}h</p>
            </div>
          ))}
        </RecordsContainer>
      </StyledModal>
    </StyledBg>
  );
};

const StyledBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const StyledModal = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #ebdab3;
  width: 80%;
  height: 90%;
  max-width: 600px;
  padding: 20px;
  border-radius: 1px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  font-family: "Special Elite", serif;
  border: 1px solid #d1d1d1;
  text-align: center;
`;

const StyledButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
`;

const ProjectHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  text-align: left;
  //outline:2px solid red;
`;

const TitleWrapper = styled.div`
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  grid-column: span 3;

  //outline:2px solid blue;
`;

const TitleHeader = styled.p``;

const DeadlineWrapper = styled.div`
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  text-align: center;

  //outline:2px solid green;
`;

const DeadlineHeader = styled.p``;

const DescriptionWrapper = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  grid-column: span 4;
  padding: 0.5rem;
`;

const DescriptionHeader = styled.p``;

const StyledTotalWorkedHours = styled.p`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  grid-column: span 4;
  padding: 0.5rem;
`;

const TodoContainer = styled.div`
  // border: 2px solid red;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const TodoList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TodoItem = styled.li`
  /* border: 2px solid salmon; */
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  hover {
    color: black;
  }

  &.completed {
    text-decoration: line-through;
    color: #888;
  }
`;

const RecordsContainer = styled.div`
  // border: 2px solid red;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

export { ModalComponent };
