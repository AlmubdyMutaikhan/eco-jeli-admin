import './App.css';

import Navbar from './comps/Navbar/Navbar';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import useAuth from './hooks/useAuth';
import { useEffect, useState } from 'react';
import AuthPage from './comps/AuthPage/AuthPage'
import ProtectedRoute from './comps/ProtectedRoute';
import Users from './comps/Users/Users';
import PublicRoute from './comps/PublicRoute';
import Events from './comps/Events/Events';
import News from './comps/News/News';

function App() {
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState(null);

  const loadAuth = async () => {
    try {
      const user = await isAuthenticated();
      if(user.status) {
        setUser(user.payload.user);
      }
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadAuth();
  })

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={  <ProtectedRoute user={user}>
            <Users/>
             </ProtectedRoute>} 
          />
          <Route path='/events' element={  <ProtectedRoute user={user}>
            <Events/>
             </ProtectedRoute>} 
          />

<Route path='/news' element={  <ProtectedRoute user={user}>
            <News/>
             </ProtectedRoute>} 
          />

          <Route path='/auth' element={<PublicRoute user={user}>
          <AuthPage/>
          </PublicRoute> } />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
