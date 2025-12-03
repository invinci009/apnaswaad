import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedPage from '../components/AnimatedPage';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { staggerContainer, staggerItem } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const { recentlyViewed } = useCart();
    const heroRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Parallax mouse move effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 20;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // GSAP Scroll Animations
    useGSAP(() => {
        // Features Section
        gsap.from('.feature-card', {
            scrollTrigger: {
                trigger: '.features-section',
                start: 'top 80%',
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Stats Counter Animation
        const stats = gsap.utils.toArray('.stat-number');
        stats.forEach(stat => {
            const target = stat.getAttribute('data-target');
            gsap.to(stat, {
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 90%',
                },
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: 'power1.out'
            });
        });

        // Testimonials fade-in
        gsap.from('.testimonial-card', {
            scrollTrigger: {
                trigger: '.testimonials-section',
                start: 'top 75%',
            },
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.4)'
        });
    }, []);

    const featuredProducts = products.slice(0, 8);
    const recentProducts = recentlyViewed.map(id => products.find(p => p.id === id)).filter(Boolean);

    return (
        <AnimatedPage>
            {/* Hero Section - Full Screen with Parallax */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-peach-100 to-red-50">
                {/* Animated Background Elements */}
                <motion.div
                    className="absolute inset-0 opacity-30"
                    style={{
                        x: mousePosition.x,
                        y: mousePosition.y
                    }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                >
                    <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full blur-3xl opacity-40"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-300 rounded-full blur-3xl opacity-40"></div>
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-300 rounded-full blur-3xl opacity-30"></div>
                </motion.div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Hero Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="inline-block mb-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
                            >
                                <span className="text-orange-600 font-semibold text-sm">✨ Premium Indian Sweets</span>
                            </motion.div>

                            <motion.h1
                                className="text-6xl md:text-7xl font-bold mb-6 font-raleway"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <span className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent">
                                    Apna Sawaad
                                </span>
                            </motion.h1>

                            <motion.p
                                className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                Experience the authentic taste of traditional Indian mithai, crafted with love and delivered fresh to your doorstep.
                            </motion.p>

                            <motion.div
                                className="flex flex-wrap gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1 }}
                            >
                                <Link to="/products">
                                    <MagneticButton className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow">
                                        Shop Now
                                    </MagneticButton>
                                </Link>
                                <Link to="/about">
                                    <MagneticButton className="px-8 py-4 bg-white text-gray-800 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow">
                                        Learn More
                                    </MagneticButton>
                                </Link>
                            </motion.div>

                            {/* Stats */}
                            <motion.div
                                className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                            >
                                {[
                                    { label: 'Products', value: '20+' },
                                    { label: 'Customers', value: '1000+' },
                                    { label: 'Rating', value: '4.9' }
                                ].map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-3xl font-bold text-orange-600 mb-1">{stat.value}</div>
                                        <div className="text-sm text-gray-600">{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Hero Image */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <motion.div
                                className="relative z-10"
                                animate={{
                                    y: [0, -20, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    {products.slice(0, 4).map((product, index) => (
                                        <motion.div
                                            key={product.id}
                                            className="glass-card p-4 rounded-2xl"
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1 + index * 0.1 }}
                                            whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                                        >
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-40 object-cover rounded-xl mb-3"
                                            />
                                            <h4 className="font-semibold text-gray-800 text-sm">{product.name}</h4>
                                            <p className="text-orange-600 font-bold">₹{product.price}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Decorative circles */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-orange-400 to-red-400 rounded-full opacity-20 blur-2xl"></div>
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-pink-400 to-red-400 rounded-full opacity-20 blur-2xl"></div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                        <motion.div
                            className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"
                            animate={{ y: [0, 16, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="features-section py-24 bg-white">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-raleway">
                            Why Choose <span className="gradient-text">Apna Sawaad</span>
                        </h2>
                        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
                            We bring you authentic Indian sweets made with traditional recipes and premium ingredients
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "🌾",
                                title: "100% Authentic",
                                description: "Traditional recipes passed down through generations, made with love and care"
                            },
                            {
                                icon: "⚡",
                                title: "Fresh Daily",
                                description: "All sweets are prepared fresh daily to ensure the best quality and taste"
                            },
                            {
                                icon: "🚚",
                                title: "Fast Delivery",
                                description: "Get your favorite sweets delivered fresh to your doorstep within hours"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="feature-card glass-card p-8 rounded-2xl text-center group hover:shadow-2xl transition-shadow cursor-pointer"
                                whileHover={{ y: -10 }}
                            >
                                <div className="text-6xl mb-4 inline-block">{feature.icon}</div>
                                <h3 className="text-2xl font-bold mb-3 font-raleway group-hover:text-orange-600 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products - Animated Grid */}
            <section className="py-24 bg-gradient-to-b from-white to-peach-50">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-4 font-raleway">
                                    <span className="gradient-text">Featured</span> Sweets
                                </h2>
                                <p className="text-gray-600">Handpicked favorites for you</p>
                            </div>
                            <Link to="/products">
                                <MagneticButton className="px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors">
                                    View All →
                                </MagneticButton>
                            </Link>
                        </div>
                    </ScrollReveal>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {featuredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                variants={staggerItem}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Stats Section - Animated Counters */}
            <section className="py-24 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { number: 10000, suffix: '+', label: 'Happy Customers' },
                            { number: 50000, suffix: '+', label: 'Sweets Sold' },
                            { number: 20, suffix: '+', label: 'Varieties' },
                            { number: 5, suffix: ' Years', label: 'Experience' }
                        ].map((stat, index) => (
                            <ScrollReveal key={index} delay={index * 0.1}>
                                <div>
                                    <div className="text-5xl md:text-6xl font-bold mb-2">
                                        <span className="stat-number" data-target={stat.number}>0</span>
                                        {stat.suffix}
                                    </div>
                                    <div className="text-white/90">{stat.label}</div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials-section py-24 bg-white">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-raleway">
                            What Our <span className="gradient-text">Customers</span> Say
                        </h2>
                        <p className="text-center text-gray-600 mb-16">
                            Don't just take our word for it
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Priya Sharma",
                                rating: 5,
                                text: "Best quality sweets! Reminds me of my grandmother's homemade treats. Absolutely authentic!",
                                image: "👩"
                            },
                            {
                                name: "Rajesh Kumar",
                                rating: 5,
                                text: "Fast delivery and amazing taste. Perfect for gifting during festivals. Highly recommended!",
                                image: "👨"
                            },
                            {
                                name: "Anita Patel",
                                rating: 5,
                                text: "Fresh and delicious every time. The packaging is also very elegant. Will order again!",
                                image: "👩‍🦰"
                            }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="testimonial-card glass-card p-8 rounded-2xl"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="text-4xl mr-4">{testimonial.image}</div>
                                    <div>
                                        <h4 className="font-bold text-lg">{testimonial.name}</h4>
                                        <div className="flex text-amber-400">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <span key={i}>★</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic leading-relaxed">
                                    "{testimonial.text}"
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recently Viewed */}
            {recentProducts.length > 0 && (
                <section className="py-24 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <ScrollReveal>
                            <h2 className="text-4xl md:text-5xl font-bold mb-12 font-raleway">
                                <span className="gradient-text">Recently</span> Viewed
                            </h2>
                        </ScrollReveal>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {recentProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-orange-50 to-red-50 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 font-raleway">
                            Ready to Experience <br />
                            <span className="gradient-text">Authentic Sweetness?</span>
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Order now and get your favorite sweets delivered fresh to your doorstep
                        </p>
                        <Link to="/products">
                            <MagneticButton className="px-10 py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold text-xl shadow-2xl">
                                Start Shopping →
                            </MagneticButton>
                        </Link>
                    </ScrollReveal>
                </div>

                {/* Background decoration */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-orange-300 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-300 rounded-full blur-3xl"></div>
                </div>
            </section>
        </AnimatedPage>
    );
};

export default Home;
