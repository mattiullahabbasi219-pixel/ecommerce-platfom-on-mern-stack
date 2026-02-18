import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-section">
                        <div className="footer-logo">
                            <span className="logo-icon">🛒</span>
                            <span className="logo-text">ShopMERN</span>
                        </div>
                        <p className="footer-desc">
                            Your one-stop shop for all your needs. Quality products, great prices, and excellent customer service.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link"><FiFacebook /></a>
                            <a href="#" className="social-link"><FiTwitter /></a>
                            <a href="#" className="social-link"><FiInstagram /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4 className="footer-title">Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                            <li><Link to="/profile">My Account</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="footer-section">
                        <h4 className="footer-title">Categories</h4>
                        <ul className="footer-links">
                            <li><Link to="/products?category=Electronics">Electronics</Link></li>
                            <li><Link to="/products?category=Clothing">Clothing</Link></li>
                            <li><Link to="/products?category=Sports">Sports</Link></li>
                            <li><Link to="/products?category=Beauty">Beauty</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-section">
                        <h4 className="footer-title">Contact Us</h4>
                        <ul className="contact-list">
                            <li>
                                <FiMapPin />
                                <span>123 Commerce St, City, Country</span>
                            </li>
                            <li>
                                <FiPhone />
                                <span>+1 234 567 890</span>
                            </li>
                            <li>
                                <FiMail />
                                <span>support@shopmern.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} ShopMERN. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
