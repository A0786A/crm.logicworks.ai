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
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  status: 'active' | 'completed' | 'pending';
  startDate: string;
  endDate?: string;
  projects?: string[];
  skills: string[];
  avatar?: string;
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