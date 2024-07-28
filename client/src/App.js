import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Register from './pages/auth/Register';

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
