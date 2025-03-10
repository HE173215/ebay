import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

const SubMenu = () => {
    return (
        <Navbar bg="white" expand="lg" className="py-0 border-bottom small">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href="#explore">Explore (New!)</Nav.Link>
                    <Nav.Link href="#saved">Saved</Nav.Link>
                    <Nav.Link href="#electronics">Electronics</Nav.Link>
                    <Nav.Link href="#motors">Motors</Nav.Link>
                    <Nav.Link href="#fashion">Fashion</Nav.Link>
                    <Nav.Link href="#collectibles">Collectibles and Art</Nav.Link>
                    <Nav.Link href="#sports">Sports</Nav.Link>
                    <Nav.Link href="#health">Health & Beauty</Nav.Link>
                    <Nav.Link href="#industrial">Industrial equipment</Nav.Link>
                    <Nav.Link href="#home">Home & Garden</Nav.Link>
                    <Nav.Link href="#deals">Deals</Nav.Link>
                    <Nav.Link href="#sell">Sell</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default SubMenu;