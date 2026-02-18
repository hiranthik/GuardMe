import { google } from "googleapis";
import { NextResponse } from "next/server";

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({ version: "v4", auth });

export async function GET() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Form Responses 1!A2:A", // only Score column
    });

    const rows = response.data.values ?? []; // [["20/20"], ["18/20"], ...]

    return NextResponse.json({ rows }); // send rows to frontend
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load survey data" },
      { status: 500 }
    );
  }
}
