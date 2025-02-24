import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Getpass from './components/Getpass';
import LoginPage from './components/LoginPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage></LoginPage>}/>
        <Route path="/dashboard" element={<Dashboard></Dashboard>} />
        <Route path="/getpass" element={<Getpass></Getpass>} />
      </Routes>
    </Router>
  );
}

export default App;
