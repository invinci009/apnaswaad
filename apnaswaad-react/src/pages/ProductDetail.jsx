import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import AnimatedPage from '../components/AnimatedPage';
import ScrollReveal from '../components/ScrollReveal';
import ProductCard from '../components/ProductCard';
import MagneticButton from '../components/MagneticButton';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, wishlist, toggleWishlist } = useCart();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState('description');
    const [isZoomed, setIsZoomed] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        const foundProduct = products.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            navigate('/products');
        }
    }, [id, navigate]);

    // GSAP animations
    useGSAP(() => {
        if (product) {
            gsap.from('.product-detail-content', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.1
            });
        }
    }, [product]);

    if (!product) return null;

    const isInWishlist = wishlist.includes(product.id);
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    // Product images (in real app, would have multiple images)
    const productImages = [product.image, product.image, product.image];

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    return (
        <AnimatedPage>
            <div className="min-h-screen bg-white pt-24 pb-16">
                {/* Breadcrumb */}
                <div className="container mx-auto px-6 mb-8">
                    <motion.nav
                        className="flex items-center space-x-2 text-sm text-gray-600"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Link to="/" className="hover:text-orange-600">Home</Link>
                        <span>/</span>
                        <Link to="/products" className="hover:text-orange-600">Products</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-semibold">{product.name}</span>
                    </motion.nav>
                </div>

                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 mb-16">
                        {/* Product Images */}
                        <div className="product-detail-content">
                            <motion.div
                                className="sticky top-24"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                {/* Main Image */}
                                <motion.div
                                    className="relative overflow-hidden rounded-2xl mb-4 bg-gradient-to-br from-gray-50 to-gray-100"
                                    whileHover={{ scale: isZoomed ? 1 : 1.02 }}
                                >
                                    <motion.img
                                        src={productImages[selectedImage]}
                                        alt={product.name}
                                        className="w-full h-96 object-cover cursor-zoom-in"
                                        onClick={() => setIsZoomed(!isZoomed)}
                                        animate={{ scale: isZoomed ? 1.5 : 1 }}
                                        transition={{ duration: 0.3 }}
                                    />

                                    {/* Wishlist Button */}
                                    <motion.button
                                        onClick={() => toggleWishlist(product.id)}
                                        className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <svg
                                            className={`w-6 h-6 transition-all ${isInWishlist ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-gray-600'
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
                                </motion.div>

                                {/* Thumbnail Gallery */}
                                <div className="grid grid-cols-3 gap-4">
                                    {productImages.map((img, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index
                                                    ? 'border-orange-500 shadow-lg'
                                                    : 'border-transparent hover:border-gray-300'
                                                }`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <img
                                                src={img}
                                                alt={`${product.name} ${index + 1}`}
                                                className="w-full h-24 object-cover"
                                            />
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Product Info */}
                        <div className="product-detail-content">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                {/* Category Badge */}
                                <motion.span
                                    className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {product.category}
                                </motion.span>

                                <h1 className="text-4xl md:text-5xl font-bold mb-4 font-raleway">
                                    {product.name}
                                </h1>

                                {/* Rating */}
                                <div className="flex items-center mb-6">
                                    <div className="flex text-amber-400 mr-2">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-gray-600">(4.9/5 from 127 reviews)</span>
                                </div>

                                {/* Price */}
                                <div className="mb-8">
                                    <div className="text-5xl font-bold gradient-text mb-2">
                                        ₹{product.price}
                                    </div>
                                    <p className="text-gray-600">Per 500g • Fresh daily</p>
                                </div>

                                {/* Description */}
                                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                    {product.description}
                                </p>

                                {/* Flavor Info */}
                                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl mb-8">
                                    <h3 className="font-semibold text-gray-800 mb-2">Flavor Profile:</h3>
                                    <p className="text-gray-700">{product.flavor}</p>
                                </div>

                                {/* Quantity Selector */}
                                <div className="flex items-center space-x-4 mb-8">
                                    <span className="text-gray-700 font-semibold">Quantity:</span>
                                    <div className="flex items-center bg-white border-2 border-gray-200 rounded-full">
                                        <motion.button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-4 py-2 text-gray-600 hover:text-orange-600"
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                            </svg>
                                        </motion.button>
                                        <span className="px-8 py-2 font-bold text-lg">{quantity}</span>
                                        <motion.button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="px-4 py-2 text-gray-600 hover:text-orange-600"
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 mb-8">
                                    <MagneticButton
                                        onClick={handleAddToCart}
                                        className="flex-1 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden"
                                    >
                                        <AnimatePresence mode="wait">
                                            {addedToCart ? (
                                                <motion.span
                                                    key="added"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    className="flex items-center justify-center"
                                                >
                                                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Added to Cart!
                                                </motion.span>
                                            ) : (
                                                <motion.span
                                                    key="add"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                >
                                                    Add to Cart
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </MagneticButton>

                                    <Link to="/cart" className="flex-shrink-0">
                                        <MagneticButton className="px-8 py-4 bg-white border-2 border-orange-500 text-orange-600 rounded-full font-semibold text-lg hover:bg-orange-50 transition-colors">
                                            View Cart
                                        </MagneticButton>
                                    </Link>
                                </div>

                                {/* Trust Badges */}
                                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200">
                                    {[
                                        { icon: '🔒', text: 'Secure Payment' },
                                        { icon: '🚚', text: 'Fast Delivery' },
                                        { icon: '✨', text: 'Quality Assured' }
                                    ].map((badge, index) => (
                                        <div key={index} className="text-center">
                                            <div className="text-2xl mb-1">{badge.icon}</div>
                                            <div className="text-xs text-gray-600">{badge.text}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <ScrollReveal>
                        <div className="mb-16">
                            {/* Tab Headers */}
                            <div className="flex border-b border-gray-200 mb-8">
                                {['description', 'ingredients', 'reviews'].map((tab) => (
                                    <motion.button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-8 py-4 font-semibold relative ${activeTab === tab ? 'text-orange-600' : 'text-gray-600'
                                            }`}
                                        whileHover={{ y: -2 }}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                        {activeTab === tab && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"
                                            />
                                        )}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-gradient-to-br from-gray-50 to-peach-50 p-8 rounded-2xl"
                                >
                                    {activeTab === 'description' && (
                                        <div>
                                            <h3 className="text-2xl font-bold mb-4">About {product.name}</h3>
                                            <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
                                            <p className="text-gray-700 leading-relaxed">
                                                Made with authentic ingredients and traditional methods that have been perfected over generations. Each piece is crafted with care to ensure the perfect balance of sweetness and flavor.
                                            </p>
                                        </div>
                                    )}

                                    {activeTab === 'ingredients' && (
                                        <div>
                                            <h3 className="text-2xl font-bold mb-4">Ingredients</h3>
                                            <ul className="space-y-2">
                                                {['Milk', 'Sugar', 'Ghee (Clarified Butter)', 'Cardamom', 'Saffron', 'Nuts (Almonds, Pistachios)'].map((ingredient, index) => (
                                                    <li key={index} className="flex items-center text-gray-700">
                                                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                                                        {ingredient}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {activeTab === 'reviews' && (
                                        <div>
                                            <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
                                            <div className="space-y-6">
                                                {[
                                                    { name: 'Rahul M.', rating: 5, comment: 'Absolutely delicious! Best quality I\'ve found online.' },
                                                    { name: 'Priya S.', rating: 5, comment: 'Fresh and authentic taste. Will definitely order again!' },
                                                    { name: 'Amit K.', rating: 4, comment: 'Very good quality. Fast delivery. Recommended!' }
                                                ].map((review, index) => (
                                                    <div key={index} className="bg-white p-6 rounded-xl">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <span className="font-semibold">{review.name}</span>
                                                            <div className="flex text-amber-400">
                                                                {[...Array(review.rating)].map((_, i) => (
                                                                    <span key={i}>★</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-700">{review.comment}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </ScrollReveal>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <ScrollReveal>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 font-raleway">
                                    You May Also <span className="gradient-text">Like</span>
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                    {relatedProducts.map((relatedProduct) => (
                                        <ProductCard key={relatedProduct.id} product={relatedProduct} />
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    )}
                </div>
            </div>
        </AnimatedPage>
    );
};

export default ProductDetail;
