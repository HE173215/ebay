// src/contexts/ProductContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { BASE_URL } from '../api/api';

// Create the context
export const ProductContext = createContext();

// Create a custom hook to use the product context
export const useProductContext = () => useContext(ProductContext);

// Provider component
export const ProductProvider = ({ children }) => {
    // State for storing data
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch categories
                const categoriesResponse = await fetch(`${BASE_URL}/categories`);
                if (!categoriesResponse.ok) throw new Error('Failed to fetch categories. Please try again later.');
                const categoriesData = await categoriesResponse.json();

                // Fetch products
                const productsResponse = await fetch(`${BASE_URL}/products`);
                if (!productsResponse.ok) throw new Error('Failed to fetch products');
                const productsData = await productsResponse.json();

                // Update state with fetched data
                setCategories(categoriesData);
                setProducts(productsData);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Get product by ID
    const getProductById = (id) => {
        return products.find(product => product.id === id) || null;
    };

    // Get products by category ID
    const getProductsByCategory = (categoryId) => {
        return products.filter(product => product.categoryId === categoryId);
    };

    // Get category by ID
    const getCategoryById = (id) => {
        return categories.find(category => category.id === id) || null;
    };

    // Get full image URL
    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        // Check if the image path is already a full URL
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            return imagePath;
        }
        return `${BASE_URL}${imagePath}`;
    };

    // Format price to VND
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    // Search products by name or description
    const searchProducts = (query) => {
        if (!query) return products;
        const searchTerm = query.toLowerCase();
        return products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    };

    // Sort products by price or rating
    const sortProducts = (productList, sortBy = 'price', order = 'asc') => {
        return [...productList].sort((a, b) => {
            const valueA = a[sortBy];
            const valueB = b[sortBy];
            return order === 'asc' ? valueA - valueB : valueB - valueA;
        });
    };

    // The value that will be provided to consumers of this context
    const value = {
        BASE_URL,
        categories,
        products,
        loading,
        error,
        getProductById,
        getProductsByCategory,
        getCategoryById,
        getImageUrl,
        formatPrice,
        searchProducts,
        sortProducts
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;