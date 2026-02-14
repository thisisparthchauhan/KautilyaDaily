import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/sections/HeroSection';
import { FeaturedStorySection } from '@/sections/FeaturedStorySection';
import { MarketSnapshotSection } from '@/sections/MarketSnapshotSection';
import { SectorGridSection } from '@/sections/SectorGridSection';
import { TrendingNowSection } from '@/sections/TrendingNowSection';
import { InFocusSection } from '@/sections/InFocusSection';
import { BriefingSection } from '@/sections/BriefingSection';
import { GlobalPulseSection } from '@/sections/GlobalPulseSection';
import { ProToolsSection } from '@/sections/ProToolsSection';
import { ContributorSection } from '@/sections/ContributorSection';
import { NewsletterSection } from '@/sections/NewsletterSection';
import { FooterSection } from '@/sections/FooterSection';

import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { ProfilePage } from '@/pages/ProfilePage';
import { AdminDashboard } from '@/pages/AdminDashboard';

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const [currentView, setCurrentView] = useState<'home' | 'profile' | 'admin' | null>(null);
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);

  useEffect(() => {
    // Determine initial view based on URL path (basic internal routing)
    const path = window.location.pathname;
    if (path === '/admin') setCurrentView('admin');
    else if (path === '/profile') setCurrentView('profile');
    else setCurrentView('home');
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setAuthModal(null);
    }
  }, [isAuthenticated]);

  // Handle routing
  if (currentView === 'admin' && isAuthenticated && user?.role === 'admin') {
    return <AdminDashboard />;
  }

  if (currentView === 'profile' && isAuthenticated) {
    return (
      <div className="relative">
        <Navigation
          onAuthClick={() => setAuthModal('login')}
          onProfileClick={() => setCurrentView('profile')}
          onHomeClick={() => setCurrentView('home')}
        />
        <ProfilePage />
      </div>
    );
  }

  if (authModal === 'login') {
    return (
      <div className="relative">
        <button
          onClick={() => setAuthModal(null)}
          className="absolute top-4 right-4 text-kau-text z-50 p-2 hover:bg-white/10 rounded-full"
        >
          Close
        </button>
        <LoginForm onSignUpClick={() => setAuthModal('signup')} />
      </div>
    );
  }

  if (authModal === 'signup') {
    return (
      <div className="relative">
        <button
          onClick={() => setAuthModal(null)}
          className="absolute top-4 right-4 text-kau-text z-50 p-2 hover:bg-white/10 rounded-full"
        >
          Close
        </button>
        <SignUpForm onLoginClick={() => setAuthModal('login')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kau-bg text-kau-text selection:bg-kau-accent selection:text-kau-bg">
      <Navigation
        onAuthClick={() => setAuthModal('login')}
        onProfileClick={() => setCurrentView('profile')}
        onHomeClick={() => setCurrentView('home')}
      />

      <main>
        <HeroSection />
        <FeaturedStorySection />
        <MarketSnapshotSection />
        <SectorGridSection />
        <TrendingNowSection />
        <InFocusSection />
        <BriefingSection />
        <GlobalPulseSection />
        <ProToolsSection />
        <ContributorSection />
        <NewsletterSection />
      </main>

      <FooterSection />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
