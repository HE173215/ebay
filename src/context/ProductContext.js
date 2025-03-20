import React, { createContext, useState, useContext, useEffect } from 'react';
import { BASE_URL } from '../api/api';

// Tạo Context cho sản phẩm
const ProductContext = createContext();

// Provider Component
export const ProductProvider = ({ children }) => {
    // State quản lý sản phẩm và danh mục
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch toàn bộ dữ liệu
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching data from:', BASE_URL);
                
                // Fetch categories first
                const categoriesResponse = await fetch(`${BASE_URL}/categories`);
                if (!categoriesResponse.ok) throw new Error('Không thể tải danh mục');
                const categoriesData = await categoriesResponse.json();
                console.log('Fetched categories:', categoriesData);
                setCategories(categoriesData);

                // Fetch products
                const productsResponse = await fetch(`${BASE_URL}/products`);
                if (!productsResponse.ok) throw new Error('Không thể tải sản phẩm');
                const productsData = await productsResponse.json();
                console.log('Fetched products:', productsData);
                
                // Ensure categoryId is a number
                const processedProducts = productsData.map(product => ({
                    ...product,
                    categoryId: parseInt(product.categoryId)
                }));
                setProducts(processedProducts);

                // Fetch reviews
                const reviewsResponse = await fetch(`${BASE_URL}/reviews`);
                if (!reviewsResponse.ok) throw new Error('Không thể tải đánh giá');
                const reviewsData = await reviewsResponse.json();
                setReviews(reviewsData);

                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Lấy sản phẩm theo ID
    const getProductById = (id) => {
        const productId = Number(id);
        return products.find(product => product.id === productId) || null;
    };

    // Lấy sản phẩm theo danh mục
    const getProductsByCategory = (categoryId) => {
        console.log('Getting products for category:', categoryId);
        const parsedCategoryId = parseInt(categoryId);
        
        if (isNaN(parsedCategoryId)) {
            console.warn('Invalid category ID:', categoryId);
            return [];
        }

        return products.filter(product => product.categoryId === parsedCategoryId);
    };

    // Lấy danh mục theo ID
    const getCategoryById = (id) => {
        return categories.find(category => category.id === id) || null;
    };

    // Lấy đánh giá của một sản phẩm
    const getProductReviews = (productId) => {
        return reviews.filter(review => review.productId === productId);
    };

    // Tính điểm đánh giá trung bình
    const getAverageRating = (productId) => {
        const productReviews = getProductReviews(productId);
        if (productReviews.length === 0) return 0;

        const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
        return totalRating / productReviews.length;
    };

    // Tìm kiếm sản phẩm
    const searchProducts = (query) => {
        if (!query) return products;
        const searchTerm = query.toLowerCase();
        return products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    };

    // Sắp xếp sản phẩm
    const sortProducts = (productList, sortBy = 'price', order = 'asc') => {
        return [...productList].sort((a, b) => {
            const valueA = a[sortBy];
            const valueB = b[sortBy];
            return order === 'asc' ? valueA - valueB : valueB - valueA;
        });
    };

    // Định dạng giá
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    // Lấy URL hình ảnh
    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            return imagePath;
        }
        return `${BASE_URL}${imagePath}`;
    };
    // Lấy số lượng sản phẩm theo ID
    const getProductStock = (productId) => {
        const product = products.find(p => p.id === productId);
        return product ? product.stock : 0;
    };

    // Giá trị context để chia sẻ
    const contextValue = {
        categories,
        products,
        reviews,
        loading,
        error,
        getProductById,
        getProductsByCategory,
        getCategoryById,
        getProductReviews,
        getAverageRating,
        searchProducts,
        sortProducts,
        formatPrice,
        getImageUrl,
        getProductStock
    };

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    );
};

// Custom hook để sử dụng ProductContext
export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProduct phải được sử dụng trong ProductProvider');
    }
    return context;
};

export default ProductProvider;