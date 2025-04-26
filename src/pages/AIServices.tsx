import React from 'react';
import { 
  Brain, 
  MessageSquare, 
  BarChart, 
  Zap, 
  Shield, 
  Search,
  ArrowRight
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';

interface AIService {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  price: string;
  category: 'chatbot' | 'automation' | 'analytics' | 'custom';
}

const AIServices: React.FC = () => {
  const services: AIService[] = [
    {
      id: '1',
      title: 'AI-Powered Chatbot',
      description: 'Intelligent chatbot solution that understands and responds to customer queries in real-time, available 24/7.',
      icon: <MessageSquare className="h-8 w-8 text-indigo-500" />,
      features: [
        'Natural Language Processing',
        'Multi-language Support',
        'Custom Branding',
        'Analytics Dashboard',
        'Easy Integration'
      ],
      price: 'Starting at $299/month',
      category: 'chatbot'
    },
    {
      id: '2',
      title: 'Business Process Automation',
      description: 'Automate repetitive tasks and workflows using AI to increase efficiency and reduce human error.',
      icon: <Zap className="h-8 w-8 text-amber-500" />,
      features: [
        'Workflow Automation',
        'Document Processing',
        'Data Extraction',
        'Custom Rules Engine',
        'API Integration'
      ],
      price: 'Custom Pricing',
      category: 'automation'
    },
    {
      id: '3',
      title: 'Predictive Analytics',
      description: 'Leverage AI to analyze data patterns and make accurate predictions for business growth.',
      icon: <BarChart className="h-8 w-8 text-emerald-500" />,
      features: [
        'Data Visualization',
        'Trend Analysis',
        'Forecasting Models',
        'Real-time Insights',
        'Custom Reports'
      ],
      price: 'Starting at $499/month',
      category: 'analytics'
    },
    {
      id: '4',
      title: 'AI Security Solutions',
      description: 'Advanced security systems powered by AI to protect your business from threats and vulnerabilities.',
      icon: <Shield className="h-8 w-8 text-rose-500" />,
      features: [
        'Threat Detection',
        'Anomaly Detection',
        'Access Control',
        'Compliance Monitoring',
        '24/7 Protection'
      ],
      price: 'Custom Pricing',
      category: 'custom'
    },
    {
      id: '5',
      title: 'Intelligent Search Engine',
      description: 'AI-powered search solution that understands context and delivers relevant results instantly.',
      icon: <Search className="h-8 w-8 text-blue-500" />,
      features: [
        'Semantic Search',
        'Auto-suggestions',
        'Relevance Ranking',
        'Multi-source Search',
        'Custom Filters'
      ],
      price: 'Starting at $199/month',
      category: 'custom'
    },
    {
      id: '6',
      title: 'AI Consulting',
      description: 'Expert guidance on implementing AI solutions tailored to your business needs.',
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      features: [
        'Strategy Development',
        'Technology Assessment',
        'Implementation Planning',
        'Team Training',
        'Ongoing Support'
      ],
      price: 'Custom Pricing',
      category: 'custom'
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          AI Services
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Transform your business with our cutting-edge AI solutions
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {service.icon}
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>
              </div>
              <p className="mt-4 text-gray-500">
                {service.description}
              </p>
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900">Key Features</h4>
                <ul className="mt-4 space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-indigo-600" />
                        </div>
                      </div>
                      <p className="ml-3 text-sm text-gray-500">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <p className="text-lg font-medium text-gray-900">{service.price}</p>
                <Button
                  variant="primary"
                  className="mt-4 w-full"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Ready to Get Started?
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Contact us to discuss how our AI solutions can help your business grow
        </p>
        <div className="mt-8">
          <Button
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIServices; 