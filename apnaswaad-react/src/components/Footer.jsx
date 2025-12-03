import { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            // Save to localStorage
            const subscribers = JSON.parse(localStorage.getItem('apnaswaad_subscribers') || '[]');
            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem('apnaswaad_subscribers', JSON.stringify(subscribers));
            }
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
            {/* Decorative top wave */}
            <div className="absolute top-0 left-0 right-0">
                <svg className="w-full h-16 text-peach-100" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>
            </div>

            <div className="container mx-auto px-6 pt-24 pb-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center shadow-glow">
                                <span className="text-3xl">🍬</span>
                            </div>
                            <h3 className="text-2xl font-bold font-raleway gradient-text">Apna Sawaad</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                            Bringing authentic Indian sweets to your doorstep. Made with love, tradition, and the finest ingredients.
                        </p>

                        {/* Social Media */}
                        <div className="flex space-x-3">
                            {[
                                { icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z", label: "Facebook" },
                                { icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z", label: "Twitter" },
                                { icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z", label: "Instagram", circle: "M4 4h.01" }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="p-2.5 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 transition-all duration-300 hover:shadow-glow hover:scale-110 group"
                                    aria-label={social.label}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                                        {social.circle && <circle cx="4" cy="4" r="1" fill="currentColor" />}
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold font-raleway mb-4 text-orange-400">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'Products', 'About', 'Contact'].map((link) => (
                                <li key={link}>
                                    <Link
                                        to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                                        className="text-gray-400 hover:text-white hover:translate-x-1 inline-flex items-center transition-all duration-200 group"
                                    >
                                        <svg className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-bold font-raleway mb-4 text-orange-400">Support</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm">support@apnaswaad.com</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-sm">+91 1234567890</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-sm">Jamshedpur, Jharkhand, India</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-bold font-raleway mb-4 text-orange-400">Stay Updated</h4>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to get special offers and updates!
                        </p>

                        <form onSubmit={handleSubscribe} className="space-y-3">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 transition-all outline-none text-white placeholder-gray-400"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg font-semibold hover:shadow-glow transition-all duration-300 hover:scale-105"
                            >
                                Subscribe
                            </button>

                            {subscribed && (
                                <p className="text-green-400 text-sm animate-slide-in flex items-center space-x-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Thank you for subscribing!</span>
                                </p>
                            )}
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Apna Sawaad. All rights reserved.
                        </p>

                        <div className="flex items-center space-x-6 text-gray-400 text-sm">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Shipping Policy</a>
                        </div>

                        <div className="flex flex-col items-center md:items-end">
                            <p className="text-gray-400 text-xs">Made with ❤️ by</p>
                            <a
                                href="https://www.instagram.com/_.amanullah/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
                            >
                                Md Amanullah
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative gradient orbs */}
            <div className="absolute top-20 -right-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
        </footer>
    );
};

export default Footer;
