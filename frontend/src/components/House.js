import React from "react";
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function House({ house }) {
    return (
        <Card className="my-3 p-3 rounded house-card">
            <Link to={`/listings/${house.slug}/`}>
                <Card.Img variant="top" src={house.photo_main} style={{ height: '300px', objectFit: 'cover' }} />
            </Link>

            <Card.Body>
                <Link to={`/listings/${house.slug}/`} style={{ textDecoration: 'none' }}>
                    <Card.Title as="h5">{house.title}</Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-2">
                        <strong>Price:</strong> £{house.price}
                    </div>
                    <div>
                        <strong>Address:</strong> {house.address}, {house.city}, {house.borough}
                    </div>
                    <div>
                        <strong>Type:</strong> {house.listing_type}
                    </div>
                    <div>
                        <strong>Bedrooms:</strong> {house.bedrooms} | <strong>Bathrooms:</strong> {house.bathrooms}
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default House;
