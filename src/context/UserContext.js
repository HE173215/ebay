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
            saveUserToStorage(user);
            return user;
        } else {
            const errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng';
            setError(errorMessage);
            return null;
        }
    };

    // Hàm đăng xuất
    const logout = () => {
        setCurrentUser(null);
        setIsAuthenticated(false);
        removeUserFromStorage();
    };

    // Lấy người dùng theo ID
    const getUserById = (userId) => {
        return users.find(user => user.id === userId) || null;
    };

    // Lưu thông tin người dùng vào localStorage
    const saveUserToStorage = (user) => {
        try {
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            // Silent error handling
        }
    };

    // Lấy thông tin người dùng từ localStorage
    const getUserFromStorage = () => {
        try {
            const userString = localStorage.getItem('user');
            return userString ? JSON.parse(userString) : null;
        } catch (error) {
            return null;
        }
    };

    // Xóa thông tin người dùng khỏi localStorage
    const removeUserFromStorage = () => {
        try {
            localStorage.removeItem('user');
        } catch (error) {
            // Silent error handling
        }
    };

    // Hàm kiểm tra thông tin người dùng đã được lưu trữ sau khi đăng nhập chưa
    const checkUserStorageAfterLogin = () => {
        const storedUser = getUserFromStorage();

        if (storedUser) {
            // Kiểm tra xem thông tin người dùng trong localStorage có khớp với currentUser không
            const isStorageConsistent = currentUser &&
                storedUser.id === currentUser.id &&
                storedUser.username === currentUser.username;

            return {
                isStored: true,
                isConsistent: isStorageConsistent,
                storedUser: storedUser
            };
        }

        return {
            isStored: false,
            isConsistent: false,
            storedUser: null
        };
    };

    // Kiểm tra xem người dùng đã đăng nhập hay chưa khi component được mount
    useEffect(() => {
        const user = getUserFromStorage();
        if (user) {
            setCurrentUser(user);
            setIsAuthenticated(true);
        }
    }, []);

    // Giá trị context để chia sẻ
    const contextValue = {
        currentUser,
        users,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        getUserById,
        checkUserStorageAfterLogin
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