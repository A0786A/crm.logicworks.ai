/*
  # Insert Sample Employees and Interns Data

  1. Sample Data
    - 5 sample employees across different departments
    - 3 sample interns with various backgrounds
*/

-- Insert sample employees
INSERT INTO employees (
  first_name,
  last_name,
  email,
  phone,
  role,
  department,
  position,
  status,
  join_date,
  skills
) VALUES
  (
    'Sarah',
    'Johnson',
    'sarah@logicworks.ai',
    '(555) 123-4567',
    'Senior AI Engineer',
    'Engineering',
    'Team Lead',
    'active',
    '2023-01-15',
    '["Machine Learning", "Python", "TensorFlow", "NLP"]'::jsonb
  ),
  (
    'Michael',
    'Chen',
    'michael@logicworks.ai',
    '(555) 234-5678',
    'AI Solutions Architect',
    'Engineering',
    'Senior Engineer',
    'active',
    '2023-02-01',
    '["System Design", "Cloud Architecture", "MLOps", "AWS"]'::jsonb
  ),
  (
    'Emily',
    'Rodriguez',
    'emily@logicworks.ai',
    '(555) 345-6789',
    'Project Manager',
    'Project Management',
    'Senior PM',
    'active',
    '2023-03-15',
    '["Agile", "Scrum", "Risk Management", "Stakeholder Management"]'::jsonb
  ),
  (
    'David',
    'Kim',
    'david@logicworks.ai',
    '(555) 456-7890',
    'AI Research Scientist',
    'Research',
    'Research Lead',
    'active',
    '2023-04-01',
    '["Deep Learning", "Research", "PyTorch", "Computer Vision"]'::jsonb
  ),
  (
    'Lisa',
    'Thompson',
    'lisa@logicworks.ai',
    '(555) 567-8901',
    'Sales Executive',
    'Sales',
    'Senior Executive',
    'active',
    '2023-05-15',
    '["Solution Selling", "Negotiation", "CRM", "Business Development"]'::jsonb
  );

-- Insert sample interns
INSERT INTO interns (
  first_name,
  last_name,
  email,
  phone,
  university,
  major,
  graduation_date,
  department,
  mentor_id,
  status,
  start_date,
  end_date,
  projects,
  skills
) VALUES
  (
    'Alex',
    'Martinez',
    'alex.m@university.edu',
    '(555) 111-2222',
    'Tech University',
    'Computer Science',
    '2024-05-15',
    'Engineering',
    (SELECT id FROM employees WHERE email = 'sarah@logicworks.ai'),
    'active',
    '2024-01-15',
    '2024-06-15',
    '["AI Chatbot", "Data Analytics"]'::jsonb,
    '["Python", "Machine Learning", "Data Analysis"]'::jsonb
  ),
  (
    'Jordan',
    'Taylor',
    'jordan.t@university.edu',
    '(555) 222-3333',
    'State University',
    'Data Science',
    '2024-12-20',
    'Research',
    (SELECT id FROM employees WHERE email = 'david@logicworks.ai'),
    'active',
    '2024-02-01',
    '2024-07-31',
    '["Research Project", "ML Model Development"]'::jsonb,
    '["Python", "TensorFlow", "Statistics"]'::jsonb
  ),
  (
    'Morgan',
    'Lee',
    'morgan.l@university.edu',
    '(555) 333-4444',
    'Business School',
    'Business Analytics',
    '2024-06-30',
    'Project Management',
    (SELECT id FROM employees WHERE email = 'emily@logicworks.ai'),
    'active',
    '2024-01-10',
    '2024-06-10',
    '["Project Analysis", "Process Improvement"]'::jsonb,
    '["Data Analysis", "Project Management", "Agile"]'::jsonb
  );