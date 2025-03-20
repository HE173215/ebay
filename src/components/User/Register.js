import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../api/api';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phoneNumber: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        // Kiểm tra các trường bắt buộc
        if (!formData.username) {
            setError('Vui lòng nhập tên đăng nhập');
            return false;
        }

        if (!formData.email) {
            setError('Vui lòng nhập email');
            return false;
        }

        if (!formData.password) {
            setError('Vui lòng nhập mật khẩu');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return false;
        }

        // Kiểm tra độ mạnh mật khẩu
        if (formData.password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return false;
        }

        return true;
    };

    // Trong hàm handleSubmit của component Register
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        setLoading(true);

        try {
            // Lấy danh sách người dùng hiện tại để tìm ID lớn nhất
            const usersResponse = await axios.get(`${BASE_URL}/users`);
            const existingUsers = usersResponse.data;

            // Tìm ID lớn nhất và tăng lên 1
            const newUserId = existingUsers.length > 0
                ? Math.max(...existingUsers.map(user => user.id)) + 1
                : 1;

            // Chuẩn bị dữ liệu gửi đi
            const submitData = {
                id: newUserId,  // Thêm ID tự động
                username: formData.username,
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName,
                phoneNumber: formData.phoneNumber
            };

            // Gửi request đăng ký
            const response = await axios.post(`${BASE_URL}/users`, submitData);

            // Kiểm tra phản hồi từ server
            if (response.data) {
                // Đăng ký thành công
                alert('Đăng ký thành công!');
                navigate('/login'); // Chuyển đến trang đăng nhập
            }
        } catch (err) {
            // Xử lý lỗi (giữ nguyên như trước)
            if (err.response) {
                setError(err.response.data.message || 'Đăng ký thất bại');
            } else if (err.request) {
                setError('Không thể kết nối đến máy chủ');
            } else {
                setError('Có lỗi xảy ra');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: '400px' }}>
                <Card.Body>
                    <Card.Title className="text-center mb-4">Đăng Ký Tài Khoản</Card.Title>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên đăng nhập</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Nhập tên đăng nhập"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Nhập email"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Nhập mật khẩu"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Xác nhận mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Nhập lại mật khẩu"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Họ và tên</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Nhập họ và tên"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Nhập số điện thoại"
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100"
                            disabled={loading}
                        >
                            {loading ? 'Đang đăng ký...' : 'Đăng Ký'}
                        </Button>
                    </Form>

                    <div className="text-center mt-3">
                        Đã có tài khoản?
                        <Button
                            variant="link"
                            onClick={() => navigate('/login')}
                        >
                            Đăng nhập
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Register;