/*
  # MDRRMO Database Schema

  1. New Tables
    - `news` - News articles and announcements
    - `services` - MDRRMO services and offerings
    - `incident_reports` - Public incident reports
    - `gallery` - Photo gallery items
    - `about_sections` - About page content sections
    - `pages` - Custom pages
    - `emergency_alerts` - Emergency alert system
    - `social_posts` - Social media posts

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Public read access for published content

  3. Sample Data
    - Pre-populated with demo content
*/

-- News table
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text,
  content text,
  image text,
  author text,
  status text DEFAULT 'draft',
  date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT news_status_check CHECK (status IN ('published', 'draft'))
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published news"
  ON news
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can manage news"
  ON news
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  icon text DEFAULT 'Shield',
  tags jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT services_status_check CHECK (status IN ('active', 'inactive'))
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active services"
  ON services
  FOR SELECT
  USING (status = 'active');

CREATE POLICY "Authenticated users can manage services"
  ON services
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Incident reports table
CREATE TABLE IF NOT EXISTS incident_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number text UNIQUE NOT NULL,
  reporter_name text NOT NULL,
  contact_number text NOT NULL,
  location text,
  incident_type text,
  description text,
  urgency text DEFAULT 'MEDIUM',
  status text DEFAULT 'pending',
  date_reported timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT incident_urgency_check CHECK (urgency IN ('LOW', 'MEDIUM', 'HIGH')),
  CONSTRAINT incident_status_check CHECK (status IN ('pending', 'in-progress', 'resolved'))
);

ALTER TABLE incident_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read all incident reports"
  ON incident_reports
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can create incident reports"
  ON incident_reports
  FOR INSERT
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update incident reports"
  ON incident_reports
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image text,
  category text,
  date date DEFAULT CURRENT_DATE,
  location text,
  tags jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'draft',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT gallery_status_check CHECK (status IN ('published', 'draft'))
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published gallery items"
  ON gallery
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can manage gallery"
  ON gallery
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- About sections table
CREATE TABLE IF NOT EXISTS about_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  image text,
  order_index integer DEFAULT 1,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE about_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active about sections"
  ON about_sections
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage about sections"
  ON about_sections
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Pages table
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  meta_description text,
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT pages_status_check CHECK (status IN ('published', 'draft'))
);

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

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

-- Emergency alerts table
CREATE TABLE IF NOT EXISTS emergency_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  severity text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  location text,
  coordinates jsonb,
  issued_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  status text DEFAULT 'draft',
  channels jsonb DEFAULT '[]'::jsonb,
  sent_to jsonb DEFAULT '[]'::jsonb,
  priority integer DEFAULT 3,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT alert_type_check CHECK (type IN ('typhoon', 'earthquake', 'flood', 'fire', 'landslide', 'tsunami', 'general')),
  CONSTRAINT alert_severity_check CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  CONSTRAINT alert_status_check CHECK (status IN ('draft', 'active', 'expired', 'cancelled')),
  CONSTRAINT alert_priority_check CHECK (priority BETWEEN 1 AND 5)
);

ALTER TABLE emergency_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active emergency alerts"
  ON emergency_alerts
  FOR SELECT
  USING (status = 'active');

CREATE POLICY "Authenticated users can manage emergency alerts"
  ON emergency_alerts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Social posts table
CREATE TABLE IF NOT EXISTS social_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  content text NOT NULL,
  image text,
  link text,
  scheduled_time timestamptz,
  status text DEFAULT 'draft',
  engagement jsonb DEFAULT '{"likes": 0, "shares": 0, "comments": 0}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT social_platform_check CHECK (platform IN ('facebook', 'twitter', 'instagram', 'youtube')),
  CONSTRAINT social_status_check CHECK (status IN ('draft', 'scheduled', 'published', 'failed'))
);

ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published social posts"
  ON social_posts
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can manage social posts"
  ON social_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_incident_reports_updated_at BEFORE UPDATE ON incident_reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON gallery FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_about_sections_updated_at BEFORE UPDATE ON about_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_emergency_alerts_updated_at BEFORE UPDATE ON emergency_alerts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_social_posts_updated_at BEFORE UPDATE ON social_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO news (title, excerpt, content, image, author, status, date) VALUES
('BDRRM Planning Training Workshop for Barangay Officials', 'On June 25, 2024, the Municipal Disaster Risk Reduction and Management Office (MDRRMO) conducted an essential training session...', 'Full content of the news article would go here...', 'https://res.cloudinary.com/dedcmctqk/image/upload/v1750575265/487673077_1062718335885316_7552782387266701410_n_gexfn2.jpg', 'MDRRMO Staff', 'published', '2024-06-29'),
('Successful Nationwide Simultaneous Earthquake Drill Conducted', 'The municipality participated in the 2nd quarter nationwide simultaneous earthquake drill with over 5,000 participants...', 'Full content of the news article would go here...', 'https://res.cloudinary.com/dedcmctqk/image/upload/v1750575261/489043126_1065374988952984_1331524645056736117_n_fbmvch.jpg', 'MDRRMO Staff', 'published', '2023-06-09');

INSERT INTO services (title, description, icon, tags, status) VALUES
('Disaster Prevention & Mitigation', 'Immediate response to disaster-related emergencies with our trained response teams.', 'Shield', '["Search & Rescue", "Medical Assistance", "Fire Response"]', 'active'),
('Disaster Preparedness', 'Regular training programs for community members, volunteers, and responders.', 'Heart', '["First Aid Training", "DRRM Workshops", "Drills"]', 'active'),
('Disaster Response', 'Comprehensive hazard, vulnerability, and capacity assessments for communities.', 'Truck', '["Flood Mapping", "Risk Analysis", "Mitigation Plans"]', 'active'),
('Disaster Recovery & Rehabilitation', 'Engagement initiatives to build disaster-resilient communities.', 'Home', '["Barangay DRRM", "School Programs", "Volunteer Network"]', 'active');

INSERT INTO about_sections (title, content, order_index, is_active) VALUES
('Mission', 'To ensure the safety and resilience of Pio Duran through effective disaster risk reduction and management.', 1, true),
('Vision', 'A disaster-resilient community with zero casualties through proactive preparedness and efficient response.', 2, true),
('Goal', 'To reduce vulnerability and enhance capacity of communities to prepare for, respond to, and recover from disasters.', 3, true);

INSERT INTO gallery (title, description, image, category, date, location, tags, status, featured) VALUES
('BDRRM Planning Training Workshop', 'Training session on Barangay Disaster Risk Reduction and Management Planning at Barangay Basicao Interior.', 'https://res.cloudinary.com/dedcmctqk/image/upload/v1750575265/487673077_1062718335885316_7552782387266701410_n_gexfn2.jpg', 'Training', '2024-06-25', 'Barangay Basicao Interior', '["BDRRM", "Training", "Workshop", "Barangay Officials"]', 'published', true),
('Nationwide Simultaneous Earthquake Drill', 'Municipality participated in the 2nd quarter nationwide simultaneous earthquake drill with over 5,000 participants.', 'https://res.cloudinary.com/dedcmctqk/image/upload/v1750575261/489043126_1065374988952984_1331524645056736117_n_fbmvch.jpg', 'Drill', '2023-06-09', 'Municipality-wide', '["Earthquake", "Drill", "Safety", "Community"]', 'published', false),
('Water Rescue Training Course', '20 volunteers completed intensive training in Basic Life Support, survival skills, and Water Search and Rescue (WASAR).', 'https://res.cloudinary.com/dedcmctqk/image/upload/v1750575263/472984055_1002760098547807_5747993743270536498_n_cgi07u.jpg', 'Training', '2021-11-19', 'Training Center', '["Water Rescue", "WASAR", "Volunteers", "Life Support"]', 'published', false);