import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { marketIndices } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { MiniTicker } from '@/components/MarketTicker';

// Simple sparkline component
function Sparkline({ isUp }: { isUp: boolean }) {
  const points = isUp 
    ? '0,30 20,25 40,28 60,15 80,20 100,5'
    : '0,10 20,15 40,12 60,25 80,20 100,35';
  
  return (
    <svg viewBox="0 0 100 40" className="w-full h-12">
      <polyline
        fill="none"
        stroke={isUp ? '#2DB27D' : '#E14B4B'}
        strokeWidth="2"
        points={points}
      />
      <path
        d={`M0,40 L${points} L100,40 Z`}
        fill={isUp ? 'rgba(45, 178, 125, 0.1)' : 'rgba(225, 75, 75, 0.1)'}
      />
    </svg>
  );
}

// Mini bar chart
function MiniBarChart() {
  const bars = [65, 45, 80, 55, 70, 40, 85, 60];
  return (
    <div className="flex items-end gap-1 h-12">
      {bars.map((height, i) => (
        <div
          key={i}
          className="flex-1 bg-kau-accent/30 rounded-sm"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

export function MarketSnapshotSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.15 });

  const mainIndex = marketIndices[0]; // NIFTY
  const secondaryIndices = marketIndices.slice(1, 3); // SENSEX, Bank Nifty
  const miniTickers = [
    { symbol: 'USD/INR', value: '83.12', change: '-0.11%', isUp: false },
    { symbol: 'GOLD (10g)', value: '5,820', change: '+0.35%', isUp: true },
    { symbol: 'CRUDE (bbl)', value: '78.40', change: '-0.52%', isUp: false },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center bg-kau-bg kau-grid-lines overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div
            className={cn(
              'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
            )}
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-kau-text">
              Market Snapshot
            </h2>
            <span className="font-mono text-sm text-kau-text-secondary">
              Updated 14 Feb, 10:14 AM IST
            </span>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Main Index Tile - Large */}
            <div
              className={cn(
                'lg:col-span-5 kau-card p-6 transition-all duration-700 delay-100',
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-kau-text-secondary">
                  {mainIndex.name}
                </span>
                <Activity className="w-4 h-4 text-kau-accent" />
              </div>
              <div className="font-heading text-4xl sm:text-5xl font-bold text-kau-text">
                {mainIndex.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <div
                className={cn(
                  'mt-2 flex items-center gap-2 font-mono text-sm',
                  mainIndex.isUp ? 'text-kau-up' : 'text-kau-down'
                )}
              >
                {mainIndex.isUp ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>
                  {mainIndex.change > 0 ? '+' : ''}
                  {mainIndex.change.toFixed(2)} ({mainIndex.change > 0 ? '+' : ''}
                  {mainIndex.changePercent.toFixed(2)}%)
                </span>
              </div>
              <div className="mt-6">
                <Sparkline isUp={mainIndex.isUp} />
              </div>
              <p className="mt-4 text-sm text-kau-text-secondary">
                Tech, realty lead; FMCG lags.
              </p>
            </div>

            {/* Secondary Tiles */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {secondaryIndices.map((index, i) => (
                <div
                  key={index.symbol}
                  className={cn(
                    'kau-card p-5 transition-all duration-700',
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                  )}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
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
                      {index.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {index.changePercent > 0 ? '+' : ''}
                      {index.changePercent.toFixed(2)}%
                    </span>
                  </div>
                  <div className="font-heading text-2xl font-bold text-kau-text">
                    {index.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="mt-4">
                    <MiniBarChart />
                  </div>
                </div>
              ))}

              {/* Quick Stats Tile */}
              <div
                className={cn(
                  'kau-card p-5 transition-all duration-700 delay-400',
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                )}
              >
                <h4 className="font-mono text-xs uppercase tracking-wider text-kau-text-secondary mb-4">
                  Market Breadth
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-kau-text-secondary">Advances</span>
                    <span className="font-mono text-sm text-kau-up">2,145</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-kau-text-secondary">Declines</span>
                    <span className="font-mono text-sm text-kau-down">1,892</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-kau-text-secondary">Unchanged</span>
                    <span className="font-mono text-sm text-kau-text-secondary">145</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mini Tickers Row */}
          <div
            className={cn(
              'mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 transition-all duration-700 delay-500',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            )}
          >
            {miniTickers.map((ticker) => (
              <MiniTicker key={ticker.symbol} {...ticker} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
