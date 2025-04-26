/*
  # Update Interns Table Schema

  1. Changes
    - Add projects column to track assigned projects
    - Add notes column for additional information
    - Add performance_rating column
    - Add feedback column for mentor feedback
    
  2. Security
    - Maintains existing RLS policies
    - No additional security changes needed
*/

-- Add new columns to interns table
ALTER TABLE interns 
ADD COLUMN IF NOT EXISTS notes text,
ADD COLUMN IF NOT EXISTS performance_rating integer CHECK (performance_rating >= 1 AND performance_rating <= 5),
ADD COLUMN IF NOT EXISTS feedback text,
ADD COLUMN IF NOT EXISTS current_project uuid REFERENCES projects(id);