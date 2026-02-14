import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const briefingItems = [
  'FPIs turn buyers in cyclicals',
  'Rupee range likely to hold: dealers',
  'Rural demand shows early signs of pickup',
  'Credit growth stable; deposit competition rises',
  'Oil volatility eases on supply clarity',
];

export function BriefingSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center bg-kau-bg kau-grid-lines overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <h2
            className={cn(
              'font-heading text-3xl sm:text-4xl font-bold text-kau-text mb-10 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
            )}
          >
            Briefing
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left - List Panel */}
            <div
              className={cn(
                'kau-card p-6 transition-all duration-700 delay-100',
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              )}
            >
              <div className="space-y-4">
                {briefingItems.map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      'group flex items-center gap-4 p-3 -mx-3 rounded-lg hover:bg-kau-surface-highlight cursor-pointer transition-all duration-500',
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    )}
                    style={{ transitionDelay: `${200 + index * 80}ms` }}
                  >
                    <span className="font-mono text-sm text-kau-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-kau-text group-hover:text-kau-accent transition-colors">
                      {item}
                    </span>
                    <ArrowRight className="w-4 h-4 text-kau-text-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>

              <button className="mt-6 text-kau-accent text-sm font-medium flex items-center gap-2 hover:underline">
                View all briefings
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right - Quote Card */}
            <div
              className={cn(
                'kau-card p-8 flex flex-col justify-center transition-all duration-700 delay-300',
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              )}
            >
              <Quote className="w-10 h-10 text-kau-accent/30 mb-4" />
              
              <blockquote className="font-heading text-2xl sm:text-3xl font-semibold text-kau-text leading-relaxed">
                "The best risk management is a calm read of the data."
              </blockquote>
              
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-kau-accent/20 flex items-center justify-center">
                  <span className="font-mono text-sm text-kau-accent">AM</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-kau-text">Editor's Note</div>
                  <div className="text-xs text-kau-text-secondary">14 Feb 2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
