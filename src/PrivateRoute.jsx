import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from './hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { loading, user } = useAuth();
    const location = useLocation()
    const willGo = location?.pathname;
    const product = location?.state;
    if (loading) {
        return <span className="loading loading-bars loading-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
    }

    if (user) {
        return children;
    }
    return (
        // <Navigate state={to={willGo}, product={product}} to='/login'></Navigate>
        willGo.includes("dashboard") ? <Navigate to={"/"} /> :
        <Navigate
            to="/login"
            state={{ from: willGo, product }}
        />
    );
};

export default PrivateRoute;