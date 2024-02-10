import React from 'react';
import { Container, Accordion, Button, Row, Col, Card } from 'react-bootstrap';
import image from '../assets/HomeImage.jpg';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <Card className="text-white">
                <Card.Img src={image} alt="Hero" style={{ width: '100vw', height: '70vh', objectFit: 'cover' }} />
                <Card.ImgOverlay className="d-flex align-items-center" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
                    <Container>
                        <Row>
                            <Col md={6}>
                                <h1>Begin Your Real Estate Investment Journey</h1>
                                <p className="mb-4">
                                    Step into the world of real estate investment. Discover prime properties, gain market insights, and secure your future with strategic investments.
                                </p>
                                <Button variant="primary">
                                    <Link to='/search'>Get Started</Link>
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Card.ImgOverlay>
            </Card>

            <Container className="my-5">
                <Row className="text-center">
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Price prediction</Card.Title>
                                <Card.Text>
                                    Leverage advanced price prediction models to accurately forecast market trends and prices.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Curated Listings</Card.Title>
                                <Card.Text>
                                    Browse through a selection of properties that match your investment criteria.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Property Tracking</Card.Title>
                                <Card.Text>
                                    Monitor and compare your favourite properties to ensure the best investment choice for you.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Container className="my-5">
                <h2 className="text-center mb-4">Frequently Asked Questions</h2>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>What is real estate investment?</Accordion.Header>
                            <Accordion.Body>
                                Real estate investment involves purchasing property to generate income through renting, leasing, or price appreciation. It's a strategic way to diversify your investment portfolio and can provide both steady cash flow and long-term financial security.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Card>
                    
                    <Card>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>How can I start investing?</Accordion.Header>
                            <Accordion.Body>
                                Getting started is easy. First, define your investment goals and budget. Then, research the market to identify potential investment opportunities. Finally, consider consulting with a financial advisor or real estate professional to make informed decisions. Our platform provides tools and insights to guide you through each step.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Card>

                    <Card>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Do I need a lot of money to start investing in real estate?</Accordion.Header>
                            <Accordion.Body>
                                You don't need a huge budget to get started in real estate. True, some investments might require a significant amount upfront, but there are also ways for those with smaller budgets to begin. For example, crowdfunding platforms and partnerships can be great ways to invest with less money. These options allow you to pool funds with other investors, lowering the cost of entry. Just remember, it's important to understand what you're getting into and the potential ups and downs of each investment before making a decision.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Card>

                    <Card>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>What are the risks of real estate investment?</Accordion.Header>
                            <Accordion.Body>
                                Like any investment, real estate comes with its risks. Market fluctuations, property management challenges, and unexpected expenses can impact profitability. However, thorough research, strategic planning, and diversification can help mitigate these risks. Always assess your tolerance for risk and consider long-term trends when investing.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Card>

                    <Card>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>How does real estate compare to other investment options?</Accordion.Header>
                            <Accordion.Body>
                                Real estate investment offers unique benefits not typically found in other investment vehicles. These include potential for passive income, tax advantages, hedge against inflation, and capital appreciation. However, it also requires active management and can be less liquid than stocks or bonds. Balancing real estate with other investments can diversify and strengthen your overall portfolio.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Card>
                </Accordion>
            </Container>
        </div>
    );
};

export default HomePage;
