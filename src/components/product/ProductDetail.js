import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Container, Row, Col, Button, Alert, ListGroup, Nav, Tab, Spinner} from 'react-bootstrap';
import {FaHeart, FaShoppingCart, FaStar, FaExclamationCircle} from 'react-icons/fa';
import {useProduct} from "../../context/ProductContext";
import {useCart} from "../../context/CartContext";
import {useUser} from "../../context/UserContext";

const ProductDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {
        getProductById,
        getCategoryById,
        getProductReviews,
        getAverageRating,
        formatPrice,
        getImageUrl,
        getProductStock,
        products,
        categories
    } = useProduct();
    const {addToCart} = useCart();
    const {currentUser} = useUser();

    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wishlist, setWishlist] = useState(false);
    const [maxStock, setMaxStock] = useState(10);

    useEffect(() => {
        const fetchProductDetails = () => {
            try {
                const productId = Number(id);

                if (isNaN(productId)) {
                    throw new Error("ID sản phẩm không hợp lệ");
                }

                const fetchedProduct = products.find(p => p.id === productId);

                if (!fetchedProduct) {
                    throw new Error("Không tìm thấy sản phẩm");
                }

                setProduct(fetchedProduct);
                // Lấy số lượng tồn kho từ hàm getProductStock
                const stock = getProductStock(productId);
                setMaxStock(stock);

                const fetchedCategory = categories.find(
                    c => c.id === fetchedProduct.categoryId
                );
                setCategory(fetchedCategory);

                const productReviews = getProductReviews(productId);
                setReviews(productReviews);

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        // Đảm bảo products đã được load
        if (products.length > 0) {
            fetchProductDetails();
        }
    }, [id, products, categories, getProductReviews, getProductStock]);

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        // Sử dụng maxStock để giới hạn số lượng
        setQuantity(Math.max(1, Math.min(newQuantity, maxStock)));
    };

    const handleAddToCart = () => {
        if (!currentUser) {
            navigate("/login");
            return;
        }

        if (product) {
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: quantity,
                image: product.image
            });
        }
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate("/checkout");
    };

    const toggleWishlist = () => {
        setWishlist(!wishlist);
    };


    if (loading) return (
        <Container className="text-center py-5">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Đang tải...</span>
            </Spinner>
        </Container>
    );

    if (error) return (
        <Container className="py-5">
            <Alert variant="danger" className="text-center">
                <FaExclamationCircle className="me-2"/>
                {error}
                <div className="mt-3">
                    <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                        Quay lại
                    </Button>
                </div>
            </Alert>
        </Container>
    );

    if (!product) return (
        <Container className="text-center py-5">
            <Alert variant="warning">Không tìm thấy sản phẩm</Alert>
        </Container>
    );

    return (
        <Container className="py-4">
            <Row>
                <Col md={6}>
                    <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="img-fluid main-product-image"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/400x300?text=Không+có+hình";
                        }}
                    />
                </Col>

                <Col md={6}>
                    <div className="product-info">
                        <h1 className="h3 mb-3">{product.name}</h1>

                        <div className="mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    className={star <= Math.round(getAverageRating(product.id)) ? "text-warning" : "text-secondary"}
                                />
                            ))}
                            <span className="ms-2 text-muted small">({reviews.length} đánh giá)</span>
                        </div>

                        <div className="price-container border p-3 rounded mb-4">
                            <h2 className="h3 mb-1">{formatPrice(product.price)}</h2>
                            <p className="text-success small mb-2">Miễn phí vận chuyển</p>
                        </div>

                        <div className="product-actions mb-4">
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
                                            max={maxStock}
                                        />
                                    </Col>
                                    <Col xs={6}>
                            <span className="text-muted small">
                                Còn hàng ({maxStock})
                            </span>
                                    </Col>
                                </Row>
                            </div>

                            <div className="d-grid gap-2 mb-3">
                                <Button variant="primary" size="lg" onClick={handleBuyNow}>
                                    Mua ngay
                                </Button>
                                <Button
                                    variant="outline-primary"
                                    size="lg"
                                    onClick={handleAddToCart}
                                >
                                    <FaShoppingCart className="me-2"/> Thêm vào giỏ hàng
                                </Button>
                                <Button
                                    variant={wishlist ? "warning" : "outline-secondary"}
                                    onClick={toggleWishlist}
                                >
                                    <FaHeart className="me-2"/>
                                    {wishlist ? "Đã thêm" : "Thêm vào"} danh sách yêu thích
                                </Button>
                            </div>
                        </div>

                        <div className="product-specs mb-4">
                            <h5>Thông số kỹ thuật</h5>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="d-flex">
                                    <span className="text-muted" style={{width: '40%'}}>Tình trạng</span>
                                    <span>{product.stock > 0 ? "Mới 100%" : "Hết hàng"}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex">
                                    <span className="text-muted" style={{width: '40%'}}>Thương hiệu</span>
                                    <span>{product.name.split(' ')[0]}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex">
                                    <span className="text-muted" style={{width: '40%'}}>Danh mục</span>
                                    <span>{category?.name || 'Không xác định'}</span>
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                    </div>
                </Col>
            </Row>

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