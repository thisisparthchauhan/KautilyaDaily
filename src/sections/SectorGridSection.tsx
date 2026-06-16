import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { TrendingUp, TrendingDown, ArrowRight, Building2, Cpu, Zap, Heart, ShoppingBag, Home } from 'lucide-react';
import { sectors } from '@/data/mockData';
import { cn } from '@/lib/utils';

const sectorIcons: Record<string, React.ReactNode> = {
  Banking: <Building2 className="w-6 h-6" />,
  Technology: <Cpu className="w-6 h-6" />,
  Energy: <Zap className="w-6 h-6" />,
  Healthcare: <Heart className="w-6 h-6" />,
  Consumer: <ShoppingBag className="w-6 h-6" />,
  Realty: <Home className="w-6 h-6" />,
};

export function SectorGridSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center bg-kau-bg-secondary overflow-hidden"
    >
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')]" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div
            className={cn(
              'mb-12 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
            )}
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-kau-text">
              Sectors
            </h2>
            <p className="mt-2 text-kau-text-secondary">
              Track the themes moving the market.
            </p>
          </div>

          {/* Sector Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectors.map((sector, index) => {
              const isLeft = index % 3 === 0;
              const isRight = index % 3 === 2;
              
              return (
                <div
                  key={sector.slug}
                  className={cn(
                    'kau-card p-6 cursor-pointer group transition-all duration-700 hover:bg-kau-surface-highlight',
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
                    isLeft && !isVisible && '-translate-x-20',
                    isRight && !isVisible && 'translate-x-20'
                  )}
                  style={{ transitionDelay: `${100 + index * 80}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-kau-accent/10 rounded-lg text-kau-accent group-hover:bg-kau-accent/20 transition-colors">
                      {sectorIcons[sector.name]}
                    </div>
                    <div
                      className={cn(
                        'flex items-center gap-1 font-mono text-sm',
                        sector.isUp ? 'text-kau-up' : 'text-kau-down'
                      )}
                    >
                      {sector.isUp ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span>
                        {sector.changePercent > 0 ? '+' : ''}
                        {sector.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-semibold text-kau-text group-hover:text-kau-accent transition-colors">
                    {sector.name}
                  </h3>

                  <p className="mt-2 text-sm text-kau-text-secondary line-clamp-2">
                    {sector.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-kau-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div
            className={cn(
              'mt-10 transition-all duration-700 delay-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
          >
            <button className="kau-btn-secondary flex items-center gap-2">
              View all sectors
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
