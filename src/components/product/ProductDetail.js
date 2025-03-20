import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Container, Row, Col, Button, Alert, ListGroup, Nav, Tab, Spinner} from 'react-bootstrap';
import {FaHeart, FaShoppingCart, FaStar, FaExclamationCircle} from 'react-icons/fa';
import {useProduct} from "../../context/ProductContext";
import {useCart} from "../../context/CartContext";
import {useUser} from "../../context/UserContext";
import {BASE_URL} from "../../api/api";

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
    const {user} = useUser();

    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wishlist, setWishlist] = useState(false);
    const [maxStock, setMaxStock] = useState(0);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                console.log('Fetching product details for ID:', id);
                const productId = Number(id);

                if (isNaN(productId)) {
                    throw new Error("ID sản phẩm không hợp lệ");
                }

                // Thử fetch trực tiếp từ API nếu không có trong context
                let fetchedProduct = getProductById(productId);
                
                if (!fetchedProduct) {
                    console.log('Product not found in context, fetching from API...');
                    const response = await fetch(`${BASE_URL}/products/${productId}`);
                    if (!response.ok) throw new Error("Không thể tải thông tin sản phẩm");
                    fetchedProduct = await response.json();
                }

                if (!fetchedProduct) {
                    throw new Error("Không tìm thấy sản phẩm");
                }

                console.log('Fetched product:', fetchedProduct);
                setProduct(fetchedProduct);

                // Lấy số lượng tồn kho trực tiếp từ sản phẩm
                setMaxStock(fetchedProduct.stock || 50); // Mặc định là 50 nếu không có stock

                // Lấy thông tin danh mục
                const fetchedCategory = getCategoryById(fetchedProduct.categoryId);
                console.log('Fetched category:', fetchedCategory);
                setCategory(fetchedCategory);

                // Lấy đánh giá
                const productReviews = getProductReviews(productId);
                console.log('Fetched reviews:', productReviews);
                setReviews(productReviews);

                setLoading(false);
            } catch (err) {
                console.error('Error in fetchProductDetails:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id, getProductById, getCategoryById, getProductReviews]);

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (isNaN(newQuantity) || newQuantity < 1) {
            setQuantity(1);
        } else if (newQuantity > maxStock) {
            setQuantity(maxStock);
            alert(`Số lượng tối đa có thể mua là ${maxStock}`);
        } else {
            setQuantity(newQuantity);
        }
    };

    const increaseQuantity = () => {
        if (quantity < maxStock) {
            setQuantity(quantity + 1);
        } else {
            alert(`Số lượng tối đa có thể mua là ${maxStock}`);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        if (!quantity) {
            alert('Vui lòng chọn số lượng sản phẩm');
            return;
        }
        addToCart(user?.id || 'guest', product.id, quantity);
        alert('Đã thêm sản phẩm vào giỏ hàng!');
    };

    const handleBuyNow = () => {
        if (!quantity) {
            alert('Vui lòng chọn số lượng sản phẩm');
            return;
        }
        addToCart(user?.id || 'guest', product.id, quantity);
        navigate('/checkout');
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
                                    <Col xs={6}>
                                        <div className="d-flex align-items-center">
                                            <Button 
                                                variant="outline-secondary" 
                                                size="sm"
                                                onClick={decreaseQuantity}
                                            >
                                                -
                                            </Button>
                                            <input
                                                type="number"
                                                id="quantity"
                                                className="form-control mx-2"
                                                style={{width: '70px', textAlign: 'center'}}
                                                value={quantity}
                                                onChange={handleQuantityChange}
                                                min="1"
                                                max={maxStock}
                                            />
                                            <Button 
                                                variant="outline-secondary" 
                                                size="sm"
                                                onClick={increaseQuantity}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </Col>
                                    <Col xs={3}>
                                        <span className="text-muted small">
                                            Còn {maxStock} sản phẩm
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