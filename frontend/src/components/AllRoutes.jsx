import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "../pages/Home";
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from "../pages/Login";
import Tasks from "../pages/Tasks";

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';


function PrivateRoute({children}){
  const {authDetails} = useContext(AuthContext);

  if(!authDetails?.isLoggedIn){
    return <Navigate to="/Login" />;
  }
  return children;
}

export default function AllRoutes(){
  return (
    <Routes>
      <Route path='/login' element={<Login />} />

      <Route path='/' 
      element={
      <PrivateRoute>
        <Home />
      </PrivateRoute>
      } 
      />

      <Route path='/about' 
      element={
        <PrivateRoute>
          <About />
        </PrivateRoute>
      } 
      />

      <Route path='/contact' 
      element={
        <PrivateRoute>
          <Contact />
        </PrivateRoute>
      } 
      />

      <Route path='/Tasks' 
      element={
        <PrivateRoute>
          <Tasks />
        </PrivateRoute>
      } 
      />

    </Routes>
  );
}