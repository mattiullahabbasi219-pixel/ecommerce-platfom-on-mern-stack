import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({});
    const [showFilters, setShowFilters] = useState(false);

    const [filters, setFilters] = useState({
        search: searchParams.get('search') || '',
        category: searchParams.get('category') || '',
        sort: searchParams.get('sort') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || ''
    });

    const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Beauty', 'Toys', 'Automotive'];
    const sortOptions = [
        { value: '', label: 'Newest First' },
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
        { value: 'rating', label: 'Top Rated' },
        { value: 'name-asc', label: 'Name: A-Z' }
    ];

    useEffect(() => {
        fetchProducts();
    }, [searchParams]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = {
                search: searchParams.get('search') || '',
                category: searchParams.get('category') || '',
                sort: searchParams.get('sort') || '',
                minPrice: searchParams.get('minPrice') || '',
                maxPrice: searchParams.get('maxPrice') || '',
                page: searchParams.get('page') || 1
            };

            const response = await productsAPI.getAll(params);
            setProducts(response.data.products);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
    };

    const applyFilters = () => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.set(key, value);
        });
        setSearchParams(params);
        setShowFilters(false);
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            category: '',
            sort: '',
            minPrice: '',
            maxPrice: ''
        });
        setSearchParams({});
    };

    const handlePageChange = (page) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page);
        setSearchParams(params);
    };

    const activeFiltersCount = Object.values(filters).filter(v => v).length;

    return (
        <div className="products-page page">
            <div className="container">
                {/* Header */}
                <div className="products-header">
                    <div className="products-header-left">
                        <h1 className="page-title">Products</h1>
                        {pagination.total && (
                            <span className="products-count">{pagination.total} products found</span>
                        )}
                    </div>
                    <button
                        className="btn btn-secondary filter-toggle"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <FiFilter />
                        Filters
                        {activeFiltersCount > 0 && (
                            <span className="filter-badge">{activeFiltersCount}</span>
                        )}
                    </button>
                </div>

                <div className="products-layout">
                    {/* Sidebar Filters */}
                    <aside className={`filters-sidebar ${showFilters ? 'active' : ''}`}>
                        <div className="filters-header">
                            <h3>Filters</h3>
                            <button className="close-filters" onClick={() => setShowFilters(false)}>
                                <FiX />
                            </button>
                        </div>

                        {/* Search */}
                        <div className="filter-group">
                            <label className="filter-label">Search</label>
                            <div className="search-input-wrapper">
                                <FiSearch className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={filters.search}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                    className="form-input"
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div className="filter-group">
                            <label className="filter-label">Category</label>
                            <select
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                className="form-select"
                            >
                                <option value="">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Price Range */}
                        <div className="filter-group">
                            <label className="filter-label">Price Range</label>
                            <div className="price-inputs">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={filters.minPrice}
                                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                    className="form-input"
                                />
                                <span>—</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={filters.maxPrice}
                                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                    className="form-input"
                                />
                            </div>
                        </div>

                        {/* Sort */}
                        <div className="filter-group">
                            <label className="filter-label">Sort By</label>
                            <select
                                value={filters.sort}
                                onChange={(e) => handleFilterChange('sort', e.target.value)}
                                className="form-select"
                            >
                                {sortOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Filter Actions */}
                        <div className="filter-actions">
                            <button className="btn btn-primary w-full" onClick={applyFilters}>
                                Apply Filters
                            </button>
                            <button className="btn btn-secondary w-full" onClick={clearFilters}>
                                Clear All
                            </button>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <main className="products-main">
                        {loading ? (
                            <div className="loading-container">
                                <div className="spinner"></div>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-state-icon">🔍</div>
                                <h3 className="empty-state-title">No products found</h3>
                                <p className="empty-state-text">Try adjusting your filters or search terms.</p>
                                <button className="btn btn-primary" onClick={clearFilters}>
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="products-grid">
                                    {products.map(product => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {pagination.pages > 1 && (
                                    <div className="pagination">
                                        {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                className={`pagination-btn ${page === pagination.page ? 'active' : ''}`}
                                                onClick={() => handlePageChange(page)}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Products;
