import React, { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

interface SidebarMenuProps {
  togglePomodoro: (state: boolean) => void;
  pomodoroState: boolean;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  togglePomodoro,
  pomodoroState,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SideBar className={`sidebar ${isOpen ? "open" : ""}`}>
      <ToggleButton onClick={toggleMenu}>☰</ToggleButton>
      <Menu>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/">Settings</Link>
        </li>
        <li onClick={() => togglePomodoro(!pomodoroState)}>
          Pomodoro {pomodoroState ? "true" : "false"}
        </li>
      </Menu>
    </SideBar>
  );
};

const SideBar = styled.div`
  position: fixed;
  top: 0;
  right: -60%;
  width: 60%;
  height: 100%;
  background-color: #2c3e50;
  color: white;
  transition: right 0.3s ease;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  z-index: 1000;

  &.open {
    right: 0;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 0;
  left: -3rem;
  background-color: #2c3e50;
  border: none;
  color: white;
  padding: 1rem;
  cursor: pointer;
  font-size: 20px;
  border-radius: 1rem 0 0 1rem;
  transition: 0.3s ease;

  &:hover {
    background-color: #34495e;
  }
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 50px;

  li {
    margin: 15px 0;
    padding: 10px;
    cursor: pointer;
    background-color: #34495e;
    text-align: left;
    transition: background-color 0.3s ease;
    border-bottom: 2px solid #081f36;

    &:hover {
      background-color: #1abc9c;
    }
  }
`;

export { SidebarMenu };
