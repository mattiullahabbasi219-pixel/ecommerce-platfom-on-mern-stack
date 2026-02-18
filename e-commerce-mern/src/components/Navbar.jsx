import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch, FiLogOut, FiSettings, FiPackage } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { user, logout, isAdmin } = useAuth();
    const { getCartCount } = useCart();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    const handleLogout = () => {
        logout();
        setUserMenuOpen(false);
        navigate('/');
    };

    return (
        <header className="navbar">
            <div className="container navbar-container">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">🛒</span>
                    <span className="logo-text">ShopMERN</span>
                </Link>

                {/* Search Bar - Desktop */}
                <form className="navbar-search hide-mobile" onSubmit={handleSearch}>
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </form>

                {/* Nav Links */}
                <nav className={`navbar-nav ${mobileMenuOpen ? 'active' : ''}`}>
                    <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                        Home
                    </Link>
                    <Link to="/products" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                        Products
                    </Link>

                    {/* Mobile Search */}
                    <form className="navbar-search mobile-only" onSubmit={handleSearch}>
                        <FiSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </form>
                </nav>

                {/* Right Actions */}
                <div className="navbar-actions">
                    {/* Cart */}
                    <Link to="/cart" className="action-btn cart-btn">
                        <FiShoppingCart />
                        {getCartCount() > 0 && (
                            <span className="cart-count">{getCartCount()}</span>
                        )}
                    </Link>

                    {/* User Menu */}
                    {user ? (
                        <div className="user-menu-container">
                            <button
                                className="action-btn user-btn"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                            >
                                <FiUser />
                                <span className="user-name hide-mobile">{user.name?.split(' ')[0]}</span>
                            </button>

                            {userMenuOpen && (
                                <div className="user-dropdown">
                                    <div className="dropdown-header">
                                        <strong>{user.name}</strong>
                                        <span>{user.email}</span>
                                    </div>
                                    <div className="dropdown-divider" />
                                    <Link
                                        to="/profile"
                                        className="dropdown-item"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        <FiUser /> My Profile
                                    </Link>
                                    <Link
                                        to="/orders"
                                        className="dropdown-item"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        <FiPackage /> My Orders
                                    </Link>
                                    {isAdmin() && (
                                        <>
                                            <div className="dropdown-divider" />
                                            <Link
                                                to="/admin"
                                                className="dropdown-item"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                <FiSettings /> Admin Dashboard
                                            </Link>
                                        </>
                                    )}
                                    <div className="dropdown-divider" />
                                    <button className="dropdown-item logout-btn" onClick={handleLogout}>
                                        <FiLogOut /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary btn-sm">
                            Login
                        </Link>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        className="action-btn mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
