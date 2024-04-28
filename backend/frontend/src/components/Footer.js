import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

// Footer to be at the bottom of all of the pages
function Footer() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>Copyright &copy; Tajul</Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer