import React, { createContext, useState, useContext, useEffect } from 'react';
import { BASE_URL } from '../api/api';

// Tạo Context cho người dùng
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
    // State quản lý thông tin người dùng
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch danh sách người dùng
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${BASE_URL}/users`);
                if (!response.ok) throw new Error('Không thể tải danh sách người dùng');

                const userData = await response.json();
                setUsers(userData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Hàm đăng nhập
    const login = (username, password) => {
        const user = users.find(
            u => u.username === username && u.password === password
        );

        if (user) {
            setCurrentUser(user);
            setIsAuthenticated(true);
            return user;
        } else {
            setError('Tên đăng nhập hoặc mật khẩu không đúng');
            return null;
        }
    };

    // Hàm đăng xuất
    const logout = () => {
        setCurrentUser(null);
        setIsAuthenticated(false);
    };

    // Lấy người dùng theo ID
    const getUserById = (userId) => {
        return users.find(user => user.id === userId) || null;
    };

    // Giá trị context để chia sẻ
    const contextValue = {
        currentUser,
        users,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        getUserById
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook để sử dụng UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser phải được sử dụng trong UserProvider');
    }
    return context;
};

export default UserProvider;