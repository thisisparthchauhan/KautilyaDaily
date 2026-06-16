import { useState, useEffect } from 'react';
import { Search, Menu, X, User, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { ConfirmDialog } from './ui/ConfirmDialog';

const navLinks = [
  { name: 'Markets', href: '#markets' },
  { name: 'Economy', href: '#economy' },
  { name: 'Tech', href: '#tech' },
  { name: 'Policy', href: '#policy' },
  { name: 'Pro', href: '#pro', isPremium: true },
];

export function Navigation({
  onAuthClick,
  onProfileClick,
  onHomeClick,
  onBlogsClick
}: {
  onAuthClick?: () => void;
  onProfileClick?: () => void;
  onHomeClick?: () => void;
  onBlogsClick?: () => void;
}) {
  const { isAuthenticated, user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-kau-bg/95 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        )}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" onClick={(e) => { e.preventDefault(); if (onHomeClick) onHomeClick(); }} className="flex items-center gap-2">
              <span className="font-heading text-xl font-bold text-kau-text">
                Kautilya<span className="text-kau-accent">.</span>Daily
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-kau-accent',
                    link.isPremium ? 'text-kau-accent' : 'text-kau-text-secondary'
                  )}
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={onBlogsClick}
                className="text-sm font-medium text-kau-text-secondary hover:text-kau-accent transition-colors"
              >
                Blogs
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button
                className="p-2 text-kau-text-secondary hover:text-kau-text transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                className="p-2 text-kau-text-secondary hover:text-kau-text transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-kau-accent rounded-full" />
              </button>
              {isAuthenticated ? (
                <div className="hidden sm:flex items-center gap-4">
                  {user?.role === 'admin' && (
                    <a
                      href="/admin"
                      className="text-sm font-medium text-kau-accent hover:text-kau-accent/80 transition-colors"
                    >
                      Admin Dashboard
                    </a>
                  )}
                  <button
                    onClick={onProfileClick}
                    className="text-sm font-medium text-kau-text hover:text-kau-accent transition-colors flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Hi, {user?.firstName}
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-kau-text border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                    onClick={() => setShowSignOutConfirm(true)}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-kau-text border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                  onClick={onAuthClick}
                >
                  <User className="w-4 h-4" />
                  Sign In
                </button>
              )}
              <button
                className="md:hidden p-2 text-kau-text-secondary"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-kau-surface border-t border-white/5">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'block px-3 py-2 text-base font-medium rounded-lg',
                    link.isPremium
                      ? 'text-kau-accent bg-kau-accent/10'
                      : 'text-kau-text-secondary hover:text-kau-text hover:bg-white/5'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              {isAuthenticated ? (
                <div className="border-t border-white/5 pt-4 mt-4">
                  <button
                    className="w-full text-left px-3 py-2 text-base font-medium text-kau-text hover:bg-white/5 rounded-lg flex items-center gap-2"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (onProfileClick) onProfileClick();
                    }}
                  >
                    <User className="w-5 h-5" />
                    Hi, {user?.firstName} (Profile)
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 text-base font-medium text-red-400 hover:text-red-300 hover:bg-white/5 rounded-lg pl-10"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setShowSignOutConfirm(true);
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 text-base font-medium text-kau-text hover:bg-white/5 rounded-lg"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onAuthClick) onAuthClick();
                  }}
                >
                  <User className="w-5 h-5" />
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <ConfirmDialog
        isOpen={showSignOutConfirm}
        onClose={() => setShowSignOutConfirm(false)}
        onConfirm={logout}
        title="Sign Out"
        message="Are you sure you want to sign out of your account?"
        confirmLabel="Sign Out"
        isDestructive
      />
    </>
  );
}
