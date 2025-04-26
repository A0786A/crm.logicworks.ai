/*
  # Add Website Field to Clients Table

  1. Changes
    - Add website column to clients table
    - Make it nullable since not all clients may have a website
    
  2. Security
    - Maintains existing RLS policies
    - No additional security changes needed
*/

-- Add website column to clients table
ALTER TABLE clients 
ADD COLUMN IF NOT EXISTS website text;