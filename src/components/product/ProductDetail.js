import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Badge, ListGroup, Nav, Tab } from 'react-bootstrap';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import axios from "axios";
import { BASE_URL } from "../../api/api";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);

                // Fetch product
                const productRes = await axios.get(`${BASE_URL}/products/${id}`);
                setProduct(productRes.data);

                // Fetch category
                const categoryRes = await axios.get(`${BASE_URL}/categories/${productRes.data.categoryId}`);
                setCategory(categoryRes.data);

                // Fetch reviews
                const reviewsRes = await axios.get(`${BASE_URL}/reviews`);
                const productReviews = reviewsRes.data.filter(review => review.productId === parseInt(id));
                setReviews(productReviews);

                setLoading(false);
            } catch (err) {
                console.error("Error fetching product details:", err);
                setError("Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.");
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value));
    };

    const handleAddToCart = () => {
        alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`);
        // Implement add to cart functionality here
    };

    const handleBuyNow = () => {
        alert(`Mua ngay ${quantity} sản phẩm`);
        // Implement buy now functionality here
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    if (loading) return <div className="text-center py-5">Đang tải...</div>;
    if (error) return <div className="text-center py-5 text-danger">{error}</div>;
    if (!product) return <div className="text-center py-5">Không tìm thấy sản phẩm</div>;

    return (
        <Container className="py-4">
            <Row>
                {/* Cột trái - Hình ảnh sản phẩm */}
                <Col md={6}>
                    <img
                        src={`${BASE_URL}${product.image}`}
                        alt={product.name}
                        className="img-fluid main-product-image"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/400x300?text=Không+có+hình";
                        }}
                    />
                </Col>

                {/* Cột phải - Chi tiết sản phẩm */}
                <Col md={6}>
                    <div className="product-info">
                        {/* Tiêu đề sản phẩm */}
                        <h1 className="h3 mb-3">{product.name}</h1>

                        {/* Đánh giá sao */}
                        <div className="mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    className={star <= Math.round(product.rating) ? "text-warning" : "text-secondary"}
                                />
                            ))}
                            <span className="ms-2 text-muted small">({reviews.length} đánh giá)</span>
                        </div>

                        {/* Khung giá */}
                        <div className="price-container border p-3 rounded mb-4">
                            <h2 className="h3 mb-1">{formatPrice(product.price)}</h2>
                            <p className="text-success small mb-2">Miễn phí vận chuyển</p>
                        </div>

                        {/* Hành động sản phẩm */}
                        <div className="product-actions mb-4">
                            {/* Chọn số lượng */}
                            <div className="mb-3">
                                <Row className="align-items-center">
                                    <Col xs={3}>
                                        <label htmlFor="quantity" className="form-label">Số lượng</label>
                                    </Col>
                                    <Col xs={3}>
                                        <input
                                            type="number"
                                            id="quantity"
                                            className="form-control"
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            min="1"
                                        />
                                    </Col>
                                    <Col xs={6}>
                                        <span className="text-muted small">Còn hàng (>10)</span>
                                    </Col>
                                </Row>
                            </div>

                            {/* Nút mua hàng / thêm vào giỏ */}
                            <div className="d-grid gap-2 mb-3">
                                <Button variant="primary" size="lg" onClick={handleBuyNow}>Mua ngay</Button>
                                <Button variant="outline-primary" size="lg" onClick={handleAddToCart}>
                                    <FaShoppingCart className="me-2" /> Thêm vào giỏ hàng
                                </Button>
                                <Button variant="outline-secondary">
                                    <FaHeart className="me-2" /> Thêm vào danh sách yêu thích
                                </Button>
                            </div>
                        </div>

                        {/* Thông số kỹ thuật */}
                        <div className="product-specs mb-4">
                            <h5>Thông số kỹ thuật</h5>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="d-flex">
                                    <span className="text-muted" style={{ width: '40%' }}>Tình trạng</span>
                                    <span>Mới 100%</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex">
                                    <span className="text-muted" style={{ width: '40%' }}>Thương hiệu</span>
                                    <span>{product.name.split(' ')[0]}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex">
                                    <span className="text-muted" style={{ width: '40%' }}>Danh mục</span>
                                    <span>{category?.name || 'Không xác định'}</span>
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Tab mô tả sản phẩm */}
            <Row className="mt-4">
                <Col>
                    <Tab.Container defaultActiveKey="description">
                        <Nav variant="tabs" className="mb-3">
                            <Nav.Item>
                                <Nav.Link eventKey="description">Mô tả</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="shipping">Vận chuyển</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="reviews">Đánh giá ({reviews.length})</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="description">
                                <div className="p-3">
                                    <h5>Mô tả sản phẩm</h5>
                                    <p>{product.description}</p>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="shipping">
                                <div className="p-3">
                                    <h5>Thông tin vận chuyển</h5>
                                    <p>Miễn phí vận chuyển toàn quốc cho đơn hàng từ 300.000đ.</p>
                                    <p>Thời gian giao hàng: 3-7 ngày làm việc.</p>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="reviews">
                                <div className="p-3">
                                    <h5>Đánh giá từ khách hàng</h5>
                                    {reviews.length > 0 ? (
                                        <ListGroup variant="flush">
                                            {reviews.map((review, index) => (
                                                <ListGroup.Item key={index}>
                                                    <div className="d-flex justify-content-between">
                                                        <strong>Người dùng {review.userId}</strong>
                                                        <div>
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <FaStar
                                                                    key={star}
                                                                    className={star <= review.rating ? "text-warning" : "text-secondary"}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="mt-2">{review.comment}</p>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    ) : (
                                        <p className="text-muted">Chưa có đánh giá nào cho sản phẩm này</p>
                                    )}
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Col>
            </Row>
            <style jsx>{`
                .main-product-image {
                    width: 100%;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                }
            `}</style>
        </Container>
    );
};

export default ProductDetail;