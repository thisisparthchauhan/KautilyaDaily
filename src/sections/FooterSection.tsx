import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';

const footerLinks = {
  Markets: ['Indices', 'Stocks', 'Sectors', 'Currencies', 'Commodities'],
  News: ['Latest', 'Trending', 'Editorial', 'Briefing', 'Earnings'],
  Pro: ['Screener', 'Alerts', 'Watchlist', 'Reports'],
  Company: ['About', 'Careers', 'Contact', 'Privacy', 'Terms'],
};

const socialLinks = [
  { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
  { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
  { icon: <Youtube className="w-5 h-5" />, href: '#', label: 'YouTube' },
  { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
];

export function FooterSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  return (
    <footer
      ref={ref}
      className="relative bg-kau-bg border-t border-white/5 py-16"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            {/* Logo Column */}
            <div
              className={cn(
                'col-span-2 md:col-span-4 lg:col-span-1 transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <a href="/" className="inline-block">
                <span className="font-heading text-2xl font-bold text-kau-text">
                  Kautilya<span className="text-kau-accent">.</span>Daily
                </span>
              </a>
              <p className="mt-4 text-sm text-kau-text-secondary max-w-xs">
                India's premier financial intelligence platform. Real-time data, 
                sharp analysis, delivered with clarity.
              </p>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <div
                key={category}
                className={cn(
                  'transition-all duration-700',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
                style={{ transitionDelay: `${100 + categoryIndex * 100}ms` }}
              >
                <h4 className="font-mono text-xs uppercase tracking-wider text-kau-text-secondary mb-4">
                  {category}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-kau-text hover:text-kau-accent transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div
            className={cn(
              'pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-700 delay-500',
              isVisible ? 'opacity-100' : 'opacity-0'
            )}
          >
            <p className="text-sm text-kau-text-secondary">
              © 2026 Kautilya Daily. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 text-kau-text-secondary hover:text-kau-accent transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
