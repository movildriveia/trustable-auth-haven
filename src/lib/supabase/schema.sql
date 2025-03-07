
-- Drop existing tables if they exist (in reverse order of dependencies)
-- Use CASCADE to also drop dependent objects
DROP TABLE IF EXISTS document_permissions CASCADE;
DROP TABLE IF EXISTS document_logs CASCADE;
DROP VIEW IF EXISTS user_documents CASCADE;
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table with updated fields for settings and document tracking
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  full_name TEXT,
  avatar_url TEXT,
  company_name TEXT,
  company_description TEXT,
  company_website TEXT,
  company_size TEXT,
  company_industry TEXT,
  is_company BOOLEAN DEFAULT FALSE,
  
  -- Document tracking fields
  doc_count INTEGER DEFAULT 0,
  doc_1 TEXT,
  doc_2 TEXT,
  doc_3 TEXT,
  doc_4 TEXT,
  doc_5 TEXT,
  doc_6 TEXT,
  doc_7 TEXT,
  doc_8 TEXT,
  doc_9 TEXT,
  doc_10 TEXT,
  doc_11 TEXT,
  doc_12 TEXT,
  doc_13 TEXT,
  doc_14 TEXT,
  doc_15 TEXT,
  doc_16 TEXT,
  doc_17 TEXT,
  doc_18 TEXT,
  doc_19 TEXT,
  doc_20 TEXT,
  
  -- AI Service settings
  google BOOLEAN DEFAULT FALSE,
  aws BOOLEAN DEFAULT FALSE,
  azure BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email_verified BOOLEAN DEFAULT FALSE
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  document_url TEXT,
  file_type TEXT,
  file_size INTEGER,
  file_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE
);

-- Create a document logs table to track document activities
CREATE TABLE IF NOT EXISTS document_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL,
  user_id UUID NOT NULL,
  action_type TEXT NOT NULL,
  action_details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE
);

-- Create a table to track document access permissions
CREATE TABLE IF NOT EXISTS document_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL,
  user_id UUID NOT NULL,
  permission_level TEXT NOT NULL CHECK (permission_level IN ('read', 'write', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE,
  UNIQUE(document_id, user_id)
);

-- Create a view to show user documents with additional info
CREATE OR REPLACE VIEW user_documents AS
SELECT 
  d.*,
  p.full_name as owner_name,
  p.email as owner_email
FROM 
  documents d
JOIN 
  profiles p ON d.user_id = p.id;

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_permissions ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create policies for documents
CREATE POLICY "Users can view their own documents"
  ON documents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documents"
  ON documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents"
  ON documents FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents"
  ON documents FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for document_logs
CREATE POLICY "Users can view logs for their documents"
  ON document_logs FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM documents 
      WHERE documents.id = document_logs.document_id 
      AND documents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert logs for their actions"
  ON document_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policies for document_permissions
CREATE POLICY "Users can view document permissions they have access to"
  ON document_permissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Document owners can manage permissions"
  ON document_permissions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM documents 
      WHERE documents.id = document_permissions.document_id 
      AND documents.user_id = auth.uid()
    )
  );

-- Create a function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    first_name,
    last_name,
    full_name,
    company_name,
    email_verified,
    doc_count,
    google,
    aws,
    azure
  )
  VALUES (
    new.id, 
    new.email, 
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', ''),
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'company_name', ''),
    new.email_confirmed,
    0,
    false,
    false,
    false
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Set up the trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create a function to update email verification status
CREATE OR REPLACE FUNCTION public.handle_email_confirmation() 
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles
  SET email_verified = new.email_confirmed
  WHERE id = new.id;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Set up the trigger for email confirmation
CREATE TRIGGER on_auth_email_confirmed
  AFTER UPDATE OF email_confirmed ON auth.users
  FOR EACH ROW
  WHEN (OLD.email_confirmed = false AND NEW.email_confirmed = true)
  EXECUTE FUNCTION public.handle_email_confirmation();
