import React, { useState } from "react";

import trashIcon from "../assets/trash-solid.svg";
import plusIcon from "../assets/plus-solid.svg";

import styled from "styled-components";

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
    <ModalBg>
      <Clipboard>
        <Pegador ></Pegador>

        <Papersheet>
          <CloseModalButton onClick={onClose}>
            x
          </CloseModalButton>

          <h2>Formulário de novo projeto</h2>

          <StyledForm onSubmit={handleSubmit}>
            <FormHeader>
              <TitleWrapper>
                <label htmlFor="title">Título:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </TitleWrapper>

              <DeadlineWrapper>
                <label htmlFor="deadline">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </DeadlineWrapper>

              <DescriptionWrapper>
                <label htmlFor="description">Descrição:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </DescriptionWrapper>
            </FormHeader>

            <StyledColorSelector>
              <label>Cor:</label>
              <ColorWrapper>
                {
                  /* Mapeia as cores disponíveis e renderiza um botão para cada uma */
                  colors.map((color) => (
                    <StyledButton
                      key={color}
                      type="button"
                      className={selectedColor === color ? "selected" : ""}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))
                }
              </ColorWrapper>
            </StyledColorSelector>

            {/* Gerenciamento dos TODOs */}

            <TodoArea>
              <legend>Lista de Tarefas</legend>
              {formData.todos.map((todo) => (
                <TodoWrapper key={todo.id}>
                  {todo.text}{" "}
                  <RemoveButton
                    type="button"
                    onClick={() => removeTodo(todo.id)}
                  >
                    <img src={trashIcon} alt="trash icon" />
                  </RemoveButton>
                </TodoWrapper>
              ))}

              <div className="todoInput">
                <InputWrapper>
                  <input
                    type="text"
                    value={todoInput}
                    onChange={(e) => setTodoInput(e.target.value)}
                    placeholder="Nova Tarefa"
                  />
                  <AddButton type="button" onClick={addTodo}>
                    <img src={plusIcon} alt="plus icon" />
                  </AddButton>
                </InputWrapper>
              </div>
            </TodoArea>

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

            <AddProjectButton type="submit">
              <p>ADICIONAR</p>
              <p>PROJETO</p>
            </AddProjectButton>
          </StyledForm>
        </Papersheet>
      </Clipboard>
    </ModalBg>
  );
};

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const CloseModalButton = styled.button`
background-color: transparent;
color: black;
border: none;
cursor: pointer;
font-size: 1.5rem;
position: absolute;
top: 1rem;
right: 1rem;
`

const Pegador = styled.div`
position: absolute;
  width: 30%;
  height: 3rem;
  background-color: gray;
  top: -1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
`

const Clipboard = styled.div`
  position: relative;
  background: #af744b;
  width: 80%;
  height: 90%;
  max-width: 600px;
  padding: 20px;
  border-radius: 1px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  border-radius: 1rem;
`;

const Papersheet = styled.div`
  position: relative;
  background: #ebdab3;
  width: 100%;
  height: 101%;
  max-width: 600px;
  padding: 20px;
  border-radius: 1px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  font-family: "Special Elite", serif;
  border: 1px solid #d1d1d1;
  text-align: center;
`;

const StyledForm = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  text-align: left;
  /* border: 2px solid aquamarine; */

  input {
    background-color: transparent;
    border: none;
    padding: 0.5rem;
  }

  textarea{
    background-color: transparent;
  border: 1px solid black;
  padding: 0.5rem;
  }
`;

const StyledButton = styled.button`
  cursor: pointer;

  &.selected {
    border: 2px solid black;
  }
`;

const TitleWrapper = styled.div`
border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  grid-column: span 3;
`

const DeadlineWrapper = styled.div`
display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-bottom: 1px solid black;
`

const DescriptionWrapper = styled.div`
/* border: 1px solid black; */
display: flex;
flex-direction: column;
gap: 0.3rem;
grid-column: span 4;
`

const StyledColorSelector = styled.div`
/* border: 2px solid rgb(235, 74, 74); */
width: 100%;
display: flex;
flex-direction: column;
gap: 0.5rem;
text-align: left;
align-items: center;
`

const ColorWrapper = styled.div`
  display: flex;
  gap: 1rem;
  /* border: 2px solid red; */

  button{
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid black;
    cursor: pointer;
  }
`

const TodoArea = styled.div`
/* border: 2px solid red; */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`
const TodoWrapper = styled.li`
/* border: 2px solid salmon; */
  display: flex;
  align-items: center;
  gap: 1rem;
`

const RemoveButton = styled.button`
width: 1rem;
height: 1rem;
background-color: none;
border: none;

img{
  height: 100%;
}
`
const InputWrapper = styled.div`
display: flex;
  align-items: center;
  gap: 0.3rem;
  /* border: 2px solid green; */
  border-bottom: 1px solid black;

  input{
    background-color: transparent;
  border: none;
  padding: 0.5rem;
  }
`
const AddButton = styled.button`
width: 1rem;
  height: 1rem;
  background-color: none;
  border: none;

  img{
    height: 100%;
  }
`


const AddProjectButton = styled.button`
  background-color: transparent;
  font-size: 1rem;
  color: #9a9595;
  padding: 0.5rem 1.5rem;
  border: 3px solid #9a9595;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.2s ease;
  font-weight: bold;
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  transform: rotate(-3deg);

  &hover{
    color: #b20a0a;
    border: 3px solid #b20a0a;
  }
` 


export { ModalAddProject };
