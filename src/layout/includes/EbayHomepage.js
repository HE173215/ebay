import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Navbar, Nav, Form, Button, Card, Badge, InputGroup } from 'react-bootstrap';
import { FaSearch, FaHeart, FaShoppingCart, FaBell, FaUser, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const EbayHomepage = () => {
    return (
        <div className="ebay-homepage">
            {/* Top Navigation */}
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

            {/* Categories Navigation */}
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
                    {['Luxury', 'Sneakers', 'P&A', 'Refurbished', 'Trading cards', 'Pre-loved Luxury', 'Toys'].map((category, index) => (
                        <Col key={index} xs={6} sm={4} md={3} lg={1} className="text-center mb-4">
                            <div className="category-circle bg-light rounded-circle mx-auto mb-2" style={{ width: '100px', height: '100px' }}></div>
                            <div className="small">{category}</div>
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
            <footer className="bg-light pt-5">
                <Container>
                    <Row>
                        <Col md={3}>
                            <h5 className="mb-3">Buy</h5>
                            <ul className="list-unstyled small">
                                <li className="mb-2"><a href="#registration" className="text-decoration-none text-muted">Registration</a></li>
                                <li className="mb-2"><a href="#buying" className="text-decoration-none text-muted">Bidding & buying help</a></li>
                                <li className="mb-2"><a href="#stores" className="text-decoration-none text-muted">Stores</a></li>
                                <li className="mb-2"><a href="#categories" className="text-decoration-none text-muted">Custom Collections</a></li>
                                <li className="mb-2"><a href="#charity" className="text-decoration-none text-muted">eBay for Charity</a></li>
                            </ul>
                        </Col>
                        <Col md={3}>
                            <h5 className="mb-3">Sell</h5>
                            <ul className="list-unstyled small">
                                <li className="mb-2"><a href="#startselling" className="text-decoration-none text-muted">Start selling</a></li>
                                <li className="mb-2"><a href="#howtosell" className="text-decoration-none text-muted">How to sell</a></li>
                                <li className="mb-2"><a href="#businesssellers" className="text-decoration-none text-muted">Business sellers</a></li>
                                <li className="mb-2"><a href="#affiliates" className="text-decoration-none text-muted">Affiliates</a></li>
                            </ul>
                        </Col>
                        <Col md={3}>
                            <h5 className="mb-3">About eBay</h5>
                            <ul className="list-unstyled small">
                                <li className="mb-2"><a href="#companyinfo" className="text-decoration-none text-muted">Company Info</a></li>
                                <li className="mb-2"><a href="#news" className="text-decoration-none text-muted">News</a></li>
                                <li className="mb-2"><a href="#investors" className="text-decoration-none text-muted">Investors</a></li>
                                <li className="mb-2"><a href="#careers" className="text-decoration-none text-muted">Careers</a></li>
                                <li className="mb-2"><a href="#policies" className="text-decoration-none text-muted">Policies</a></li>
                            </ul>
                        </Col>
                        <Col md={3}>
                            <h5 className="mb-3">Help & Contact</h5>
                            <ul className="list-unstyled small">
                                <li className="mb-2"><a href="#sellercenter" className="text-decoration-none text-muted">Seller Center</a></li>
                                <li className="mb-2"><a href="#contactus" className="text-decoration-none text-muted">Contact Us</a></li>
                                <li className="mb-2"><a href="#returns" className="text-decoration-none text-muted">eBay Returns</a></li>
                                <li className="mb-2"><a href="#moneyback" className="text-decoration-none text-muted">eBay Money Back Guarantee</a></li>
                            </ul>
                        </Col>
                    </Row>
                    <hr />
                    <Row className="py-3">
                        <Col>
                            <p className="small text-muted">
                                Copyright © 1995-2025 eBay Inc. All Rights Reserved.
                                <a href="#accessibility" className="text-decoration-none text-muted ms-2">Accessibility</a>,
                                <a href="#agreement" className="text-decoration-none text-muted ms-2">User Agreement</a>,
                                <a href="#privacy" className="text-decoration-none text-muted ms-2">Privacy</a>,
                                <a href="#cookies" className="text-decoration-none text-muted ms-2">Cookies</a>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </footer>

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