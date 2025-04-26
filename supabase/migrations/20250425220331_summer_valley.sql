/*
  # Add Employees and Interns Tables

  1. New Tables
    - `employees`: Stores employee information and roles
    - `interns`: Stores intern information and program details
    
  2. Changes
    - Add relationships between employees and interns (mentorship)
    - Add skill tracking for both employees and interns
    
  3. Security
    - Enable RLS
    - Add policies for admin and user access
*/

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  role text NOT NULL,
  department text NOT NULL,
  position text NOT NULL,
  status text CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  join_date date NOT NULL,
  skills jsonb DEFAULT '[]'::jsonb,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create interns table
CREATE TABLE IF NOT EXISTS interns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  university text NOT NULL,
  major text NOT NULL,
  graduation_date date NOT NULL,
  department text NOT NULL,
  mentor_id uuid REFERENCES employees(id),
  status text CHECK (status IN ('active', 'completed', 'pending')) DEFAULT 'pending',
  start_date date NOT NULL,
  end_date date,
  projects jsonb DEFAULT '[]'::jsonb,
  skills jsonb DEFAULT '[]'::jsonb,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_employees_email ON employees(email);
CREATE INDEX IF NOT EXISTS idx_employees_department ON employees(department);
CREATE INDEX IF NOT EXISTS idx_interns_email ON interns(email);
CREATE INDEX IF NOT EXISTS idx_interns_mentor ON interns(mentor_id);

-- Enable RLS
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE interns ENABLE ROW LEVEL SECURITY;

-- Policies for employees table
CREATE POLICY "Admins have full access to employees"
ON employees
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Users can read all employees"
ON employees
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can update their own employee profile"
ON employees
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Policies for interns table
CREATE POLICY "Admins have full access to interns"
ON interns
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Users can read all interns"
ON interns
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Mentors can update their interns"
ON interns
FOR UPDATE
TO authenticated
USING (
  mentor_id IN (
    SELECT id 
    FROM employees 
    WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  mentor_id IN (
    SELECT id 
    FROM employees 
    WHERE user_id = auth.uid()
  )
);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_employees_updated_at
    BEFORE UPDATE ON employees
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_interns_updated_at
    BEFORE UPDATE ON interns
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();