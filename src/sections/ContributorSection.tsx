import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowRight, Twitter, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

const latestArticles = [
  'What the latest CPI print means for rates',
  'A simple guide to the new tax provisions',
  'Infrastructure: where the capex is actually going',
];

export function ContributorSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className="relative bg-kau-bg py-20 overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          <h2
            className={cn(
              'font-heading text-3xl sm:text-4xl font-bold text-kau-text mb-10 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
            )}
          >
            Contributor Spotlight
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Card */}
            <div
              className={cn(
                'kau-card p-8 transition-all duration-700',
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              )}
            >
              <div className="flex items-start gap-6">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
                  alt="Arvind Mehta"
                  className="w-24 h-24 rounded-full object-cover border-2 border-kau-accent/20"
                />
                <div className="flex-1">
                  <h3 className="font-heading text-2xl font-bold text-kau-text">
                    Arvind Mehta
                  </h3>
                  <p className="text-kau-accent font-mono text-sm">
                    Macro & Policy Editor
                  </p>
                  <p className="mt-3 text-kau-text-secondary leading-relaxed">
                    Tracks RBI, fiscal math, and the stories behind the numbers. 
                    Former economist with 15+ years covering Indian markets.
                  </p>
                  
                  <div className="mt-4 flex items-center gap-3">
                    <button className="p-2 bg-kau-surface rounded-lg text-kau-text-secondary hover:text-kau-accent transition-colors">
                      <Twitter className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-kau-surface rounded-lg text-kau-text-secondary hover:text-kau-accent transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest Articles */}
            <div className="space-y-4">
              <h4
                className={cn(
                  'font-mono text-xs uppercase tracking-wider text-kau-text-secondary mb-4 transition-all duration-700 delay-200',
                  isVisible ? 'opacity-100' : 'opacity-0'
                )}
              >
                Latest from Arvind
              </h4>
              
              {latestArticles.map((article, index) => (
                <div
                  key={article}
                  className={cn(
                    'group kau-card p-4 cursor-pointer hover:bg-kau-surface-highlight transition-all duration-500',
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  )}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <h5 className="font-heading text-kau-text group-hover:text-kau-accent transition-colors">
                      {article}
                    </h5>
                    <ArrowRight className="w-4 h-4 text-kau-text-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}

              <button
                className={cn(
                  'text-kau-accent text-sm font-medium flex items-center gap-2 hover:underline transition-all duration-700',
                  isVisible ? 'opacity-100' : 'opacity-0'
                )}
                style={{ transitionDelay: '600ms' }}
              >
                View all articles
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
