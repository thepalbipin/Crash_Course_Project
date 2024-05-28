import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';

export default function PrivateRoute({children}){
  const {authDetails} = useContext(AuthContext);

  if(!authDetails?.isLoggedIn){
    return <Navigate to="/Login" />;
  }
  return children;
}