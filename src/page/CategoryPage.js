import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../layout/includes/Header';
import SubMenu from '../layout/includes/SubMenu';
import Footer from '../layout/includes/Footer';
import { useProduct } from '../context/ProductContext';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const CategoryPage = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const { categories, getProductsByCategory, formatPrice, getImageUrl } = useProduct();

    // Chuyển đổi id sang số nếu có
    const categoryId = id ? Number(id) : null;

    // Tìm danh mục hiện tại
    const currentCategory = categoryId
        ? categories.find(cat => cat.id === categoryId)
        : categories[0];

    // Lấy sản phẩm của danh mục
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
                            <Card.Header>Danh mục</Card.Header>
                            <Card.Body className="p-0">
                                {categories.map(category => (
                                    <Button
                                        key={category.id}
                                        variant={categoryId === category.id ? 'primary' : 'light'}
                                        className="w-100 text-start rounded-0"
                                        href={`/category/${category.id}`}
                                    >
                                        {category.name}
                                    </Button>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Product Listing */}
                    <Col md={9}>
                        <h1>{currentCategory?.name || 'Danh mục'}</h1>
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
                                            <Button
                                                variant="outline-primary"
                                                href={`/product/${product.id}`}
                                            >
                                                Xem chi tiết
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        {categoryProducts.length === 0 && (
                            <div className="text-center text-muted mt-4">
                                Không có sản phẩm trong danh mục này.
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