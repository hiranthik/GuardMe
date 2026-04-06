import { NextRequest, NextResponse } from 'next/server';
import { bustCache } from '../survey/route';

export async function POST(req: NextRequest) {
  const token = req.headers.get('x-token');

  if (token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  bustCache();
  return NextResponse.json({ revalidated: true });
}