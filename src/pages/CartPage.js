import React from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useProduct } from '../context/ProductContext';

const CartPage = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { getCartByUserId, removeFromCart, updateCartItemQuantity } = useCart();
    const { products, formatPrice } = useProduct();

    // Lấy giỏ hàng của user hoặc giỏ hàng tạm thời
    const cart = user ? getCartByUserId(user.id) : getCartByUserId('guest');
    const cartItems = cart?.items?.map(item => {
        const product = products.find(p => p.id === item.productId);
        return { ...item, product };
    }) || [];

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        updateCartItemQuantity(user?.id || 'guest', productId, newQuantity);
    };

    const handleRemoveItem = (productId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
            removeFromCart(user?.id || 'guest', productId);
        }
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const handleCheckoutItem = (item) => {
        // Tạo giỏ hàng tạm thời chỉ với sản phẩm được chọn
        const tempCart = {
            userId: user?.id || 'guest',
            items: [item]
        };
        // Lưu giỏ hàng tạm thời vào localStorage
        localStorage.setItem('tempCheckoutCart', JSON.stringify(tempCart));
        navigate('/checkout');
    };

    const total = cartItems.reduce((sum, item) => {
        return sum + (item.product?.price || 0) * item.quantity;
    }, 0);

    return (
        <Container className="py-4">
            <h2 className="mb-4">Giỏ hàng</h2>
            {cartItems.length === 0 ? (
                <Card>
                    <Card.Body className="text-center py-5">
                        <h5>Giỏ hàng trống</h5>
                        <p className="text-muted">Bạn chưa thêm sản phẩm nào vào giỏ hàng</p>
                        <Button variant="primary" onClick={() => navigate('/')}>
                            Tiếp tục mua sắm
                        </Button>
                    </Card.Body>
                </Card>
            ) : (
                <Row>
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    {cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row className="align-items-center">
                                                <Col xs={3}>
                                                    <img
                                                        src={item.product?.image 
                                                            ? `${process.env.REACT_APP_API_URL}${item.product.image}`
                                                            : "https://via.placeholder.com/100x100?text=Không+có+hình"}
                                                        alt={item.product?.name || "Sản phẩm"}
                                                        className="img-fluid"
                                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                    />
                                                </Col>
                                                <Col xs={9}>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h6 className="mb-1">{item.product?.name || "Sản phẩm không tồn tại"}</h6>
                                                            <p className="text-muted mb-0">Số lượng: {item.quantity}</p>
                                                        </div>
                                                        <div>{formatPrice(item.product?.price * item.quantity || 0)}</div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <Button
                                                            variant="outline-secondary"
                                                            size="sm"
                                                            className="me-2"
                                                            onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                                        >
                                                            -
                                                        </Button>
                                                        <Button
                                                            variant="outline-secondary"
                                                            size="sm"
                                                            className="me-2"
                                                            onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                                        >
                                                            +
                                                        </Button>
                                                        <Button
                                                            variant="outline-danger"
                                                            size="sm"
                                                            className="me-2"
                                                            onClick={() => handleRemoveItem(item.productId)}
                                                        >
                                                            Xóa
                                                        </Button>
                                                        <Button
                                                            variant="primary"
                                                            size="sm"
                                                            onClick={() => handleCheckoutItem(item)}
                                                        >
                                                            Mua ngay
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Header>Tổng đơn hàng</Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="d-flex justify-content-between">
                                        <div>Tạm tính</div>
                                        <div>{formatPrice(total)}</div>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between">
                                        <div>Phí vận chuyển</div>
                                        <div>Miễn phí</div>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between fw-bold">
                                        <div>Tổng cộng</div>
                                        <div>{formatPrice(total)}</div>
                                    </ListGroup.Item>
                                </ListGroup>
                                <Button 
                                    variant="primary" 
                                    className="w-100 mt-3"
                                    onClick={handleCheckout}
                                >
                                    Thanh toán tất cả
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default CartPage; 