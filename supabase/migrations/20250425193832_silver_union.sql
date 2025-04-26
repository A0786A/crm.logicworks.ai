/*
  # Add Role-Based Access Policies

  1. Changes
    - Add role column to auth.users
    - Create assignment tables
    - Create policies for admin and regular users
    - Set default policies for each table
    
  2. Security
    - Admins have full access to all tables
    - Regular users have limited access based on their role
*/

-- Add role to auth.users if it doesn't exist
ALTER TABLE auth.users 
ADD COLUMN IF NOT EXISTS role text DEFAULT 'user'::text
CHECK (role IN ('admin', 'user'));

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN (
    SELECT role = 'admin'
    FROM auth.users
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create assignment tables for managing relationships FIRST
CREATE TABLE IF NOT EXISTS client_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(client_id, user_id)
);

CREATE TABLE IF NOT EXISTS project_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(project_id, user_id)
);

-- Enable RLS on assignment tables
ALTER TABLE client_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_assignments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON clients;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON clients;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON clients;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON clients;

DROP POLICY IF EXISTS "Users can read all projects" ON projects;
DROP POLICY IF EXISTS "Users can read all tasks" ON tasks;

-- Clients table policies
CREATE POLICY "Admins have full access to clients"
ON clients
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Users can read all clients"
ON clients
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can insert and update their own clients"
ON clients
FOR ALL
TO authenticated
USING (
  NOT is_admin() 
  AND auth.uid()::text IN (
    SELECT user_id::text 
    FROM client_assignments 
    WHERE client_id = clients.id
  )
)
WITH CHECK (
  NOT is_admin()
  AND auth.uid()::text IN (
    SELECT user_id::text 
    FROM client_assignments 
    WHERE client_id = clients.id
  )
);

-- Projects table policies
CREATE POLICY "Admins have full access to projects"
ON projects
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Users can read assigned projects"
ON projects
FOR SELECT
TO authenticated
USING (
  is_admin() 
  OR auth.uid()::text IN (
    SELECT user_id::text 
    FROM project_assignments 
    WHERE project_id = projects.id
  )
);

CREATE POLICY "Users can update assigned projects"
ON projects
FOR UPDATE
TO authenticated
USING (
  NOT is_admin()
  AND auth.uid()::text IN (
    SELECT user_id::text 
    FROM project_assignments 
    WHERE project_id = projects.id
  )
)
WITH CHECK (
  NOT is_admin()
  AND auth.uid()::text IN (
    SELECT user_id::text 
    FROM project_assignments 
    WHERE project_id = projects.id
  )
);

-- Tasks table policies
CREATE POLICY "Admins have full access to tasks"
ON tasks
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Users can read all tasks"
ON tasks
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can manage assigned tasks"
ON tasks
FOR ALL
TO authenticated
USING (
  NOT is_admin()
  AND (
    assigned_to::text = auth.uid()::text
    OR auth.uid()::text IN (
      SELECT user_id::text 
      FROM project_assignments 
      WHERE project_id = tasks.project_id
    )
  )
)
WITH CHECK (
  NOT is_admin()
  AND (
    assigned_to::text = auth.uid()::text
    OR auth.uid()::text IN (
      SELECT user_id::text 
      FROM project_assignments 
      WHERE project_id = tasks.project_id
    )
  )
);

-- Assignment tables policies
CREATE POLICY "Admins have full access to client assignments"
ON client_assignments
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Users can view their client assignments"
ON client_assignments
FOR SELECT
TO authenticated
USING (user_id::text = auth.uid()::text);

CREATE POLICY "Admins have full access to project assignments"
ON project_assignments
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Users can view their project assignments"
ON project_assignments
FOR SELECT
TO authenticated
USING (user_id::text = auth.uid()::text);

-- Create function to set user as admin
CREATE OR REPLACE FUNCTION public.set_user_role(user_id uuid, new_role text)
RETURNS void AS $$
BEGIN
  IF NOT is_admin() THEN
    RAISE EXCEPTION 'Only administrators can change user roles';
  END IF;
  
  IF new_role NOT IN ('admin', 'user') THEN
    RAISE EXCEPTION 'Invalid role. Must be either "admin" or "user"';
  END IF;

  UPDATE auth.users
  SET role = new_role
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;