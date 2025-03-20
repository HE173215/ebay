import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Button, Card} from 'react-bootstrap';
import {FaHeart} from 'react-icons/fa';
import Header from './includes/Header';
import SubMenu from './includes/SubMenu';
import Footer from './includes/Footer';
import {Link} from "react-router-dom";
import {useProduct} from "../context/ProductContext";
import HomeCarousel from '../components/carousel/HomeCarousel';

const EbayHomepage = () => {
    const {categories, getImageUrl} = useProduct();
    return (
        <div className="ebay-homepage">
            {/* Header (includes TopNav) */}
            <Header/>

            {/* Categories Navigation */}
            <SubMenu/>

            {/* Carousel */}
            <HomeCarousel />

            {/* Popular Categories */}
            <Container className="mb-5">
                <h2 className="mb-4">Explore Popular Categories</h2>
                <Row>
                    {categories.map(category => (
                        <Col key={category.id} xs={6} sm={4} md={3} lg={2} className="mb-4">
                            <Link to={`/category/${category.id}`} className="text-decoration-none text-center">
                                <div className="category-icon mb-2">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="img-fluid rounded-circle"
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>
                                <div className="category-name text-dark">{category.name}</div>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Shopping Made Easy */}
            <Container className="mb-5">
                <Row className="bg-light p-3 rounded align-items-center">
                    <Col>
                        <h4>Shopping made easy</h4>
                        <p className="small text-muted mb-0">Enjoy reliability, secure deliveries and hassle-free returns.</p>
                    </Col>
                    <Col xs="auto">
                        <Button variant="dark" className="rounded-pill">Start now</Button>
                    </Col>
                </Row>
            </Container>

            {/* Footer */}
            <Footer/>

            {/* Custom CSS */}
            <style jsx>{`
                .category-icon {
                    transition: all 0.2s ease;
                }

                .category-icon:hover {
                    transform: scale(1.05);
                }

                .category-name {
                    font-size: 0.9rem;
                    font-weight: 500;
                }
            `}</style>
        </div>
    );
};

export default EbayHomepage;