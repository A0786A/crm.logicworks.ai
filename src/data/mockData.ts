import { Client, Project, Service, Task, Communication, Metric, User, Employee } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: 'user-1',
    name: 'Alex Morgan',
    email: 'alex@logicworks.ai',
    role: 'admin',
    avatar: ''
  },
  {
    id: 'user-2',
    name: 'Jamie Chen',
    email: 'jamie@logicworks.ai',
    role: 'manager',
    avatar: ''
  },
  {
    id: 'user-3',
    name: 'Taylor Singh',
    email: 'taylor@logicworks.ai',
    role: 'team',
    avatar: ''
  }
];

// Mock Employees
export const employees: Employee[] = [
  {
    id: 'emp-1',
    name: 'Sarah Johnson',
    email: 'sarah@logicworks.ai',
    role: 'Senior AI Engineer',
    department: 'Engineering',
    status: 'active',
    joinDate: '2023-01-15T09:00:00Z',
    avatar: '',
    phone: '(555) 123-4567',
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'NLP'],
    position: 'Team Lead'
  },
  {
    id: 'emp-2',
    name: 'Michael Chen',
    email: 'michael@logicworks.ai',
    role: 'AI Solutions Architect',
    department: 'Engineering',
    status: 'active',
    joinDate: '2023-02-01T09:00:00Z',
    avatar: '',
    phone: '(555) 234-5678',
    skills: ['System Design', 'Cloud Architecture', 'MLOps', 'AWS'],
    position: 'Senior Engineer'
  },
  {
    id: 'emp-3',
    name: 'Emily Rodriguez',
    email: 'emily@logicworks.ai',
    role: 'Project Manager',
    department: 'Project Management',
    status: 'active',
    joinDate: '2023-03-15T09:00:00Z',
    avatar: '',
    phone: '(555) 345-6789',
    skills: ['Agile', 'Scrum', 'Risk Management', 'Stakeholder Management'],
    position: 'Senior PM'
  },
  {
    id: 'emp-4',
    name: 'David Kim',
    email: 'david@logicworks.ai',
    role: 'AI Research Scientist',
    department: 'Research',
    status: 'active',
    joinDate: '2023-04-01T09:00:00Z',
    avatar: '',
    phone: '(555) 456-7890',
    skills: ['Deep Learning', 'Research', 'PyTorch', 'Computer Vision'],
    position: 'Research Lead'
  },
  {
    id: 'emp-5',
    name: 'Lisa Thompson',
    email: 'lisa@logicworks.ai',
    role: 'Sales Executive',
    department: 'Sales',
    status: 'active',
    joinDate: '2023-05-15T09:00:00Z',
    avatar: '',
    phone: '(555) 567-8901',
    skills: ['Solution Selling', 'Negotiation', 'CRM', 'Business Development'],
    position: 'Senior Executive'
  }
];

// Mock Clients
export const clients: Client[] = [
  {
    id: 'client-1',
    name: 'Sarah Johnson',
    company: 'TechNova Solutions',
    email: 'sarah@technova.com',
    phone: '(555) 123-4567',
    status: 'active',
    created: '2023-09-15T10:30:00Z',
    lastContact: '2023-11-20T14:45:00Z'
  },
  {
    id: 'client-2',
    name: 'Michael Rodriguez',
    company: 'Quantum Enterprises',
    email: 'michael@quantum.co',
    phone: '(555) 987-6543',
    status: 'active',
    created: '2023-07-22T09:15:00Z',
    lastContact: '2023-11-18T11:30:00Z'
  },
  {
    id: 'client-3',
    name: 'Emma Chen',
    company: 'Horizon Digital',
    email: 'emma@horizondigital.net',
    phone: '(555) 456-7890',
    status: 'lead',
    created: '2023-10-05T15:45:00Z',
    lastContact: '2023-11-15T16:20:00Z'
  },
  {
    id: 'client-4',
    name: 'David Kim',
    company: 'Innovate AI',
    email: 'david@innovateai.com',
    phone: '(555) 234-5678',
    status: 'inactive',
    created: '2023-05-18T13:20:00Z',
    lastContact: '2023-10-25T10:15:00Z'
  },
  {
    id: 'client-5',
    name: 'Olivia Martinez',
    company: 'Future Systems',
    email: 'olivia@futuresystems.io',
    phone: '(555) 345-6789',
    status: 'active',
    created: '2023-08-12T11:10:00Z',
    lastContact: '2023-11-22T09:45:00Z'
  }
];

// Mock Projects
export const projects: Project[] = [
  {
    id: 'project-1',
    clientId: 'client-1',
    name: 'Customer Service AI Chatbot',
    description: 'Implementing an AI-powered chatbot for customer service automation',
    status: 'in-progress',
    startDate: '2023-10-01T09:00:00Z',
    endDate: '2023-12-15T17:00:00Z',
    budget: 12500,
    progress: 65
  },
  {
    id: 'project-2',
    clientId: 'client-2',
    name: 'Sales Process Automation',
    description: 'Automating the sales pipeline with AI-driven lead scoring and follow-up',
    status: 'planning',
    startDate: '2023-11-15T09:00:00Z',
    endDate: '2024-01-30T17:00:00Z',
    budget: 18000,
    progress: 25
  },
  {
    id: 'project-3',
    clientId: 'client-3',
    name: 'Content Generation System',
    description: 'AI system for generating marketing content across multiple channels',
    status: 'review',
    startDate: '2023-09-15T09:00:00Z',
    endDate: '2023-11-30T17:00:00Z',
    budget: 9500,
    progress: 90
  },
  {
    id: 'project-4',
    clientId: 'client-5',
    name: 'Predictive Analytics Dashboard',
    description: 'Building a predictive analytics system for business intelligence',
    status: 'in-progress',
    startDate: '2023-10-20T09:00:00Z',
    endDate: '2024-01-15T17:00:00Z',
    budget: 22000,
    progress: 40
  },
  {
    id: 'project-5',
    clientId: 'client-1',
    name: 'Email Response Automation',
    description: 'AI-powered system for automating email responses',
    status: 'completed',
    startDate: '2023-08-10T09:00:00Z',
    endDate: '2023-10-05T17:00:00Z',
    budget: 7500,
    progress: 100
  }
];

// Mock Services
export const services: Service[] = [
  {
    id: 'service-1',
    name: 'AI Chatbot Implementation',
    description: 'Custom AI chatbot development and integration for customer service',
    category: 'chatbot',
    price: 7500,
    recurring: false
  },
  {
    id: 'service-2',
    name: 'Workflow Automation Suite',
    description: 'End-to-end workflow automation for business processes',
    category: 'automation',
    price: 12000,
    recurring: false
  },
  {
    id: 'service-3',
    name: 'Predictive Analytics System',
    description: 'AI-powered analytics for business intelligence and forecasting',
    category: 'analytics',
    price: 15000,
    recurring: false
  },
  {
    id: 'service-4',
    name: 'AI Chatbot Maintenance',
    description: 'Monthly maintenance and updates for AI chatbots',
    category: 'chatbot',
    price: 1500,
    recurring: true
  },
  {
    id: 'service-5',
    name: 'Custom AI Solution Development',
    description: 'Development of bespoke AI solutions for specific business needs',
    category: 'custom',
    price: 25000,
    recurring: false
  }
];

// Mock Tasks
export const tasks: Task[] = [
  {
    id: 'task-1',
    projectId: 'project-1',
    title: 'Initial client requirements gathering',
    description: 'Schedule and conduct a meeting to gather detailed requirements',
    status: 'completed',
    dueDate: '2023-10-05T17:00:00Z',
    assignedTo: 'user-1',
    priority: 'high'
  },
  {
    id: 'task-2',
    projectId: 'project-1',
    title: 'Design chatbot conversation flows',
    description: 'Create detailed conversation flows for the customer service chatbot',
    status: 'in-progress',
    dueDate: '2023-11-10T17:00:00Z',
    assignedTo: 'user-2',
    priority: 'high'
  },
  {
    id: 'task-3',
    projectId: 'project-2',
    title: 'Analyze current sales process',
    description: 'Document and analyze the current sales workflow for automation opportunities',
    status: 'in-progress',
    dueDate: '2023-11-20T17:00:00Z',
    assignedTo: 'user-3',
    priority: 'medium'
  },
  {
    id: 'task-4',
    projectId: 'project-3',
    title: 'Train content generation model',
    description: 'Fine-tune the AI model on client-specific content',
    status: 'todo',
    dueDate: '2023-11-25T17:00:00Z',
    assignedTo: 'user-2',
    priority: 'high'
  },
  {
    id: 'task-5',
    projectId: 'project-4',
    title: 'Develop dashboard wireframes',
    description: 'Create wireframes for the predictive analytics dashboard',
    status: 'completed',
    dueDate: '2023-11-05T17:00:00Z',
    assignedTo: 'user-1',
    priority: 'medium'
  }
];

// Mock Communications
export const communications: Communication[] = [
  {
    id: 'comm-1',
    clientId: 'client-1',
    type: 'meeting',
    subject: 'Project Kickoff Meeting',
    content: 'Discussed project goals, timeline, and key deliverables',
    date: '2023-10-02T13:00:00Z'
  },
  {
    id: 'comm-2',
    clientId: 'client-1',
    type: 'email',
    subject: 'Requirements Document',
    content: 'Sent detailed requirements document for review and approval',
    date: '2023-10-06T10:15:00Z'
  },
  {
    id: 'comm-3',
    clientId: 'client-2',
    type: 'call',
    subject: 'Initial Discovery Call',
    content: 'Discussed current sales process and pain points to address with automation',
    date: '2023-11-16T14:30:00Z'
  },
  {
    id: 'comm-4',
    clientId: 'client-3',
    type: 'meeting',
    subject: 'Content Strategy Meeting',
    content: 'Reviewed content types and channels for the AI generation system',
    date: '2023-09-20T11:00:00Z'
  },
  {
    id: 'comm-5',
    clientId: 'client-5',
    type: 'email',
    subject: 'Progress Update',
    content: 'Sent bi-weekly progress update on dashboard development',
    date: '2023-11-10T09:45:00Z'
  }
];

// Mock Metrics
export const metrics: Metric[] = [
  {
    id: 'metric-1',
    label: 'Active Clients',
    value: 12,
    change: 2,
    trend: 'up'
  },
  {
    id: 'metric-2',
    label: 'Projects in Progress',
    value: 8,
    change: 1,
    trend: 'up'
  },
  {
    id: 'metric-3',
    label: 'Revenue This Month',
    value: 78500,
    change: 12.5,
    trend: 'up'
  },
  {
    id: 'metric-4',
    label: 'Avg. Project Completion',
    value: 85,
    change: 3,
    trend: 'up'
  },
  {
    id: 'metric-5',
    label: 'New Leads',
    value: 5,
    change: -1,
    trend: 'down'
  },
  {
    id: 'metric-6',
    label: 'Client Satisfaction',
    value: 95,
    change: 2,
    trend: 'up'
  }
];