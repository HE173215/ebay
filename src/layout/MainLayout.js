import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import Header from './includes/Header';
import SubMenu from './includes/SubMenu';
import Footer from './includes/Footer';
import {Link} from "react-router-dom";
import {useProduct} from "../context/ProductContext";

const EbayHomepage = () => {
    const { products, getImageUrl, formatPrice } = useProduct();
    return (
        <div className="ebay-homepage">
            {/* Header (includes TopNav) */}
            <Header />

            {/* Categories Navigation */}
            <SubMenu />

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
                {products.map(product => (
                    <Row key={product.id} className="mb-4">
                        <Card className="h-100">
                            <Link to={`/product/${product.id}`}>
                                <Card.Img variant="top" src={getImageUrl(product.image)} />
                            </Link>
                            <Card.Body>
                                <Link to={`/product/${product.id}`} className="text-decoration-none">
                                    <Card.Title>{product.name}</Card.Title>
                                </Link>
                                <Card.Text>{formatPrice(product.price)}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>
                ))}
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

            {/* Textbooks Section */}
            <Container className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h2 className="mb-0">Textbooks</h2>
                        <p className="text-muted small">Recommended for you</p>
                    </div>
                    <div>
                        <a href="#seeall" className="text-decoration-none">See all</a>
                    </div>
                </div>
                <Row>
                    {[1, 2, 3, 4, 5].map((item) => (
                        <Col key={item} xs={12} sm={6} md={4} lg={2} className="mb-4">
                            <Card className="h-100 border-0 position-relative">
                                <div className="position-absolute end-0 p-2">
                                    <FaHeart className="text-secondary" />
                                </div>
                                <Card.Img variant="top" src={`https://via.placeholder.com/150x220?text=Textbook ${item}`} className="card-img-fixed-height" />
                                <Card.Body className="p-2">
                                    <Card.Title className="small fw-normal">Textbook of Rheumatology, 12th Ed.</Card.Title>
                                    <Card.Text className="fw-bold">
                                        {(Math.random() * 1000000).toFixed(2)} VND
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Recently Viewed Items */}
            <Container className="mb-5">
                <h2 className="mb-4">Your Recently Viewed Items</h2>
                <Row>
                    {[1, 2].map((item) => (
                        <Col key={item} xs={12} sm={6} md={3} className="mb-4">
                            <Card className="h-100 border-0 position-relative">
                                <div className="position-absolute end-0 p-2">
                                    <FaHeart className="text-secondary" />
                                </div>
                                <Card.Img variant="top" src={`https://via.placeholder.com/200x200?text=Item ${item}`} />
                                <Card.Body className="p-2">
                                    <Card.Title className="small fw-normal">Product Title Here</Card.Title>
                                    <Card.Text className="fw-bold">
                                        {(Math.random() * 1000000).toFixed(2)} VND
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Footer */}
            <Footer />

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