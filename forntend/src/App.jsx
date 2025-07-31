import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TodoPage from './pages/TodoPage';

export default function App() {
  return (
    <Routes>
   
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/todos" element={<TodoPage />} />
    </Routes>
  );
}
