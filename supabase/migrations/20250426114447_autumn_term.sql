/*
  # Remove role from employees table

  1. Changes
    - Remove role column from employees table
    - Update existing policies to reflect the change
*/

-- Remove role column from employees table
ALTER TABLE employees DROP COLUMN IF EXISTS role;