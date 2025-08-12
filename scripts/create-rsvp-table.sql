-- Create RSVP table for storing wedding guest responses
CREATE TABLE IF NOT EXISTS rsvp_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  attending BOOLEAN NOT NULL,
  dietary_restrictions TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_rsvp_email ON rsvp_submissions(email);

-- Create index on attending status for filtering
CREATE INDEX IF NOT EXISTS idx_rsvp_attending ON rsvp_submissions(attending);
