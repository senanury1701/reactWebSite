import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth'
import Profile from './pages/Profile';
import MyNavbar from './components/Navbar/navbar'
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuthState } from './features/auth/authSlice.ts';
import { selectIsAuthenticated } from './features/auth/authSelectors.ts';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated)

  useEffect(() => {
      dispatch(checkAuthState());
      
  }, [dispatch])
  
  useEffect(() => {
    console.log('..:', isAuthenticated); 
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <MyNavbar className='fixed-top'/>
        <div className='mt-5'>
          <Routes >
            <Route exact path="/" element={<Home/>} />
            <Route path="/auth" element={<Auth/>} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>          
        </div>
        
      </Router>
    </>
  );
}

export default App;
