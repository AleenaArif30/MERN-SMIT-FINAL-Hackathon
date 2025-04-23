

import React from 'react';
import './App.css'

import { Routes, Route, useLocation  } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Navigation from './components/Navigation';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage.jsx';
import SignUp from './pages/Signup.jsx';
import Cart from './pages/Cart.jsx';
import Logout from './pages/Logout.jsx';
import Profile from './pages/Profile.jsx';
import AdminPage from './pages/AdminPage.jsx';
import Products from './pages/Products.jsx';
import Update from './pages/Update.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const location = useLocation();
  const adminPage = location.pathname === '/admin'; 
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
    
      {!adminPage && <Navigation />} 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path='/products' element={<Products />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update" element={<Update />} />
    </Routes>
    {!adminPage && <Footer />}
    </>
  );
};

export default App;
