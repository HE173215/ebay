import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../layout/includes/Header';
import SubMenu from '../layout/includes/SubMenu';
import Footer from '../layout/includes/Footer';
import { useProduct } from '../context/ProductContext';
import { Container, Row, Col, Card } from 'react-bootstrap';

const CategoryPage = () => {
    const { id } = useParams();
    const { categories, products, formatPrice, getImageUrl } = useProduct();
    const [categoryProducts, setCategoryProducts] = useState([]);

    // Chuyển đổi id sang số nếu có
    const categoryId = id ? parseInt(id) : (categories[0]?.id || null);

    useEffect(() => {
        if (categoryId && products.length > 0) {
            // Lọc sản phẩm trực tiếp theo categoryId
            const filtered = products.filter(product => parseInt(product.categoryId) === categoryId);
            console.log('Filtering products for category:', categoryId);
            console.log('Found products:', filtered);
            setCategoryProducts(filtered);
        }
    }, [categoryId, products]);

    // Tìm danh mục hiện tại
    const currentCategory = categories.find(cat => cat.id === categoryId);

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
                                    <Link 
                                        key={category.id}
                                        to={`/category/${category.id}`}
                                        className={`btn ${parseInt(id) === category.id ? 'btn-primary' : 'btn-light'} w-100 text-start rounded-0`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Product Listing */}
                    <Col md={9}>
                        <h1>{currentCategory?.name || 'Tất cả sản phẩm'}</h1>
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
                                            <Link
                                                to={`/product/${product.id}`}
                                                className="btn btn-outline-primary"
                                            >
                                                Xem chi tiết
                                            </Link>
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