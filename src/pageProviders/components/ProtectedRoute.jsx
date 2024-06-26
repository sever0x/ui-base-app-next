import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
    const isAuthorized = useSelector(state => state.user.isAuthorized);

    return isAuthorized ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
