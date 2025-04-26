/*
  # Add Sample Project Data

  1. Sample Data
    - Add 5 sample projects with different statuses
    - Projects are linked to existing clients
    - Include realistic budgets and progress values
*/

-- Insert sample projects
INSERT INTO projects (
  id,
  client_id,
  name,
  description,
  status,
  start_date,
  end_date,
  budget,
  progress
) VALUES
  (
    gen_random_uuid(),
    (SELECT id FROM clients WHERE email = 'sarah@technova.com'),
    'Customer Service AI Chatbot',
    'Implementing an AI-powered chatbot for customer service automation',
    'in-progress',
    '2023-10-01',
    '2023-12-15',
    12500.00,
    65
  ),
  (
    gen_random_uuid(),
    (SELECT id FROM clients WHERE email = 'michael@quantum.co'),
    'Sales Process Automation',
    'Automating the sales pipeline with AI-driven lead scoring',
    'planning',
    '2023-11-15',
    '2024-01-30',
    18000.00,
    25
  ),
  (
    gen_random_uuid(),
    (SELECT id FROM clients WHERE email = 'emma@horizondigital.net'),
    'Content Generation System',
    'AI system for generating marketing content across channels',
    'review',
    '2023-09-15',
    '2023-11-30',
    9500.00,
    90
  ),
  (
    gen_random_uuid(),
    (SELECT id FROM clients WHERE email = 'olivia@futuresystems.io'),
    'Predictive Analytics Dashboard',
    'Building a predictive analytics system for business intelligence',
    'in-progress',
    '2023-10-20',
    '2024-01-15',
    22000.00,
    40
  ),
  (
    gen_random_uuid(),
    (SELECT id FROM clients WHERE email = 'sarah@technova.com'),
    'Email Response Automation',
    'AI-powered system for automating email responses',
    'completed',
    '2023-08-10',
    '2023-10-05',
    7500.00,
    100
  );