import React from 'react';
import { Container, Accordion, Card } from 'react-bootstrap';

// Help screen that gives basic answers to problems
function HelpScreen() {
    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">Help Center</h1>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>How to Create an Account</Accordion.Header>
                        <Accordion.Body>
                            Creating an account is the first step to accessing the full range of features. Click on the “Register” button on the navigation bar. Fill in the required fields with your details and submit. You’ll receive a confirmation email to verify your account.
                        </Accordion.Body>
                    </Accordion.Item>
                </Card>

                <Card>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Navigating the Dashboard</Accordion.Header>
                        <Accordion.Body>
                            Once you log in, you’ll land on your dashboard. Here, you can view your saved listings, track property prices, and access our tools. Use the navigation bar to switch between different sections.
                        </Accordion.Body>
                    </Accordion.Item>
                </Card>

                <Card>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Using the Price Prediction Tool</Accordion.Header>
                        <Accordion.Body>
                            Our price prediction tool helps to predict current and future property prices. To use it, search and select a property then scroll down and you will be able to see the price forecast.
                        </Accordion.Body>
                    </Accordion.Item>
                </Card>

                <Card>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>How to Search for Properties</Accordion.Header>
                        <Accordion.Body>
                            Firstly you need to be logged in, then use the search bar at the top of the page to find properties. You can filter your search by location, price, type of property, and more to narrow down your results.
                        </Accordion.Body>
                    </Accordion.Item>
                </Card>

                <Card>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>Contacting Support</Accordion.Header>
                        <Accordion.Body>
                            For any inquiries or issues not covered in our Help Center, please reach out to our support team through the email "realestateinvestmentapp@gmail.com". Provide a detailed description of your issue, and we’ll get back to you as soon as possible.
                        </Accordion.Body>
                    </Accordion.Item>
                </Card>
            </Accordion>
        </Container>
    )
}

export default HelpScreen