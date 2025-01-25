import React, { useState } from 'react';

const ModalAddProject = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    color: '',
    todos: [],
    records: [],
  });

  const [todoInput, setTodoInput] = useState('');
  const [recordInput, setRecordInput] = useState({ date: '', hours: '' });

  // Manipula mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Adiciona um novo TODO
  const addTodo = () => {
    if (todoInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        todos: [
          ...prev.todos,
          { id: Date.now(), text: todoInput, completed: false },
        ],
      }));
      setTodoInput(''); // Reseta o input
    }
  };

  // Adiciona um novo registro de horas
  const addRecord = () => {
    const { date, hours } = recordInput;
    if (date && hours) {
      setFormData((prev) => ({
        ...prev,
        records: [...prev.records, { date, hours: parseFloat(hours) }],
      }));
      setRecordInput({ date: '', hours: '' }); // Reseta os inputs
    }
  };

  // Remove um TODO da lista
  const removeTodo = (id) => {
    setFormData((prev) => ({
      ...prev,
      todos: prev.todos.filter((todo) => todo.id !== id),
    }));
  };

  // Remove um registro de horas da lista
  const removeRecord = (date) => {
    setFormData((prev) => ({
      ...prev,
      records: prev.records.filter((record) => record.date !== date),
    }));
  };

  // Manipula o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: Date.now() }); // Salva o novo projeto com ID único
    onClose(); // Fecha o modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close">
          Fechar
        </button>
        <h2>Adicionar Novo Projeto</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Título:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Descrição:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Deadline:
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Cor:
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
          </label>

          {/* Gerenciamento dos TODOs */}
          <fieldset>
            <legend>TODOs</legend>
            <div className="todo-input">
              <input
                type="text"
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
                placeholder="Nova tarefa"
              />
              <button type="button" onClick={addTodo}>
                Adicionar
              </button>
            </div>
            <ul>
              {formData.todos.map((todo) => (
                <li key={todo.id}>
                  {todo.text}{' '}
                  <button type="button" onClick={() => removeTodo(todo.id)}>
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </fieldset>

          {/* Gerenciamento dos registros de horas */}
          <fieldset>
            <legend>Registros de Horas</legend>
            <div className="record-input">
              <input
                type="date"
                value={recordInput.date}
                onChange={(e) =>
                  setRecordInput((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }))
                }
              />
              <input
                type="number"
                value={recordInput.hours}
                onChange={(e) =>
                  setRecordInput((prev) => ({
                    ...prev,
                    hours: e.target.value,
                  }))
                }
                placeholder="Horas"
                min="0"
                step="0.1"
              />
              <button type="button" onClick={addRecord}>
                Adicionar
              </button>
            </div>
            <ul>
              {formData.records.map((record) => (
                <li key={record.date}>
                  {record.date} - {record.hours}h{' '}
                  <button
                    type="button"
                    onClick={() => removeRecord(record.date)}
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </fieldset>

          <button type="submit">Salvar Projeto</button>
        </form>
      </div>
    </div>
  );
};

export { ModalAddProject };
