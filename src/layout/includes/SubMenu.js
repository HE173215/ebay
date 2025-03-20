import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useProduct } from "../../context/ProductContext";

const SubMenu = () => {
    const { categories } = useProduct();

    return (
        <Navbar bg="white" expand="lg" className="py-0 border-bottom small">
            <Container>
                <Nav className="me-auto">
                    {categories.map(category => (
                        <Nav.Link
                            key={category.id}
                            as={Link}
                            to={`/category/${category.id}`}
                        >
                            {category.name}
                        </Nav.Link>
                    ))}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default SubMenu;