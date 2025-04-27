import React from 'react';
import './App.css'

import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Navigation from './components/Navigation';

import LoginPage from './Pages/LoginPage.jsx';
import SignUp from './Pages/Signup.jsx';
import Logout from './Pages/Logout.jsx';
import Task from './Pages/Task.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const location = useLocation();

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/task" element={<Task />} />
        
      </Routes>
    </>
  );
};

export default App;
