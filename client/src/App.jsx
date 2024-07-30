
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './auth/Register';
import Login from './Login';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes >
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        
        </Routes>
      </Router>
    </>
  );
}

export default App;