import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Clock, TrendingUp, BarChart3, Calendar, ArrowRight } from 'lucide-react';
import { newsArticles } from '@/data/mockData';
import { cn, getRelativeTime } from '@/lib/utils';

export function TrendingNowSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  const miniCards = [
    {
      title: 'Chart of the Day',
      subtitle: 'FII flows vs NIFTY',
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      title: 'Policy Watch',
      subtitle: 'GST simplification roadmap',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      title: 'Earnings Calendar',
      subtitle: 'Next 3 days',
      icon: <Calendar className="w-5 h-5" />,
    },
  ];

  return (
    <section
      ref={ref}
      className="relative bg-kau-bg py-20 overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Headlines List */}
            <div>
              <h2
                className={cn(
                  'font-heading text-3xl sm:text-4xl font-bold text-kau-text mb-8 transition-all duration-700',
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                )}
              >
                Trending Now
              </h2>

              <div className="space-y-4">
                {newsArticles.map((article, index) => (
                  <article
                    key={article.id}
                    className={cn(
                      'group p-4 -mx-4 rounded-lg hover:bg-kau-surface transition-all duration-500 cursor-pointer',
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    )}
                    style={{ transitionDelay: `${100 + index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-heading text-lg font-semibold text-kau-text group-hover:text-kau-accent transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <div className="mt-2 flex items-center gap-3 text-sm text-kau-text-secondary">
                          <span className="font-mono text-xs uppercase tracking-wider text-kau-accent">
                            {article.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime} min
                          </span>
                          <span>{getRelativeTime(article.publishedAt)}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-kau-text-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Right Column - Mini Cards */}
            <div className="space-y-4">
              {miniCards.map((card, index) => (
                <div
                  key={card.title}
                  className={cn(
                    'kau-card p-5 cursor-pointer group hover:bg-kau-surface-highlight transition-all duration-500',
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  )}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-kau-accent/10 rounded-lg text-kau-accent group-hover:bg-kau-accent/20 transition-colors">
                      {card.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading text-lg font-semibold text-kau-text group-hover:text-kau-accent transition-colors">
                        {card.title}
                      </h4>
                      <p className="text-sm text-kau-text-secondary">{card.subtitle}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-kau-text-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}

              {/* Ad Placeholder */}
              <div
                className={cn(
                  'kau-card p-6 bg-gradient-to-br from-kau-surface to-kau-surface-highlight transition-all duration-700',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: '500ms' }}
              >
                <span className="font-mono text-xs uppercase tracking-wider text-kau-text-secondary">
                  Sponsored
                </span>
                <h4 className="mt-2 font-heading text-lg font-semibold text-kau-text">
                  Unlock Premium Market Intelligence
                </h4>
                <p className="mt-2 text-sm text-kau-text-secondary">
                  Get advanced screeners, AI insights, and real-time alerts with Kautilya Pro.
                </p>
                <button className="mt-4 kau-btn-primary text-sm py-2 px-4">
                  Try Pro Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
