import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const password = watch('password');

    const onSubmit = async (data) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        localStorage.setItem(
            'apnaswaad_user',
            JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone
            })
        );
        setStatus('Sign up successful!');
        reset();
        setIsLoading(false);
        setTimeout(() => {
            navigate('/login');
        }, 1500);
    };

    return (
        <section id="signup" className="min-h-screen flex items-center justify-center bg-peach-100 textile-pattern py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl madhubani-border madhubani-bg animate-slideIn">
                    <h2 className="text-3xl font-bold text-indigo-900 font-raleway text-center mb-6">
                        Join Apna Sawaad
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
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    {...register('firstName', { required: 'First name is required' })}
                                    className="w-full p-3 border rounded focus:ring-2 focus:ring-red-500 font-source-sans"
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    {...register('lastName', { required: 'Last name is required' })}
                                    className="w-full p-3 border rounded focus:ring-2 focus:ring-red-500 font-source-sans"
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                                )}
                            </div>
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
                            <input
                                type="tel"
                                placeholder="Phone Number (10 digits)"
                                {...register('phone', {
                                    required: 'Phone number is required',
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: 'Enter a valid 10-digit phone number'
                                    }
                                })}
                                className="w-full p-3 border rounded focus:ring-2 focus:ring-red-500 font-source-sans"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
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
                                    },
                                    pattern: {
                                        value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
                                        message: 'Password must include a number and a special character'
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

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                {...register('confirmPassword', {
                                    required: 'Please confirm your password',
                                    validate: (value) => value === password || 'Passwords do not match'
                                })}
                                className="w-full p-3 border rounded focus:ring-2 focus:ring-red-500 font-source-sans"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className={`thekua-button text-indigo-900 font-source-sans w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing up...' : 'Sign Up'}
                        </button>

                        <div className="text-center font-source-sans">
                            <p className="text-gray-700">
                                Already have an account?{' '}
                                <Link to="/login" className="text-red-500 hover:underline font-semibold">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Signup;
