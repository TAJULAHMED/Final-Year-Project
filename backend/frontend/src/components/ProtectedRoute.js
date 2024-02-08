import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const user = useSelector((state) => state.user);
    const location = useLocation();

    if (user.loggedIn && user.verified && location.pathname === '/verify') {
        return <Navigate to="/profile" replace />;
    }

    // Redirect logged-in and verified users to the profile page
    if (user.loggedIn && user.verified && location.pathname !== '/profile') {
        return children;
    }

    // Redirect users not logged in to the login page
    if (!user.loggedIn) {
        return <Navigate to="/login" replace />;
    }

    // Redirect logged-in but not verified users to the verify page
    if (user.loggedIn && !user.verified && location.pathname !== '/verify') {
        return <Navigate to="/verify" replace />;
    }

    return children;
}

export default ProtectedRoute;
