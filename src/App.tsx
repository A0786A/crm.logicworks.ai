import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Projects from './pages/Projects';
import Agents from './pages/Employees';
import Marketing from './pages/Marketing';
import Leads from './pages/Leads';
import Interns from './pages/Interns';
import Login from './pages/Login';
import Settings from './pages/Settings';
import AIAgents from './pages/AIAgents';
import Reports from './pages/Reports';
import Calendar from './pages/Calendar';
import Communications from './pages/Communications';
import Tasks from './pages/Tasks';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="clients" element={<Clients />} />
            <Route path="projects" element={<Projects />} />
            <Route path="agents" element={<Agents />} />
            <Route path="marketing" element={<Marketing />} />
            <Route path="leads" element={<Leads />} />
            <Route path="interns" element={<Interns />} />
            <Route path="settings" element={<Settings />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="communication" element={<Communications />} />
            <Route path="ai-agents" element={<AIAgents />} />
            <Route path="reports" element={<Reports />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;