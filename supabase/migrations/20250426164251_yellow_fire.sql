/*
  # Remove University Fields from Interns Table

  1. Changes
    - Remove university column from interns table
    - Remove major column from interns table
    - Remove graduation_date column from interns table
    
  2. Security
    - No security changes needed
    - Maintains existing RLS policies
*/

-- Remove columns from interns table
ALTER TABLE interns 
DROP COLUMN IF EXISTS university,
DROP COLUMN IF EXISTS major,
DROP COLUMN IF EXISTS graduation_date;