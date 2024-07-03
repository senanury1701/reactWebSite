import React from 'react';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MyNavbar from './components/Navbar/navbar'

function App() {
  return (
    <>
      <Router>
        <MyNavbar className='fixed-top'/>
        <div className='mt-5'>
          <Routes >
            <Route exact path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>          
        </div>

      </Router>
    </>
  );
}

export default App;
