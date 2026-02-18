import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await productsAPI.getAll({ featured: 'true', limit: 8 });
                setFeaturedProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    const categories = [
        { name: 'Electronics', icon: '📱', color: '#3b82f6' },
        { name: 'Clothing', icon: '👕', color: '#8b5cf6' },
        { name: 'Sports', icon: '⚽', color: '#22c55e' },
        { name: 'Beauty', icon: '💄', color: '#ec4899' },
        { name: 'Home & Garden', icon: '🏠', color: '#f59e0b' },
        { name: 'Books', icon: '📚', color: '#06b6d4' },
    ];

    const features = [
        { icon: <FiTruck />, title: 'Free Shipping', desc: 'On orders over $100' },
        { icon: <FiShield />, title: 'Secure Payment', desc: '100% secure payment' },
        { icon: <FiRefreshCw />, title: 'Easy Returns', desc: '30 day return policy' },
        { icon: <FiHeadphones />, title: '24/7 Support', desc: 'Dedicated support' },
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Discover Amazing
                            <span className="gradient-text"> Products</span>
                        </h1>
                        <p className="hero-subtitle">
                            Shop the latest trends with unbeatable prices. Quality products delivered right to your doorstep.
                        </p>
                        <div className="hero-actions">
                            <Link to="/products" className="btn btn-primary btn-lg">
                                Shop Now <FiArrowRight />
                            </Link>
                            <Link to="/products?featured=true" className="btn btn-outline btn-lg">
                                View Featured
                            </Link>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img
                            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600"
                            alt="Shopping"
                        />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="features-section">
                <div className="container">
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon">{feature.icon}</div>
                                <div className="feature-info">
                                    <h4>{feature.title}</h4>
                                    <p>{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="categories-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Shop by Category</h2>
                        <Link to="/products" className="see-all-link">
                            See All <FiArrowRight />
                        </Link>
                    </div>
                    <div className="categories-grid">
                        {categories.map((category, index) => (
                            <Link
                                key={index}
                                to={`/products?category=${encodeURIComponent(category.name)}`}
                                className="category-card"
                                style={{ '--accent-color': category.color }}
                            >
                                <span className="category-icon">{category.icon}</span>
                                <span className="category-name">{category.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="products-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Featured Products</h2>
                        <Link to="/products" className="see-all-link">
                            View All <FiArrowRight />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <div className="products-grid">
                            {featuredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Join Our Newsletter</h2>
                        <p>Subscribe to get special offers, free giveaways, and exclusive deals.</p>
                        <form className="newsletter-form">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="form-input"
                            />
                            <button type="submit" className="btn btn-primary">Subscribe</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
