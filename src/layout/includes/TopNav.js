import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';

const TopNav = () => {
    const { currentUser, logout } = useUser();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="bg-light py-1">
            <Container>
                <Row className="align-items-center">
                    <Col>
                        {currentUser ? (
                            <small>
                                Hi! {currentUser.username} |{' '}
                                <Link to="/" onClick={handleLogout}>
                                    Logout
                                </Link>
                            </small>
                        ) : (
                            <small>
                                <Link to="/login">Sign in</Link> or{' '}
                                <Link to="/register">register</Link>
                            </small>
                        )}
                    </Col>
                    {/* Phần còn lại giữ nguyên */}
                </Row>
            </Container>
        </div>
    );
};

export default TopNav;