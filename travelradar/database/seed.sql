-- Clear old entries for fresh testing
TRUNCATE TABLE pois RESTART IDENTITY;

-- Insert sample Kochi POIs with Longitude, Latitude coordinates (SRID 4326)
INSERT INTO pois (name, category, estimated_cost, rating, sentiment_score, location)
VALUES
  ('Kochi Fort Cafe', 'Cafe', 250.00, 4.5, 0.88, ST_SetSRID(ST_MakePoint(76.2599, 9.9658), 4326)::geography),
  ('Heritage Art Museum', 'Culture', 150.00, 4.2, 0.75, ST_SetSRID(ST_MakePoint(76.2621, 9.9642), 4326)::geography),
  ('Seaside Seafood Grill', 'Restaurant', 650.00, 4.7, 0.92, ST_SetSRID(ST_MakePoint(76.2575, 9.9680), 4326)::geography),
  ('Local Street Food Stall', 'Street Food', 80.00, 4.0, 0.65, ST_SetSRID(ST_MakePoint(76.2610, 9.9630), 4326)::geography),
  ('Marine Drive Promenade', 'Park', 0.00, 4.6, 0.90, ST_SetSRID(ST_MakePoint(76.2785, 9.9789), 4326)::geography);