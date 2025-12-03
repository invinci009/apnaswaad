import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import AnimatedPage from '../components/AnimatedPage';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { staggerContainer, staggerItem } from '../utils/animations';

const Cart = () => {
    const { cartItems, cartCount, cartTotal, removeFromCart, updateQuantity } = useCart();

    // GSAP animation for total price
    useGSAP(() => {
        if (cartTotal > 0) {
            gsap.from('.cart-total-number', {
                innerText: 0,
                duration: 1,
                snap: { innerText: 1 },
                ease: 'power2.out'
            });
        }
    }, [cartTotal]);

    const recommendedProducts = products.filter(p => !cartItems.find(item => item.id === p.id)).slice(0, 4);

    if (cartItems.length === 0) {
        return (
            <AnimatedPage>
                <div className="min-h-screen bg-gradient-to-b from-peach-50 to-white pt-24 pb-16 flex items-center justify-center">
                    <motion.div
                        className="text-center max-w-lg mx-auto px-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="text-9xl mb-6"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            🛒
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-raleway">
                            Your Cart is <span className="gradient-text">Empty</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Looks like you haven't added any sweets yet. Let's change that!
                        </p>
                        <Link to="/products">
                            <MagneticButton className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold text-lg shadow-xl">
                                Start Shopping
                            </MagneticButton>
                        </Link>
                    </motion.div>
                </div>
            </AnimatedPage>
        );
    }

    return (
        <AnimatedPage>
            <div className="min-h-screen bg-gradient-to-b from-peach-50 to-white pt-24 pb-16">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <ScrollReveal>
                        <div className="mb-12">
                            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-raleway">
                                Shopping <span className="gradient-text">Cart</span>
                            </h1>
                            <p className="text-xl text-gray-600">
                                {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <motion.div
                                className="space-y-4"
                                variants={staggerContainer}
                                initial="initial"
                                animate="animate"
                            >
                                <AnimatePresence mode="popLayout">
                                    {cartItems.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            variants={staggerItem}
                                            layout
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{
                                                opacity: 0,
                                                x: 100,
                                                transition: { duration: 0.3 }
                                            }}
                                            drag="x"
                                            dragConstraints={{ left: 0, right: 0 }}
                                            dragElastic={0.2}
                                            onDragEnd={(e, info) => {
                                                if (info.offset.x > 100) {
                                                    removeFromCart(item.id);
                                                }
                                            }}
                                            className="glass-card p-6 rounded-2xl relative overflow-hidden group cursor-grab active:cursor-grabbing"
                                            whileHover={{ scale: 1.01 }}
                                        >
                                            {/* Swipe indicator */}
                                            <motion.div
                                                className="absolute inset-y-0 left-0 bg-red-500 flex items-center px-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                                initial={{ width: 0 }}
                                                animate={{ width: '100%' }}
                                            >
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                <span className="ml-3 text-white font-semibold">Swipe to remove</span>
                                            </motion.div>

                                            <div className="flex items-center gap-6 relative z-10">
                                                {/* Product Image */}
                                                <Link to={`/product/${item.id}`}>
                                                    <motion.div
                                                        className="w-32 h-32 flex-shrink-0 relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100"
                                                        whileHover={{ scale: 1.05 }}
                                                    >
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </motion.div>
                                                </Link>

                                                {/* Product Info */}
                                                <div className="flex-1">
                                                    <Link to={`/product/${item.id}`}>
                                                        <h3 className="text-xl font-bold text-gray-800 mb-1 hover:text-orange-600 transition-colors">
                                                            {item.name}
                                                        </h3>
                                                    </Link>
                                                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-2xl font-bold gradient-text">
                                                            ₹{item.price * item.quantity}
                                                        </div>

                                                        {/* Quantity Controls */}
                                                        <div className="flex items-center bg-white border-2 border-gray-200 rounded-full">
                                                            <motion.button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="px-4 py-2 text-gray-600 hover:text-orange-600"
                                                                whileTap={{ scale: 0.9 }}
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                                </svg>
                                                            </motion.button>
                                                            <motion.span
                                                                key={item.quantity}
                                                                initial={{ scale: 1.5, color: '#f97316' }}
                                                                animate={{ scale: 1, color: '#000' }}
                                                                className="px-6 py-2 font-bold text-lg"
                                                            >
                                                                {item.quantity}
                                                            </motion.span>
                                                            <motion.button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="px-4 py-2 text-gray-600 hover:text-orange-600"
                                                                whileTap={{ scale: 0.9 }}
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                                </svg>
                                                            </motion.button>
                                                        </div>

                                                        {/* Remove Button */}
                                                        <motion.button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="p-3 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                                            whileHover={{ scale: 1.1, rotate: 90 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </div>

                        {/* Cart Summary - Sticky */}
                        <div className="lg:col-span-1">
                            <ScrollReveal>
                                <motion.div
                                    className="glass-card p-8 rounded-2xl sticky top-24"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <h3 className="text-2xl font-bold mb-6 font-raleway">Order Summary</h3>

                                    <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal ({cartCount} items)</span>
                                            <span className="font-semibold">₹{cartTotal}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Shipping</span>
                                            <span className="font-semibold text-green-600">FREE</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Tax (0%)</span>
                                            <span className="font-semibold">₹0</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
                                        <span className="text-xl font-bold">Total</span>
                                        <div className="text-4xl font-bold gradient-text">
                                            ₹<span className="cart-total-number">{cartTotal}</span>
                                        </div>
                                    </div>

                                    {/* Promo Code */}
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            placeholder="Enter promo code"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                                        />
                                        <motion.button
                                            className="w-full mt-3 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Apply Code
                                        </motion.button>
                                    </div>

                                    <MagneticButton className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow">
                                        Proceed to Checkout
                                    </MagneticButton>

                                    {/* Trust Badges */}
                                    <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                                        {[
                                            { icon: '🔒', text: 'Secure' },
                                            { icon: '🚚', text: 'Fast Ship' },
                                            { icon: '💰', text: 'Best Price' }
                                        ].map((badge, index) => (
                                            <div key={index} className="text-center">
                                                <div className="text-2xl mb-1">{badge.icon}</div>
                                                <div className="text-xs text-gray-600">{badge.text}</div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </ScrollReveal>
                        </div>
                    </div>

                    {/* Recommended Products */}
                    {recommendedProducts.length > 0 && (
                        <div className="mt-16">
                            <ScrollReveal>
                                <h2 className="text-4xl md:text-5xl font-bold mb-8 font-raleway">
                                    You May Also <span className="gradient-text">Like</span>
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                    {recommendedProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </ScrollReveal>
                        </div>
                    )}
                </div>
            </div>
        </AnimatedPage>
    );
};

export default Cart;
