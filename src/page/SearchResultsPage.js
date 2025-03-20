import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { FaFilter, FaSort, FaTags, FaBoxOpen } from 'react-icons/fa';
import { useProduct } from "../context/ProductContext";
import Header from "../layout/includes/Header";
import SubMenu from "../layout/includes/SubMenu";
import Footer from "../layout/includes/Footer";

const SearchResultsPage = () => {
    const { formatPrice, getImageUrl, sortProducts, categories } = useProduct();
    const [searchResults, setSearchResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);

    // Filter states
    const [sortBy, setSortBy] = useState('price');
    const [sortOrder, setSortOrder] = useState('asc');
    const [stockFilter, setStockFilter] = useState('all');
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Mobile filter toggle
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const results = JSON.parse(localStorage.getItem('searchResults') || '[]');
        setSearchResults(results);
        setFilteredResults(results);
    }, []);

    // Filter application logic
    useEffect(() => {
        let filtered = [...searchResults];

        if (selectedCategories.length > 0) {
            filtered = filtered.filter(product =>
                selectedCategories.includes(product.categoryId)
            );
        }

        if (stockFilter === 'inStock') {
            filtered = filtered.filter(product => product.stock > 0);
        } else if (stockFilter === 'outOfStock') {
            filtered = filtered.filter(product => product.stock === 0);
        }

        const sortedResults = sortProducts(filtered, sortBy, sortOrder);
        setFilteredResults(sortedResults);
    }, [sortBy, sortOrder, stockFilter, selectedCategories, searchResults]);

    const handleCategoryToggle = (categoryId) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const FilterSidebar = () => (
        <div className="bg-light p-3 rounded shadow-sm">
            {/* Sort */}
            <div className="mb-4">
                <h6 className="mb-3 text-muted"><FaSort className="me-2" />Sắp xếp</h6>
                <Form.Select
                    onChange={(e) => {
                        const [by, order] = e.target.value.split('-');
                        setSortBy(by);
                        setSortOrder(order);
                    }}
                    className="shadow-sm"
                >
                    <option value="price-asc">Giá: Thấp đến Cao</option>
                    <option value="price-desc">Giá: Cao đến Thấp</option>
                </Form.Select>
            </div>

            {/* Categories */}
            <div className="mb-4">
                <h6 className="mb-3 text-muted"><FaTags className="me-2" />Danh mục</h6>
                <ListGroup>
                    {categories.map(category => (
                        <ListGroup.Item
                            key={category.id}
                            action
                            className={`rounded mb-1 ${selectedCategories.includes(category.id) ? 'active' : ''}`}
                            onClick={() => handleCategoryToggle(category.id)}
                        >
                            {category.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>

            {/* Stock */}
            <div>
                <h6 className="mb-3 text-muted"><FaBoxOpen className="me-2" />Tồn kho</h6>
                <Form.Select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value)}
                    className="shadow-sm"
                >
                    <option value="all">Tất cả</option>
                    <option value="inStock">Còn hàng</option>
                    <option value="outOfStock">Hết hàng</option>
                </Form.Select>
            </div>
        </div>
    );

    return (
        <div>
            <Header />
            <SubMenu />
            <Container className="mt-4">
                <Row>
                    {/* Desktop Sidebar */}
                    <Col md={3} className="d-none d-md-block">
                        <FilterSidebar />
                    </Col>

                    {/* Mobile Filter Button */}
                    <div className="d-md-none text-center mb-3">
                        <Button
                            variant="outline-primary"
                            onClick={() => setShowFilters(true)}
                        >
                            <FaFilter className="me-2" /> Bộ lọc
                        </Button>
                    </div>

                    {/* Mobile Filters Offcanvas */}
                    <Offcanvas
                        show={showFilters}
                        onHide={() => setShowFilters(false)}
                        placement="start"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Bộ lọc</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <FilterSidebar />
                        </Offcanvas.Body>
                    </Offcanvas>

                    {/* Results */}
                    <Col md={9}>
                        <h2 className="mb-4">
                            Kết quả tìm kiếm ({filteredResults.length})
                        </h2>
                        {filteredResults.length === 0 ? (
                            <div className="text-center text-muted py-5">
                                <p>Không tìm thấy sản phẩm nào</p>
                            </div>
                        ) : (
                            <Row xs={1} md={2} lg={3} className="g-4">
                                {filteredResults.map(product => (
                                    <Col key={product.id}>
                                        <Card className="h-100 shadow-sm">
                                            <Card.Img
                                                variant="top"
                                                src={getImageUrl(product.image)}
                                                alt={product.name}
                                                style={{
                                                    height: '250px',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <Card.Body>
                                                <Card.Title>{product.name}</Card.Title>
                                                <Card.Text>
                                                    <div className="h5 text-primary">
                                                        {formatPrice(product.price)}
                                                    </div>
                                                    <small
                                                        className={
                                                            product.stock > 0
                                                                ? 'text-success'
                                                                : 'text-danger'
                                                        }
                                                    >
                                                        {product.stock > 0
                                                            ? `Còn hàng: ${product.stock}`
                                                            : 'Hết hàng'}
                                                    </small>
                                                </Card.Text>
                                                <Button
                                                    variant="outline-primary"
                                                    href={`/product/${product.id}`}
                                                    className="w-100"
                                                >
                                                    Xem chi tiết
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
};

export default SearchResultsPage;