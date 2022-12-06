import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useBuyer from '../hooks/useBuyer';
import { AuthContext } from '../context/AuthProvider';
import Spinner from '../components/Spinner/Spinner';

const BuyerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isBuyer, isBuyerLoading] = useBuyer(user ?.email)
    const location = useLocation();
    console.log(isBuyer)

    if (loading || isBuyerLoading) {
        return <Spinner></Spinner>
    }

    if (user && isBuyer) {
        console.log('comming Addmin route')
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default BuyerRoute;