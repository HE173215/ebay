import React from 'react';
import { Container, Navbar, Form, Button, InputGroup } from 'react-bootstrap';
import { FaBell, FaShoppingCart } from 'react-icons/fa';
import TopNav from './TopNav';

const Header = () => {
    return (
        <header>
            {/* Top Navigation */}
            <TopNav />

            {/* Main Navigation */}
            <Navbar bg="white" expand="lg" className="py-2 border-bottom">
                <Container>
                    <Navbar.Brand href="#home">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/2560px-EBay_logo.svg.png" alt="eBay" height="40" />
                    </Navbar.Brand>
                    <div className="d-flex small text-muted mb-1">
                        Shop by category
                    </div>
                    <div className="d-flex flex-grow-1 mx-3">
                        <InputGroup>
                            <Form.Control placeholder="Search for anything" />
                            <Form.Select style={{ maxWidth: '200px' }}>
                                <option>All Categories</option>
                            </Form.Select>
                            <Button variant="primary">Search</Button>
                        </InputGroup>
                        <div className="ms-2">Advanced</div>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="mx-2">Ship to</div>
                        <div className="mx-2">Sell</div>
                        <div className="mx-2">Watchlist</div>
                        <div className="mx-2">My eBay</div>
                        <div className="mx-2"><FaBell /></div>
                        <div className="mx-2"><FaShoppingCart /></div>
                    </div>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;