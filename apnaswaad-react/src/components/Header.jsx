import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = ({ searchQuery, setSearchQuery }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    const { cartItems, cartCount, cartTotal, removeFromCart, updateQuantity } = useCart();

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(searchInput);
        navigate('/products');
    };

    return (
        <header className="fixed top-0 left-0 w-full custom-header-bg z-50 shadow-lg">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo */}
                <Link to="/" className="group flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                        <span className="text-2xl">🍬</span>
                    </div>
                    <h1 className="text-2xl font-bold gradient-text font-raleway animate-slide-in">
                        Apna Sawaad
                    </h1>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6 items-center">
                    {['Home', 'Products', 'Cart', 'About', 'Contact'].map((page, index) => (
                        <Link
                            key={page}
                            to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
                            onClick={() => setSearchQuery('')}
                            className="nav-link text-gray-700 font-semibold hover:text-orange-600 transition-colors duration-200 animate-slide-in"
                            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                        >
                            {page}
                        </Link>
                    ))}

                    {/* Enhanced Search Bar */}
                    <form onSubmit={handleSearch} className="relative group">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search sweets..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="w-64 pl-10 pr-4 py-2 rounded-full border-2 border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                            />
                            <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </form>

                    {/* Login/Signup */}
                    <Link
                        to="/login"
                        className="px-4 py-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="px-6 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full font-semibold hover:shadow-glow transition-all duration-300 hover:scale-105"
                    >
                        Sign Up
                    </Link>
                </nav>

                {/* Cart and Mobile Menu */}
                <div className="flex items-center space-x-4">
                    {/* Enhanced Cart Button */}
                    <div className="relative">
                        <button
                            onClick={() => setIsCartOpen(!isCartOpen)}
                            className="relative p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group"
                        >
                            <svg className="w-6 h-6 text-gray-700 group-hover:text-orange-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Modern Cart Dropdown */}
                        <div className={`cart-dropdown absolute right-0 mt-4 w-96 glass-card p-6 ${isCartOpen ? '' : 'hidden'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-800 font-raleway">Shopping Cart</h3>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {cartItems.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-500 font-medium">Your cart is empty</p>
                                    <Link
                                        to="/products"
                                        onClick={() => setIsCartOpen(false)}
                                        className="inline-block mt-4 thekua-button text-sm"
                                    >
                                        Start Shopping
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <div className="max-h-80 overflow-y-auto custom-scrollbar space-y-4">
                                        {cartItems.map((item, index) => (
                                            <div
                                                key={item.id}
                                                className="flex items-start space-x-3 p-3 bg-white rounded-xl hover:shadow-md transition-shadow animate-slide-in"
                                                style={{ animationDelay: `${index * 0.1}s` }}
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/64'; }}
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-gray-800 truncate">{item.name}</h4>
                                                    <p className="text-sm text-gray-500">₹{item.price}</p>
                                                    <div className="flex items-center space-x-2 mt-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full hover:bg-orange-100 transition-colors"
                                                        >
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                                                            </svg>
                                                        </button>
                                                        <span className="text-sm font-semibold w-8 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full hover:bg-orange-100 transition-colors"
                                                        >
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="ml-auto text-red-400 hover:text-red-600 transition-colors"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="font-bold text-gray-800">₹{item.price * item.quantity}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-gray-200">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-gray-600 font-medium">Subtotal</span>
                                            <span className="text-2xl font-bold gradient-text">₹{cartTotal}</span>
                                        </div>
                                        <Link
                                            to="/cart"
                                            onClick={() => setIsCartOpen(false)}
                                            className="thekua-button w-full text-center block"
                                        >
                                            View Cart & Checkout
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden glass-card border-t border-gray-200">
                    <div className="px-4 py-4 space-y-2">
                        {['Home', 'Products', 'Cart', 'About', 'Contact', 'Login', 'Signup'].map((page, index) => (
                            <Link
                                key={page}
                                to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    setSearchQuery('');
                                }}
                                className="block px-4 py-3 rounded-lg hover:bg-orange-50 font-medium text-gray-700 hover:text-orange-600 transition-colors animate-slide-in"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                {page}
                            </Link>
                        ))}

                        <form onSubmit={handleSearch} className="pt-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search sweets..."
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                                />
                                <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
