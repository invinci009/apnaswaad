import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        localStorage.setItem('apnaswaad_user', JSON.stringify({ email: data.email }));
        if (rememberMe) {
            localStorage.setItem('apnaswaad_rememberMe', 'true');
        } else {
            localStorage.removeItem('apnaswaad_rememberMe');
        }
        setStatus('Login successful!');
        reset();
        setIsLoading(false);
        setTimeout(() => {
            navigate('/');
        }, 1500);
    };

    return (
        <section id="login" className="min-h-screen flex items-center justify-center bg-peach-100 textile-pattern py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl madhubani-border madhubani-bg animate-slideIn">
                    <h2 className="text-3xl font-bold text-indigo-900 font-raleway text-center mb-6">
                        Welcome Back
                    </h2>

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

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Your Password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters'
                                    }
                                })}
                                className="w-full p-3 border rounded focus:ring-2 focus:ring-red-500 font-source-sans"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-indigo-900"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                            </button>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="mr-2"
                                />
                                <label htmlFor="rememberMe" className="text-gray-700 font-source-sans text-sm">
                                    Remember Me
                                </label>
                            </div>
                            <a href="#forgot-password" className="text-red-500 hover:underline text-sm font-source-sans">
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className={`thekua-button text-indigo-900 font-source-sans w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>

                        <div className="text-center font-source-sans">
                            <p className="text-gray-700">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-red-500 hover:underline font-semibold">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
