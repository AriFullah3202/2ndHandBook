import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import { AuthContext } from '../context/AuthProvider';
import Spinner from '../components/Spinner/Spinner';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin(user ?.email)
    const location = useLocation();
    console.log(isAdmin)

    if (loading || isAdminLoading) {
        return <Spinner></Spinner>
    }

    if (user && isAdmin) {
        console.log('comming Addmin route')
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;