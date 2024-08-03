
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './auth/Register';
import Login from './auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Home';
import Dashboard from './dashboard/Dashboard';
import ProfileEdit from './dashboard/ProfileEdit';
function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes >
        <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/edit-profile' element={<ProfileEdit />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;