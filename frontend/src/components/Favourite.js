import React from "react";
import { Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Favourite({ fav }) {
    return (
        <Container className="d-flex justify-content-center">
            <Card className="my-2 p-3 rounded w-100">
                <Row>
                    <Col md={3} className="d-flex align-items-center">
                        <Card.Title as={Link} to={`/listings/${fav.listing_details.slug}`} className="mb-0">
                            {fav.listing_details.title}
                        </Card.Title>
                    </Col>
                    <Col md={3} className="d-flex align-items-center">
                        <Card.Text className="mb-0">
                            <strong>Address:</strong> {fav.listing_details.address}, {fav.listing_details.city}
                        </Card.Text>
                    </Col>
                    <Col md={2} className="d-flex align-items-center">
                        <Card.Text className="mb-0">
                            <strong>Bedrooms:</strong> {fav.listing_details.bedrooms}
                        </Card.Text>
                    </Col>
                    <Col md={2} className="d-flex align-items-center">
                        <Card.Text className="mb-0">
                            <strong>Bathrooms:</strong> {fav.listing_details.bathrooms}
                        </Card.Text>
                    </Col>
                    <Col md={2} className="d-flex align-items-center">
                        <Card.Text className="mb-0">
                            <strong>Price:</strong> £{fav.listing_details.price.toLocaleString()}
                        </Card.Text>
                    </Col>
                    
                </Row>
            </Card>
        </Container>
    )
}

export default Favourite;
