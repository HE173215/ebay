import React, { useState } from 'react';
import Header from '../layout/includes/Header';
import SubMenu from '../layout/includes/SubMenu';
import Footer from '../layout/includes/Footer';
import { useProduct } from '../context/ProductContext'; // Adjust import path as needed
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const CategoryPage = () => {
    const { categories, getProductsByCategory, formatPrice, getImageUrl } = useProduct();
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Get first category if no category selected
    const currentCategory = selectedCategory
        ? categories.find(cat => cat.id === selectedCategory)
        : categories[0];

    // Get products for the current category
    const categoryProducts = currentCategory
        ? getProductsByCategory(currentCategory.id)
        : [];

    return (
        <div className="category-page">
            <Header />
            <SubMenu />
            <Container className="mt-4">
                <Row>
                    {/* Category Navigation Sidebar */}
                    <Col md={3} className="mb-4">
                        <Card>
                            <Card.Header>Categories</Card.Header>
                            <Card.Body className="p-0">
                                {categories.map(category => (
                                    <Button
                                        key={category.id}
                                        variant={selectedCategory === category.id ? 'primary' : 'light'}
                                        className="w-100 text-start rounded-0"
                                        onClick={() => setSelectedCategory(category.id)}
                                    >
                                        {category.name}
                                    </Button>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Product Listing */}
                    <Col md={9}>
                        <h1>{currentCategory?.name || 'Categories'}</h1>
                        <p>{currentCategory?.description}</p>

                        <Row>
                            {categoryProducts.map(product => (
                                <Col key={product.id} md={4} className="mb-4">
                                    <Card>
                                        <Card.Img
                                            variant="top"
                                            src={getImageUrl(product.image)}
                                            alt={product.name}
                                            style={{
                                                height: '200px',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <Card.Body>
                                            <Card.Title>{product.name}</Card.Title>
                                            <Card.Text className="text-muted">
                                                {formatPrice(product.price)}
                                            </Card.Text>
                                            <Button variant="outline-primary" href={`/product/${product.id}`}>
                                                View Details
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        {categoryProducts.length === 0 && (
                            <div className="text-center text-muted mt-4">
                                No products found in this category.
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
};

export default CategoryPage;