//import { motion } from 'motion/react';

import styled from "styled-components";

import { useState, useEffect } from "react";
import { useProjects } from "../context/ProjectContext";

const FolderComponent = ({ project, onClick }) => {
  const [width, setWidth] = useState(0);

  let todosTotais = project.todos.length;
  let todosFeitos = project.todos.reduce((count, todo) => {
    return todo.completed ? count + 1 : count;
  }, 0);

  let percentage = (todosFeitos / todosTotais) * 100;

  let workedHours = project.records.reduce((acc, record) => {
    return acc + record.hours;
  }, 0);

  useEffect(() => {
    setWidth(Math.min(Math.max(percentage, 0), 100));
  }, [percentage]);

  return (
    <FolderWrapper onClick={onClick}>
      <Paper>
        <p>{project.deadline}</p>
      </Paper>

      {/* Background folder icon */}
      <FrontFolder>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"
          />
        </svg>
      </FrontFolder>

      {/* Progress overlay */}
      <FrontFolderOverlay style={{ width: `${width}%` }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"
          />
        </svg>
      </FrontFolderOverlay>

      <TextWrapper>
        <h1>{workedHours > 0 ? `${workedHours}h` : "<1h"}</h1>
        <p>{project.title}</p>
        {/* <p>{percentage}</p> */}
      </TextWrapper>
    </FolderWrapper>
  );
};

const Paper = styled.div`
  position: relative;
  width: 80%;
  height: 60%;
  background-color: #ebdab3;
  transition: 0.2s ease;

  & p {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 0.7rem;
    font-family: "Rubik", serif;
  }
`;

const FolderWrapper = styled.div`
  border: 2px solid red;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;

  &:hover ${Paper} {
    transform: translateY(-40%);
  }
`;

const FrontFolder = styled.div`
  position: absolute;
  inset: 0;
  color: gray;

  & svg {
    width: 200px;
  }
`;

const FrontFolderOverlay = styled.div`
  position: absolute;
  inset: 0;
  color: #ffb800;

  overflow: hidden;

  & svg {
    width: 200px;
  }
`;

const TextWrapper = styled.div`
  position: absolute;
  user-select: none;
  font-family: "Rubik", serif;
  color: #bd5738;
  opacity: 0.7;
  font-weight: normal;
  text-align: center;
  padding-top: 2rem;

  & h1 {
    font-size: 2.5rem;
    font-weight: normal;
  }
`;

export { FolderComponent };
