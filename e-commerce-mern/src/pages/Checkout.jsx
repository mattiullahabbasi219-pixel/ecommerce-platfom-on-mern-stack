import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';
import './Checkout.css';

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const [shippingData, setShippingData] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

    const subtotal = getCartTotal();
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    const handleShippingChange = (e) => {
        setShippingData({ ...shippingData, [e.target.name]: e.target.value });
    };

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        setError('');

        try {
            const orderItems = cartItems.map(item => ({
                product: item._id,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.quantity
            }));

            const response = await ordersAPI.create({
                orderItems,
                shippingAddress: shippingData,
                paymentMethod
            });

            setOrderId(response.data.order._id);
            setOrderComplete(true);
            clearCart();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (orderComplete) {
        return (
            <div className="checkout-page page">
                <div className="container">
                    <div className="order-success">
                        <div className="success-icon">
                            <FiCheck />
                        </div>
                        <h1>Order Placed Successfully!</h1>
                        <p>Thank you for your order. Your order ID is:</p>
                        <div className="order-id">{orderId}</div>
                        <p>We'll send you an email with the order details.</p>
                        <div className="success-actions">
                            <button className="btn btn-primary" onClick={() => navigate('/orders')}>
                                View My Orders
                            </button>
                            <button className="btn btn-secondary" onClick={() => navigate('/products')}>
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="checkout-page page">
            <div className="container">
                <h1 className="page-title">Checkout</h1>

                {/* Steps */}
                <div className="checkout-steps">
                    <div className={`step ${step >= 1 ? 'active' : ''}`}>
                        <span className="step-number">1</span>
                        <span className="step-label">Shipping</span>
                    </div>
                    <div className="step-line"></div>
                    <div className={`step ${step >= 2 ? 'active' : ''}`}>
                        <span className="step-number">2</span>
                        <span className="step-label">Payment</span>
                    </div>
                    <div className="step-line"></div>
                    <div className={`step ${step >= 3 ? 'active' : ''}`}>
                        <span className="step-number">3</span>
                        <span className="step-label">Review</span>
                    </div>
                </div>

                {error && <div className="alert alert-error">{error}</div>}

                <div className="checkout-layout">
                    <div className="checkout-main">
                        {/* Step 1: Shipping */}
                        {step === 1 && (
                            <div className="checkout-section">
                                <h2>Shipping Address</h2>
                                <form onSubmit={handleShippingSubmit}>
                                    <div className="form-group">
                                        <label className="form-label">Street Address</label>
                                        <input
                                            type="text"
                                            name="street"
                                            value={shippingData.street}
                                            onChange={handleShippingChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="form-label">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={shippingData.city}
                                                onChange={handleShippingChange}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">State</label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={shippingData.state}
                                                onChange={handleShippingChange}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="form-label">ZIP Code</label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                value={shippingData.zipCode}
                                                onChange={handleShippingChange}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Country</label>
                                            <input
                                                type="text"
                                                name="country"
                                                value={shippingData.country}
                                                onChange={handleShippingChange}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg">
                                        Continue to Payment
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Step 2: Payment */}
                        {step === 2 && (
                            <div className="checkout-section">
                                <h2>Payment Method</h2>
                                <div className="payment-options">
                                    {['Cash on Delivery', 'Credit Card', 'PayPal'].map(method => (
                                        <label key={method} className="payment-option">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value={method}
                                                checked={paymentMethod === method}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                            <span className="payment-label">{method}</span>
                                        </label>
                                    ))}
                                </div>
                                <div className="step-actions">
                                    <button className="btn btn-secondary" onClick={() => setStep(1)}>
                                        Back
                                    </button>
                                    <button className="btn btn-primary btn-lg" onClick={() => setStep(3)}>
                                        Review Order
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Review */}
                        {step === 3 && (
                            <div className="checkout-section">
                                <h2>Review Your Order</h2>

                                <div className="review-section">
                                    <h4>Shipping Address</h4>
                                    <p>
                                        {shippingData.street}<br />
                                        {shippingData.city}, {shippingData.state} {shippingData.zipCode}<br />
                                        {shippingData.country}
                                    </p>
                                </div>

                                <div className="review-section">
                                    <h4>Payment Method</h4>
                                    <p>{paymentMethod}</p>
                                </div>

                                <div className="review-section">
                                    <h4>Order Items</h4>
                                    <div className="review-items">
                                        {cartItems.map(item => (
                                            <div key={item._id} className="review-item">
                                                <img src={item.image} alt={item.name} />
                                                <div className="review-item-info">
                                                    <span className="review-item-name">{item.name}</span>
                                                    <span className="review-item-qty">Qty: {item.quantity}</span>
                                                </div>
                                                <span className="review-item-price">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="step-actions">
                                    <button className="btn btn-secondary" onClick={() => setStep(2)}>
                                        Back
                                    </button>
                                    <button
                                        className="btn btn-primary btn-lg"
                                        onClick={handlePlaceOrder}
                                        disabled={loading}
                                    >
                                        {loading ? 'Placing Order...' : 'Place Order'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="checkout-sidebar">
                        <div className="order-summary">
                            <h3>Order Summary</h3>
                            <div className="summary-items">
                                {cartItems.map(item => (
                                    <div key={item._id} className="summary-item">
                                        <span>{item.name} × {item.quantity}</span>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="summary-row">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
