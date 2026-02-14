import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowRight, Filter, Bell, Download, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const proFeatures = [
  'Advanced screener filters',
  'Live alerts & watchlists',
  'Export-ready data',
];

// Mock screener UI
function ScreenerPreview() {
  return (
    <div className="w-full h-full bg-kau-surface rounded-lg border border-white/5 p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
        <Filter className="w-4 h-4 text-kau-accent" />
        <span className="font-mono text-xs text-kau-text-secondary">Stock Screener</span>
      </div>

      {/* Filters */}
      <div className="space-y-3 mb-4">
        <div className="flex gap-2">
          <div className="flex-1 h-6 bg-kau-bg rounded border border-white/5" />
          <div className="w-16 h-6 bg-kau-bg rounded border border-white/5" />
        </div>
        <div className="flex gap-2">
          <div className="flex-1 h-6 bg-kau-bg rounded border border-white/5" />
          <div className="w-20 h-6 bg-kau-bg rounded border border-white/5" />
        </div>
      </div>

      {/* Results Table */}
      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3 p-2 bg-kau-bg/50 rounded">
            <div className="w-8 h-8 rounded bg-kau-accent/10 flex items-center justify-center">
              <span className="font-mono text-xs text-kau-accent">{String.fromCharCode(64 + i)}</span>
            </div>
            <div className="flex-1">
              <div className="h-2 w-20 bg-white/10 rounded" />
              <div className="h-2 w-12 bg-white/5 rounded mt-1" />
            </div>
            <div className="text-right">
              <div className="h-2 w-14 bg-kau-up/30 rounded" />
              <div className="h-2 w-10 bg-white/5 rounded mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProToolsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center bg-kau-bg overflow-hidden"
    >
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(184,177,74,0.05)_0%,_transparent_50%)]" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <h2
                className={cn(
                  'font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-kau-text transition-all duration-700',
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                )}
              >
                Build your edge.
              </h2>

              <div className="mt-8 space-y-4">
                {proFeatures.map((feature, index) => (
                  <div
                    key={feature}
                    className={cn(
                      'flex items-center gap-3 transition-all duration-700',
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    )}
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-kau-accent/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-kau-accent" />
                    </div>
                    <span className="text-kau-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>

              <div
                className={cn(
                  'mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-500',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
              >
                <button className="kau-btn-primary flex items-center gap-2">
                  Explore Pro
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="kau-btn-secondary">
                  View Pricing
                </button>
              </div>
            </div>

            {/* Right - Preview Card */}
            <div
              className={cn(
                'h-[400px] lg:h-[500px] transition-all duration-700 delay-300',
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              )}
            >
              <div className="relative w-full h-full">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-kau-accent/5 rounded-2xl blur-2xl" />
                
                {/* Card */}
                <div className="relative w-full h-full kau-card p-1">
                  <ScreenerPreview />
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 kau-card px-3 py-2 flex items-center gap-2 animate-pulse-glow">
                  <Bell className="w-4 h-4 text-kau-accent" />
                  <span className="font-mono text-xs text-kau-text">Live Alerts</span>
                </div>
                
                <div className="absolute -bottom-4 -left-4 kau-card px-3 py-2 flex items-center gap-2">
                  <Download className="w-4 h-4 text-kau-accent" />
                  <span className="font-mono text-xs text-kau-text">Export CSV</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
