import React, { createContext, useState, useContext, useEffect } from 'react';
import { BASE_URL } from '../api/api';

// Tạo Context cho giỏ hàng
const CartContext = createContext();

// Provider Component
export const CartProvider = ({ children }) => {
    // State quản lý giỏ hàng
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch danh sách giỏ hàng
    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const response = await fetch(`${BASE_URL}/carts`);
                if (!response.ok) throw new Error('Không thể tải giỏ hàng');

                const cartsData = await response.json();
                setCarts(cartsData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCarts();
    }, []);

    // Lấy giỏ hàng của một người dùng
    const getCartByUserId = (userId) => {
        return carts.find(cart => cart.userId === userId) || { items: [] };
    };

    // Thêm sản phẩm vào giỏ hàng
    const addToCart = (userId, productId, quantity = 1) => {
        setCarts(prevCarts => {
            // Tìm giỏ hàng của người dùng
            const userCartIndex = prevCarts.findIndex(cart => cart.userId === userId);

            if (userCartIndex > -1) {
                // Nếu giỏ hàng đã tồn tại
                const updatedCarts = [...prevCarts];
                const existingItemIndex = updatedCarts[userCartIndex].items.findIndex(
                    item => item.productId === productId
                );

                if (existingItemIndex > -1) {
                    // Nếu sản phẩm đã có trong giỏ, tăng số lượng
                    updatedCarts[userCartIndex].items[existingItemIndex].quantity += quantity;
                } else {
                    // Nếu sản phẩm chưa có, thêm mới
                    updatedCarts[userCartIndex].items.push({ productId, quantity });
                }

                return updatedCarts;
            } else {
                // Nếu chưa có giỏ hàng, tạo mới
                return [
                    ...prevCarts,
                    { userId, items: [{ productId, quantity }] }
                ];
            }
        });
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = (userId, productId) => {
        setCarts(prevCarts =>
            prevCarts.map(cart =>
                cart.userId === userId
                    ? {
                        ...cart,
                        items: cart.items.filter(item => item.productId !== productId)
                    }
                    : cart
            )
        );
    };

    // Cập nhật số lượng sản phẩm
    const updateCartItemQuantity = (userId, productId, quantity) => {
        setCarts(prevCarts =>
            prevCarts.map(cart =>
                cart.userId === userId
                    ? {
                        ...cart,
                        items: cart.items.map(item =>
                            item.productId === productId
                                ? { ...item, quantity }
                                : item
                        )
                    }
                    : cart
            )
        );
    };

    // Tính tổng giá trị giỏ hàng (cần truyền vào danh sách sản phẩm)
    const calculateCartTotal = (userId, products) => {
        const userCart = getCartByUserId(userId);
        return userCart.items.reduce((total, cartItem) => {
            const product = products.find(p => p.id === cartItem.productId);
            return total + (product ? product.price * cartItem.quantity : 0);
        }, 0);
    };

    // Giá trị context để chia sẻ
    const contextValue = {
        carts,
        loading,
        error,
        getCartByUserId,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        calculateCartTotal
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook để sử dụng CartContext
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart phải được sử dụng trong CartProvider');
    }
    return context;
};

export default CartProvider;