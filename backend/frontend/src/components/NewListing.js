import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';

function NewListing() {
    const [formData, setFormData] = useState({
        title: '',
        address: '',
        city: '',
        borough: '',
        postcode: '',
        description: '',
        listingType: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        longitude: '',
        latitude: '',
        images: [],
        open_house: false,
    });
    const [photoMain, setPhotoMain] = useState(null); 
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const config = {
        withCredentials: true
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleMainImageChange = (e) => {
        setPhotoMain(e.target.files[0]); 
    };

    const handleImageChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            images: Array.from(e.target.files)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const uploadFormData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'images') {
                uploadFormData.append(key, value);
            }
        });

        if (photoMain) {
            uploadFormData.append('photo_main', photoMain);  
        }

        formData.images.forEach((image, index) => {
            uploadFormData.append(`photo_${index + 1}`, image);
        });

        try {
            const response = await axios.post('http://localhost:8000/api/listings/newlisting/', uploadFormData, config);
            console.log(response.data);
            setMessage(response.data.message);
            setFormData({
                title: '',
                address: '',
                city: '',
                borough: '',
                postcode: '',
                description: '',
                listingType: '',
                price: '',
                bedrooms: '',
                bathrooms: '',
                longitude: '',
                latitude: '',
                images: [],
                open_house: false,
            });

            window.scrollTo(0, 0);

    
            // Clear the main photo
            setPhotoMain(null);
            setIsSuccess(true);
        } catch (error) {
            console.error('Error submitting the form', error);
            setMessage('Failed to list property. Please try again.');
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Container className="py-3">
            <Row className="justify-content-md-center">
                <Col xs={12} md={10} lg={8}>
                    <Form onSubmit={handleSubmit} className="mt-4">
                        <h2 className="text-center mb-4">List a Property</h2>

                        {message && (
                            <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
                                {message}
                            </div>
                        )}

                        <Form.Group controlId="formAddress">
                            <Form.Label>1st Line of Address</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="address" 
                                value={formData.address} 
                                onChange={handleChange} 
                                placeholder="Enter address" 
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="city" 
                                value={formData.city} 
                                onChange={handleChange} 
                                placeholder="Enter city" 
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPostcode">
                            <Form.Label>Postcode</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="postcode" 
                                value={formData.postcode} 
                                onChange={handleChange} 
                                placeholder="Enter postcode" 
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                name="description" 
                                value={formData.description} 
                                onChange={handleChange} 
                                placeholder="Enter a description"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formListingType">
                            <Form.Label>Listing Type</Form.Label>
                            <Form.Control 
                                as="select" 
                                name="listingType" 
                                value={formData.listingType} 
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a Type</option>
                                <option value="Terraced">Terraced</option>
                                <option value="Semi Detatched">Semi Detatched</option>
                                <option value="Detatched">Detatched</option>
                                <option value="Flat">Flat</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="price" 
                                value={formData.price} 
                                onChange={handleChange} 
                                placeholder="Enter price" 
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBedrooms">
                            <Form.Label>Bedrooms</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="bedrooms" 
                                value={formData.bedrooms} 
                                onChange={handleChange} 
                                placeholder="Number of bedrooms" 
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBathrooms">
                            <Form.Label>Bathrooms</Form.Label>
                            <Form.Control 
                                type="number" 
                                step="0.5" 
                                name="bathrooms" 
                                value={formData.bathrooms} 
                                onChange={handleChange} 
                                placeholder="Number of bathrooms" 
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formMainPhoto">
                            <Form.Label>Main Photo</Form.Label>
                            <Form.Control 
                                type="file" 
                                name="photo_main" 
                                onChange={handleMainImageChange} 
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formImages">
                            <Form.Label>Other Images</Form.Label>
                            <Form.Control 
                                type="file" 
                                multiple 
                                onChange={handleImageChange} 
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formOpenHouse">
                            <Form.Check 
                                type="checkbox" 
                                label="Open House" 
                                name="open_house" 
                                checked={formData.open_house} 
                                onChange={(e) => setFormData(prevState => ({
                                    ...prevState,
                                    open_house: e.target.checked
                                }))} 
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-3" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                <span className="ml-2">Submitting...</span>
                            </>
                        ) : (
                            'Submit Listing'
                        )}
                    </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default NewListing;
