/*
  # Fix Employee Table Policies

  1. Changes
    - Drop existing policies
    - Create new policies for all CRUD operations
    - Allow admins full access
    - Allow users to view all employees
    - Allow users to update their own profile
    
  2. Security
    - Admins have full access
    - All users can read employee data
    - Users can only update their own profile
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admins have full access to employees" ON employees;
DROP POLICY IF EXISTS "Users can read all employees" ON employees;
DROP POLICY IF EXISTS "Users can update their own employee profile" ON employees;
DROP POLICY IF EXISTS "Admins can insert employees" ON employees;

-- Create new policies
CREATE POLICY "Enable read access for all users"
ON employees FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable full access for admins"
ON employees FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Enable self profile updates"
ON employees FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);