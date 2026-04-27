import { db } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!db) {
    return Response.json({ ok: true, message: "Database not configured" });
  }

  try {
    await db.execute(sql`select 1`);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Health check DB error:", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
