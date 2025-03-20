import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Button, Card} from 'react-bootstrap';
import {FaHeart} from 'react-icons/fa';
import Header from './includes/Header';
import SubMenu from './includes/SubMenu';
import Footer from './includes/Footer';
import {Link} from "react-router-dom";
import {useProduct} from "../context/ProductContext";

const EbayHomepage = () => {
    const {categories, getImageUrl} = useProduct();
    return (
        <div className="ebay-homepage">
            {/* Header (includes TopNav) */}
            <Header/>

            {/* Categories Navigation */}
            <SubMenu/>

            {/* Hero Banner */}
            <div className="hero-banner bg-light text-white py-5 mb-4" style={{
                backgroundImage: 'url(https://ir.ebaystatic.com/cr/v/c1/home/hero-banner-lifestyle.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '300px'
            }}>
                <Container className="h-100">
                    <Row className="h-100 align-items-center">
                        <Col md={6}>
                            <div className="text-dark py-4">
                                <h1 className="fw-bold">Get your order or your money back</h1>
                                <p>Shop confidently with eBay Money Back Guarantee®.</p>
                                <Button variant="light" className="rounded-pill">Learn more</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

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
                                    />
                                </div>
                                <div className="category-name">{category.name}</div>
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
                        <p className="small text-muted mb-0">Enjoy reliability, secure deliveries and hassle-free
                            returns.</p>
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
                .category-circle {
                    transition: all 0.2s ease;
                }

                .category-circle:hover {
                    transform: scale(1.05);
                }

                .card-img-fixed-height {
                    height: 180px;
                    object-fit: cover;
                }
            `}</style>
        </div>
    );
};

export default EbayHomepage;