import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

// Component that manages route access based on user authentication and verification status 
function ProtectedRoute({ children }) {
    const user = useSelector((state) => state.user);
    const location = useLocation();

    if (user.loggedIn && user.verified && location.pathname === '/verify') {
        return <Navigate to="/profile" replace />;
    }

    if (user.loggedIn && user.verified && location.pathname !== '/profile') {
        return children;
    }

    if (!user.loggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (user.loggedIn && !user.verified && location.pathname !== '/verify') {
        return <Navigate to="/verify" replace />;
    }

    return children;
}

export default ProtectedRoute;
