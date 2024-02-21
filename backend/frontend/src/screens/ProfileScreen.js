import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import Favourite from "../components/Favourite";
import House from "../components/House";
import { RiDeleteBin6Line } from "react-icons/ri";

function ProfileScreen() {
    const [favs, setFavs] = useState([]);
    const [userHouses, setUserHouses] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null); 
    const [errorMessage, setErrorMessage] = useState(null);


    const config = {
        headers: {
            'Content-Type': 'application/json',
        }, 
        withCredentials: true
    };

    useEffect(() => {
        async function fetchFavs() {
            try {
                const { data: favsData } = await axios.get(`http://localhost:8000/api/listings/favs/`, config); 
                setFavs(favsData);

                const { data: housesData } = await axios.get(`http://localhost:8000/api/listings/user-listings/`, config);
                setUserHouses(housesData);

            } catch (error) {
                console.error('Error fetching the house details:', error);
            }
        }

        fetchFavs();
    }, []); 

    const deleteHouse = async (houseSlug) => {
        try {
            const response  = await axios.post(`http://localhost:8000/api/listings/user-listings/`, { 'slug': houseSlug }, config);
            setUserHouses(response.data);
            setSuccessMessage('Listing deleted successfully.'); 
            setErrorMessage(null);
        } catch (error) {
            console.error('Error: ', error);
            setErrorMessage('Failed to delete listing.'); 
            setSuccessMessage(null); 
        }
    }; 

    return (
        <>
            <Container className="mt-3">
            {successMessage && <Alert variant="success">{successMessage}</Alert>} 
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} 
                
            <Row>
                {favs.length > 0 && (
                    <>
                        <Col xs={12} className="mb-4">
                            <h3 className="text-center fw-bold mt-2">Your Favourites</h3>
                        </Col>
                        {favs.map(fav => (
                            <Col key={fav.id} xs={12} sm={12} md={12} lg={12} xl={12}> 
                                <Favourite fav={fav} />
                            </Col>
                        ))}
                    </>
                )}
            </Row>
            </Container>
            <Container> 
            <Row>
                <Col xs={12} className="mb-4">
                    <h3 className="text-center fw-bold">Your Listings</h3>
                </Col>
                {userHouses && userHouses.length > 0 && userHouses.map(house => (
                    <Col key={house.id} xs={12} sm={6} md={4} lg={4} xl={4} className="position-relative"> 
                        <RiDeleteBin6Line
                        className="delete-icon position-absolute top-0 end-0 m-2"
                        style={{ cursor: 'pointer', zIndex: 1,  fontSize: '32px' }}
                        onClick={() => deleteHouse(house.slug)}
                        />
                        <House house={house} />
                    </Col>
                ))}
            </Row>

            <Row>
                <Col className="text-center">
                    <Button as={Link} to='/newlisting' variant="primary">New Listing</Button>
                </Col>
            </Row>
            </Container>
        </>
    );
}

export default ProfileScreen;
