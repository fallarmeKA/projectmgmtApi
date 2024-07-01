import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import NotFoundPage from './pages/NotFoundPage.js';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/Register' element={<Register />}></Route>
        <Route path='/Dashboard' element={<Dashboard />}></Route>
      </Routes>

    </>
  );
}

export default App;
