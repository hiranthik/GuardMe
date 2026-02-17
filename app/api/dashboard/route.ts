import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    users: 124,
    activeSessions: 37,
    threatsBlocked: 9,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(data);
}
