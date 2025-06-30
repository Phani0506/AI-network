/*
  # Create storage buckets for user data

  1. New Storage Buckets
    - `profile-images` - For user profile pictures and avatars
    - `portfolio-files` - For user portfolio documents, images, and media
    - `chat-attachments` - For file attachments in chat messages
    - `user-documents` - For general user document uploads

  2. Security Policies
    - Enable public read access for profile images
    - Restrict upload/update/delete to authenticated users or public for demo
    - Set appropriate file size and type restrictions
*/

-- Create profile images bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profile-images',
  'profile-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Create portfolio files bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-files',
  'portfolio-files',
  true,
  52428800, -- 50MB limit
  ARRAY[
    'image/jpeg', 'image/png', 'image/webp', 'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'video/mp4', 'video/webm',
    'audio/mpeg', 'audio/wav'
  ]
) ON CONFLICT (id) DO NOTHING;

-- Create chat attachments bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'chat-attachments',
  'chat-attachments',
  false, -- Private by default
  10485760, -- 10MB limit
  ARRAY[
    'image/jpeg', 'image/png', 'image/webp', 'image/gif',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
) ON CONFLICT (id) DO NOTHING;

-- Create user documents bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'user-documents',
  'user-documents',
  false, -- Private by default
  20971520, -- 20MB limit
  ARRAY[
    'image/jpeg', 'image/png', 'image/webp', 'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'text/csv'
  ]
) ON CONFLICT (id) DO NOTHING;

-- Storage policies for profile-images bucket (public read, public upload for demo)
CREATE POLICY "Public can view profile images"
  ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'profile-images');

CREATE POLICY "Anyone can upload profile images"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'profile-images');

CREATE POLICY "Anyone can update their profile images"
  ON storage.objects
  FOR UPDATE
  TO anon
  USING (bucket_id = 'profile-images');

CREATE POLICY "Anyone can delete their profile images"
  ON storage.objects
  FOR DELETE
  TO anon
  USING (bucket_id = 'profile-images');

-- Storage policies for portfolio-files bucket (public read, public upload for demo)
CREATE POLICY "Public can view portfolio files"
  ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'portfolio-files');

CREATE POLICY "Anyone can upload portfolio files"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'portfolio-files');

CREATE POLICY "Anyone can update their portfolio files"
  ON storage.objects
  FOR UPDATE
  TO anon
  USING (bucket_id = 'portfolio-files');

CREATE POLICY "Anyone can delete their portfolio files"
  ON storage.objects
  FOR DELETE
  TO anon
  USING (bucket_id = 'portfolio-files');

-- Storage policies for chat-attachments bucket (restricted access)
CREATE POLICY "Users can view chat attachments"
  ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'chat-attachments');

CREATE POLICY "Anyone can upload chat attachments"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'chat-attachments');

CREATE POLICY "Anyone can update their chat attachments"
  ON storage.objects
  FOR UPDATE
  TO anon
  USING (bucket_id = 'chat-attachments');

CREATE POLICY "Anyone can delete their chat attachments"
  ON storage.objects
  FOR DELETE
  TO anon
  USING (bucket_id = 'chat-attachments');

-- Storage policies for user-documents bucket (restricted access)
CREATE POLICY "Users can view their documents"
  ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'user-documents');

CREATE POLICY "Anyone can upload user documents"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'user-documents');

CREATE POLICY "Anyone can update their documents"
  ON storage.objects
  FOR UPDATE
  TO anon
  USING (bucket_id = 'user-documents');

CREATE POLICY "Anyone can delete their documents"
  ON storage.objects
  FOR DELETE
  TO anon
  USING (bucket_id = 'user-documents');