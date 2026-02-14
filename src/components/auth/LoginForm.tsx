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
