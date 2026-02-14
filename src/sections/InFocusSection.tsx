import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowRight, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export function InFocusSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center bg-kau-bg overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80"
          alt="Global trade"
          className={cn(
            'w-full h-full object-cover transition-all duration-1000',
            isVisible ? 'scale-100 opacity-100' : 'scale-110 opacity-60'
          )}
        />
        <div className="absolute inset-0 kau-gradient-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          {/* Headline */}
          <h2
            className={cn(
              'font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-kau-text max-w-3xl leading-tight transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            )}
          >
            The new rules of global trade.
          </h2>

          {/* Excerpt */}
          <p
            className={cn(
              'mt-6 text-lg text-kau-text-secondary max-w-xl leading-relaxed transition-all duration-700 delay-150',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            Tariffs, nearshoring, and digital customs are reshaping competitiveness. 
            Here's what investors should watch.
          </p>

          {/* CTA */}
          <div
            className={cn(
              'mt-8 transition-all duration-700 delay-300',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
          >
            <button className="kau-btn-primary flex items-center gap-2">
              Dive deeper
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Related Card */}
          <div
            className={cn(
              'absolute bottom-12 right-8 w-80 kau-card p-5 cursor-pointer hover:bg-kau-surface-highlight transition-all duration-700 delay-400',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            )}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-kau-accent/10 rounded-lg text-kau-accent">
                <Globe className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-kau-text-secondary">
                Policy Radar
              </span>
            </div>
            <h4 className="font-heading text-lg font-semibold text-kau-text">
              Trade agreements update
            </h4>
            <p className="mt-2 text-sm text-kau-text-secondary">
              Key bilateral deals reshaping India's export landscape
            </p>
            <div className="mt-3 flex items-center gap-1 text-kau-accent">
              <span className="text-sm font-medium">Read analysis</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
