import React, { use } from 'react';
import { Authcontext } from '../Context/AuthContext';
import LoadSppiner from '../Components/LoadSppiner';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    
    const { user, loading } = use(Authcontext);
    if (loading) {
        <LoadSppiner/>
    }
    if (!user) {
        return <Navigate to='/login'></Navigate>
    }

    return children;
};

export default PrivateRoute;