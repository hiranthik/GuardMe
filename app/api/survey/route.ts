import { google } from "googleapis";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

const sheetsAuth = new google.auth.JWT({  
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"], 
});

const dataSheets = google.sheets({ version: "v4", auth: sheetsAuth });

//memory to reduce API calls 
let surveyCache: { rows: any[]; timestamp: number } | null = null;
const ttlOfCache = 30 * 1000; //30 seconds

export async function GET() {
  try {
    
  if (surveyCache && Date.now() - surveyCache.timestamp < ttlOfCache) { 
      return NextResponse.json({ rows: surveyCache.rows }); //rows fetched are saved to cache
    }

    const response = await dataSheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Sheet1!A2:AD", //range fetched from the GS
    })

  const rows = response.data.values ?? [];
  surveyCache = { rows, timestamp: Date.now() };  

    return NextResponse.json({ rows });
  } catch (error) {
    console.error(error);

    //sentry error detection
  Sentry.captureException(error, {  
      extra: {
      endpoint: "survey",
      service: "google sheets",
      } 
    })
    return NextResponse.json(
      { error: "Failed to load data. Please try again." },
    )
  }
}

export function clearCache() {
  surveyCache = null;
};