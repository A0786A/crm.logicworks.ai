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
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  job_title: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'unqualified' | 'converted';
  notes: string;
  created_at: string;
  last_contact: string;
  industry?: string;
  budget_range?: string;
  timeline?: string;
  requirements?: string;
  assigned_to?: string;
  converted_client_id?: string;
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
  project_id?: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  due_date?: string;
  assigned_to?: string;
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

export interface Employee {
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