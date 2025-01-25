import "./ModalComponent.css";
import { motion } from "motion/react";

const ModalComponent = ({ project, onClose }) => {
  const modalVariants = {
    hidden: { y: "100vh", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
    exit: { y: "100vh", opacity: 0, transition: { duration: 0.5 } },
  };

  const completedTodos = project.todos.filter((todo) => todo.completed).length;

  const toggleTodoCompletion = (index) => {
    project.todos[index].completed = !project.todos[index].completed;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-content"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        <div className="projectHeader">
          <div className="titleWrapper">
            <span>Titulo:</span>
            <p className="titleHeader">{project.title}</p>
          </div>

          <div className="deadlineWrapper">
            <span>Deadline:</span>
            <p className="deadlineHeader">{project.deadline}</p>
          </div>

          <div className="descriptionWrapper">
            <span>Descrição:</span>
            <p className="descriptionHeader">{project.description}</p>
          </div>
        </div>

        <div className="todo-container">
          <legend>Lista de Tarefas</legend>
          <p>
            Progresso: {completedTodos}/{project.todos.length}
          </p>
          <ul className="todo-list">
            {project.todos.map((todo, index) => (
              <li
                onClick={() => toggleTodoCompletion(index)}
                key={index}
                className={`todo-item ${todo.completed ? "completed" : ""}`}
              >
                {todo.text}
              </li>
            ))}
          </ul>
        </div>

        <p>Records: </p>
        <hr />
        {project.records.map((record, index) => (
          <div key={index}>
            <p>Data: {record.date}</p>
            <p>Horas: {record.hours}h</p>
            <hr />
          </div>
        ))}

        <p>horas trabalhadas</p>
      </motion.div>
    </div>
  );
};

export { ModalComponent };
