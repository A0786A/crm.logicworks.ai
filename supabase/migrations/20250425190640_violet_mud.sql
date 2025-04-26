/*
  # Fix RLS policies for clients table

  1. Changes
    - Drop existing RLS policies on clients table
    - Create new, properly configured RLS policies for all operations
    
  2. Security
    - Enable RLS on clients table (already enabled)
    - Add policies for authenticated users to perform CRUD operations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read all clients" ON clients;
DROP POLICY IF EXISTS "Users can insert clients" ON clients;
DROP POLICY IF EXISTS "Users can update clients" ON clients;
DROP POLICY IF EXISTS "Users can delete clients" ON clients;

-- Create new policies
CREATE POLICY "Enable read access for authenticated users" ON clients
  FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON clients
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users" ON clients
  FOR UPDATE 
  TO authenticated 
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable delete access for authenticated users" ON clients
  FOR DELETE 
  TO authenticated 
  USING (true);