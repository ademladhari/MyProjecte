import util from "util";
import db from '../../../util/db';
import { NextRequest, NextResponse } from 'next/server';

const query = util.promisify(db.query).bind(db);

const API_KEY = process.env.API_KEY; 
// Import your database utility function

export const GET = async (req: NextRequest) => {
  const ITEM_PER_PAGE = 10;
  const apiKey = req.headers.get('x-api-key');
  
  if(apiKey !== API_KEY){
    return new NextResponse("Unauthorized", { status: 401 }); // Corrected status code
  }
  
  try {
    const page = parseInt(req.nextUrl.searchParams.get('page') || '1'); // Default to page 1 if not provided
    const offset = (page - 1) * ITEM_PER_PAGE;
    
    const notificationQuery = `SELECT * FROM notificationTokens LIMIT ${ITEM_PER_PAGE} OFFSET ${offset}`; // Corrected table name
    const countQuery = "SELECT COUNT(*) AS total FROM notificationTokens"; // Corrected table name
  
    const [notifications, countResult] = await Promise.all([
      query(notificationQuery),
      query(countQuery)
    ]);
  
    const count = countResult[0].total;
  
    return new NextResponse(JSON.stringify({ notifications, count }), { status: 200 });
  } catch (error) {
    console.error("Error fetching notifications:", error); // Log the error for debugging
    return new NextResponse("Error fetching notifications", { status: 500 }); // Internal Server Error
  }
}

export const POST = async (req: NextRequest) => {
  const apiKey = req.headers.get('x-api-key');
  
  if(apiKey !== API_KEY){
    return new NextResponse("Unauthorized", { status: 401 }); // Corrected status code
  }

  try {
    const { UserID, NotificationToken } = await req.json(); // Assuming the request body contains UserID and NotificationToken
  
    // Insert the new notification into the database
    const insertQuery = `
      INSERT INTO notificationTokens (UserID, NotificationToken)
      VALUES (?, ?)
    `;
    const insertResult = await query(insertQuery, [UserID, NotificationToken]);
  
    return new NextResponse("Notification added successfully", { status: 201 });
  } catch (error) {
    console.error("Error adding notification:", error); // Log the error for debugging
    return new NextResponse("Error adding notification", { status: 500 }); // Internal Server Error
  }
}
 