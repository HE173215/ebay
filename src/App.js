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
import Register from "./components/User/Register";
import UserProfile from "./components/User/UserProfile";
import PrivateRoute from "./components/PrivateRoute";
import SearchResultsPage from "./page/SearchResultsPage";
import OrderHistoryPage from './pages/OrderHistoryPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckOutPage';



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
                                <Route path="/register" element={<Register />} />
                                <Route path="/search-results" element={<SearchResultsPage />} />
                                <Route path="/checkout" element={<CheckoutPage/>} />
                                <Route path="/cart" element={<CartPage />} />
                                <Route path="/order-history" element={<OrderHistoryPage />} />
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