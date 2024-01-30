import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PublicRoute({ children, redirectTo = '/' }) {
    const user = useSelector((state) => state.user);
    console.log('sndsna')
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
