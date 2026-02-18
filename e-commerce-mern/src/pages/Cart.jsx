import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!user) {
            navigate('/login', { state: { from: { pathname: '/checkout' } } });
        } else {
            navigate('/checkout');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-page page">
                <div className="container">
                    <div className="empty-state">
                        <div className="empty-state-icon">🛒</div>
                        <h3 className="empty-state-title">Your cart is empty</h3>
                        <p className="empty-state-text">Looks like you haven't added any items yet.</p>
                        <Link to="/products" className="btn btn-primary">
                            <FiShoppingBag /> Start Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const subtotal = getCartTotal();
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return (
        <div className="cart-page page">
            <div className="container">
                <h1 className="page-title">Shopping Cart</h1>

                <div className="cart-layout">
                    {/* Cart Items */}
                    <div className="cart-items">
                        <div className="cart-header">
                            <span>{cartItems.length} item{cartItems.length > 1 ? 's' : ''} in your cart</span>
                            <button className="clear-cart-btn" onClick={clearCart}>
                                Clear All
                            </button>
                        </div>

                        {cartItems.map(item => (
                            <div key={item._id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />

                                <div className="cart-item-info">
                                    <Link to={`/product/${item._id}`} className="cart-item-name">
                                        {item.name}
                                    </Link>
                                    <span className="cart-item-price">${item.price.toFixed(2)}</span>
                                </div>

                                <div className="cart-item-quantity">
                                    <button
                                        className="qty-btn"
                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                    >
                                        <FiMinus />
                                    </button>
                                    <span className="qty-value">{item.quantity}</span>
                                    <button
                                        className="qty-btn"
                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                        disabled={item.quantity >= item.stock}
                                    >
                                        <FiPlus />
                                    </button>
                                </div>

                                <div className="cart-item-total">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>

                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item._id)}
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="order-summary">
                        <h3>Order Summary</h3>

                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                        </div>

                        <div className="summary-row">
                            <span>Tax (10%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>

                        {subtotal < 100 && (
                            <div className="free-shipping-hint">
                                Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                            </div>
                        )}

                        <div className="summary-row total">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <button className="btn btn-primary btn-lg w-full" onClick={handleCheckout}>
                            Proceed to Checkout <FiArrowRight />
                        </button>

                        <Link to="/products" className="continue-shopping">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
