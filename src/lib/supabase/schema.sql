-- Somou Al-Badia Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tents table
CREATE TABLE IF NOT EXISTS tents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_en VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  
  category VARCHAR(100) NOT NULL CHECK (category IN ('royal', 'luxury', 'premium', 'standard')),
  
  capacity INTEGER NOT NULL,
  area_sqm DECIMAL(10,2) NOT NULL,
  
  price_per_night DECIMAL(10,2) NOT NULL,
  
  features_en TEXT[] NOT NULL,
  features_ar TEXT[] NOT NULL,
  
  amenities_en TEXT[] NOT NULL,
  amenities_ar TEXT[] NOT NULL,
  
  images TEXT[] NOT NULL,
  video_url TEXT,
  
  location_name_en VARCHAR(255),
  location_name_ar VARCHAR(255),
  location_lat DECIMAL(10,8),
  location_lng DECIMAL(11,8),
  
  is_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  
  min_nights INTEGER DEFAULT 1,
  max_nights INTEGER DEFAULT 30,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tent_id UUID NOT NULL REFERENCES tents(id) ON DELETE CASCADE,
  
  guest_name VARCHAR(255) NOT NULL,
  guest_email VARCHAR(255) NOT NULL,
  guest_phone VARCHAR(50) NOT NULL,
  
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  nights INTEGER NOT NULL,
  guests INTEGER NOT NULL,
  
  total_price DECIMAL(10,2) NOT NULL,
  
  special_requests TEXT,
  
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  
  payment_status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  
  n8n_webhook_sent BOOLEAN DEFAULT false,
  n8n_webhook_sent_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tent_id UUID NOT NULL REFERENCES tents(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  
  guest_name VARCHAR(255) NOT NULL,
  
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  
  is_verified BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Availability calendar table (for blocking dates)
CREATE TABLE IF NOT EXISTS availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tent_id UUID NOT NULL REFERENCES tents(id) ON DELETE CASCADE,
  
  date DATE NOT NULL,
  is_available BOOLEAN DEFAULT true,
  
  UNIQUE(tent_id, date)
);

-- Indexes for performance
CREATE INDEX idx_tents_category ON tents(category);
CREATE INDEX idx_tents_is_available ON tents(is_available);
CREATE INDEX idx_tents_is_featured ON tents(is_featured);
CREATE INDEX idx_tents_slug ON tents(slug);

CREATE INDEX idx_bookings_tent_id ON bookings(tent_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_check_in ON bookings(check_in);
CREATE INDEX idx_bookings_check_out ON bookings(check_out);

CREATE INDEX idx_reviews_tent_id ON reviews(tent_id);
CREATE INDEX idx_reviews_is_approved ON reviews(is_approved);

CREATE INDEX idx_availability_tent_id ON availability(tent_id);
CREATE INDEX idx_availability_date ON availability(date);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_tents_updated_at BEFORE UPDATE ON tents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) - Enable if needed
ALTER TABLE tents ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

-- Public read access for tents
CREATE POLICY "Tents are viewable by everyone" ON tents
  FOR SELECT USING (true);

-- Public read access for approved reviews
CREATE POLICY "Approved reviews are viewable by everyone" ON reviews
  FOR SELECT USING (is_approved = true);

-- Public insert access for bookings (will validate server-side)
CREATE POLICY "Anyone can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

-- Public read access for availability
CREATE POLICY "Availability is viewable by everyone" ON availability
  FOR SELECT USING (true);
