import React, { useState } from 'react';
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  Download, 
  Filter,
  ChevronDown,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Activity
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';

interface ReportCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  type: 'revenue' | 'clients' | 'projects' | 'performance';
  lastUpdated: string;
  downloadUrl: string;
}

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const reports: ReportCard[] = [
    {
      id: '1',
      title: 'Revenue Analytics',
      description: 'Detailed analysis of revenue streams, growth trends, and financial performance.',
      icon: <DollarSign className="h-6 w-6 text-emerald-500" />,
      type: 'revenue',
      lastUpdated: '2024-03-15',
      downloadUrl: '/reports/revenue-analytics.pdf'
    },
    {
      id: '2',
      title: 'Client Growth Report',
      description: 'Analysis of client acquisition, retention, and satisfaction metrics.',
      icon: <Users className="h-6 w-6 text-blue-500" />,
      type: 'clients',
      lastUpdated: '2024-03-14',
      downloadUrl: '/reports/client-growth.pdf'
    },
    {
      id: '3',
      title: 'Project Performance',
      description: 'Comprehensive overview of project timelines, budgets, and success rates.',
      icon: <Activity className="h-6 w-6 text-amber-500" />,
      type: 'projects',
      lastUpdated: '2024-03-13',
      downloadUrl: '/reports/project-performance.pdf'
    },
    {
      id: '4',
      title: 'Service Performance',
      description: 'Analysis of AI service adoption, usage patterns, and customer feedback.',
      icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
      type: 'performance',
      lastUpdated: '2024-03-12',
      downloadUrl: '/reports/service-performance.pdf'
    }
  ];

  const periodOptions = [
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'quarter', label: 'Last 90 Days' },
    { value: 'year', label: 'Last 12 Months' }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Access detailed reports and analytics for your business
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <div className="relative">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              {periodOptions.find(o => o.value === selectedPeriod)?.label}
              <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
            </button>
            {showFilterMenu && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu">
                  {periodOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        selectedPeriod === option.value
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setSelectedPeriod(option.value);
                        setShowFilterMenu(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Button
            variant="primary"
            leftIcon={<Download className="h-4 w-4" />}
          >
            Export All
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.id} className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {report.icon}
                  </div>
                  <h3 className="ml-4 text-lg font-medium text-gray-900">
                    {report.title}
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Download className="h-4 w-4" />}
                >
                  Download
                </Button>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                {report.description}
              </p>
              <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
                <span>Last updated: {new Date(report.lastUpdated).toLocaleDateString()}</span>
                <Button
                  variant="outline"
                  size="sm"
                  rightIcon={<ChevronDown className="h-4 w-4" />}
                >
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Revenue Overview</h3>
            <div className="mt-4 h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <BarChart className="h-12 w-12 text-gray-400" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Client Distribution</h3>
            <div className="mt-4 h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <PieChart className="h-12 w-12 text-gray-400" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Project Success Rate</h3>
            <div className="mt-4 h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <LineChart className="h-12 w-12 text-gray-400" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Service Adoption</h3>
            <div className="mt-4 h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-12 w-12 text-gray-400" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports; 