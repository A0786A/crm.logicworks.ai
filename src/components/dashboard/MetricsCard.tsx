import React from 'react';
import { Metric } from '../../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

interface MetricsCardProps {
  metric: Metric;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ metric }) => {
  const formatValue = (value: number): string => {
    if (metric.label.toLowerCase().includes('revenue')) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(value);
    }
    
    // For percentage values
    if (metric.label.toLowerCase().includes('satisfaction') || 
        metric.label.toLowerCase().includes('completion')) {
      return `${value}%`;
    }
    
    // For regular numbers
    return value.toString();
  };

  const getTrendIcon = () => {
    switch (metric.trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-rose-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTrendColor = () => {
    if (
      (metric.trend === 'up' && 
       !metric.label.toLowerCase().includes('churn')) || 
      (metric.trend === 'down' && 
       metric.label.toLowerCase().includes('churn'))
    ) {
      return 'text-emerald-600';
    }
    
    if (
      (metric.trend === 'down' && 
       !metric.label.toLowerCase().includes('churn')) || 
      (metric.trend === 'up' && 
       metric.label.toLowerCase().includes('churn'))
    ) {
      return 'text-rose-600';
    }
    
    return 'text-gray-500';
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <h3 className="text-sm font-medium text-gray-500">{metric.label}</h3>
        <div className="mt-2 flex items-baseline">
          <p className="text-2xl font-semibold text-gray-900">
            {formatValue(metric.value)}
          </p>
          <div className={`ml-2 flex items-baseline text-sm font-medium ${getTrendColor()}`}>
            <span className="sr-only">
              {metric.trend === 'up' ? 'Increased' : metric.trend === 'down' ? 'Decreased' : 'No change'} by
            </span>
            <span className="flex items-center">
              {getTrendIcon()}
              <span className="ml-1">
                {metric.change > 0 ? '+' : ''}
                {metric.label.toLowerCase().includes('revenue') 
                  ? `${metric.change}%` 
                  : metric.change}
              </span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;