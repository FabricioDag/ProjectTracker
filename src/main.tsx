import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';

import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} > 
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path='projects' element={<ProjectsPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
