import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetailPage from "./page/ProductDetailPage";
import MainLayout from "./layout/MainLayout";
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';

function App() {
    return (
        <div className="App">
            <ProductProvider>
                <CartProvider>
                    <UserProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<MainLayout />} />
                                <Route path="/product/:id" element={<ProductDetailPage />} />
                            </Routes>
                        </BrowserRouter>
                    </UserProvider>
                </CartProvider>
            </ProductProvider>
        </div>
    );
}

export default App;