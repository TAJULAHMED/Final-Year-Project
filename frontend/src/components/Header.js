import React from 'react';
import { Link } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { logout } from '../reducers/UserReducers'; 
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; 

function Header() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const isLoggedIn = user.loggedIn;

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Real Estate App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {isLoggedIn && (
                            <>
                                <LinkContainer to="/posts">
                                    <Nav.Link>Forum</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/search">
                                    <Nav.Link>Search</Nav.Link>
                                </LinkContainer>
                                <NavDropdown title={user.name} id="basic-nav-dropdown">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/editprofile">
                                        <NavDropdown.Item>Account details</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/listings">
                                        <NavDropdown.Item>My Listings</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}
                        {!isLoggedIn && (
                            <>
                                <LinkContainer to="/login">
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/register">
                                    <Nav.Link>Register</Nav.Link>
                                </LinkContainer>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
