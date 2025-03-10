import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const TopNav = () => {
    return (
        <div className="bg-light py-1">
            <Container>
                <Row className="align-items-center">
                    <Col>
                        <small>Hi! Sign in or register</small>
                    </Col>
                    <Col className="text-end">
                        <small className="me-3">Daily Deals</small>
                        <small className="me-3">Brand Outlet</small>
                        <small className="me-3">Gift Cards</small>
                        <small className="me-3">Help & Contact</small>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default TopNav;