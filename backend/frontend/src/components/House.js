import React from "react";
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBed, FaBath } from 'react-icons/fa';

// Component to show the house with an image and description
function House({ house }) {
    const imageUrl = house.photo_main && house.photo_main.startsWith('http')
        ? house.photo_main
        : `http://localhost:8000${house.photo_main}`;

    return (
        <Card className="my-3 p-3 rounded house-card">
            <Link to={`/listings/${house.slug}/`}>
                <Card.Img 
                    variant="top" 
                    src={imageUrl} 
                    alt={house.title} 
                    style={{ height: '300px', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />            
            </Link>

            <Card.Body>
                <Link to={`/listings/${house.slug}/`} style={{ textDecoration: 'none' }}>
                    <Card.Title as="h3">{house.title}</Card.Title>
                </Link>
                
                <Card.Text as="div" style={{ color: 'CornflowerBlue', marginTop: '10px' }}>
                    <strong>Type:</strong> {house.listing_type}
                </Card.Text>

                <Card.Text as="div">
                    <div className="my-2">
                        <strong>Price:</strong> £{new Intl.NumberFormat('en-GB').format(house.price)}
                    </div>
                    <div>
                        <strong>Address:</strong> {house.address}, {house.city}, {house.borough}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <FaBed style={{ marginRight: '5px', color: 'CornflowerBlue' }} /> <strong>{house.bedrooms} Bedrooms</strong>  
                        <FaBath style={{ marginLeft: '10px', marginRight: '5px', color: 'CornflowerBlue' }} /><strong>{house.bathrooms} Bathrooms</strong>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default House;
