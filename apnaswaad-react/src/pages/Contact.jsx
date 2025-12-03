import { useForm } from 'react-hook-form';
import { useState } from 'react';

const Contact = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Contact form data:', data);
        setStatus('Message sent successfully!');
        reset();
        setIsLoading(false);
        setTimeout(() => setStatus(''), 3000);
    };

    return (
        <section id="contact" className="py-20 bg-peach-100 textile-pattern min-h-screen">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-indigo-900 font-raleway text-center mb-12 animate-slideIn">
                    Reach Out to Us
                </h2>

                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-bold text-indigo-900 font-raleway mb-6">Get In Touch</h3>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <i className="fas fa-map-marker-alt text-red-500 text-xl mr-4 mt-1"></i>
                                <div>
                                    <h4 className="font-semibold text-indigo-900 font-raleway">Address</h4>
                                    <p className="text-gray-700 font-source-sans">Jamshedpur, Jharkhand, India</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <i className="fas fa-phone-alt text-red-500 text-xl mr-4 mt-1"></i>
                                <div>
                                    <h4 className="font-semibold text-indigo-900 font-raleway">Phone</h4>
                                    <p className="text-gray-700 font-source-sans">+91-8271301179</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <i className="fas fa-envelope text-red-500 text-xl mr-4 mt-1"></i>
                                <div>
                                    <h4 className="font-semibold text-indigo-900 font-raleway">Email</h4>
                                    <p className="text-gray-700 font-source-sans">amaanullah2607@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <i className="fas fa-clock text-red-500 text-xl mr-4 mt-1"></i>
                                <div>
                                    <h4 className="font-semibold text-indigo-900 font-raleway">Business Hours</h4>
                                    <p className="text-gray-700 font-source-sans">Mon - Sat: 9:00 AM - 8:00 PM</p>
                                    <p className="text-gray-700 font-source-sans">Sunday: 10:00 AM - 6:00 PM</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h4 className="font-semibold text-indigo-900 font-raleway mb-3">Follow Us</h4>
                            <div className="flex space-x-4">
                                <a
                                    href="https://www.instagram.com/_.amanullah/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-red-500 hover:text-red-700 text-2xl transition"
                                >
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a
                                    href="https://x.com/amanullah_2607"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-red-500 hover:text-red-700 text-2xl transition"
                                >
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a
                                    href="https://github.com/amaan-exe"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-red-500 hover:text-red-700 text-2xl transition"
                                >
                                    <i className="fab fa-github"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-indigo-100 p-8 rounded-lg shadow-lg madhubani-bg">
                        <h3 className="text-2xl font-bold text-indigo-900 font-raleway mb-6">Send Us a Message</h3>

                        {status && (
                            <p
                                className={`text-center font-source-sans mb-4 p-3 rounded ${status.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}
                            >
                                {status}
                            </p>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    {...register('name', { required: 'Name is required' })}
                                    className="w-full p-3 border rounded focus:ring-2 focus:ring-red-500 font-source-sans"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: 'Enter a valid email address'
                                        }
                                    })}
                                    className="w-full p-3 border rounded focus:ring-2 focus:ring-red-500 font-source-sans"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <textarea
                                    placeholder="Your Message"
                                    {...register('message', { required: 'Message is required' })}
                                    className="w-full p-3 border rounded h-32 focus:ring-2 focus:ring-red-500 font-source-sans resize-none"
                                ></textarea>
                                {errors.message && (
                                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className={`thekua-button text-indigo-900 font-source-sans w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
