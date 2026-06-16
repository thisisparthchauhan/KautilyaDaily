import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Send, Check } from 'lucide-react';
import { trendingTags } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function NewsletterSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section
      ref={ref}
      className="relative bg-kau-bg-secondary py-20 overflow-hidden"
    >
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')]" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-3xl mx-auto">
          <div
            className={cn(
              'kau-card p-8 sm:p-12 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            {/* Title */}
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-kau-text text-center">
              Get the Daily Brief
            </h2>
            <p className="mt-3 text-kau-text-secondary text-center">
              Markets, analysis, and what matters—every morning.
            </p>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className={cn(
                'mt-8 flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-200',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full px-4 py-3 bg-kau-bg border border-white/10 rounded-lg text-kau-text placeholder:text-kau-text-secondary focus:outline-none focus:border-kau-accent transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitted}
                className={cn(
                  'px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all',
                  isSubmitted
                    ? 'bg-kau-up text-white'
                    : 'bg-kau-accent text-kau-bg hover:brightness-110'
                )}
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-4 h-4" />
                    Subscribed
                  </>
                ) : (
                  <>
                    Subscribe
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Tags */}
            <div
              className={cn(
                'mt-8 transition-all duration-700 delay-400',
                isVisible ? 'opacity-100' : 'opacity-0'
              )}
            >
              <p className="text-xs text-kau-text-secondary mb-3">Trending topics:</p>
              <div className="flex flex-wrap gap-2">
                {trendingTags.slice(0, 5).map((tag) => (
                  <span
                    key={tag.name}
                    className="px-3 py-1 bg-kau-surface rounded-full text-sm text-kau-text-secondary hover:text-kau-accent hover:bg-kau-surface-highlight cursor-pointer transition-colors"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
