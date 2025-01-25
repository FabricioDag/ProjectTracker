import React, { useState } from "react";

import "./ModalAddProject.css";

import trashIcon from "../assets/trash-solid.svg";
import plusIcon from "../assets/plus-solid.svg";

const ModalAddProject = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    color: "",
    todos: [],
    records: [],
  });

  const colors = [
    "#FF5C7C",
    "#FF8C66",
    "#56C2E6",
    "#4ACF81",
    "#7536D3",
    "#F1C65B",
  ];
  const [selectedColor, setSelectedColor] = useState("#FF5C7C");

  const [todoInput, setTodoInput] = useState("");
  const [recordInput, setRecordInput] = useState({ date: "", hours: "" });

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
      setTodoInput(""); // Reseta o input
    }
  };

  // Adiciona um novo registro de horas
  // const addRecord = () => {
  //   const { date, hours } = recordInput;
  //   if (date && hours) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       records: [...prev.records, { date, hours: parseFloat(hours) }],
  //     }));
  //     setRecordInput({ date: "", hours: "" }); // Reseta os inputs
  //   }
  // };

  // Remove um TODO da lista
  const removeTodo = (id) => {
    setFormData((prev) => ({
      ...prev,
      todos: prev.todos.filter((todo) => todo.id !== id),
    }));
  };

  // Remove um registro de horas da lista
  // const removeRecord = (date) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     records: prev.records.filter((record) => record.date !== date),
  //   }));
  // };

  // Manipula o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: Date.now() }); // Salva o novo projeto com ID único
    onClose(); // Fecha o modal
  };

  return (
    <div className="modalBg">
      <div className="prancheta">
        <div className="pegador"></div>

        <div className="papersheet">
          <button onClick={onClose} className="closeModalButton">
            x
          </button>

          <h2>Formulário de novo projeto</h2>

          <form onSubmit={handleSubmit}>
            <div className="formHeader">
              <div className="titleWrapper">
                <label htmlFor="title">Título:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="deadlineWrapper">
                <label htmlFor="deadline">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="descriptionWrapper">
                <label htmlFor="description">Descrição:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="colorSelector">
              <label>Cor:</label>
              <div className="colorWrapper">
                {
                  /* Mapeia as cores disponíveis e renderiza um botão para cada uma */
                  colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={selectedColor === color ? "selected" : ""}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))
                }
              </div>
            </div>

            {/* Gerenciamento dos TODOs */}

            <div className="todoArea">
              <legend>Lista de Tarefas</legend>
              {formData.todos.map((todo) => (
                <li className="todoWrapper" key={todo.id}>
                  {todo.text}{" "}
                  <button
                    className="removeButton"
                    type="button"
                    onClick={() => removeTodo(todo.id)}
                  >
                    <img src={trashIcon} alt="trash icon" />
                  </button>
                </li>
              ))}

              <div className="todoInput">
                <div className="inputWrapper">
                  <input
                    type="text"
                    value={todoInput}
                    onChange={(e) => setTodoInput(e.target.value)}
                    placeholder="Nova Tarefa"
                  />
                  <button className="addButton" type="button" onClick={addTodo}>
                    <img src={plusIcon} alt="plus icon" />
                  </button>
                </div>
              </div>
            </div>

            {/* Gerenciamento dos registros de horas */}

            {/* <legend>Registros de Horas</legend>
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
                {record.date} - {record.hours}h{" "}
                <button type="button" onClick={() => removeRecord(record.date)}>
                  Remover
                </button>
              </li>
            ))}
          </ul> */}

            <button className="addProjectButton" type="submit">
              <p>ADICIONAR</p>
              <p>PROJETO</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { ModalAddProject };
