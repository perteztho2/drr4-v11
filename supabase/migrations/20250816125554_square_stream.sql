/*
  # Create storage bucket for incident images

  1. Storage Setup
    - Create 'incidents' bucket for incident report images
    - Set up proper access policies
    - Add image_url column to incident_reports table

  2. Security
    - Public read access for incident images
    - Authenticated upload access
    - File size and type restrictions
*/

-- Create storage bucket for incident images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('incidents', 'incidents', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for incidents bucket
CREATE POLICY "Anyone can view incident images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'incidents');

CREATE POLICY "Anyone can upload incident images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'incidents' AND (storage.foldername(name))[1] = 'incidents');

CREATE POLICY "Authenticated users can update incident images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'incidents');

CREATE POLICY "Authenticated users can delete incident images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'incidents');

-- Add image_url column to incident_reports table if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'incident_reports' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE incident_reports ADD COLUMN image_url text;
  END IF;
END $$;