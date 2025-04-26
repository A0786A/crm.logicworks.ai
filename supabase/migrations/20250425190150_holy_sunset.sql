/*
  # Insert Sample Data

  1. Sample Data
    - Clients: 5 sample clients with different statuses
    - Projects: 5 sample projects linked to clients
    - Tasks: 5 sample tasks linked to projects

  2. Data Relationships
    - Each project is linked to a client
    - Tasks are linked to projects
*/

-- Insert sample clients
INSERT INTO clients (id, name, company, email, phone, status, created_at, last_contact)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Sarah Johnson', 'TechNova Solutions', 'sarah@technova.com', '(555) 123-4567', 'active', '2023-09-15T10:30:00Z', '2023-11-20T14:45:00Z'),
  ('22222222-2222-2222-2222-222222222222', 'Michael Rodriguez', 'Quantum Enterprises', 'michael@quantum.co', '(555) 987-6543', 'active', '2023-07-22T09:15:00Z', '2023-11-18T11:30:00Z'),
  ('33333333-3333-3333-3333-333333333333', 'Emma Chen', 'Horizon Digital', 'emma@horizondigital.net', '(555) 456-7890', 'lead', '2023-10-05T15:45:00Z', '2023-11-15T16:20:00Z'),
  ('44444444-4444-4444-4444-444444444444', 'David Kim', 'Innovate AI', 'david@innovateai.com', '(555) 234-5678', 'inactive', '2023-05-18T13:20:00Z', '2023-10-25T10:15:00Z'),
  ('55555555-5555-5555-5555-555555555555', 'Olivia Martinez', 'Future Systems', 'olivia@futuresystems.io', '(555) 345-6789', 'active', '2023-08-12T11:10:00Z', '2023-11-22T09:45:00Z');

-- Insert sample projects
INSERT INTO projects (id, client_id, name, description, status, start_date, end_date, budget, progress)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Customer Service AI Chatbot', 'Implementing an AI-powered chatbot for customer service automation', 'in-progress', '2023-10-01', '2023-12-15', 12500.00, 65),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'Sales Process Automation', 'Automating the sales pipeline with AI-driven lead scoring', 'planning', '2023-11-15', '2024-01-30', 18000.00, 25),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 'Content Generation System', 'AI system for generating marketing content across channels', 'review', '2023-09-15', '2023-11-30', 9500.00, 90),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '55555555-5555-5555-5555-555555555555', 'Predictive Analytics Dashboard', 'Building a predictive analytics system for business intelligence', 'in-progress', '2023-10-20', '2024-01-15', 22000.00, 40),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '11111111-1111-1111-1111-111111111111', 'Email Response Automation', 'AI-powered system for automating email responses', 'completed', '2023-08-10', '2023-10-05', 7500.00, 100);

-- Insert sample tasks
INSERT INTO tasks (id, project_id, title, description, status, due_date, assigned_to, priority)
VALUES
  ('11111111-aaaa-bbbb-cccc-dddddddddddd', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Initial client requirements gathering', 'Schedule and conduct a meeting to gather detailed requirements', 'completed', '2023-10-05', 'user-1', 'high'),
  ('22222222-aaaa-bbbb-cccc-dddddddddddd', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Design chatbot conversation flows', 'Create detailed conversation flows for the customer service chatbot', 'in-progress', '2023-11-10', 'user-2', 'high'),
  ('33333333-aaaa-bbbb-cccc-dddddddddddd', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Analyze current sales process', 'Document and analyze the current sales workflow', 'in-progress', '2023-11-20', 'user-3', 'medium'),
  ('44444444-aaaa-bbbb-cccc-dddddddddddd', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Train content generation model', 'Fine-tune the AI model on client-specific content', 'todo', '2023-11-25', 'user-2', 'high'),
  ('55555555-aaaa-bbbb-cccc-dddddddddddd', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'Develop dashboard wireframes', 'Create wireframes for the predictive analytics dashboard', 'completed', '2023-11-05', 'user-1', 'medium');