import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiMinus, FiPlus, FiShoppingCart, FiHeart, FiStar, FiTruck, FiShield, FiArrowLeft } from 'react-icons/fi';
import { productsAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productsAPI.getById(id);
                setProduct(response.data.product);
            } catch (error) {
                console.error('Error fetching product:', error);
                navigate('/products');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, navigate]);

    const handleQuantityChange = (delta) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        if (product && product.stock > 0) {
            addToCart(product, quantity);
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
        }
    };

    if (loading) {
        return (
            <div className="page">
                <div className="loading-container">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="page">
                <div className="container">
                    <div className="empty-state">
                        <h3>Product not found</h3>
                        <button className="btn btn-primary" onClick={() => navigate('/products')}>
                            Back to Products
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const images = product.images?.length > 0 ? [product.image, ...product.images] : [product.image];

    return (
        <div className="product-details-page page">
            <div className="container">
                {/* Back Button */}
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <FiArrowLeft /> Back
                </button>

                <div className="product-details-grid">
                    {/* Product Images */}
                    <div className="product-gallery">
                        <div className="main-image">
                            <img src={images[selectedImage]} alt={product.name} />
                            {product.stock === 0 && (
                                <div className="out-of-stock-overlay">Out of Stock</div>
                            )}
                        </div>
                        {images.length > 1 && (
                            <div className="thumbnail-list">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        className={`thumbnail ${index === selectedImage ? 'active' : ''}`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img src={img} alt={`${product.name} ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="product-info-section">
                        <span className="product-category-badge">{product.category}</span>
                        <h1 className="product-title">{product.name}</h1>

                        {/* Rating */}
                        <div className="product-rating">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar
                                        key={i}
                                        className={i < Math.floor(product.rating) ? 'filled' : ''}
                                    />
                                ))}
                            </div>
                            <span className="rating-value">{product.rating.toFixed(1)}</span>
                            <span className="reviews-count">({product.numReviews} reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="product-price-section">
                            <span className="product-price">${product.price.toFixed(2)}</span>
                            {product.stock > 0 ? (
                                <span className="stock-badge in-stock">In Stock ({product.stock} available)</span>
                            ) : (
                                <span className="stock-badge out-of-stock">Out of Stock</span>
                            )}
                        </div>

                        {/* Description */}
                        <div className="product-description">
                            <h3>Description</h3>
                            <p>{product.description}</p>
                        </div>

                        {/* Brand */}
                        {product.brand && (
                            <div className="product-brand">
                                <span className="label">Brand:</span>
                                <span className="value">{product.brand}</span>
                            </div>
                        )}

                        {/* Quantity & Add to Cart */}
                        {product.stock > 0 && (
                            <div className="add-to-cart-section">
                                <div className="quantity-selector">
                                    <button
                                        className="qty-btn"
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= 1}
                                    >
                                        <FiMinus />
                                    </button>
                                    <span className="qty-value">{quantity}</span>
                                    <button
                                        className="qty-btn"
                                        onClick={() => handleQuantityChange(1)}
                                        disabled={quantity >= product.stock}
                                    >
                                        <FiPlus />
                                    </button>
                                </div>

                                <button
                                    className={`btn btn-primary btn-lg add-cart-btn ${addedToCart ? 'added' : ''}`}
                                    onClick={handleAddToCart}
                                >
                                    <FiShoppingCart />
                                    {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                                </button>

                                <button className="btn btn-secondary btn-lg wishlist-btn">
                                    <FiHeart />
                                </button>
                            </div>
                        )}

                        {/* Features */}
                        <div className="product-features">
                            <div className="feature">
                                <FiTruck />
                                <div>
                                    <strong>Free Delivery</strong>
                                    <span>On orders over $100</span>
                                </div>
                            </div>
                            <div className="feature">
                                <FiShield />
                                <div>
                                    <strong>Secure Payment</strong>
                                    <span>100% protected</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
