import React, { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { useProduct } from "../../context/ProductContext";
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const { categories, products } = useProduct();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSearch = () => {
        console.log('Search with:', { searchTerm, selectedCategory });

        // Nếu chọn category, chuyển đến trang category
        if (selectedCategory && !searchTerm) {
            navigate(`/category/${selectedCategory}`);
            return;
        }

        // Lọc sản phẩm theo từ khóa và category
        let filteredProducts = [...products];

        // Lọc theo từ khóa nếu có
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower)
            );
        }

        // Lọc theo category nếu có
        if (selectedCategory) {
            const categoryId = parseInt(selectedCategory);
            filteredProducts = filteredProducts.filter(product => 
                product.categoryId === categoryId
            );
        }

        console.log('Filtered products:', filteredProducts);

        // Lưu kết quả tìm kiếm
        localStorage.setItem('searchResults', JSON.stringify(filteredProducts));
        localStorage.setItem('searchParams', JSON.stringify({
            term: searchTerm,
            category: selectedCategory
        }));

        // Chuyển đến trang kết quả tìm kiếm
        navigate('/search-results');
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategory(value);
        
        // Nếu không có từ khóa tìm kiếm, chuyển đến trang category ngay
        if (!searchTerm && value) {
            navigate(`/category/${value}`);
        }
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
                onChange={handleCategoryChange}
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