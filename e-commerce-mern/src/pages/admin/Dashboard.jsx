import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiShoppingBag, FiUsers, FiDollarSign, FiTrendingUp, FiBox, FiAlertCircle } from 'react-icons/fi';
import { ordersAPI, usersAPI, productsAPI } from '../../services/api';
import './Admin.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        deliveredOrders: 0,
        totalRevenue: 0,
        totalUsers: 0,
        totalProducts: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [ordersRes, orderStatsRes, userStatsRes, productsRes] = await Promise.all([
                    ordersAPI.getAll(),
                    ordersAPI.getStats(),
                    usersAPI.getStats(),
                    productsAPI.getAll({ limit: 1 })
                ]);

                setRecentOrders(ordersRes.data.orders.slice(0, 5));

                setStats({
                    totalOrders: orderStatsRes.data.stats.totalOrders,
                    pendingOrders: orderStatsRes.data.stats.pendingOrders,
                    deliveredOrders: orderStatsRes.data.stats.deliveredOrders,
                    totalRevenue: orderStatsRes.data.stats.totalRevenue,
                    totalUsers: userStatsRes.data.stats.totalUsers,
                    totalProducts: productsRes.data.pagination.total
                });
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
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

    if (loading) {
        return (
            <div className="admin-page page">
                <div className="loading-container">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page page">
            <div className="container">
                <div className="admin-header">
                    <h1 className="page-title">Admin Dashboard</h1>
                    <p className="page-subtitle">Welcome back! Here's what's happening with your store.</p>
                </div>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon revenue">
                            <FiDollarSign />
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">Total Revenue</span>
                            <span className="stat-value">${stats.totalRevenue.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon orders">
                            <FiShoppingBag />
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">Total Orders</span>
                            <span className="stat-value">{stats.totalOrders}</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon products">
                            <FiBox />
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">Products</span>
                            <span className="stat-value">{stats.totalProducts}</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon users">
                            <FiUsers />
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">Total Users</span>
                            <span className="stat-value">{stats.totalUsers}</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="admin-section">
                    <h2>Quick Actions</h2>
                    <div className="quick-actions">
                        <Link to="/admin/products" className="action-card">
                            <FiPackage />
                            <span>Manage Products</span>
                        </Link>
                        <Link to="/admin/orders" className="action-card">
                            <FiShoppingBag />
                            <span>View Orders</span>
                        </Link>
                        <Link to="/admin/users" className="action-card">
                            <FiUsers />
                            <span>Manage Users</span>
                        </Link>
                    </div>
                </div>

                {/* Pending Orders Alert */}
                {stats.pendingOrders > 0 && (
                    <div className="alert-banner">
                        <FiAlertCircle />
                        <span>You have <strong>{stats.pendingOrders}</strong> pending orders that need attention.</span>
                        <Link to="/admin/orders" className="btn btn-sm btn-primary">View Orders</Link>
                    </div>
                )}

                {/* Recent Orders */}
                <div className="admin-section">
                    <div className="section-header">
                        <h2>Recent Orders</h2>
                        <Link to="/admin/orders" className="see-all-link">View All</Link>
                    </div>

                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map(order => (
                                    <tr key={order._id}>
                                        <td>#{order._id.slice(-8).toUpperCase()}</td>
                                        <td>{order.user?.name || 'N/A'}</td>
                                        <td>{order.orderItems.length} items</td>
                                        <td>${order.totalPrice.toFixed(2)}</td>
                                        <td>
                                            <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
