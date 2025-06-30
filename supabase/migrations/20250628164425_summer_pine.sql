/*
  # Create profiles table for networking app

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, unique, required)
      - `ikigai` (text, short description of purpose)
      - `skills` (text array, comma-separated skills)
      - `interests` (text array, personal interests)
      - `intent` (text, enum: cofounder, client, teammate)
      - `portfolio_url` (text, optional)
      - `linkedin` (text, optional)
      - `twitter` (text, optional)
      - `working_style` (text, description of work preferences)
      - `availability` (text, current availability status)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `profiles` table
    - Add policy for public read access (no auth system)
    - Add policy for public insert access
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  ikigai text NOT NULL,
  skills text[] DEFAULT '{}',
  interests text[] DEFAULT '{}',
  intent text NOT NULL CHECK (intent IN ('cofounder', 'client', 'teammate')),
  portfolio_url text,
  linkedin text,
  twitter text,
  working_style text NOT NULL,
  availability text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read profiles"
  ON profiles
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert profiles"
  ON profiles
  FOR INSERT
  TO anon
  WITH CHECK (true);