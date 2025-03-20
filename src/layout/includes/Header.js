import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { FaBell, FaShoppingCart } from 'react-icons/fa';
import TopNav from './TopNav';
import { useNavigate } from "react-router-dom";
import SearchBar from '../../components/filter/SearchBar'; // Import SearchBar component
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { getCartByUserId } = useCart();
    const cart = getCartByUserId(user?.id || 'guest');
    const cartItemCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;


    return (
        <header>
            {/* Top Navigation */}
            <TopNav />

            {/* Main Navigation */}
            <Navbar bg="white" expand="lg" className="py-2 border-bottom">
                <Container>
                    <Navbar.Brand onClick={() => navigate("/")}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/2560px-EBay_logo.svg.png"
                            alt="eBay"
                            height="40"
                        />
                    </Navbar.Brand>
                    <div className="d-flex small text-muted mb-1">
                        Shop by category
                    </div>
                    <div className="d-flex flex-grow-1 mx-3">
                        <SearchBar />
                        <div className="ms-2">Advanced</div>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="mx-2">Ship to</div>
                        <div className="mx-2">Sell</div>
                        <div className="mx-2">Watchlist</div>
                        <div className="mx-2">My eBay</div>
                        <div className="mx-2"><FaBell /></div>
                        <Link to="/cart" className="mx-2 position-relative">
                            <FaShoppingCart />
                            {cartItemCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;