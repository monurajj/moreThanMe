#!/usr/bin/env node
const key = process.env.ADMIN_SEED_KEY || process.env.NEXT_PUBLIC_ADMIN_SECRET || "letsgooo";
const url = process.env.SEED_URL || "http://localhost:3000";
fetch(`${url}/api/admin/seed?key=${key}`, { method: "POST" })
  .then((r) => r.json())
  .then((d) => console.log(d.ok ? "✓ Super admin seeded." : "✗", d))
  .catch((e) => console.error("Error. Is the dev server running? (npm run dev)", e.message));
