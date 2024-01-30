import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/UserReducers';

function Header() {
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch()
    const isLoggedIn = user.loggedIn;

    return (
        <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand">Real Estate App</Link>
                <ul className="navbar-nav me-auto"></ul>

                {isLoggedIn ? (
                    // Show Profile and Logout if user is logged in
                    <>
                        <Link to='/profile' className="btn btn-secondary my-2 my-sm-0">Profile</Link>
                        <button onClick={() => {
                            dispatch(logout())
                        }} className="btn btn-secondary my-2 my-sm-0">Logout</button>
                    </>
                ) : (
                    // Show Login and Register if user is not logged in
                    <>
                        <Link to='/login' className="btn btn-secondary my-2 my-sm-0">Login</Link>
                        <Link to='/register' className="btn btn-secondary my-2 my-sm-0">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Header;
