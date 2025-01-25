import { useState } from "react";
import { Outlet } from "react-router-dom";

import "./App.css";

import { PomodoroComponent } from "./components/PomodoroComponent";
import { SidebarMenu } from "./components/SidebarMenu";
import { ProjectProvider } from "./context/ProjectContext";

function App() {
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);
  return (
    <ProjectProvider>
      <div className="App">
        <SidebarMenu
          togglePomodoro={setIsPomodoroOpen}
          pomodoroState={isPomodoroOpen}
        />

        <Outlet />

        {isPomodoroOpen && <PomodoroComponent />}
      </div>
    </ProjectProvider>
  );
}

export default App;
