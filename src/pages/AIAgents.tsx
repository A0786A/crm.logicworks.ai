import React, { useState } from 'react';
import { 
  Bot,
  MessageSquare, 
  FileSearch,
  Calculator,
  Brain,
  Code,
  FileText,
  Image,
  Mail,
  Play,
  X,
  Settings,
  Plus
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';

interface AIAgent {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  capabilities: string[];
  useCase: string;
  type: 'chat' | 'analysis' | 'code' | 'content' | 'image' | 'email';
  status: 'available' | 'beta' | 'coming-soon';
  settings?: {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    model?: string;
  };
}

const AIAgents: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [runOutput, setRunOutput] = useState<string | null>(null);

  const agents: AIAgent[] = [
    {
      id: 'customer-service',
      name: 'Customer Service Agent',
      description: 'AI agent specialized in handling customer inquiries and support requests with empathy and efficiency.',
      icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
      capabilities: [
        'Natural language understanding',
        'Multi-language support',
        'Context awareness',
        'Sentiment analysis',
        'Automated ticket creation'
      ],
      useCase: 'Customer support and service automation',
      type: 'chat',
      status: 'available',
      settings: {
        temperature: 0.7,
        maxTokens: 150,
        topP: 0.9,
        model: 'gpt-4'
      }
    },
    {
      id: 'data-analyst',
      name: 'Data Analysis Agent',
      description: 'Specialized in analyzing data patterns and generating insights from complex datasets.',
      icon: <Calculator className="h-6 w-6 text-emerald-500" />,
      capabilities: [
        'Pattern recognition',
        'Statistical analysis',
        'Data visualization',
        'Trend identification',
        'Anomaly detection'
      ],
      useCase: 'Business intelligence and data analysis',
      type: 'analysis',
      status: 'available',
      settings: {
        temperature: 0.2,
        maxTokens: 500,
        topP: 0.8,
        model: 'gpt-4'
      }
    },
    {
      id: 'code-assistant',
      name: 'Code Assistant',
      description: 'AI pair programmer that helps with code generation, review, and optimization.',
      icon: <Code className="h-6 w-6 text-purple-500" />,
      capabilities: [
        'Code generation',
        'Bug detection',
        'Code optimization',
        'Documentation generation',
        'Best practices suggestions'
      ],
      useCase: 'Software development and code assistance',
      type: 'code',
      status: 'available',
      settings: {
        temperature: 0.3,
        maxTokens: 300,
        topP: 0.95,
        model: 'gpt-4'
      }
    },
    {
      id: 'content-writer',
      name: 'Content Writer',
      description: 'Creates engaging and SEO-optimized content for various platforms and purposes.',
      icon: <FileText className="h-6 w-6 text-amber-500" />,
      capabilities: [
        'Blog post writing',
        'Social media content',
        'Product descriptions',
        'SEO optimization',
        'Tone adaptation'
      ],
      useCase: 'Content creation and marketing',
      type: 'content',
      status: 'available',
      settings: {
        temperature: 0.8,
        maxTokens: 1000,
        topP: 0.9,
        model: 'gpt-4'
      }
    },
    {
      id: 'image-assistant',
      name: 'Image Assistant',
      description: 'AI agent for image generation, editing, and analysis tasks.',
      icon: <Image className="h-6 w-6 text-rose-500" />,
      capabilities: [
        'Image generation',
        'Style transfer',
        'Image editing',
        'Object detection',
        'Image optimization'
      ],
      useCase: 'Visual content creation and editing',
      type: 'image',
      status: 'beta',
      settings: {
        temperature: 0.9,
        maxTokens: 200,
        topP: 1,
        model: 'dall-e-3'
      }
    },
    {
      id: 'email-assistant',
      name: 'Email Assistant',
      description: 'Helps compose, analyze, and manage email communications effectively.',
      icon: <Mail className="h-6 w-6 text-indigo-500" />,
      capabilities: [
        'Email composition',
        'Response suggestions',
        'Tone analysis',
        'Priority sorting',
        'Follow-up reminders'
      ],
      useCase: 'Email management and communication',
      type: 'email',
      status: 'available',
      settings: {
        temperature: 0.6,
        maxTokens: 250,
        topP: 0.85,
        model: 'gpt-4'
      }
    }
  ];

  const filterTypes = [
    { value: null, label: 'All Types' },
    { value: 'chat', label: 'Chat' },
    { value: 'analysis', label: 'Analysis' },
    { value: 'code', label: 'Code' },
    { value: 'content', label: 'Content' },
    { value: 'image', label: 'Image' },
    { value: 'email', label: 'Email' }
  ];

  const filteredAgents = selectedType
    ? agents.filter(agent => agent.type === selectedType)
    : agents;

  const handleStartAgent = async (agent: AIAgent) => {
    setIsRunning(true);
    setRunOutput(null);
    
    try {
      const input = prompt('What would you like the agent to help you with?');
      if (!input) {
        setIsRunning(false);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/run-agent`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          agentId: agent.id,
          input
        })
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to run agent');
      }

      setRunOutput(data.output.content);
    } catch (error) {
      console.error('Error running agent:', error);
      alert('Failed to run agent. Please try again.');
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusBadge = (status: AIAgent['status']) => {
    switch (status) {
      case 'available':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
            Available
          </span>
        );
      case 'beta':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Beta
          </span>
        );
      case 'coming-soon':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Coming Soon
          </span>
        );
    }
  };

  const ConfigModal = () => {
    if (!selectedAgent) return null;

    const [config, setConfig] = useState(selectedAgent.settings || {});

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowConfigModal(false)} />
          
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="absolute right-0 top-0 pr-4 pt-4">
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                onClick={() => setShowConfigModal(false)}
              >
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  Configure {selectedAgent.name}
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Temperature</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={config.temperature || 0.7}
                      onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                      className="mt-1 w-full"
                    />
                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                      <span>More Focused</span>
                      <span>{config.temperature}</span>
                      <span>More Creative</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Max Tokens</label>
                    <input
                      type="number"
                      value={config.maxTokens || 150}
                      onChange={(e) => setConfig({ ...config, maxTokens: parseInt(e.target.value) })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Top P</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={config.topP || 0.9}
                      onChange={(e) => setConfig({ ...config, topP: parseFloat(e.target.value) })}
                      className="mt-1 w-full"
                    />
                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                      <span>More Focused</span>
                      <span>{config.topP}</span>
                      <span>More Diverse</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Model</label>
                    <select
                      value={config.model || 'gpt-4'}
                      onChange={(e) => setConfig({ ...config, model: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="gpt-4">GPT-4</option>
                      <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                      <option value="dall-e-3">DALL·E 3</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowConfigModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      // Save configuration
                      setShowConfigModal(false);
                    }}
                  >
                    Save Configuration
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Agents</h1>
          <p className="mt-1 text-sm text-gray-500">
            Deploy specialized AI agents for various tasks and workflows
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button
            variant="primary"
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Create Custom Agent
          </Button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {filterTypes.map((type) => (
          <Button
            key={type.value || 'all'}
            variant={selectedType === type.value ? 'primary' : 'outline'}
            onClick={() => setSelectedType(type.value)}
            size="sm"
          >
            {type.label}
          </Button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {agent.icon}
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-gray-900">
                    {agent.name}
                  </h3>
                </div>
                {getStatusBadge(agent.status)}
              </div>

              <p className="mt-3 text-sm text-gray-500">
                {agent.description}
              </p>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">Capabilities</h4>
                <ul className="mt-2 space-y-2">
                  {agent.capabilities.map((capability, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-500">
                      <Brain className="h-4 w-4 mr-2 text-indigo-500" />
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">Use Case</h4>
                <p className="mt-1 text-sm text-gray-500">{agent.useCase}</p>
              </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
              <div className="flex justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Settings className="h-4 w-4" />}
                  onClick={() => {
                    setSelectedAgent(agent);
                    setShowConfigModal(true);
                  }}
                >
                  Configure
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Play className="h-4 w-4" />}
                  disabled={agent.status === 'coming-soon' || isRunning}
                  isLoading={isRunning}
                  onClick={() => handleStartAgent(agent)}
                >
                  {isRunning ? 'Running...' : 'Start Agent'}
                </Button>
              </div>
              {runOutput && (
                <div className="mt-3 p-3 bg-gray-100 rounded-md">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{runOutput}</p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {showConfigModal && <ConfigModal />}
    </div>
  );
};

export default AIAgents;