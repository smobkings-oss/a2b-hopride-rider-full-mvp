-- A2B Rides / HopRide / GrokRide Supabase Schema
-- Run this in the Supabase SQL Editor

-- Enable PostGIS for geo queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- Profiles (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  role TEXT CHECK (role IN ('rider', 'driver', 'admin')) DEFAULT 'rider',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Driver specific
CREATE TABLE public.driver_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  vehicle_make TEXT,
  vehicle_model TEXT,
  vehicle_plate TEXT,
  is_tesla BOOLEAN DEFAULT FALSE,
  license_number TEXT,
  insurance_url TEXT,
  is_online BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  average_rating NUMERIC DEFAULT 5.0,
  total_rides INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Driver locations (realtime)
CREATE TABLE public.driver_locations (
  driver_id UUID REFERENCES public.driver_profiles(id) PRIMARY KEY,
  location GEOGRAPHY(POINT, 4326),
  heading INT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rides
CREATE TYPE ride_status AS ENUM (
  'requested', 'searching', 'accepted', 'arrived', 
  'picked_up', 'in_progress', 'completed', 'cancelled'
);

CREATE TYPE ride_type AS ENUM ('instant', 'scheduled');

CREATE TABLE public.rides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rider_id UUID REFERENCES auth.users(id) NOT NULL,
  driver_id UUID REFERENCES public.driver_profiles(id),
  ride_type ride_type NOT NULL DEFAULT 'instant',
  status ride_status NOT NULL DEFAULT 'requested',
  
  pickup_address TEXT NOT NULL,
  pickup_location GEOGRAPHY(POINT, 4326),
  dropoff_address TEXT NOT NULL,
  dropoff_location GEOGRAPHY(POINT, 4326),
  
  scheduled_at TIMESTAMPTZ,
  estimated_fare NUMERIC,
  actual_fare NUMERIC,
  surge_multiplier NUMERIC DEFAULT 1.0,
  distance_km NUMERIC,
  duration_minutes INT,
  
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  
  rider_rating INT CHECK (rider_rating BETWEEN 1 AND 5),
  driver_rating INT CHECK (driver_rating BETWEEN 1 AND 5),
  notes TEXT
);

-- Indexes
CREATE INDEX idx_rides_rider ON public.rides(rider_id);
CREATE INDEX idx_rides_driver ON public.rides(driver_id);
CREATE INDEX idx_rides_status ON public.rides(status);
CREATE INDEX idx_driver_locations_gist ON public.driver_locations USING GIST(location);

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rides ENABLE ROW LEVEL SECURITY;

-- Policies (basic - expand as needed)
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can view approved drivers" ON public.driver_profiles
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Drivers update own profile" ON public.driver_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public can see online driver locations" ON public.driver_locations
  FOR SELECT USING (true);

CREATE POLICY "Drivers update own location" ON public.driver_locations
  FOR ALL USING (auth.uid() = driver_id);

CREATE POLICY "Riders can create rides" ON public.rides
  FOR INSERT WITH CHECK (auth.uid() = rider_id);

CREATE POLICY "Riders and assigned drivers can view rides" ON public.rides
  FOR SELECT USING (
    auth.uid() = rider_id OR 
    auth.uid() = driver_id
  );

CREATE POLICY "Drivers can update assigned rides" ON public.rides
  FOR UPDATE USING (auth.uid() = driver_id);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'rider');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
