import { TrendingUp, TrendingDown } from 'lucide-react';
import { tickerData } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function MarketTicker() {
  // Duplicate data for seamless loop
  const duplicatedData = [...tickerData, ...tickerData];

  return (
    <div className="w-full bg-kau-surface/65 backdrop-blur-sm border-b border-white/5 overflow-hidden">
      <div className="kau-ticker flex items-center gap-8 py-3 whitespace-nowrap">
        {duplicatedData.map((item, index) => (
          <div key={`${item.symbol}-${index}`} className="flex items-center gap-3">
            <span className="font-mono text-sm font-medium text-kau-text">
              {item.symbol}
            </span>
            <span className="font-mono text-sm text-kau-text-secondary">
              {item.value}
            </span>
            <span
              className={cn(
                'flex items-center gap-1 font-mono text-xs',
                item.isUp ? 'text-kau-up' : 'text-kau-down'
              )}
            >
              {item.isUp ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {item.change}
            </span>
            <span className="text-kau-accent mx-2">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MiniTicker({ symbol, value, change, isUp }: { 
  symbol: string; 
  value: string; 
  change: string; 
  isUp: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-kau-surface rounded-lg border border-white/5">
      <span className="font-mono text-sm text-kau-text-secondary">{symbol}</span>
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm font-medium text-kau-text">{value}</span>
        <span
          className={cn(
            'flex items-center gap-1 font-mono text-xs',
            isUp ? 'text-kau-up' : 'text-kau-down'
          )}
        >
          {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change}
        </span>
      </div>
    </div>
  );
}
