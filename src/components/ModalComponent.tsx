import { motion } from "motion/react";
import styled from "styled-components";

const ModalComponent = ({ project, onClose }) => {
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

  const toggleTodoCompletion = (index) => {
    project.todos[index].completed = !project.todos[index].completed;
  };

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
          <div className="titleWrapper">
            <span>Titulo:</span>
            <TitleHeader>{project.title}</TitleHeader>
          </div>

          <div className="deadlineWrapper">
            <span>Deadline:</span>
            <DeadlineHeader>{project.deadline}</DeadlineHeader>
          </div>

          <div className="descriptionWrapper">
            <span>Descrição:</span>
            <DescriptionHeader>{project.description}</DescriptionHeader>
          </div>
        </ProjectHeader>

        <StyledTotalWorkedHours>
          Total de horas trabalhadas: {TotalWorkedHours}
        </StyledTotalWorkedHours>

        <TodoContainer>
          <legend>Lista de Tarefas</legend>
          <p>
            Progresso: {completedTodos}/{project.todos.length}
          </p>
          <TodoList>
            {project.todos.map((todo, index) => (
              <TodoItem
                onClick={() => toggleTodoCompletion(index)}
                key={index}
                className={`${todo.completed ? "completed" : ""}`}
              >
                {todo.text}
              </TodoItem>
            ))}
          </TodoList>
        </TodoContainer>

        <p>Records: </p>
        <hr />
        {project.records.map((record, index) => (
          <div key={index}>
            <p>Data: {record.date}</p>
            <p>Horas: {record.hours}h</p>
            <hr />
          </div>
        ))}
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
  background: #ebdab3;
  width: 80%;
  height: 90%;
  max-width: 600px;
  padding: 20px;
  border-radius: 1px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  /* transform: rotate(-2deg); */
  font-family: "Special Elite", serif;
  border: 1px solid #d1d1d1;
  /* background: linear-gradient(145deg, #fff 90%, #f0f0f0 10%); */
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
`;

const TitleHeader = styled.p`
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  grid-column: span 3;
`;

const DeadlineHeader = styled.p`
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  text-align: center;
`;

const DescriptionHeader = styled.p`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  grid-column: span 4;
  padding: 0.5rem;
`;

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

export { ModalComponent };
