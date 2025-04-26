/*
  # Initial Schema Setup

  1. New Tables
    - `clients`: Stores client information and status
    - `projects`: Tracks project details and progress
    - `tasks`: Manages project tasks and assignments

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text,
  email text UNIQUE NOT NULL,
  phone text,
  status text CHECK (status IN ('active', 'inactive', 'lead')) DEFAULT 'lead',
  created_at timestamptz DEFAULT now(),
  last_contact timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id),
  name text NOT NULL,
  description text,
  status text CHECK (status IN ('planning', 'in-progress', 'review', 'completed')) DEFAULT 'planning',
  start_date date NOT NULL,
  end_date date,
  budget decimal(10, 2),
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100)
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id),
  title text NOT NULL,
  description text,
  status text CHECK (status IN ('todo', 'in-progress', 'completed')) DEFAULT 'todo',
  due_date date,
  assigned_to text,
  priority text CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium'
);

-- Enable Row Level Security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read all clients"
  ON clients
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can read all projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can read all tasks"
  ON tasks
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);