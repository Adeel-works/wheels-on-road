import './App.css'
import {
  
  Routes,
  Route,
  BrowserRouter,
  useNavigate,
  Navigate,
  
} from "react-router-dom";
import { Login } from './pages/login';
import { SignUp } from './pages/signup';
import { Categories } from './pages/categories';
import PermanentDrawerLeft from './layout/Navigation/navigation';
import { Dashboard } from './pages/dashboard';
import { Vehicles } from './pages/vehicles';
import { useEffect, useState } from 'react';
import { AuthContext } from './context';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Header } from './layout/Header';
import ProtectedRoute from './ProtectedRoute';


function App() {

  const [auth, setAuth] = useState(
    localStorage.getItem("auth") || null
  );

  const setTokens = (data:any) => {
  localStorage.setItem("auth", JSON.stringify(data));
    setAuth(data);
  };
  
  return (
    <AuthContext.Provider value={{ auth, setAuth:setTokens }}>
    {auth==null ? 
    
        <Routes>

    <Route path='/login' Component={Login}/>
          <Route path='/sign-up' Component={SignUp}/>
          </Routes>
    
    
    
     : 
        <ProtectedRoute >
        <PermanentDrawerLeft >
          <Header />
        <div className="content">
        <Routes>
   
          <Route path='/home' Component={Dashboard}/>
          <Route path='/categories' Component={Categories}/>
          <Route path='/vehicles' Component={Vehicles}/>
          </Routes>
          </div>
          </PermanentDrawerLeft>
          </ProtectedRoute>
    
    }
    <ToastContainer />

    </AuthContext.Provider>
  )
}

export default App
