import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import House from "../components/House";


function SearchScreen() {
    const [formData, setFormData] = useState({
        listing_type: 'Terraced',
        price: 'any',
        bedrooms: '0+',
        bathrooms: '0+',
        days_listed: 'any',
        has_photos: '1',
        open_house: false,
        keywords: ''
    });
    const [listings, setListings] = useState([]);
    const [houses, setHouses] = useState([]);

    const userInfo = JSON.parse(localStorage.getItem('accessToken'))    
    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.access}`
        }
    }

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/listings/search/', formData, config);
            setListings(response.data); // Assuming the response data is the list of listings
            console.log(formData)
            console.log(response.data)
            setHouses(response.data)
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <Container className="my-4">
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Listing Type</Form.Label>
                        <Form.Select name="listing_type" value={formData.listing_type} onChange={handleChange}>
                            <option value="Terraced">Terraced</option>
                            <option value="Semi-Detached">Semi-Detached</option>
                            <option value="Detached">Detached</option>
                            <option value="Flat">Flat</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Price</Form.Label>
                        <Form.Select name="price" value={formData.price} onChange={handleChange}>
                            <option value="0">£0+</option>
                            <option value="200000">£200,000+</option>
                            <option value="400000">£400,000+</option>
                            <option value="600000">£600,000+</option>
                            <option value="800000">£800,000+</option>
                            <option value="1000000">£1,000,000+</option>
                            <option value="1500000">£1,500,000+</option>
                            <option value="-1">any</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Bedrooms</Form.Label>
                        <Form.Select name="bedrooms" value={formData.bedrooms} onChange={handleChange}>
                            <option value="0">0+</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                            <option value="5">5+</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Bathrooms</Form.Label>
                        <Form.Select name="bathrooms" value={formData.bathrooms} onChange={handleChange}>
                            <option value="0">0+</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Days Listed</Form.Label>
                        <Form.Select name="days_listed" value={formData.days_listed} onChange={handleChange}>
                            <option value="any">any</option>
                            <option value="1">1 day or less</option>
                            <option value="2">2 days or less</option>
                            <option value="5">5 days or less</option>
                            <option value="10">10 days or less</option>
                            <option value="20">20 days or less</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Photos</Form.Label>
                        <Form.Select name="has_photos" value={formData.has_photos} onChange={handleChange}>
                            <option value="1">1+</option>
                            <option value="3">3+</option>
                            <option value="5">5+</option>
                            <option value="10">10+</option>
                            <option value="15">15+</option>
                        </Form.Select>
                    </Col>
                    <Col xs={8}>
                        <Form.Label>Keywords</Form.Label>
                        <Form.Control
                            name="keywords"
                            value={formData.keywords}
                            onChange={handleChange}
                            placeholder="Keywords"
                        />
                    </Col>
                    <Col xs={4} className="d-flex align-items-center mt-2">
                        <Form.Check
                            type="checkbox"
                            name="open_house"
                            label="Open House"
                            checked={formData.open_house}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col className="d-flex justify-content-center">
                        <Button className='me-2' variant="primary" type="submit">Search</Button>
                        <Link to='/all'>
                            <Button>View All</Button>
                        </Link>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col className="d-flex justify-content-center">
                    <Link to='/prefs'>
                        <Button>Personalised investments for you</Button>
                    </Link>
                    </Col>
                </Row>

            </Form>

            <Row>
                {houses.map(house => (
                    <Col key={house.id} sm={12} md={12} lg={4} xl={7}>
                        <House house={house} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default SearchScreen;
