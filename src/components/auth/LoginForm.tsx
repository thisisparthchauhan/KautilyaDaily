import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { AuthLayout } from './AuthLayout';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { API_ENDPOINTS } from '@/config/api';

export function LoginForm({ onSignUpClick }: { onSignUpClick: () => void }) {
    const [formData, setFormData] = useState({
        emailOrMobile: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(API_ENDPOINTS.auth.login, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            login(data.token, data.user);
            // Redirect handled by AuthWrapper or logic in App.tsx
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to continue to Kautilya Daily"
        >
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {error && (
                    <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md text-center">
                        {error}
                    </div>
                )}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="emailOrMobile" className="sr-only">Email or Mobile</label>
                        <input
                            id="emailOrMobile"
                            name="emailOrMobile"
                            type="text"
                            required
                            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[rgba(242,242,242,0.1)] placeholder-kau-text-secondary/50 text-kau-text bg-kau-surface focus:outline-none focus:ring-1 focus:ring-kau-accent focus:border-kau-accent sm:text-sm"
                            placeholder="Email or Mobile Number"
                            value={formData.emailOrMobile}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[rgba(242,242,242,0.1)] placeholder-kau-text-secondary/50 text-kau-text bg-kau-surface focus:outline-none focus:ring-1 focus:ring-kau-accent focus:border-kau-accent sm:text-sm pr-10"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-kau-text-secondary hover:text-kau-text"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={cn(
                            "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-kau-bg bg-kau-accent hover:bg-kau-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kau-accent transition-colors",
                            isLoading && "opacity-70 cursor-not-allowed"
                        )}
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-kau-bg text-kau-text-secondary">Or continue with</span>
                    </div>
                </div>

                {/* Google Sign-In Button */}
                <button
                    type="button"
                    onClick={() => {
                        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
                        window.location.href = `${API_URL}/api/auth/google`;
                    }}
                    className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-white/10 rounded-md bg-white hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span className="text-gray-700 font-medium">Sign in with Google</span>
                </button>

                <div className="text-center mt-4">
                    <span className="text-kau-text-secondary text-sm">Don't have an account? </span>
                    <button
                        type="button"
                        onClick={onSignUpClick}
                        className="text-kau-accent hover:underline text-sm font-medium"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </AuthLayout>
    );
}
