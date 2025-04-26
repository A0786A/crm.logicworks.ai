/*
  # Update Department Name

  1. Changes
    - Update department name from "Engineering" to "Development" in employees table
    - Update department name from "Engineering" to "Development" in interns table
*/

-- Update employees table
UPDATE employees 
SET department = 'Development' 
WHERE department = 'Engineering';

-- Update interns table
UPDATE interns 
SET department = 'Development' 
WHERE department = 'Engineering';