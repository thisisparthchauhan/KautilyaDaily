import { useEffect, useState } from 'react';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { MarketTicker } from '@/components/MarketTicker';
import { marketIndices } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const mainIndices = marketIndices.slice(0, 3);

  return (
    <section className="relative min-h-screen flex flex-col bg-kau-bg overflow-hidden">
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(184,177,74,0.03)_0%,_transparent_70%)]" />
      
      {/* Ticker */}
      <div className="mt-16">
        <MarketTicker />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-12 py-12">
        {/* Headline */}
        <div
          className={cn(
            'text-center transition-all duration-700',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          )}
        >
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-kau-text leading-tight">
            Markets move.
            <br />
            <span className="text-kau-accent">So do we.</span>
          </h1>
        </div>

        {/* Subheadline */}
        <p
          className={cn(
            'mt-6 text-center text-lg sm:text-xl text-kau-text-secondary max-w-2xl transition-all duration-700 delay-150',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          )}
        >
          Real-time data, sharp analysis, and the stories that shape the economy—
          delivered with clarity.
        </p>

        {/* CTAs */}
        <div
          className={cn(
            'mt-10 flex flex-col sm:flex-row items-center gap-4 transition-all duration-700 delay-300',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          )}
        >
          <button className="kau-btn-primary flex items-center gap-2">
            Start Reading
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="kau-btn-secondary flex items-center gap-2">
            Explore Pro Tools
          </button>
        </div>

        {/* Index Cards */}
        <div
          className={cn(
            'mt-16 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-4 transition-all duration-700 delay-500',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}
        >
          {mainIndices.map((index) => (
            <div
              key={index.symbol}
              className="kau-card p-5 hover:bg-kau-surface-highlight transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-kau-text-secondary">
                  {index.name}
                </span>
                <span
                  className={cn(
                    'flex items-center gap-1 font-mono text-xs',
                    index.isUp ? 'text-kau-up' : 'text-kau-down'
                  )}
                >
                  {index.isUp ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {index.changePercent > 0 ? '+' : ''}
                  {index.changePercent.toFixed(2)}%
                </span>
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-kau-text">
                {index.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <div
                className={cn(
                  'mt-1 font-mono text-sm',
                  index.isUp ? 'text-kau-up' : 'text-kau-down'
                )}
              >
                {index.change > 0 ? '+' : ''}
                {index.change.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-kau-bg to-transparent pointer-events-none" />
    </section>
  );
}
