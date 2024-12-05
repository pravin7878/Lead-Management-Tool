import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pagas/Registration';
import Login from './pagas/loginPage';
import Dashboard from './pagas/Deshboard';
import { Home } from './pagas/Home';
// import { PrivateRoute } from './components/PrivateRoute';
import Navbar from './components/Nevbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AllRoutes } from './components/AllRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';


function App() {
  const { isLogged , user} = useSelector(state=>state.auth)
const dispatch = useDispatch()  
  
  return (<>
    <Navbar user={user.user} isLogged={isLogged} onLogout={()=>dispatch(logoutUser())}/>
    <AllRoutes />
    <ToastContainer />
  </>);
}

export default App;
