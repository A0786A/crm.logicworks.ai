/*
  # Rename employees table to agents

  1. Changes
    - Rename employees table to agents
    - Update all related indexes and constraints
    - Recreate RLS policies with new table name
    - Update foreign key relationship with interns table
    
  2. Security
    - Maintain existing RLS policies
    - Preserve all security settings
*/

-- Create new agents table
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  department text NOT NULL,
  position text NOT NULL,
  status text CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  join_date date NOT NULL,
  skills jsonb DEFAULT '[]'::jsonb,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Copy data from employees to agents if employees table exists
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'employees') THEN
    INSERT INTO agents
    SELECT * FROM employees;
    
    -- Drop the old table after successful copy
    DROP TABLE employees;
  END IF;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_agents_email ON agents(email);
CREATE INDEX IF NOT EXISTS idx_agents_department ON agents(department);

-- Enable RLS
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users"
ON agents FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable full access for admins"
ON agents FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Enable self profile updates"
ON agents FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_agents_updated_at
    BEFORE UPDATE ON agents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Update foreign key in interns table
ALTER TABLE interns
DROP CONSTRAINT IF EXISTS interns_mentor_id_fkey,
ADD CONSTRAINT interns_mentor_id_fkey
FOREIGN KEY (mentor_id) REFERENCES agents(id);