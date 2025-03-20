import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetailPage from "./page/ProductDetailPage";
import CategoryPage from "./page/CategoryPage";
import MainLayout from "./layout/MainLayout";
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import Login from "./components/User/Login";
import UserProfile from "./components/User/UserProfile";
import PrivateRoute from "./components/PrivateRoute";

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
                                <Route path="/category/:id?" element={<CategoryPage />} />
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="/profile"
                                    element={
                                        <PrivateRoute>
                                            <UserProfile />
                                        </PrivateRoute>
                                    }
                                />
                            </Routes>
                        </BrowserRouter>
                    </UserProvider>
                </CartProvider>
            </ProductProvider>
        </div>
    );
}

export default App;
