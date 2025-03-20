import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useProduct } from '../../context/ProductContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { formatPrice, getAverageRating } = useProduct();

    // Calculate average rating
    const averageRating = getAverageRating(product.id);

    // Render star rating
    const renderStarRating = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        return (
            <div className="d-flex">
                {[...Array(fullStars)].map((_, i) => (
                    <span key={`full-${i}`} className="text-warning">★</span>
                ))}
                {halfStar > 0 && <span className="text-warning">½</span>}
                {[...Array(emptyStars)].map((_, i) => (
                    <span key={`empty-${i}`} className="text-muted">☆</span>
                ))}
                <span className="ms-2 text-muted">({averageRating.toFixed(1)})</span>
            </div>
        );
    };

    return (
        <Card className="h-100 shadow-sm">
            <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                style={{
                    height: '250px',
                    objectFit: 'cover'
                }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="mb-2">{product.name}</Card.Title>
                <Card.Text className="text-muted mb-2">
                    {product.description}
                </Card.Text>

                <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="h5 mb-0 text-primary">
                        {formatPrice(product.price)}
                    </span>
                    {renderStarRating(averageRating)}
                </div>

                <div className="mt-auto d-grid gap-2">
                    <Button
                        as={Link}
                        to={`/product/${product.id}`}
                        variant="outline-primary"
                    >
                        Xem chi tiết
                    </Button>
                    <Button variant="primary">
                        Thêm vào giỏ hàng
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;