/*
  # Insert Sample Leads Data

  1. Sample Data
    - 5 sample leads with different statuses and industries
    - Mix of new, contacted, and qualified leads
    - Various budget ranges and timelines
*/

-- Insert sample leads
INSERT INTO leads (
  id,
  first_name,
  last_name,
  email,
  phone,
  company,
  job_title,
  source,
  status,
  notes,
  created_at,
  last_contact,
  industry,
  budget_range,
  timeline,
  requirements
) VALUES
  (
    gen_random_uuid(),
    'James',
    'Wilson',
    'james.wilson@techstart.com',
    '(555) 123-4567',
    'TechStart Inc',
    'CTO',
    'Website',
    'new',
    'Interested in AI chatbot for customer service',
    '2024-02-15T10:00:00Z',
    '2024-02-15T10:00:00Z',
    'Technology',
    '$50,000 - $100,000',
    'Q2 2024',
    'Looking for a sophisticated AI chatbot solution with natural language processing capabilities'
  ),
  (
    gen_random_uuid(),
    'Maria',
    'Garcia',
    'maria.garcia@innovatech.com',
    '(555) 234-5678',
    'InnovaTech Solutions',
    'Head of Operations',
    'LinkedIn',
    'contacted',
    'Follow up scheduled for next week',
    '2024-02-10T14:30:00Z',
    '2024-02-14T15:45:00Z',
    'Software',
    '$25,000 - $50,000',
    'Q3 2024',
    'Needs workflow automation solution for HR processes'
  ),
  (
    gen_random_uuid(),
    'Robert',
    'Chen',
    'robert.chen@globalretail.com',
    '(555) 345-6789',
    'Global Retail Corp',
    'Digital Marketing Director',
    'Referral',
    'qualified',
    'Very interested in our AI content generation system',
    '2024-02-05T09:15:00Z',
    '2024-02-13T11:30:00Z',
    'Retail',
    '$75,000 - $150,000',
    'Q2 2024',
    'AI-powered content generation for multiple marketing channels'
  ),
  (
    gen_random_uuid(),
    'Sarah',
    'Thompson',
    'sarah.thompson@finserve.com',
    '(555) 456-7890',
    'FinServe Solutions',
    'Innovation Manager',
    'Trade Show',
    'contacted',
    'Demo scheduled for next month',
    '2024-02-01T16:45:00Z',
    '2024-02-12T10:20:00Z',
    'Financial Services',
    '$100,000 - $200,000',
    'Q4 2024',
    'Looking for AI-powered risk assessment system'
  ),
  (
    gen_random_uuid(),
    'Michael',
    'Patel',
    'michael.patel@healthtech.com',
    '(555) 567-8901',
    'HealthTech Innovations',
    'Technical Director',
    'Email Campaign',
    'new',
    'Interested in AI diagnostics assistance',
    '2024-02-08T11:20:00Z',
    '2024-02-08T11:20:00Z',
    'Healthcare',
    '$150,000 - $300,000',
    'Q3 2024',
    'AI system for analyzing medical imaging and providing diagnostic assistance'
  );