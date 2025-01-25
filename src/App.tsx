import { useState } from 'react';

import './App.css';

import { PomodoroComponent } from './components/PomodoroComponent';
import { ProjectList } from './components/ProjectList';
import { SidebarMenu } from './components/SidebarMenu';

import { ProjectProvider } from './context/ProjectContext';

function App() {
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);
  return (
    <ProjectProvider>
      <div className="App">
        <SidebarMenu togglePomodoro={setIsPomodoroOpen} pomodoroState={isPomodoroOpen}/>

        <ProjectList />

        {isPomodoroOpen && <PomodoroComponent />}
         
      </div>
    </ProjectProvider>
  );
}

export default App;
