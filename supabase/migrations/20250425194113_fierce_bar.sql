/*
  # Create Leads Table and Relationships

  1. New Tables
    - `leads`: Stores lead information and tracking
    
  2. Changes
    - Add lead source tracking
    - Add budget and timeline fields
    - Add relationship to clients table
    
  3. Security
    - Enable RLS
    - Add policies for admin and user access
*/

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  company text,
  job_title text,
  source text NOT NULL,
  status text CHECK (status IN ('new', 'contacted', 'qualified', 'unqualified', 'converted')) DEFAULT 'new',
  notes text,
  created_at timestamptz DEFAULT now(),
  last_contact timestamptz DEFAULT now(),
  industry text,
  budget_range text,
  timeline text,
  requirements text,
  assigned_to uuid REFERENCES auth.users(id),
  converted_client_id uuid REFERENCES clients(id)
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policies for leads table
CREATE POLICY "Admins have full access to leads"
ON leads
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Users can read all leads"
ON leads
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can manage assigned leads"
ON leads
FOR ALL
TO authenticated
USING (
  NOT is_admin()
  AND (
    assigned_to::text = auth.uid()::text
    OR assigned_to IS NULL
  )
)
WITH CHECK (
  NOT is_admin()
  AND (
    assigned_to::text = auth.uid()::text
    OR assigned_to IS NULL
  )
);

-- Function to convert lead to client
CREATE OR REPLACE FUNCTION convert_lead_to_client(lead_id uuid)
RETURNS uuid AS $$
DECLARE
  new_client_id uuid;
BEGIN
  -- Insert new client
  INSERT INTO clients (
    name,
    company,
    email,
    phone,
    status
  )
  SELECT 
    first_name || ' ' || last_name,
    company,
    email,
    phone,
    'active'
  FROM leads
  WHERE id = lead_id
  RETURNING id INTO new_client_id;

  -- Update lead with converted status and client reference
  UPDATE leads
  SET 
    status = 'converted',
    converted_client_id = new_client_id
  WHERE id = lead_id;

  -- Create client assignment if lead was assigned
  INSERT INTO client_assignments (client_id, user_id)
  SELECT new_client_id, assigned_to
  FROM leads
  WHERE id = lead_id AND assigned_to IS NOT NULL;

  RETURN new_client_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;