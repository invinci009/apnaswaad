import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import AnimatedPage from '../components/AnimatedPage';
import ScrollReveal from '../components/ScrollReveal';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { staggerContainer, staggerItem } from '../utils/animations';

const Products = ({ searchQuery }) => {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('featured');
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // grid or list

    const categories = ['all', ...new Set(products.map(p => p.category))];

    // Filter and sort products
    useEffect(() => {
        let result = products;

        // Category filter
        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Search filter
        if (searchQuery) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Price filter
        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // Sort
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                // featured - keep original order
                break;
        }

        setFilteredProducts(result);
    }, [selectedCategory, searchQuery, sortBy, priceRange]);

    // GSAP animations
    useGSAP(() => {
        gsap.from('.filter-sidebar', {
            x: -100,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        });
    }, []);

    return (
        <AnimatedPage>
            <div className="min-h-screen bg-gradient-to-b from-peach-50 to-white pt-24 pb-16">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <ScrollReveal>
                        <div className="mb-12">
                            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-raleway">
                                Our <span className="gradient-text">Collection</span>
                            </h1>
                            <p className="text-xl text-gray-600">
                                Explore our wide range of authentic Indian sweets
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Mobile Filter Toggle */}
                    <div className="md:hidden mb-6">
                        <motion.button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="w-full px-6 py-3 bg-white rounded-xl shadow-lg flex items-center justify-between"
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="font-semibold flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                Filters
                            </span>
                            <motion.svg
                                className="w-5 h-5"
                                animate={{ rotate: isFilterOpen ? 180 : 0 }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </motion.svg>
                        </motion.button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Filter Sidebar */}
                        <AnimatePresence>
                            {(isFilterOpen || window.innerWidth >= 768) && (
                                <motion.aside
                                    className="filter-sidebar w-full md:w-64 flex-shrink-0"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="glass-card p-6 rounded-2xl sticky top-24">
                                        <h3 className="text-xl font-bold mb-6 font-raleway">Filters</h3>

                                        {/* Categories */}
                                        <div className="mb-8">
                                            <h4 className="font-semibold mb-4 text-gray-700">Category</h4>
                                            <div className="space-y-2">
                                                {categories.map((category) => (
                                                    <motion.button
                                                        key={category}
                                                        onClick={() => setSelectedCategory(category)}
                                                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedCategory === category
                                                                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                            }`}
                                                        whileHover={{ x: 4 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Price Range */}
                                        <div className="mb-8">
                                            <h4 className="font-semibold mb-4 text-gray-700">Price Range</h4>
                                            <div className="space-y-4">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="500"
                                                    value={priceRange[1]}
                                                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                                    className="w-full accent-orange-500"
                                                />
                                                <div className="flex justify-between text-sm text-gray-600">
                                                    <span>₹0</span>
                                                    <span className="font-semibold text-orange-600">₹{priceRange[1]}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Reset Filters */}
                                        <motion.button
                                            onClick={() => {
                                                setSelectedCategory('all');
                                                setPriceRange([0, 500]);
                                                setSortBy('featured');
                                            }}
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:border-orange-500 hover:text-orange-600 transition-colors"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Reset Filters
                                        </motion.button>
                                    </div>
                                </motion.aside>
                            )}
                        </AnimatePresence>

                        {/* Products Grid */}
                        <div className="flex-1">
                            {/* Toolbar */}
                            <motion.div
                                className="flex flex-wrap items-center justify-between mb-8 gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="text-gray-600">
                                    <span className="font-semibold text-gray-800">{filteredProducts.length}</span> products found
                                </div>

                                <div className="flex items-center gap-4">
                                    {/* View Mode Toggle */}
                                    <div className="flex bg-white rounded-lg shadow-md p-1">
                                        <motion.button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-600'}`}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                            </svg>
                                        </motion.button>
                                        <motion.button
                                            onClick={() => setViewMode('list')}
                                            className={`p-2 rounded ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-600'}`}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                            </svg>
                                        </motion.button>
                                    </div>

                                    {/* Sort Dropdown */}
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-4 py-2 bg-white rounded-lg shadow-md border-none outline-none cursor-pointer"
                                    >
                                        <option value="featured">Featured</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="name">Name: A-Z</option>
                                    </select>
                                </div>
                            </motion.div>

                            {/* Products */}
                            <AnimatePresence mode="wait">
                                {filteredProducts.length > 0 ? (
                                    <motion.div
                                        key={viewMode}
                                        className={`grid gap-8 ${viewMode === 'grid'
                                                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                                : 'grid-cols-1'
                                            }`}
                                        variants={staggerContainer}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                    >
                                        {filteredProducts.map((product, index) => (
                                            <motion.div
                                                key={product.id}
                                                variants={staggerItem}
                                                layout
                                            >
                                                <ProductCard product={product} viewMode={viewMode} />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="text-center py-20"
                                    >
                                        <div className="text-6xl mb-4">🔍</div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
                                        <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
                                        <motion.button
                                            onClick={() => {
                                                setSelectedCategory('all');
                                                setPriceRange([0, 500]);
                                            }}
                                            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Clear Filters
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default Products;
