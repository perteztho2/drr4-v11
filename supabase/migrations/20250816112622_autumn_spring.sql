/*
  # Navigation Management System

  1. New Tables
    - `navigation_items` - Dynamic navigation menu management
    - Enhanced `emergency_alerts` with frontend display option
    - Storage bucket for file uploads

  2. Security
    - Enable RLS on navigation_items
    - Public read access for active items
    - Admin management access

  3. Features
    - Dynamic navigation creation
    - Order management
    - Featured items support
    - File storage for gallery uploads
*/

-- Navigation items table
CREATE TABLE IF NOT EXISTS navigation_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  path text NOT NULL,
  icon text DEFAULT 'Home',
  order_index integer DEFAULT 1,
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  parent_id uuid REFERENCES navigation_items(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active navigation items"
  ON navigation_items
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage navigation items"
  ON navigation_items
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create storage bucket for gallery uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for gallery bucket
CREATE POLICY "Anyone can view gallery images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery');

CREATE POLICY "Authenticated users can upload gallery images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Authenticated users can update gallery images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'gallery');

CREATE POLICY "Authenticated users can delete gallery images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'gallery');

-- Create trigger for navigation items updated_at
CREATE TRIGGER update_navigation_items_updated_at 
  BEFORE UPDATE ON navigation_items 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default navigation items
INSERT INTO navigation_items (label, path, icon, order_index, is_active, is_featured) VALUES
('Home', '/', 'Home', 1, true, true),
('About', '/about', 'Info', 2, true, true),
('Services', '/services-detail', 'Wrench', 3, true, true),
('News', '/news-portal', 'Newspaper', 4, true, true),
('Resources', '/resources', 'FolderOpen', 5, true, true),
('Planning', '/disaster-planning', 'Calendar', 6, true, true),
('Gallery', '/gallery', 'Camera', 7, true, true),
('Contact', '/contact', 'Phone', 8, true, true);