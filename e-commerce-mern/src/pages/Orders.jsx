import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiEye } from 'react-icons/fi';
import { ordersAPI } from '../services/api';
import './Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await ordersAPI.getAll();
                setOrders(response.data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Pending': return 'badge-warning';
            case 'Processing': return 'badge-primary';
            case 'Shipped': return 'badge-primary';
            case 'Delivered': return 'badge-success';
            case 'Cancelled': return 'badge-error';
            default: return '';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
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

    return (
        <div className="orders-page page">
            <div className="container">
                <h1 className="page-title">My Orders</h1>

                {orders.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📦</div>
                        <h3 className="empty-state-title">No orders yet</h3>
                        <p className="empty-state-text">When you make a purchase, your orders will appear here.</p>
                        <Link to="/products" className="btn btn-primary">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map(order => (
                            <div key={order._id} className="order-card">
                                <div className="order-header">
                                    <div className="order-info">
                                        <span className="order-id">Order #{order._id.slice(-8).toUpperCase()}</span>
                                        <span className="order-date">{formatDate(order.createdAt)}</span>
                                    </div>
                                    <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>

                                <div className="order-items">
                                    {order.orderItems.slice(0, 3).map((item, index) => (
                                        <img
                                            key={index}
                                            src={item.image}
                                            alt={item.name}
                                            className="order-item-thumb"
                                        />
                                    ))}
                                    {order.orderItems.length > 3 && (
                                        <div className="more-items">
                                            +{order.orderItems.length - 3}
                                        </div>
                                    )}
                                </div>

                                <div className="order-footer">
                                    <div className="order-total">
                                        <span>Total:</span>
                                        <strong>${order.totalPrice.toFixed(2)}</strong>
                                    </div>
                                    <Link to={`/orders/${order._id}`} className="btn btn-secondary btn-sm">
                                        <FiEye /> View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
