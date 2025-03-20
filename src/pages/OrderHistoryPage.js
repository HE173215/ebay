import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Badge, Button } from 'react-bootstrap';
import { useUser } from '../context/UserContext';
import { useProduct } from '../context/ProductContext';

const OrderHistoryPage = () => {
    const { user } = useUser();
    const { products, formatPrice } = useProduct();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Lấy đơn hàng từ localStorage
        const savedOrders = localStorage.getItem('orders') || '[]';
        const allOrders = JSON.parse(savedOrders);
        
        // Lọc đơn hàng theo user ID hoặc guest
        const userOrders = allOrders.filter(order => 
            order.userId === (user?.id || 'guest')
        );
        
        setOrders(userOrders);
        setLoading(false);
    }, [user]);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return <Badge bg="warning">Chờ xử lý</Badge>;
            case 'processing':
                return <Badge bg="info">Đang xử lý</Badge>;
            case 'shipped':
                return <Badge bg="primary">Đang giao hàng</Badge>;
            case 'delivered':
                return <Badge bg="success">Đã giao hàng</Badge>;
            case 'cancelled':
                return <Badge bg="danger">Đã hủy</Badge>;
            default:
                return <Badge bg="secondary">Không xác định</Badge>;
        }
    };

    const canCancelOrder = (status) => {
        return status === 'pending' || status === 'processing';
    };

    const handleCancelOrder = (orderId) => {
        if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
            // Lấy danh sách đơn hàng từ localStorage
            const savedOrders = localStorage.getItem('orders') || '[]';
            const allOrders = JSON.parse(savedOrders);

            // Cập nhật trạng thái đơn hàng
            const updatedOrders = allOrders.map(order => {
                if (order.orderId === orderId) {
                    return { ...order, status: 'cancelled' };
                }
                return order;
            });

            // Lưu lại vào localStorage
            localStorage.setItem('orders', JSON.stringify(updatedOrders));

            // Cập nhật state
            setOrders(updatedOrders.filter(order => 
                order.userId === (user?.id || 'guest')
            ));

            alert('Đã hủy đơn hàng thành công!');
        }
    };

    if (loading) {
        return <div className="text-center py-5">Đang tải...</div>;
    }

    return (
        <Container className="py-4">
            <h2 className="mb-4">Lịch sử đơn hàng</h2>
            {orders.length === 0 ? (
                <Card>
                    <Card.Body className="text-center py-5">
                        <h5>Chưa có đơn hàng nào</h5>
                        <p className="text-muted">Bạn chưa đặt đơn hàng nào</p>
                    </Card.Body>
                </Card>
            ) : (
                orders.map((order, index) => (
                    <Card key={index} className="mb-4">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>Đơn hàng #{order.orderId}</strong>
                                <span className="ms-2 text-muted">
                                    {new Date(order.orderDate).toLocaleString('vi-VN')}
                                </span>
                            </div>
                            <div className="d-flex align-items-center">
                                {getStatusBadge(order.status)}
                                {canCancelOrder(order.status) && (
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        className="ms-2"
                                        onClick={() => handleCancelOrder(order.orderId)}
                                    >
                                        Hủy đơn
                                    </Button>
                                )}
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                {order.items.map((item, itemIndex) => {
                                    const product = products.find(p => p.id === item.productId);
                                    return (
                                        <ListGroup.Item key={itemIndex}>
                                            <Row className="align-items-center">
                                                <Col xs={3}>
                                                    <img
                                                        src={product?.image 
                                                            ? `${process.env.REACT_APP_API_URL}${product.image}`
                                                            : "https://via.placeholder.com/100x100?text=Không+có+hình"}
                                                        alt={product?.name || "Sản phẩm"}
                                                        className="img-fluid"
                                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                    />
                                                </Col>
                                                <Col xs={9}>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h6 className="mb-1">{product?.name || "Sản phẩm không tồn tại"}</h6>
                                                            <p className="text-muted mb-0">Số lượng: {item.quantity}</p>
                                                        </div>
                                                        <div>{formatPrice(product?.price * item.quantity || 0)}</div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    );
                                })}
                            </ListGroup>
                            <div className="mt-3">
                                <h6>Thông tin giao hàng:</h6>
                                <p className="mb-1">{order.shippingAddress.fullName}</p>
                                <p className="mb-1">{order.shippingAddress.phone}</p>
                                <p className="mb-0">
                                    {order.shippingAddress.address}, {order.shippingAddress.ward}, 
                                    {order.shippingAddress.district}, {order.shippingAddress.city}
                                </p>
                            </div>
                            <div className="mt-3">
                                <h6>Phương thức thanh toán:</h6>
                                <p className="mb-0">{order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'Thanh toán qua PayPal'}</p>
                            </div>
                            <div className="mt-3 text-end">
                                <h5>Tổng cộng: {formatPrice(order.total)}</h5>
                            </div>
                        </Card.Body>
                    </Card>
                ))
            )}
        </Container>
    );
};

export default OrderHistoryPage; 