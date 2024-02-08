import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import House from "../components/House";

function PersonalisedListingsScreen() {
    const [houses, setHouses] = useState([]);

    useEffect(() => {
        fetchHouses();
    }, []); 
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }, 
        withCredentials: true
    };

    async function fetchHouses() {
        try {
            const response = await axios.get(`http://localhost:8000/api/listings/preflistings/`, config);
            setHouses(response.data);
        } catch (error) {
            console.error('Error fetching houses:', error);
        }
    }

    return (
        <Container>
            <br />
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

export default PersonalisedListingsScreen;
