/*
  # Add AI Agents Table

  1. New Tables
    - `ai_agents`: Stores AI agent configurations and settings
    - `ai_agent_runs`: Tracks AI agent execution history
    
  2. Fields
    - Basic agent information (name, description, etc.)
    - Configuration settings
    - Usage tracking
    
  3. Security
    - Enable RLS
    - Add policies for admin and user access
*/

-- Create AI agents table
CREATE TABLE IF NOT EXISTS ai_agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  type text NOT NULL CHECK (type IN ('chat', 'analysis', 'code', 'content', 'image', 'email')),
  capabilities jsonb DEFAULT '[]'::jsonb,
  use_case text,
  status text CHECK (status IN ('available', 'beta', 'coming-soon')) DEFAULT 'available',
  settings jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  is_custom boolean DEFAULT false
);

-- Create AI agent runs table for tracking usage
CREATE TABLE IF NOT EXISTS ai_agent_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES ai_agents(id),
  user_id uuid REFERENCES auth.users(id),
  status text CHECK (status IN ('started', 'completed', 'failed')) DEFAULT 'started',
  input jsonb,
  output jsonb,
  error text,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  tokens_used integer DEFAULT 0,
  model text
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_ai_agents_type ON ai_agents(type);
CREATE INDEX IF NOT EXISTS idx_ai_agents_status ON ai_agents(status);
CREATE INDEX IF NOT EXISTS idx_ai_agent_runs_agent_id ON ai_agent_runs(agent_id);
CREATE INDEX IF NOT EXISTS idx_ai_agent_runs_user_id ON ai_agent_runs(user_id);

-- Enable RLS
ALTER TABLE ai_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_agent_runs ENABLE ROW LEVEL SECURITY;

-- Create policies for ai_agents
CREATE POLICY "Enable read access for all users on ai_agents"
ON ai_agents FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable full access for admins on ai_agents"
ON ai_agents FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Users can create and manage custom agents"
ON ai_agents FOR ALL
TO authenticated
USING (
  auth.uid() = created_by
  AND is_custom = true
)
WITH CHECK (
  auth.uid() = created_by
  AND is_custom = true
);

-- Create policies for ai_agent_runs
CREATE POLICY "Users can view their own agent runs"
ON ai_agent_runs FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can create agent runs"
ON ai_agent_runs FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Create trigger for updated_at
CREATE TRIGGER update_ai_agents_updated_at
    BEFORE UPDATE ON ai_agents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default agents
INSERT INTO ai_agents (name, description, type, capabilities, use_case, status, settings) VALUES
  (
    'Customer Service Agent',
    'AI agent specialized in handling customer inquiries and support requests with empathy and efficiency.',
    'chat',
    '["Natural language understanding", "Multi-language support", "Context awareness", "Sentiment analysis", "Automated ticket creation"]',
    'Customer support and service automation',
    'available',
    '{"temperature": 0.7, "maxTokens": 150, "topP": 0.9, "model": "gpt-4"}'
  ),
  (
    'Data Analysis Agent',
    'Specialized in analyzing data patterns and generating insights from complex datasets.',
    'analysis',
    '["Pattern recognition", "Statistical analysis", "Data visualization", "Trend identification", "Anomaly detection"]',
    'Business intelligence and data analysis',
    'available',
    '{"temperature": 0.2, "maxTokens": 500, "topP": 0.8, "model": "gpt-4"}'
  ),
  (
    'Code Assistant',
    'AI pair programmer that helps with code generation, review, and optimization.',
    'code',
    '["Code generation", "Bug detection", "Code optimization", "Documentation generation", "Best practices suggestions"]',
    'Software development and code assistance',
    'available',
    '{"temperature": 0.3, "maxTokens": 300, "topP": 0.95, "model": "gpt-4"}'
  ),
  (
    'Content Writer',
    'Creates engaging and SEO-optimized content for various platforms and purposes.',
    'content',
    '["Blog post writing", "Social media content", "Product descriptions", "SEO optimization", "Tone adaptation"]',
    'Content creation and marketing',
    'available',
    '{"temperature": 0.8, "maxTokens": 1000, "topP": 0.9, "model": "gpt-4"}'
  ),
  (
    'Image Assistant',
    'AI agent for image generation, editing, and analysis tasks.',
    'image',
    '["Image generation", "Style transfer", "Image editing", "Object detection", "Image optimization"]',
    'Visual content creation and editing',
    'beta',
    '{"temperature": 0.9, "maxTokens": 200, "topP": 1, "model": "dall-e-3"}'
  ),
  (
    'Email Assistant',
    'Helps compose, analyze, and manage email communications effectively.',
    'email',
    '["Email composition", "Response suggestions", "Tone analysis", "Priority sorting", "Follow-up reminders"]',
    'Email management and communication',
    'available',
    '{"temperature": 0.6, "maxTokens": 250, "topP": 0.85, "model": "gpt-4"}'
  );