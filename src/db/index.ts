import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

// Only initialize the pool if we have a URL, otherwise use a null/proxy pattern or handle at call-site
// For this portfolio, we likely don't even need the DB, so we'll just guard the initialization.
export const pool = databaseUrl 
  ? (globalForDb.__arenaNextJsPostgresqlPool ?? new Pool({ connectionString: databaseUrl }))
  : null;

if (pool && process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

// Handle the case where pool might be null
export const db = pool ? drizzle(pool) : null;
