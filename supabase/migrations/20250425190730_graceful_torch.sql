/*
  # Fix Clients Table RLS Policies

  1. Changes
    - Drop existing RLS policies for clients table
    - Create new, properly configured RLS policies for CRUD operations
    
  2. Security
    - Enable RLS on clients table (already enabled)
    - Add policies for authenticated users to perform CRUD operations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON clients;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON clients;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON clients;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON clients;

-- Create new policies with proper security checks
CREATE POLICY "Enable read access for authenticated users"
ON clients FOR SELECT
TO authenticated
USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for authenticated users"
ON clients FOR INSERT
TO authenticated
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update access for authenticated users"
ON clients FOR UPDATE
TO authenticated
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable delete access for authenticated users"
ON clients FOR DELETE
TO authenticated
USING (auth.role() = 'authenticated');