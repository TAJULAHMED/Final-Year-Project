import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, ListGroup, Carousel, Button, Modal, Form } from 'react-bootstrap';
import { FaBed, FaBath } from 'react-icons/fa';
import MortgageCalculator from "../components/MortgageCalculator";
import PredPrices from "../components/PredPrices";
import { useSelector, useDispatch } from 'react-redux';
import MapboxMap from "../components/MapboxMap";


function HouseScreen() {
    const { slug } = useParams();
    const [house, setHouse] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [subject, setSubject] = useState([])
    const [sendMessage, setMessage] = useState([])
    const [sellerEmail, setSellerEmail] = useState([])
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [isFav, setIsFav] = useState(true);
    const [apiCallCompleted, setApiCallCompleted] = useState(false);
    const [showMapModal, setShowMapModal] = useState(false);


    const user = useSelector((state) => state.user);


    
    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    }
    const summaryLimit = 100;
    const renderDescription = () => {
        let descriptionContent = "";
    
        if (!house.description) {
            descriptionContent = <p>No description available.</p>;
        } else {
            descriptionContent = (
                <>
                    {showFullDescription || house.description.length <= summaryLimit
                        ? house.description
                        : `${house.description.substring(0, summaryLimit)}... `}
                    {house.description.length > summaryLimit && (
                        <span
                            onClick={toggleDescription}
                            style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
                        >
                            {showFullDescription ? ' Show Less' : 'Read More'}
                        </span>
                    )}
                </>
            );
        }
    
        if (house.nearby_stations && house.nearby_stations.length > 0) {
            const stationsList = (
                <div style={{ marginTop: '20px' }}>
                    <strong>Nearby Stations (1.5km):</strong>
                    <ul>
                        {house.nearby_stations.map((station, index) => (
                            <li key={index}>{station.name}</li>
                        ))}
                    </ul>
                </div>
            );
            descriptionContent = (
                <>
                    {descriptionContent}
                    {stationsList}
                </>
            );
        }
        if (house.schools && house.schools.length > 0) {
            const schoolsList = (
                <div style={{ marginTop: '20px' }}>
                    <strong>Nearby Schools (1.5km):</strong>
                    <ul>
                        {house.schools.map((school, index) => (
                            <li key={index}>{school.name}</li>
                        ))}
                    </ul>
                </div>
            );
            descriptionContent = (
                <>
                    {descriptionContent}
                    {schoolsList}
                </>
            );
        }
    
        return descriptionContent;
    };

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }, 
        withCredentials: true
    };

    const handleFav = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/api/listings/favs/`,
            {
                'listing': house.id
            }, config);
            
            if (response.data.message === 'Removed successfully') {
                setIsFav(false);
            } else {
                setIsFav(true);
            }
        } catch (error) {
            console.error('Error updating favorite status:', error);
        }
    };
    
    const handleSend = async () => {
        setShowModal(false);
        const { message } = await axios.post(`http://localhost:8000/api/contacts/enquire/`,
        {
            'subject': subject,
            'message': sendMessage,
            'email': user.email,
            'name': user.name,
            'seller_email': sellerEmail

        }, config)
    }


    useEffect(() => {
        async function fetchHouse() {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/listings/${slug}/`, config); 
                setHouse(data);
                setSellerEmail(data.original_listing_person_email)
                setIsFav(data.is_fav)
                console.log(data)
                setApiCallCompleted(true);

            } catch (error) {
                console.error('Error fetching the house details:', error);
            }
        }

        fetchHouse();
    }, []); 

    if (!house) {
        return <div>Loading...</div>;
    }

    const photos = [
        house.photo_main, house.photo_1, house.photo_2, house.photo_3,
        house.photo_4, house.photo_5, house.photo_6, house.photo_7,
        house.photo_8, house.photo_9, house.photo_10, house.photo_11,
        house.photo_12, house.photo_13, house.photo_14, house.photo_15
    ].filter(photo => photo != null);

    return (
        <Container>
            <br />
            <Row>
                {isFav}
                <Col lg={6} md={12}>
                <Carousel interval={null}>
                    {photos.map((photo, index) => (
                        <Carousel.Item key={index}>
                            <img 
                                className="d-block w-100" 
                                src={photo} 
                                alt={`Slide ${index}`}
                                style={{ width: '100%', height: '500px', objectFit: 'cover' }} // Adjust width and height as needed
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
                </Col>
                <Col lg={6} md={12}>
                    <Card>
                    <ListGroup className="list-group-flush p-3">
                        <ListGroup.Item className="h3">{house.address}</ListGroup.Item>
                        <ListGroup.Item style={{ fontSize: '1.2em' }}>City: {house.city}</ListGroup.Item>

                        <ListGroup.Item>Borough: {house.borough}</ListGroup.Item>
                        <ListGroup.Item>Postcode: {house.postcode}</ListGroup.Item>

                        <ListGroup.Item style={{ fontSize: '1.1em' }}>Open House: {house.open_house ? 'Yes' : 'No'}</ListGroup.Item>

                        <br />
                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <div>
                                <small className="text-muted">LISTING TYPE</small>
                                <div style={{ color: 'CornflowerBlue' }}>{house.listing_type}</div>                            
                            </div>
                            <div>
                                <small className="text-muted">BEDROOMS</small>
                                <div><FaBed style={{ color: 'CornflowerBlue' }} /> x{house.bedrooms}</div> {/* Include bedroom icon */}
                            </div>
                            <div>
                                <small className="text-muted">BATHROOMS</small>
                                <div><FaBath style={{ color: 'CornflowerBlue' }} /> x{house.bathrooms}</div> {/* Include bathroom icon */}
                            </div>
                            <div>
                                <small className="text-muted">TENURE</small>
                                <div style={{ color: 'CornflowerBlue' }}>Freehold <i className="bi bi-info-circle"></i></div>
                            </div>
                        </ListGroup.Item>

                    </ListGroup>
                    <div className="btn-group m-4" role="group" aria-label="Basic example">
                        <Button variant="primary" onClick={handleShow}>Contact Seller</Button>
                        <Button variant="success" onClick={handleFav}>{isFav ? 'Remove from Favorites' : 'Add to Favorites'}</Button>
                        
                        <Modal show={showModal} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Contact Seller</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formSubject">
                                        <Form.Label>Subject</Form.Label>
                                        <Form.Control type="text" placeholder="Enter subject" onChange={(e) => setSubject(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBody">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control as="textarea" rows={4} placeholder="Your message" onChange={(e) => setMessage(e.target.value)}/>
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={handleSend}>
                                    Send Message
                                </Button>
                                <Button variant="danger" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Button variant="info" onClick={() => setShowMapModal(true)}>Show Location on Map</Button>
                        <Modal show={showMapModal} onHide={() => setShowMapModal(false)} size="lg" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>House Location</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {house.longitude && house.latitude ? (
                            <MapboxMap longitude={parseFloat(house.longitude)} latitude={parseFloat(house.latitude)} />
                            ) : (
                                <p>Loading map...</p>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowMapModal(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    
                    
                    </div>

                    </Card>
                </Col>
            </Row>

            <br />
            <Row className="m-1">
                <Card>
                <Card.Body>
                    <Card.Title>{house.title}</Card.Title>
                    <Card.Text>
                        {renderDescription()}
                    </Card.Text>
                </Card.Body>
                </Card>
            </Row>

            <Row>
                <MortgageCalculator />
            </Row>

            {apiCallCompleted && house.pred_prices && Object.keys(house.pred_prices).length > 0 && (
                <Card className="mt-4 p-4">
                    <Row>
                        <PredPrices predPrices={house.pred_prices} price={house.price}/>
                    </Row>
                </Card>
            )}
        </Container>

    );
}

export default HouseScreen;
