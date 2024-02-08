import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Col, Row } from 'react-bootstrap';
import axios from "axios";
import { namechange, preferences } from "../reducers/UserReducers";
import { useSelector, useDispatch } from 'react-redux';

function EditProfileScreen() {
    const [name, setName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [annualIncome, setAnnualIncome] = useState('');
    const [age, setAge] = useState('');
    const [postcode, setPostcode] = useState('');
    const [mileRadius, setMileRadius] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
    const [investmentError, setInvestmentError] = useState('');
    const [investmentSuccessMessage, setInvestmentSuccessMessage] = useState('');
    
    
    const [testInput, setTestInput] = useState('');


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = JSON.parse(localStorage.getItem('accessToken')) || {};
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (userInfo && userInfo.name) {
            setName(userInfo.name);
        }
        setAnnualIncome(user.income || '');
        setAge(user.age ? user.age.toString() : '');
        setPostcode(user.postcode || '');
        setMileRadius(user.radius ? user.radius.toString() : '');
        setDepositAmount(user.deposit || '');
    }, []);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.access}`
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                'http://localhost:8000/api/accounts/update/',
                {
                    'name': name,
                    'current_password': currentPassword,
                    'new_password': newPassword,
                    'confirm_password': confirmPassword,
                },
                config
            );

            dispatch(namechange({ name: name }));
            setSuccessMessage('Profile updated successfully.');
            setError(''); // Clear any previous errors
        } catch (error) {
            const errorMessage = error.response && error.response.data ? error.response.data.error : 'An error occurred while updating the profile. Please try again.';
            setError(errorMessage);
            setSuccessMessage(''); // Clear any previous success messages
        }
    };

    const submitInvestmentHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8000/api/listings/preferences/',
                {
                    'age': age,
                    'annual_income': annualIncome,
                    'postcode': postcode,
                    'radius': mileRadius,
                    'deposit': depositAmount
                },
                config
            );

            if (response.data.success) {
                setInvestmentSuccessMessage(response.data.success);
                const preferencesResponse = await axios.get('http://localhost:8000/api/listings/preferences/', config);

                dispatch(preferences({
                    income: preferencesResponse.data.annual_income,
                    age: preferencesResponse.data.age,
                    radius: preferencesResponse.data.radius,
                    postcode: preferencesResponse.data.postcode,
                    deposit: preferencesResponse.data.deposit
                }));
            }

            setInvestmentError('');
        } catch (error) {
            const errorMessage = error.response && error.response.data && error.response.data.error
                ? error.response.data.error
                : 'An error occurred while updating investment preferences. Please try again.';

            setInvestmentError(errorMessage);
            setInvestmentSuccessMessage('');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
            <Row className="w-100 gx-4 gy-4 justify-content-center">
                <Col xs={12} md={10} lg={6} xl={5}>
                    <Card className="shadow-lg mt-4">
                        <Card.Body>
                            <h2 className="text-center mb-4">Edit Profile</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            {successMessage && <div className="alert alert-success">{successMessage}</div>}
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='name' className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId='currentPassword' className="mb-3">
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Enter current password'
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId='newPassword' className="mb-3">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Enter new password'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId='confirmPassword' className="mb-4">
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Confirm new password'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Button type='submit' variant='primary' className='w-100 rounded-pill'>Update Profile</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={10} lg={6} xl={5}>
                    <Card className="shadow-lg my-4">
                        <Card.Body>
                            <h2 className="text-center mb-4">Investment Preferences</h2>
                            {investmentError && <div className="alert alert-danger">{investmentError}</div>}
                            {investmentSuccessMessage && <div className="alert alert-success">{investmentSuccessMessage}</div>}
                            <Form onSubmit={submitInvestmentHandler}>
                                <Form.Group controlId='annualIncome' className="mb-3">
                                    <Form.Label>Annual Income</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter annual income'
                                        value={annualIncome}
                                        onChange={(e) => setAnnualIncome(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId='age' className="mb-3">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter age'
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId='postcode' className="mb-3">
                                    <Form.Label>Postcode</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter postcode'
                                        value={postcode}
                                        onChange={(e) => setPostcode(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId='mileRadius' className="mb-3">
                                    <Form.Label>Mile Radius</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter mile radius'
                                        value={mileRadius}
                                        onChange={(e) => setMileRadius(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId='depositAmount' className="mb-3">
                                    <Form.Label>Deposit Amount</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter deposit amount'
                                        value={depositAmount}
                                        onChange={(e) => setDepositAmount(e.target.value)}
                                    />
                                </Form.Group>

                                <Button type='submit' variant='primary' className='w-100 rounded-pill mt-3'>Update Preferences</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default EditProfileScreen;
