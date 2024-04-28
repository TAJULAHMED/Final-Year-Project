import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import House from "../components/House";

const PAGE_SIZE = 3;

// Screen to show all of the houses, uses pagination 
function HomeScreen() {
    const [houses, setHouses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchHouses(currentPage);
    }, [currentPage]);

    async function fetchHouses(pageNumber) {
        try {
            const response = await axios.get(`http://localhost:8000/api/listings/?page=${pageNumber}`);
            setHouses(response.data.results);
            const totalItems = response.data.count;
            const totalPages = Math.ceil(totalItems / PAGE_SIZE);
            setTotalPages(totalPages);
        } catch (error) {
            console.error('Error fetching houses:', error);
        }
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Generate an array of page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
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
            <Row>
                <Col className="text-center">
                    {pageNumbers.map(number => (
                        <Button 
                            key={number} 
                            variant={number === currentPage ? "secondary" : "primary"} 
                            onClick={() => handlePageChange(number)}
                            style={{ margin: "5px" }}>
                            {number}
                        </Button>
                    ))}
                </Col>
            </Row>
        </Container>
    );
}

export default HomeScreen;
