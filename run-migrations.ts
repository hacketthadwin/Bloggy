import 'dotenv/config'; 
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db, pool } from './db/index'; // Import db and pool from the file above

async function runMigrations() {
  console.log("Starting database migrations...");

  try {
    // 1. Run migrations against the database
    await migrate(db, {
      migrationsFolder: './drizzle/migrations', 
    });

    console.log("Migrations applied successfully.");

  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    // 2. IMPORTANT: Close the connection pool after migrations complete
    await pool.end();
    process.exit(0);
  }
}

runMigrations();