import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { verified } from "../reducers/UserReducers";


function VerifyScreen() {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');
    const dispatch = useDispatch();

    const userInfo = JSON.parse(localStorage.getItem('accessToken'));
    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.access}`
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/contacts/verifycode/', {'code': code}, config);
            dispatch(verified(response.data.verified));

        } catch (error) {
            setMessage(error.response?.data.error || 'Error verifying code.');
            setVariant('danger');
        }
    };

    const handleResendCode = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/contacts/createcode/', {}, config);
            setMessage(response.data.message);
            setVariant('info');
        } catch (error) {
            setMessage('Error resending code.');
            setVariant('danger');
        }
    };

    return (
        <Container className='mt-4'>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicCode">
                            <Form.Label>Enter Verification Code</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={code} 
                                onChange={(e) => setCode(e.target.value)} 
                                placeholder="Enter code" 
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Button variant="primary" type="submit">
                                Verify Code
                            </Button>
                        </div>
                        <div className="text-center mt-3">
                            <span className="text-primary" style={{ cursor: 'pointer' }} onClick={handleResendCode}>
                                Click here to resend code
                            </span>
                        </div>
                    </Form>
                    {message && <Alert variant={variant} className="mt-3">{message}</Alert>}
                </Col>
            </Row>
        </Container>
    );
}

export default VerifyScreen;
