import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useProduct } from '../context/ProductContext';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { getCartByUserId, calculateCartTotal, clearCart, removeFromCart } = useCart();
    const { products, formatPrice } = useProduct();
    
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [shippingAddress, setShippingAddress] = useState({
        fullName: user?.fullName || '',
        phone: user?.phone || '',
        address: '',
        city: '',
        district: '',
        ward: ''
    });
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Kiểm tra xem có giỏ hàng tạm thời không
        const tempCart = localStorage.getItem('tempCheckoutCart');
        if (tempCart) {
            const parsedTempCart = JSON.parse(tempCart);
            setCartItems(parsedTempCart.items.map(item => {
                const product = products.find(p => p.id === item.productId);
                return { ...item, product };
            }));
            setTotal(parsedTempCart.items.reduce((sum, item) => {
                const product = products.find(p => p.id === item.productId);
                return sum + (product?.price || 0) * item.quantity;
            }, 0));
        } else {
            // Nếu không có giỏ hàng tạm thời, sử dụng giỏ hàng thông thường
            const cart = user ? getCartByUserId(user.id) : getCartByUserId('guest');
            const items = cart?.items?.map(item => {
                const product = products.find(p => p.id === item.productId);
                return { ...item, product };
            }) || [];
            setCartItems(items);
            setTotal(calculateCartTotal(user?.id || 'guest', products));
        }
    }, [user, products, getCartByUserId, calculateCartTotal]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Tạo đơn hàng mới
            const newOrder = {
                orderId: Date.now().toString(),
                orderDate: new Date().toISOString(),
                userId: user?.id || 'guest',
                items: cartItems,
                shippingAddress,
                paymentMethod,
                total,
                status: 'pending'
            };

            // Lưu đơn hàng vào localStorage
            const savedOrders = localStorage.getItem('orders') || '[]';
            const orders = JSON.parse(savedOrders);
            orders.push(newOrder);
            localStorage.setItem('orders', JSON.stringify(orders));

            // Xóa sản phẩm đã thanh toán khỏi giỏ hàng
            cartItems.forEach(item => {
                removeFromCart(user?.id || 'guest', item.productId);
            });

            // Xóa giỏ hàng tạm thời nếu có
            localStorage.removeItem('tempCheckoutCart');

            // Chuyển hướng đến trang lịch sử đơn hàng
            navigate('/order-history');
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.');
        }
    };

    const handlePayPalSuccess = async (details) => {
        try {
            // Tạo đơn hàng mới
            const newOrder = {
                orderId: Date.now().toString(),
                orderDate: new Date().toISOString(),
                userId: user?.id || 'guest',
                items: cartItems,
                shippingAddress,
                paymentMethod,
                total,
                status: 'processing'
            };

            // Lưu đơn hàng vào localStorage
            const savedOrders = localStorage.getItem('orders') || '[]';
            const orders = JSON.parse(savedOrders);
            orders.push(newOrder);
            localStorage.setItem('orders', JSON.stringify(orders));

            // Xóa sản phẩm đã thanh toán khỏi giỏ hàng
            cartItems.forEach(item => {
                removeFromCart(user?.id || 'guest', item.productId);
            });

            // Xóa giỏ hàng tạm thời nếu có
            localStorage.removeItem('tempCheckoutCart');

            // Chuyển hướng đến trang lịch sử đơn hàng
            navigate('/order-history');
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.');
        }
    };

    const handlePayPalError = () => {
        alert('Có lỗi xảy ra trong quá trình thanh toán PayPal. Vui lòng thử lại.');
    };

    return (
        <PayPalScriptProvider options={{ 
            "client-id": "YOUR_PAYPAL_CLIENT_ID", // Thay thế bằng Client ID của bạn
            currency: "USD"
        }}>
            <Container className="py-4">
                <h2 className="mb-4">Thanh toán</h2>
                <Row>
                    <Col md={8}>
                        <Card className="mb-4">
                            <Card.Header>Thông tin giao hàng</Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Họ và tên</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={shippingAddress.fullName}
                                            onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Số điện thoại</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            value={shippingAddress.phone}
                                            onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Địa chỉ</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={shippingAddress.address}
                                            onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                                            required
                                        />
                                    </Form.Group>
                                    <Row>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Tỉnh/Thành phố</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={shippingAddress.city}
                                                    onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Quận/Huyện</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={shippingAddress.district}
                                                    onChange={(e) => setShippingAddress({...shippingAddress, district: e.target.value})}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Phường/Xã</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={shippingAddress.ward}
                                                    onChange={(e) => setShippingAddress({...shippingAddress, ward: e.target.value})}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phương thức thanh toán</Form.Label>
                                        <Form.Select
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            required
                                        >
                                            <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                                            <option value="paypal">Thanh toán qua PayPal</option>
                                        </Form.Select>
                                    </Form.Group>
                                    {paymentMethod === 'cod' ? (
                                        <Button variant="primary" type="submit" className="w-100">
                                            Đặt hàng
                                        </Button>
                                    ) : (
                                        <div className="w-100">
                                            <PayPalButtons
                                                createOrder={(data, actions) => {
                                                    return actions.order.create({
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    value: (total / 23000).toFixed(2), // Chuyển đổi VND sang USD
                                                                },
                                                            },
                                                        ],
                                                    });
                                                }}
                                                onApprove={handlePayPalSuccess}
                                                onError={handlePayPalError}
                                                style={{ layout: "vertical" }}
                                            />
                                        </div>
                                    )}
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Header>Đơn hàng</Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    {cartItems.map((item, index) => (
                                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <div>{item.product?.name || "Sản phẩm không tồn tại"}</div>
                                                <small className="text-muted">Số lượng: {item.quantity}</small>
                                            </div>
                                            <div>{formatPrice(item.product?.price * item.quantity || 0)}</div>
                                        </ListGroup.Item>
                                    ))}
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
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </PayPalScriptProvider>
    );
};

export default CheckoutPage; 