/*
  # Add client operation policies
  
  1. Security Changes
    - Add policies for inserting, updating, and deleting clients
    - All authenticated users can perform these operations
*/

-- Allow authenticated users to insert clients
CREATE POLICY "Users can insert clients"
  ON clients
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update clients
CREATE POLICY "Users can update clients"
  ON clients
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete clients
CREATE POLICY "Users can delete clients"
  ON clients
  FOR DELETE
  TO authenticated
  USING (true);