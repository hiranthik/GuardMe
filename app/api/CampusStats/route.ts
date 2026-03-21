import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. Setup Authentication
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // 2. Load the Sheet
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID!, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; 
    const rows = await sheet.getRows();

    // 3. Initialize Data Structure
    const stats: Record<string, { totalScore: number; count: number }> = {
      'Sault Ste. Marie': { totalScore: 0, count: 0 },
      'Brampton': { totalScore: 0, count: 0 },
      'Timmins': { totalScore: 0, count: 0 },
    };

    // 4. Aggregate Scores
    rows.forEach((row) => {
      // Ensure these match your Google Sheet column headers exactly
      const campus = row.get('Campus'); 
      const score = parseFloat(row.get('Score')); 

      if (stats[campus]) {
        stats[campus].totalScore += score;
        stats[campus].count += 1;
      }
    });

    // 5. Calculate Percentages (Score is out of 20)
    const chartData = Object.keys(stats).map((name) => {
      const { totalScore, count } = stats[name];
      const average = count > 0 ? totalScore / count : 0;
      const percentage = (average / 20) * 100;

      return {
        name,
        'Literacy Rate': Math.round(percentage),
      };
    });

    return NextResponse.json(chartData);
  } catch (error) {
    console.error('Google Sheets Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}