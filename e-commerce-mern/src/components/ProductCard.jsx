import { Link } from 'react-router-dom';
import { FiShoppingCart, FiStar, FiHeart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { _id, name, price, image, rating, numReviews, category, stock } = product;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (stock > 0) {
            addToCart(product, 1);
        }
    };

    return (
        <Link to={`/product/${_id}`} className="product-card">
            <div className="product-image-container">
                <img src={image} alt={name} className="product-image" />
                {stock === 0 && (
                    <div className="out-of-stock-badge">Out of Stock</div>
                )}
                <button
                    className="wishlist-btn"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                >
                    <FiHeart />
                </button>
            </div>

            <div className="product-info">
                <span className="product-category">{category}</span>
                <h3 className="product-name">{name}</h3>

                <div className="product-rating">
                    <FiStar className="star-icon" />
                    <span>{rating.toFixed(1)}</span>
                    <span className="reviews-count">({numReviews})</span>
                </div>

                <div className="product-bottom">
                    <span className="product-price">${price.toFixed(2)}</span>
                    <button
                        className="add-to-cart-btn"
                        onClick={handleAddToCart}
                        disabled={stock === 0}
                    >
                        <FiShoppingCart />
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
