import React from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CategoryList = ({ categories }) => {
    return (
        <Container className="mb-5">
            <h2 className="mb-4">Explore Popular Categories</h2>
            {categories.map(category => (
                <Row key={category.id} className="mb-4">
                    <Card className="h-100">
                        <Link to={`/category/${category.id}`} className="text-decoration-none">
                            <Card.Img
                                variant="top"
                                src={category.imageUrl || '/default-category-image.png'}
                                alt={category.name}
                            />
                            <Card.Body>
                                <Card.Title>{category.name}</Card.Title>
                                <Card.Text>{category.description}</Card.Text>
                                <Card.Text className="text-muted">
                                    {category.productCount} sản phẩm
                                </Card.Text>
                            </Card.Body>
                        </Link>
                    </Card>
                </Row>
            ))}
        </Container>
    );
};

export default CategoryList;