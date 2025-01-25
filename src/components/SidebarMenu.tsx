import React, { useState } from 'react';
import './SidebarMenu.css';

const SidebarMenu = ({ togglePomodoro, pomodoroState }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="toggle-button" onClick={toggleMenu}>
        ☰
      </button>
      <ul className="menu">
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
        <li>Contact</li>
        <li onClick={() => togglePomodoro(!pomodoroState)}>
          Pomodoro {pomodoroState ? 'true' : 'false'}
        </li>
      </ul>
    </div>
  );
};

export { SidebarMenu };
