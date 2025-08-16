/*
  # Production Schema Update for MDRRMO System

  1. New Tables
    - `organizational_hierarchy` - Staff organizational structure with photos
    - `key_personnel` - Key personnel management with photos
    - `emergency_hotlines` - Emergency contact management
    - `system_settings` - Application settings storage
    - `users` - User management system

  2. Enhanced Tables
    - Add `show_on_frontend` to emergency_alerts
    - Add image upload fields to gallery
    - Update existing tables with missing fields

  3. Security
    - Enable RLS on all new tables
    - Proper access policies for each table

  4. Sample Data
    - Pre-populated with demo content for testing
*/

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  role text DEFAULT 'editor',
  name text NOT NULL,
  avatar text,
  status text DEFAULT 'active',
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT users_role_check CHECK (role IN ('admin', 'editor')),
  CONSTRAINT users_status_check CHECK (status IN ('active', 'inactive'))
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read all users"
  ON users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage users"
  ON users
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Organizational hierarchy table
CREATE TABLE IF NOT EXISTS organizational_hierarchy (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  designation text NOT NULL,
  photo text,
  department text,
  level integer DEFAULT 1,
  parent_id uuid REFERENCES organizational_hierarchy(id) ON DELETE SET NULL,
  order_index integer DEFAULT 1,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE organizational_hierarchy ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active organizational hierarchy"
  ON organizational_hierarchy
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage organizational hierarchy"
  ON organizational_hierarchy
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Key personnel table
CREATE TABLE IF NOT EXISTS key_personnel (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  designation text NOT NULL,
  photo text,
  bio text,
  email text,
  phone text,
  department text,
  order_index integer DEFAULT 1,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE key_personnel ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active key personnel"
  ON key_personnel
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage key personnel"
  ON key_personnel
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Emergency hotlines table
CREATE TABLE IF NOT EXISTS emergency_hotlines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_name text NOT NULL,
  phone_number text NOT NULL,
  logo text,
  department text,
  description text,
  is_primary boolean DEFAULT false,
  order_index integer DEFAULT 1,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE emergency_hotlines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active emergency hotlines"
  ON emergency_hotlines
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage emergency hotlines"
  ON emergency_hotlines
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- System settings table
CREATE TABLE IF NOT EXISTS system_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value jsonb NOT NULL,
  setting_type text DEFAULT 'string',
  description text,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT settings_type_check CHECK (setting_type IN ('string', 'number', 'boolean', 'json', 'array'))
);

ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read public settings"
  ON system_settings
  FOR SELECT
  USING (is_public = true);

CREATE POLICY "Authenticated users can read all settings"
  ON system_settings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage settings"
  ON system_settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Add missing columns to existing tables
DO $$
BEGIN
  -- Add show_on_frontend to emergency_alerts if not exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'emergency_alerts' AND column_name = 'show_on_frontend'
  ) THEN
    ALTER TABLE emergency_alerts ADD COLUMN show_on_frontend boolean DEFAULT true;
  END IF;

  -- Add bulk_upload_id to gallery if not exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'gallery' AND column_name = 'bulk_upload_id'
  ) THEN
    ALTER TABLE gallery ADD COLUMN bulk_upload_id text;
  END IF;

  -- Add file_path to gallery if not exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'gallery' AND column_name = 'file_path'
  ) THEN
    ALTER TABLE gallery ADD COLUMN file_path text;
  END IF;
END $$;

-- Create triggers for updated_at on new tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_organizational_hierarchy_updated_at BEFORE UPDATE ON organizational_hierarchy FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_key_personnel_updated_at BEFORE UPDATE ON key_personnel FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_emergency_hotlines_updated_at BEFORE UPDATE ON emergency_hotlines FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample organizational hierarchy
INSERT INTO organizational_hierarchy (name, designation, photo, department, level, order_index) VALUES
('Hon. Maria Santos', 'Municipal Mayor', 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg', 'Executive', 1, 1),
('Engr. Juan Dela Cruz', 'MDRRMO Director', 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg', 'MDRRMO', 2, 1),
('Dr. Ana Reyes', 'Deputy Director', 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg', 'MDRRMO', 3, 1),
('Mark Santos', 'Operations Chief', 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg', 'Operations', 3, 2),
('Lisa Garcia', 'Training Coordinator', 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg', 'Training', 3, 3);

-- Insert sample key personnel
INSERT INTO key_personnel (name, designation, photo, bio, email, phone, department, is_featured) VALUES
('Engr. Maria Santos', 'MDRRMO Director', 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg', '15+ years experience in disaster management and civil engineering. Leads strategic planning and policy development.', 'director@mdrrmo.gov.ph', '(052) 234-5678', 'MDRRMO', true),
('Dr. Juan Dela Cruz', 'Deputy Director', 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg', 'Expert in emergency response coordination and community engagement. Oversees field operations and training programs.', 'deputy@mdrrmo.gov.ph', '(052) 234-5679', 'MDRRMO', true),
('Ana Reyes', 'Training Coordinator', 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg', 'Specializes in capacity building and educational programs. Coordinates all training and workshop activities.', 'training@mdrrmo.gov.ph', '(052) 234-5680', 'Training', false);

-- Insert sample emergency hotlines
INSERT INTO emergency_hotlines (contact_name, phone_number, logo, department, description, is_primary, order_index) VALUES
('MDRRMO Emergency', '911', 'https://res.cloudinary.com/dedcmctqk/image/upload/v1750079276/logome_h9snnx.webp', 'MDRRMO', 'Primary emergency response hotline', true, 1),
('Office of the Mayor', '(052) 123-4567', 'https://res.cloudinary.com/dedcmctqk/image/upload/v1750079276/logome_h9snnx.webp', 'Executive', 'Municipal government office', false, 2),
('Medical Emergency', '(052) 345-6789', 'https://res.cloudinary.com/dedcmctqk/image/upload/v1750079276/logome_h9snnx.webp', 'Health', 'Medical and health emergencies', false, 3),
('Fire Department', '(052) 567-8901', 'https://res.cloudinary.com/dedcmctqk/image/upload/v1750079276/logome_h9snnx.webp', 'BFP', 'Fire and rescue services', false, 4),
('Police Station', '117', 'https://res.cloudinary.com/dedcmctqk/image/upload/v1750079276/logome_h9snnx.webp', 'PNP', 'Police and security services', false, 5);

-- Insert sample system settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('site_name', '"MDRRMO Pio Duran"', 'string', 'Website name', true),
('site_description', '"Municipal Disaster Risk Reduction and Management Office"', 'string', 'Website description', true),
('contact_email', '"mdrrmo@pioduran.gov.ph"', 'string', 'Primary contact email', true),
('emergency_hotline', '"911"', 'string', 'Primary emergency hotline', true),
('office_address', '"Municipal Hall, Pio Duran, Albay"', 'string', 'Office address', true),
('enable_notifications', 'true', 'boolean', 'Enable email notifications', false),
('enable_public_reporting', 'true', 'boolean', 'Allow public incident reporting', false),
('maintenance_mode', 'false', 'boolean', 'Enable maintenance mode', false),
('auto_backup', 'true', 'boolean', 'Enable automatic backups', false),
('backup_frequency', '"daily"', 'string', 'Backup frequency', false);

-- Insert demo users
INSERT INTO users (username, email, password_hash, role, name, status) VALUES
('admin', 'admin@mdrrmo.gov.ph', 'admin123', 'admin', 'MDRRMO Administrator', 'active'),
('editor', 'editor@mdrrmo.gov.ph', 'editor123', 'editor', 'Content Editor', 'active');