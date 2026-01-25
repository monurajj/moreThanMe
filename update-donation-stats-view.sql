-- Update donation_stats view with new structure
-- Run this in your Supabase SQL Editor to update the existing view

DROP VIEW IF EXISTS donation_stats;

CREATE VIEW donation_stats AS
SELECT
  COUNT(*) as total_donations,
  SUM(amount) as total_amount,
  AVG(amount) as average_amount,
  MAX(amount) as max_amount,
  COUNT(
    CASE
      WHEN receipt_processing_status::text = 'completed'::text THEN 1
      ELSE null::integer
    END
  ) as receipts_processed,
  COUNT(
    CASE
      WHEN receipt_confidence >= 0.8 THEN 1
      ELSE null::integer
    END
  ) as high_confidence_receipts,
  COUNT(
    CASE
      WHEN status::text = 'verified'::text THEN 1
      ELSE null::integer
    END
  ) as verified_donations,
  COUNT(
    CASE
      WHEN status::text = 'pending_verification'::text THEN 1
      ELSE null::integer
    END
  ) as pending_donations
FROM donations; 