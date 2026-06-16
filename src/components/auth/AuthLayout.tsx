import { type ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-kau-bg px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 kau-card p-8 shadow-card">
                <div className="text-center">
                    <h2 className="mt-2 text-3xl font-bold font-heading text-kau-text">
                        {title}
                    </h2>
                    <p className="mt-2 text-sm text-kau-text-secondary">
                        {subtitle}
                    </p>
                </div>
                {children}
            </div>
        </div>
    );
}
