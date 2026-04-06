import { google } from "googleapis";
import { NextResponse } from "next/server";

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({ version: "v4", auth });

// simple cache
let cache: { rows: any[]; timestamp: number } | null = null;
const CACHE_TTL = 30 * 1000; // 30 seconds

export async function GET() {
  try {
    // return cached data if fresh
    if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
      return NextResponse.json({ rows: cache.rows });
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Sheet1!A2:AD",
    });

    const rows = response.data.values ?? [];

    // update cache
    cache = { rows, timestamp: Date.now() };

    return NextResponse.json({ rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load survey data" },
      { status: 500 }
    );
  }
}

// called by Apps Script webhook to bust the cache instantly
export function bustCache() {
  cache = null;
}