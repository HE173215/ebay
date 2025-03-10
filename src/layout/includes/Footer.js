import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
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
    );
};

export default Footer;