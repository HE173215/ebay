import React from 'react';
import Header from '../layout/includes/Header';
import SubMenu from '../layout/includes/SubMenu';
import Footer from '../layout/includes/Footer';
import ProductDetail from '../components/product/ProductDetail';

const ProductDetailPage = () => {
    return (
        <div className="product-detail-page">
            <Header />
            <SubMenu />
            <ProductDetail />
            <Footer />
        </div>
    );
};

export default ProductDetailPage;