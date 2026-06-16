import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { TrendingUp, TrendingDown, Globe, Sun, Moon } from 'lucide-react';
import { globalIndices } from '@/data/mockData';
import { cn } from '@/lib/utils';

// Sparkline for global markets
function MiniSparkline({ isUp }: { isUp: boolean }) {
  const points = isUp 
    ? '0,20 15,18 30,15 45,12 60,8 75,10 90,5'
    : '0,8 15,10 30,12 45,15 60,18 75,16 90,20';
  
  return (
    <svg viewBox="0 0 90 25" className="w-full h-8">
      <polyline
        fill="none"
        stroke={isUp ? '#2DB27D' : '#E14B4B'}
        strokeWidth="1.5"
        points={points}
      />
    </svg>
  );
}

const regions = [
  {
    name: 'Asia',
    time: '1:14 PM',
    isOpen: true,
    indices: globalIndices.filter(i => ['N225', 'HSI', 'KS11'].includes(i.symbol)),
  },
  {
    name: 'Europe',
    time: '7:44 AM',
    isOpen: true,
    indices: globalIndices.filter(i => ['FTSE', 'DAX'].includes(i.symbol)),
  },
  {
    name: 'Americas',
    time: '11:44 PM',
    isOpen: false,
    indices: globalIndices.filter(i => ['DJI', 'IXIC', 'SPX'].includes(i.symbol)),
  },
];

export function GlobalPulseSection() {
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
              'mb-10 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
            )}
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-kau-text">
              Global Pulse
            </h2>
            <p className="mt-2 text-kau-text-secondary">
              Markets across timezones.
            </p>
          </div>

          {/* Region Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {regions.map((region, regionIndex) => (
              <div
                key={region.name}
                className={cn(
                  'kau-card p-6 transition-all duration-700',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                )}
                style={{ transitionDelay: `${200 + regionIndex * 120}ms` }}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-kau-accent/10 rounded-lg text-kau-accent">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-kau-text">
                      {region.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-kau-text-secondary">
                    {region.isOpen ? (
                      <Sun className="w-4 h-4 text-kau-accent" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                    <span className="font-mono text-sm">{region.time}</span>
                  </div>
                </div>

                {/* Indices */}
                <div className="space-y-4">
                  {region.indices.map((index) => (
                    <div key={index.symbol} className="flex items-center justify-between">
                      <div>
                        <div className="font-mono text-sm text-kau-text">
                          {index.name}
                        </div>
                        <div className="font-mono text-xs text-kau-text-secondary">
                          {index.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                      <div
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
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sparkline */}
                <div className="mt-6">
                  <MiniSparkline isUp={region.indices[0]?.isUp ?? true} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
