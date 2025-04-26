/*
  # Create New Interns Table

  1. New Table
    - `interns`: Stores intern information and assignments
    
  2. Fields
    - Basic information (name, contact, etc.)
    - Department and mentor assignment
    - Project tracking and skills
    - Performance metrics
    
  3. Security
    - Enable RLS
    - Add policies for admin and user access
*/

-- Drop existing interns table if it exists
DROP TABLE IF EXISTS interns CASCADE;

-- Create new interns table
CREATE TABLE interns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  department text NOT NULL,
  mentor_id uuid REFERENCES employees(id),
  status text CHECK (status IN ('active', 'completed', 'pending')) DEFAULT 'pending',
  start_date date NOT NULL,
  end_date date,
  projects jsonb DEFAULT '[]'::jsonb,
  skills jsonb DEFAULT '[]'::jsonb,
  avatar_url text,
  notes text,
  performance_rating integer CHECK (performance_rating >= 1 AND performance_rating <= 5),
  feedback text,
  current_project uuid REFERENCES projects(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_interns_email ON interns(email);
CREATE INDEX IF NOT EXISTS idx_interns_mentor ON interns(mentor_id);
CREATE INDEX IF NOT EXISTS idx_interns_department ON interns(department);
CREATE INDEX IF NOT EXISTS idx_interns_status ON interns(status);

-- Enable RLS
ALTER TABLE interns ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Admins have full access to interns"
ON interns FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Users can read all interns"
ON interns FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Mentors can update their interns"
ON interns FOR UPDATE
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

-- Create trigger for updating updated_at
CREATE TRIGGER update_interns_updated_at
    BEFORE UPDATE ON interns
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();