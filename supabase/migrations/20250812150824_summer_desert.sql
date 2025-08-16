/*
  # Pages Management System

  1. New Tables
    - `pages` - Dynamic page content management
    - `page_sections` - Modular page sections
    - `page_templates` - Reusable page templates
    - `resources` - Downloadable resources management

  2. Security
    - Enable RLS on all tables
    - Public read access for published content
    - Admin management access

  3. Features
    - Dynamic page creation
    - Section-based content management
    - Template system
    - Resource downloads tracking
*/

-- Pages table (enhanced)
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  meta_description text,
  meta_keywords text,
  template text DEFAULT 'default',
  hero_image text,
  hero_title text,
  hero_subtitle text,
  status text DEFAULT 'draft',
  featured boolean DEFAULT false,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT pages_status_check CHECK (status IN ('published', 'draft')),
  CONSTRAINT pages_template_check CHECK (template IN ('default', 'about', 'services', 'news', 'resources', 'disaster-plan'))
);

-- Page sections table
CREATE TABLE IF NOT EXISTS page_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid REFERENCES pages(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text,
  content text,
  data jsonb DEFAULT '{}'::jsonb,
  order_index integer DEFAULT 1,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT section_type_check CHECK (type IN ('hero', 'content', 'cards', 'stats', 'gallery', 'contact', 'accordion', 'grid', 'timeline'))
);

-- Resources table (enhanced)
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  file_url text NOT NULL,
  file_type text DEFAULT 'pdf',
  file_size bigint DEFAULT 0,
  category text DEFAULT 'guide',
  subcategory text,
  tags jsonb DEFAULT '[]'::jsonb,
  download_count integer DEFAULT 0,
  featured boolean DEFAULT false,
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT resources_file_type_check CHECK (file_type IN ('pdf', 'doc', 'docx', 'image', 'video', 'zip')),
  CONSTRAINT resources_category_check CHECK (category IN ('guide', 'form', 'map', 'report', 'plan', 'manual')),
  CONSTRAINT resources_status_check CHECK (status IN ('published', 'draft'))
);

-- Page templates table
CREATE TABLE IF NOT EXISTS page_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  template_data jsonb NOT NULL,
  preview_image text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for pages
CREATE POLICY "Anyone can read published pages"
  ON pages
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can manage pages"
  ON pages
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for page_sections
CREATE POLICY "Anyone can read active page sections"
  ON page_sections
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage page sections"
  ON page_sections
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for resources
CREATE POLICY "Anyone can read published resources"
  ON resources
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can manage resources"
  ON resources
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for page_templates
CREATE POLICY "Anyone can read active templates"
  ON page_templates
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage templates"
  ON page_templates
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create triggers for updated_at
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_page_sections_updated_at BEFORE UPDATE ON page_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_page_templates_updated_at BEFORE UPDATE ON page_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample pages based on HTML files
INSERT INTO pages (title, slug, content, meta_description, template, hero_title, hero_subtitle, status) VALUES
('About MDRRMO', 'about', 'The Municipal Disaster Risk Reduction and Management Office (MDRRMO) of Pio Duran serves as the primary agency responsible for ensuring the safety and resilience of our community through comprehensive disaster risk reduction and management strategies.', 'Learn about the Municipal Disaster Risk Reduction and Management Office of Pio Duran, Albay.', 'about', 'About DRRM Pio Duran', 'Municipal Disaster Risk Reduction and Management Office', 'published'),

('Disaster Management Planning', 'disaster-planning', 'Comprehensive strategies for preparing, responding to, and recovering from disasters to build resilient communities. Our DRRM planning involves various components and strategies to effectively prepare for, respond to, and recover from disasters.', 'Disaster risk reduction and management planning strategies and frameworks.', 'disaster-plan', 'Disaster Risk Reduction & Management Planning', 'Comprehensive strategies for preparing, responding to, and recovering from disasters to build resilient communities', 'published'),

('Our Services', 'services-detail', 'Comprehensive disaster management services to build resilient communities and ensure effective emergency response. Our services include risk assessment, emergency planning, community training, and infrastructure resilience.', 'Detailed information about MDRRMO services and disaster management programs.', 'services', 'Disaster Risk Reduction Services', 'Comprehensive disaster management services to build resilient communities and ensure effective emergency response', 'published'),

('News Portal', 'news-portal', 'Stay updated with the latest news, announcements, and events from the Municipality of Pio Duran. Our news portal provides real-time updates on disaster preparedness, emergency alerts, and community activities.', 'Latest news, updates, and announcements from MDRRMO Pio Duran.', 'news', 'MDRRMO News Portal', 'Stay informed with the latest updates and emergency information', 'published'),

('Resources & Downloads', 'resources', 'Essential documents, forms, and maps to help residents of Pio Duran prepare for and respond to various hazards. All documents are available in PDF format for easy access and download.', 'Download disaster preparedness guides, forms, and emergency maps.', 'resources', 'MDRRMO Resources & Downloads', 'Essential documents, forms, and maps to help residents prepare for disasters', 'published');

-- Insert sample resources
INSERT INTO resources (title, description, file_url, file_type, category, tags, download_count, status, featured) VALUES
('Family Disaster Preparedness Plan Template', 'A fillable guide to help families create their own emergency plan.', '/resources/family-disaster-plan.pdf', 'pdf', 'guide', '["preparedness", "family", "planning", "template"]', 1248, 'published', true),
('Emergency Kit Checklist', 'A comprehensive list of essential items for your emergency kit.', '/resources/emergency-kit-checklist.pdf', 'pdf', 'guide', '["emergency", "kit", "checklist", "supplies"]', 987, 'published', true),
('Basic First Aid Guide', 'A simple, illustrated guide to basic first aid procedures.', '/resources/first-aid-guide.pdf', 'pdf', 'guide', '["first-aid", "medical", "emergency", "health"]', 856, 'published', false),
('Typhoon Preparedness Guide', 'Specific instructions on what to do when a typhoon is approaching.', '/resources/typhoon-guide.pdf', 'pdf', 'guide', '["typhoon", "storm", "preparedness", "weather"]', 743, 'published', false),
('Earthquake Safety Guide', 'Safety procedures for before, during, and after an earthquake.', '/resources/earthquake-guide.pdf', 'pdf', 'guide', '["earthquake", "safety", "preparedness", "seismic"]', 692, 'published', false),
('Flood Safety Guide', 'Information on how to stay safe during and after flooding.', '/resources/flood-guide.pdf', 'pdf', 'guide', '["flood", "water", "safety", "evacuation"]', 634, 'published', false),
('Municipal DRRM Plan', 'Comprehensive municipal disaster risk reduction and management plan.', '/resources/municipal-drrm-plan.pdf', 'pdf', 'plan', '["drrm", "municipal", "planning", "strategy"]', 445, 'published', false),
('Evacuation Routes Map', 'Detailed map showing all evacuation routes in Pio Duran.', '/resources/evacuation-routes-map.pdf', 'pdf', 'map', '["evacuation", "routes", "map", "emergency"]', 567, 'published', true),
('Damage Assessment Form', 'Form for reporting damages after a disaster.', '/resources/damage-assessment-form.pdf', 'pdf', 'form', '["damage", "assessment", "form", "reporting"]', 234, 'published', false),
('Volunteer Registration Form', 'Form for individuals who want to volunteer with MDRRMO.', '/resources/volunteer-form.pdf', 'pdf', 'form', '["volunteer", "registration", "form", "community"]', 189, 'published', false);

-- Insert page templates
INSERT INTO page_templates (name, description, template_data, is_active) VALUES
('About Template', 'Template for about pages with mission, vision, and team sections', '{"sections": [{"type": "hero", "title": "About Us"}, {"type": "content", "title": "Our Story"}, {"type": "cards", "title": "Core Values"}, {"type": "stats", "title": "Achievements"}]}', true),
('Services Template', 'Template for services pages with service cards and features', '{"sections": [{"type": "hero", "title": "Our Services"}, {"type": "cards", "title": "Service Categories"}, {"type": "content", "title": "How We Help"}]}', true),
('Resources Template', 'Template for resources and downloads pages', '{"sections": [{"type": "hero", "title": "Resources"}, {"type": "grid", "title": "Download Categories"}, {"type": "content", "title": "How to Access"}]}', true);