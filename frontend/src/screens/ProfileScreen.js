import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Card, ListGroup, Carousel, Button, Modal, Form } from 'react-bootstrap';
import Favourite from "../components/Favourite";

function ProfileScreen() {
    const[favs, setFavs] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('accessToken'))    


    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.access}`
        }
    };

    useEffect(() => {
        async function fetchFavs() {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/listings/favs/`, config); 
                setFavs(data);
            } catch (error) {
                console.error('Error fetching the house details:', error);
            }
        }

        fetchFavs();
    }, []); 

    return (
        <div>
            <Row>
                {favs.length > 0 && (
                    <>
                        <Col xs={12} className="mb-4">
                            <h3 className="text-center fw-bold mt-4">Your Favourites</h3>
                        </Col>
                        {favs.map(fav => (
                            <Col key={fav.id} sm={12} md={12} lg={12} xl={12}>
                                <Favourite fav={fav} />
                            </Col>
                        ))}
                    </>
                )}
            </Row>
            <Row>
                <Col xs={12} className="mb-4">
                    <h3 className="text-center fw-bold mt-4">Your Listings</h3>
                </Col>
                <Link to='/newlisting'>New Listing</Link>
            </Row>


        </div>
        
    )
}

export default ProfileScreen