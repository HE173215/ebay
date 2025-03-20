import React from 'react';
import { useUser } from '../../context/UserContext';
import { Container, Row, Col, Card } from 'react-bootstrap';

const UserProfile = () => {
    const { currentUser } = useUser();

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="mt-4">
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>User Profile</Card.Title>
                            <Card.Text>
                                <strong>Username:</strong> {currentUser.username}
                            </Card.Text>
                            <Card.Text>
                                <strong>Email:</strong> {currentUser.email}
                            </Card.Text>
                            {/* Hiển thị các thông tin khác của người dùng */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserProfile;