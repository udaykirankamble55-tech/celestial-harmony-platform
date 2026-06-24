import { NextResponse } from "next/server";
import { google } from "googleapis";

// ── RATE LIMITER MEMORY CACHE (Cost: ₹0) ──
const spamTracker = new Map<string, number[]>();
const MAX_SUBMISSIONS = 3;         // Max allowed forms per user
const TIME_WINDOW = 5 * 60 * 1000; // 5-minute cooling window

export async function POST(request: Request) {
  // 1. EXTRACT CLIENT IP ADDRESS FOR RATE LIMITING DEFENSE
  const ip = request.headers.get("x-forwarded-for") || "anonymous_client";
  const currentTime = Date.now();

  if (!spamTracker.has(ip)) {
    spamTracker.set(ip, []);
  }
  
  const timestamps = spamTracker.get(ip)!;
  
  // Filter out any timestamps older than the 5-minute window
  const activeTimestamps = timestamps.filter(time => currentTime - time < TIME_WINDOW);

  // Trigger immediate block if a bot or spammer floods the route
  if (activeTimestamps.length >= MAX_SUBMISSIONS) {
    return NextResponse.json(
      { error: "Too many submission requests. Please slow down and wait 5 minutes." }, 
      { status: 429 } // HTTP 429 Too Many Requests
    );
  }

  // Record this current safe processing attempt
  activeTimestamps.push(currentTime);
  spamTracker.set(ip, activeTimestamps);

  try {
    // 2. PARSE INCOMING DATA PACKET FROM THE ABOUT US / ENQUIRY FORM
    const body = await request.json();
    const { source, name, phone, email, instrument, message } = body;

    // 3. AUTHENTICATE WITH GOOGLE API CREDENTIALS (100% Free Tier)
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        // Replace escaped newline characters inside private key strings dynamically
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // 4. APPEND THE DATA ROW SMOOTHLY INTO YOUR GOOGLE SHEET
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: "Sheet1!A:G", // Targets columns A through G inside your main sheet tab
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }), // Timestamp
            source || "Academy Web Form",
            name || "N/A",
            phone || "N/A",
            email || "N/A",
            instrument || "N/A",
            message || "N/A"
          ]
        ]
      }
    });

    // Return a perfect success response back to the client UI lines
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error("Database Integration Pipeline Error Log:", error);
    return NextResponse.json(
      { error: "Internal database server failure. Row logging interrupted." }, 
      { status: 500 }
    );
  }
}