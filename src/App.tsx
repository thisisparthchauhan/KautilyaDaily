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
import { BlogsPage } from '@/pages/BlogsPage';
import { BlogDetailPage } from '@/pages/BlogDetailPage';

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const [currentView, setCurrentView] = useState<'home' | 'profile' | 'admin' | 'blogs' | 'blog-detail' | null>(null);
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  useEffect(() => {
    // Determine initial view based on URL path (basic internal routing)
    const path = window.location.pathname;
    if (path === '/admin') setCurrentView('admin');
    else if (path === '/profile') setCurrentView('profile');
    else if (path === '/blogs') setCurrentView('blogs');
    else setCurrentView('home');
  }, []);

  // Handle Google OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userStr = urlParams.get('user');
    const error = urlParams.get('error');

    if (error) {
      console.error('OAuth error:', error);
      setAuthModal('login');
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    if (token && userStr) {
      try {
        const userData = JSON.parse(decodeURIComponent(userStr));
        // Use the login function from AuthContext
        // Destructure login from useAuth() inside the effect to ensure it's up-to-date
        // and to avoid issues with hooks being called conditionally.
        // However, useAuth() should ideally be called at the top level of the component.
        // For this specific case, we'll assume `login` is stable or `useAuth` is called once.
        // A better pattern might be to pass `login` as a dependency if it changes,
        // but for context providers, it's usually stable.
        const { login } = useAuth();
        login(token, userData);
        // Clean URL
        window.history.replaceState({}, document.title, '/');
        setCurrentView('home');
      } catch (err) {
        console.error('Failed to parse OAuth callback:', err);
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setAuthModal(null);
    }
  }, [isAuthenticated]);

  const handleBlogClick = (blogId: string) => {
    setSelectedBlogId(blogId);
    setCurrentView('blog-detail');
    window.scrollTo(0, 0);
  };

  const handleBackToBlogs = () => {
    setCurrentView('blogs');
    setSelectedBlogId(null);
  };

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
          onBlogsClick={() => setCurrentView('blogs')}
        />
        <ProfilePage />
      </div>
    );
  }

  if (currentView === 'blogs') {
    return (
      <div className="relative">
        <Navigation
          onAuthClick={() => setAuthModal('login')}
          onProfileClick={() => setCurrentView('profile')}
          onHomeClick={() => setCurrentView('home')}
          onBlogsClick={() => setCurrentView('blogs')}
        />
        <BlogsPage onBlogClick={handleBlogClick} />
      </div>
    );
  }

  if (currentView === 'blog-detail' && selectedBlogId) {
    return (
      <div className="relative">
        <Navigation
          onAuthClick={() => setAuthModal('login')}
          onProfileClick={() => setCurrentView('profile')}
          onHomeClick={() => setCurrentView('home')}
          onBlogsClick={() => setCurrentView('blogs')}
        />
        <BlogDetailPage blogId={selectedBlogId} onBack={handleBackToBlogs} />
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
        onBlogsClick={() => setCurrentView('blogs')}
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
