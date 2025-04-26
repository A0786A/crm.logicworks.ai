import React from 'react';
import { Download, PlayCircle, FileText, BookOpen, Target } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';

const Marketing: React.FC = () => {
  const resources = {
    salesTraining: [
      {
        title: 'AI Sales Fundamentals',
        description: 'Master the basics of selling AI solutions to businesses',
        type: 'video',
        duration: '45 mins'
      },
      {
        title: 'Objection Handling Guide',
        description: 'Common objections and effective responses for AI solutions',
        type: 'document',
        pages: 15
      },
      {
        title: 'Discovery Call Framework',
        description: 'Structure and questions for effective discovery calls',
        type: 'document',
        pages: 8
      }
    ],
    marketingMaterials: [
      {
        title: 'Product Benefits Deck',
        description: 'Comprehensive presentation of our AI solutions',
        format: 'PPT',
        size: '5.2 MB'
      },
      {
        title: 'Case Study Collection',
        description: 'Success stories across different industries',
        format: 'PDF',
        size: '3.8 MB'
      },
      {
        title: 'Brand Guidelines',
        description: 'Official brand assets and usage guidelines',
        format: 'PDF',
        size: '2.1 MB'
      }
    ],
    salesScripts: [
      {
        title: 'Initial Contact Script',
        description: 'Opening conversations with potential clients',
        scenario: 'Cold outreach'
      },
      {
        title: 'Demo Presentation Script',
        description: 'Guided walkthrough of our AI solutions',
        scenario: 'Product demo'
      },
      {
        title: 'Follow-up Templates',
        description: 'Email templates for different scenarios',
        scenario: 'Follow-up'
      }
    ]
  };

  const ResourceCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <Card className="h-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        {children}
      </CardContent>
    </Card>
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Marketing Resources</h1>
        <p className="mt-1 text-sm text-gray-500">
          Access sales training, marketing materials, and resources to help you succeed
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Sales Training */}
        <ResourceCard title="Sales Training">
          <div className="space-y-4">
            {resources.salesTraining.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  {item.type === 'video' ? (
                    <PlayCircle className="h-5 w-5 text-indigo-500" />
                  ) : (
                    <FileText className="h-5 w-5 text-purple-500" />
                  )}
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                  <p className="mt-1 text-xs text-gray-500">{item.description}</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      Access Resource
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ResourceCard>

        {/* Marketing Materials */}
        <ResourceCard title="Marketing Materials">
          <div className="space-y-4">
            {resources.marketingMaterials.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <Download className="h-5 w-5 text-emerald-500" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                  <p className="mt-1 text-xs text-gray-500">{item.description}</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs text-gray-500">{item.format} · {item.size}</span>
                    <Button variant="ghost" size="sm" className="ml-2">
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ResourceCard>

        {/* Sales Scripts */}
        <ResourceCard title="Sales Scripts">
          <div className="space-y-4">
            {resources.salesScripts.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-amber-500" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                  <p className="mt-1 text-xs text-gray-500">{item.description}</p>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {item.scenario}
                    </span>
                    <Button variant="ghost" size="sm" className="ml-2">
                      View Script
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ResourceCard>
      </div>

      {/* Additional Resources Section */}
      <div className="mt-8">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
          <div className="flex items-center">
            <Target className="h-8 w-8 text-indigo-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Need Custom Resources?</h3>
              <p className="mt-1 text-sm text-gray-500">
                Our marketing team can help create customized materials for your specific needs
              </p>
            </div>
            <div className="ml-auto">
              <Button variant="primary">
                Request Resources
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketing;