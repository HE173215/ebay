import React, { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { useProduct } from "../../context/ProductContext";
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const { categories, searchProducts, getProductsByCategory } = useProduct();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSearch = () => {
        let searchResults;

        if (selectedCategory) {
            // Lấy sản phẩm theo danh mục và từ khóa
            const categoryProducts = getProductsByCategory(Number(selectedCategory));
            searchResults = categoryProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } else {
            // Tìm kiếm toàn bộ sản phẩm
            searchResults = searchProducts(searchTerm);
        }

        // Lưu kết quả tìm kiếm vào state hoặc localStorage nếu cần
        localStorage.setItem('searchResults', JSON.stringify(searchResults));

        // Chuyển đến trang kết quả tìm kiếm
        navigate('/search-results');
    };

    return (
        <InputGroup>
            <Form.Control
                placeholder="Search for anything"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
            />
            <Form.Select
                style={{ maxWidth: '200px' }}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">All Category</option>
                {categories.map(category => (
                    <option
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </Form.Select>
            <Button
                variant="primary"
                onClick={handleSearch}
            >
                Search
            </Button>
        </InputGroup>
    );
};

export default SearchBar;