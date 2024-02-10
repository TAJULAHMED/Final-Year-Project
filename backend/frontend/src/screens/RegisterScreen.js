import React, { useState, useEffect} from "react";
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap'

import axios from "axios";


function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()


    const submitHandler = async (e) => {
        e.preventDefault()
        console.log("Submitted")

        const config = {
            headers:{
                'Content-type' : 'application/json',
            }
        }

        if (password != password2){
            setError("Passwords do not match")
        } else {
            try {
                const { data } = await axios.post('http://localhost:8000/api/accounts/signup/', 
                {
                    'name': name,
                    'email': email, 
                    'password': password,
                    'password2': password2
                }, config)

                if (data && data.error) {
                    setError(data.error)
                } else {
                    navigate('/login')
                }
            }
            catch {
                setError('An error occurred while registering. Please try again.')
            }
        }

        

    }


    return (
        <Container className="d-flex justify-content-center align-items-center mt-3" style={{ minHeight: '70vh' }}>
            <Card className="shadow-lg" style={{ width: '100%', maxWidth: '500px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Register</h2>
    
                    {error && <div className="alert alert-danger">{error}</div>}
    
                    <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name' className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'  // Change to 'text' type for name input
                            placeholder='Enter name'  // Update placeholder for name
                            value={name}  // Use a state variable for name
                            onChange={(e) => setName(e.target.value)}  // Update handler for setting name
                            className="rounded-pill"
                        />
                    </Form.Group>


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

                        <Form.Group controlId='password2' className="mb-4">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                className="rounded-pill"
                            />
                        </Form.Group>
    
                        <Button type='submit' variant='primary' className='w-100 rounded-pill'>Sign In</Button>
                    </Form>
                </Card.Body>
                <Card.Footer className="text-center">
                    <Row>
                        <Col>
                            Already have an account? <Link to='/login'>Login</Link>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </Container>
    );

}


export default RegisterScreen