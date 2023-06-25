import React, { useContext } from 'react'
import {Navigate, useLocation} from "react-router-dom"
import { AuthContext } from './context';


const ProtectedRoute = ({children}) => {

    const credentials = useContext(AuthContext)
    let location = useLocation();

    if(credentials?.auth==null) {
        console.log('sss');
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;