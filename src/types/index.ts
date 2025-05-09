import React from 'react';

export interface Client {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  website: string | null;
  status: 'active' | 'inactive' | 'lead';
  created_at: string;
  last_contact: string;
  avatar?: string;
  notes?: string;
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'unqualified';
  notes: string;
  created: string;
  lastContact?: string;
  industry?: string;
  budget?: string;
  timeline?: string;
  requirements?: string;
}

export interface Intern {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  department: string;
  mentor_id?: string;
  status: 'active' | 'completed' | 'pending';
  start_date: string;
  end_date?: string;
  projects: string[];
  skills: string[];
  avatar_url?: string;
  notes?: string;
  performance_rating?: number;
  feedback?: string;
  current_project?: string;
}

export interface Project {
  id: string;
  clientId: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  startDate: string;
  endDate?: string;
  budget: number;
  progress: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'chatbot' | 'automation' | 'analytics' | 'custom';
  price: number;
  recurring: boolean;
}

export interface Task {
  id: string;
  projectId?: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  dueDate?: string;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Communication {
  id: string;
  clientId: string;
  type: 'email' | 'call' | 'meeting' | 'note';
  subject: string;
  content: string;
  date: string;
}

export interface Metric {
  id: string;
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface Agent {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  department: string;
  status: 'active' | 'inactive';
  join_date: string;
  avatar_url?: string;
  skills: string[];
  position: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'team';
  avatar?: string;
}

export interface AIAgent {
  id: string;
  name: string;
  description: string;
  type: 'chat' | 'analysis' | 'code' | 'content' | 'image' | 'email';
  capabilities: string[];
  use_case: string;
  status: 'available' | 'beta' | 'coming-soon';
  settings: {
    temperature: number;
    maxTokens: number;
    topP: number;
    model: string;
  };
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  is_custom: boolean;
}

export interface AIAgentRun {
  id: string;
  agent_id: string;
  user_id: string;
  status: 'started' | 'completed' | 'failed';
  input: any;
  output: any;
  error?: string;
  started_at: string;
  completed_at?: string;
  tokens_used: number;
  model: string;
}