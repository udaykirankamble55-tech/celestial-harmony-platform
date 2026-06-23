import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { source, name, phone, email, instrument, message } = body;

    // Switched to a secure options object format to kill the parameter type bug for good
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Append the form data into your Google Sheet row
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID!,
      range: "01_Lead_Intake_Raw!A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
            source || "Website Form",
            name,
            phone,
            email || "Not Provided",
            instrument || "General Inquiry",
            message || "Inquiry initialized."
          ],
        ],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("GOOGLE_SHEETS_PIPELINE_ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}