import { Navigate, Outlet } from 'react-router-dom'
import config from "../../config";

export const ProtectedRoute = ( ) => {
 
  return(
    
  !config.ADMIN ? <Navigate to='/'/> : <Outlet/>

  ) 
  
} 