/*
  # Add employee insert policy

  1. Changes
    - Add new RLS policy to allow admins to insert new employees
    
  2. Security
    - Maintains existing RLS policies
    - Adds specific policy for employee insertion
    - Only admins can create new employees
*/

-- Add policy for inserting employees (admins only)
CREATE POLICY "Admins can insert employees"
ON public.employees
FOR INSERT
TO authenticated
WITH CHECK (is_admin());