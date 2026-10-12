// Creates the admin tables in Neon:  npm run db:setup
import "dotenv/config";
import { ensureSchema, sql } from "../app/lib/db";

ensureSchema()
  .then(async () => {
    const tables = await sql`select table_name from information_schema.tables where table_schema = 'public' order by 1`;
    console.log("Tables ready:", tables.map((t) => t.table_name).join(", "));
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
