import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FeaturedStorySection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center bg-kau-bg overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&q=80"
          alt="Trading floor"
          className={cn(
            'w-full h-full object-cover transition-all duration-1000',
            isVisible ? 'scale-100 opacity-100' : 'scale-110 opacity-70'
          )}
        />
        <div className="absolute inset-0 kau-gradient-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          {/* Kicker */}
          <div
            className={cn(
              'transition-all duration-700 delay-100',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            )}
          >
            <span className="kau-label text-kau-accent">Featured</span>
          </div>

          {/* Headline */}
          <h2
            className={cn(
              'mt-4 font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-kau-text max-w-3xl leading-tight transition-all duration-700 delay-200',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            )}
          >
            Why India's logistics index is rewriting the supply-chain playbook.
          </h2>

          {/* Excerpt */}
          <p
            className={cn(
              'mt-6 text-lg text-kau-text-secondary max-w-xl leading-relaxed transition-all duration-700 delay-300',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            Infrastructure spend, port modernization, and a new wave of cold-chain 
            startups are converging. We map the winners, risks, and policy tailwinds.
          </p>

          {/* CTA */}
          <div
            className={cn(
              'mt-8 transition-all duration-700 delay-400',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
          >
            <button className="kau-btn-primary flex items-center gap-2">
              Read the full story
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Read Time */}
          <div
            className={cn(
              'absolute top-24 right-8 flex items-center gap-2 text-kau-text-secondary transition-all duration-700 delay-500',
              isVisible ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Clock className="w-4 h-4" />
            <span className="font-mono text-sm">6 min read</span>
          </div>

          {/* Thumbnail Card */}
          <div
            className={cn(
              'absolute bottom-12 right-8 w-80 kau-card p-4 cursor-pointer hover:bg-kau-surface-highlight transition-all duration-700 delay-500',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            )}
          >
            <div className="flex items-start gap-4">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&q=80"
                alt="Cold chain logistics"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-heading text-sm font-semibold text-kau-text">
                  Inside the cold-chain surge
                </h4>
                <p className="mt-1 text-xs text-kau-text-secondary">
                  How temperature-controlled logistics is transforming agriculture
                </p>
                <div className="mt-2 flex items-center gap-1 text-kau-accent">
                  <span className="text-xs font-medium">Read</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
