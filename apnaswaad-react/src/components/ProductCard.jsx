import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, viewMode = 'grid' }) => {
    const { addToCart, wishlist, toggleWishlist, viewProduct } = useCart();

    const isInWishlist = wishlist.includes(product.id);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product.id);
    };

    const handleClick = () => {
        viewProduct(product.id);
    };

    if (viewMode === 'list') {
        return (
            <Link to={`/product/${product.id}`} onClick={handleClick}>
                <motion.div
                    className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow group"
                    whileHover={{ y: -4 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="w-40 h-40 flex-shrink-0 relative overflow-hidden rounded-xl">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>

                    <div className="flex-1">
                        <div className="mb-2">
                            <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full">
                                {product.category}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                            {product.name}
                        </h3>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <div className="flex items-center justify-between">
                            <div className="text-3xl font-bold gradient-text">
                                ₹{product.price}
                            </div>
                            <div className="flex gap-2">
                                <motion.button
                                    onClick={handleWishlistToggle}
                                    className="p-3 bg-gray-100 rounded-full hover:bg-red-50 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <svg
                                        className={`w-5 h-5 transition-all ${isInWishlist ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-gray-600'
                                            }`}
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </motion.button>
                                <motion.button
                                    onClick={handleAddToCart}
                                    className="px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Add to Cart
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Link>
        );
    }

    // Grid view (default)
    return (
        <Link to={`/product/${product.id}`} onClick={handleClick}>
            <motion.div
                className="product-card group cursor-pointer overflow-hidden"
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                {/* Product Image Container */}
                <div className="relative overflow-hidden group/image">
                    <div className="aspect-w-4 aspect-h-3 relative bg-gradient-to-br from-gray-50 to-gray-100">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                                e.target.src = '/items/placeholder.jpg';
                            }}
                            loading="lazy"
                        />

                        {/* Overlay with flavor on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white text-sm font-raleway font-semibold mb-1">Flavor Profile</p>
                                <p className="text-white/90 text-sm">{product.flavor}</p>
                            </div>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-orange-600 rounded-full shadow-md">
                                {product.category}
                            </span>
                        </div>

                        {/* Wishlist Button */}
                        <motion.button
                            onClick={handleWishlistToggle}
                            className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300 group/wishlist"
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg
                                className={`w-5 h-5 transition-all duration-300 ${isInWishlist
                                        ? 'fill-red-500 stroke-red-500'
                                        : 'fill-none stroke-gray-600 group-hover/wishlist:stroke-red-500'
                                    }`}
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        </motion.button>

                        {/* Quick View Badge */}
                        <motion.div
                            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                            initial={{ y: 20 }}
                            whileHover={{ y: 0 }}
                        >
                            <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-700 shadow-lg">
                                View Details →
                            </span>
                        </motion.div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                    <div className="mb-3">
                        <h3 className="text-xl font-bold text-gray-800 font-raleway mb-1 group-hover:text-orange-600 transition-colors">
                            {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold gradient-text">
                                ₹{product.price}
                            </p>
                            <p className="text-xs text-gray-400">per 500g</p>
                        </div>

                        <motion.button
                            onClick={handleAddToCart}
                            className="group/btn relative px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl font-semibold shadow-md hover:shadow-glow transition-all duration-300 hover:scale-105 overflow-hidden"
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10 flex items-center space-x-2">
                                <svg className="w-5 h-5 transform group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="hidden sm:inline">Add</span>
                            </span>

                            {/* Shimmer effect */}
                            <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                            </div>
                        </motion.button>
                    </div>
                </div>

                {/* Decorative bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </motion.div>
        </Link>
    );
};

export default ProductCard;
