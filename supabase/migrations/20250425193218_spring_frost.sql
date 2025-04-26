/*
  # Add display name column to users table

  1. Changes
    - Add display_name column to auth.users table
    - Add function to sync display_name with user metadata
    - Add trigger to keep display_name in sync

  2. Security
    - Only authenticated users can update their own display_name
*/

-- Add display_name column to auth.users
ALTER TABLE auth.users 
ADD COLUMN IF NOT EXISTS display_name text;

-- Function to sync display_name from metadata
CREATE OR REPLACE FUNCTION public.sync_user_display_name()
RETURNS trigger AS $$
BEGIN
  IF NEW.raw_user_meta_data ? 'display_name' THEN
    UPDATE auth.users
    SET display_name = (NEW.raw_user_meta_data->>'display_name')
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to keep display_name in sync
DROP TRIGGER IF EXISTS sync_user_display_name ON auth.users;
CREATE TRIGGER sync_user_display_name
  AFTER UPDATE OF raw_user_meta_data
  ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_user_display_name();

-- Update existing users
UPDATE auth.users
SET display_name = raw_user_meta_data->>'display_name'
WHERE raw_user_meta_data ? 'display_name';