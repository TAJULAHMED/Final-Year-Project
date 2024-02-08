import React, { useState, useEffect} from "react";
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap'
import { login, logout, preferences } from "../reducers/UserReducers";
import { useDispatch, useSelector } from 'react-redux';

import axios from "axios";


function LoginScreen() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const submitHandler = async (e) => {
        e.preventDefault()
        console.log("Submitted")

        try {
            const { data } = await axios.post('http://localhost:8000/api/accounts/token/', {'email':email, 'password':password})
            
            dispatch(login({ name: data.name, email: data.email, loggedIn: true, verified: data.verified}))

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    //Authorization: `Bearer ${userInfo.access}`
                }, 
                withCredentials: true
            };

            const response = await axios.get('http://localhost:8000/api/listings/preferences/', config);
            console.log(response.data); 
            console.log('This is working')

            dispatch(preferences({
                income: response.data.annual_income, 
                age: response.data.age, 
                radius: response.data.radius,
                postcode: response.data.postcode,
                deposit: response.data.deposit
            }));

            navigate('/verify')
        }
        catch {
            setError('An error occurred while logging in. Please try again.')
        }

    }


    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
            <Card className="shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign In</h2>
    
                    {error && <div className="alert alert-danger">{error}</div>}
    
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='email' className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'  // Change to 'email' type
                                placeholder='Enter email'  // Update placeholder
                                value={email}  // Change to email state variable
                                onChange={(e) => setEmail(e.target.value)}  // Update to setEmail
                                className="rounded-pill"
                            />
                        </Form.Group>
    
                        <Form.Group controlId='password' className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="rounded-pill"
                            />
                        </Form.Group>
    
                        <Button type='submit' variant='primary' className='w-100 rounded-pill'>Sign In</Button>
                    </Form>
                </Card.Body>
                <Card.Footer className="text-center">
                    <Row>
                        <Col>
                            New Customer? <Link to='/register'>Register</Link>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </Container>
    );

}


export default LoginScreen