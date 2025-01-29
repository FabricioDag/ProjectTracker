import React, { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import correctIcon from '../assets/correct.svg'
import arrowIcon from '../assets/arrow.svg'

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
      <ToggleButton onClick={toggleMenu} className={`sidebar ${isOpen ? "open" : ""}`}>
        <img src={arrowIcon} alt="arrowIcon" />
      </ToggleButton>
      <Menu>
        <Link to="/projects">
          <li>
            <p>Projects</p>
          </li>
        </Link>

        <Link to="/dashboard">
          <li>
            <p>Dashboard</p>
          </li>
        </Link>

        {/* <Link to="/dashboard">
          <li>
            <p>Dashboard</p>
          </li>
        </Link> */}
        
        <li onClick={() => togglePomodoro(!pomodoroState)}>
          <p>Pomodoro</p>
          
          <Checkbox>

            {pomodoroState ? (
              <img src={correctIcon} alt="correctIcon" />
            ) : ""}
            
          </Checkbox>
          
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
  display:flex;
  align-items:center;
  justify-content:center;

  &:hover img{
    width:1.3rem;
    height:1.3rem;
  }

  img{
    width:1.2rem;
    height:1.2rem;
    //border:2px solid red;
    transition:.2s ease
  }

  &.open img{
    transform: rotate(-180deg);
  }
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 50px;
  
  a{
    text-decoration:none;
    color:inherit;
  }

  li {
    display:flex;
    align-items:center;
    justify-content:space-between;
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

const Checkbox = styled.div`
  height:1.3rem;
  width:1.3rem;
  border:1px solid white;
  position:relative;

  img{
    position:absolute;
    width:120%;
    top:10%;
    left:10%
  }
`

export { SidebarMenu };
