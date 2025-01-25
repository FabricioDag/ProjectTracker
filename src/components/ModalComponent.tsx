import './ModalComponent.css';
import { motion } from 'motion/react';

const ModalComponent = ({ project, onClose }) => {
  const modalVariants = {
    hidden: { y: '100vh', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
    exit: { y: '100vh', opacity: 0, transition: { duration: 0.5 } },
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
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <p>{project.deadline}</p>

        <div className="todo-container">
          <h1 className="todo-title">Minha To-Do List</h1>
          <ul className="todo-list">
            {project.todos.map((todo, index) => (
              <li
                key={index}
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
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
        <p>progresso</p>
        <p>horas trabalhadas</p>
      </motion.div>
    </div>
  );
};

export { ModalComponent };
