import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { namechange } from "../reducers/UserReducers";

function EditProfileScreen() {
    const [name, setName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = JSON.parse(localStorage.getItem('accessToken'));

    useEffect(() => {
        if(userInfo && userInfo.name) {
            setName(userInfo.name);
        }
    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        };

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

            dispatch(namechange({ name: data.name }));
            setSuccessMessage('Password updated successfully');

        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.error || 'An error occurred while updating the profile. Please try again.');
            } else {
                setError('An error occurred while updating the profile. Please try again.');
            }
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
            <Card className="shadow-lg mt-4" style={{ width: '100%', maxWidth: '500px' }}>
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
                                className="rounded-pill"
                            />
                        </Form.Group>

                        <Form.Group controlId='currentPassword' className="mb-3">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter current password'
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="rounded-pill"
                            />
                        </Form.Group>

                        <Form.Group controlId='newPassword' className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter new password'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="rounded-pill"
                            />
                        </Form.Group>

                        <Form.Group controlId='confirmPassword' className="mb-4">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirm new password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="rounded-pill"
                            />
                        </Form.Group>

                        <Button type='submit' variant='primary' className='w-100 rounded-pill'>Update Profile</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default EditProfileScreen;
