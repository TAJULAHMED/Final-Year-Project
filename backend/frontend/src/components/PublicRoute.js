import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Component to direct logged in users to specific routes based on their verification status, while allowing public access otherwise
function PublicRoute({ children, redirectTo = '/' }) {
    const user = useSelector((state) => state.user);
    console.log(user.loggedIn)

    if (user.loggedIn && !user.verified) {
        return <Navigate to='/verify' replace />;
    } 

    if (user.loggedIn) {
        return <Navigate to={redirectTo} replace />;
    } 

    return children; 
}



export default PublicRoute;
