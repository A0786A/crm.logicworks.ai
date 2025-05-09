/*
  # Rename Employees Table to Agents

  1. Changes
    - Rename employees table to agents
    - Update all references and foreign keys
    - Update RLS policies
    
  2. Security
    - Maintain existing RLS policies
    - Update policy names to reflect new table name
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON employees;
DROP POLICY IF EXISTS "Enable full access for admins" ON employees;
DROP POLICY IF EXISTS "Enable self profile updates" ON employees;

-- Drop existing triggers
DROP TRIGGER IF EXISTS update_employees_updated_at ON employees;

-- Drop foreign key constraints that reference employees
ALTER TABLE interns DROP CONSTRAINT IF EXISTS interns_mentor_id_fkey;

-- Rename the table
ALTER TABLE employees RENAME TO agents;

-- Rename indexes
ALTER INDEX IF EXISTS employees_pkey RENAME TO agents_pkey;
ALTER INDEX IF EXISTS employees_email_key RENAME TO agents_email_key;
ALTER INDEX IF EXISTS idx_employees_email RENAME TO idx_agents_email;
ALTER INDEX IF EXISTS idx_employees_department RENAME TO idx_agents_department;

-- Create new trigger for agents table
CREATE TRIGGER update_agents_updated_at
    BEFORE UPDATE ON agents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create new policies for agents table
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

-- Recreate foreign key constraint for interns table
ALTER TABLE interns
ADD CONSTRAINT interns_mentor_id_fkey
FOREIGN KEY (mentor_id) REFERENCES agents(id);