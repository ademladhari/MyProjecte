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
    
    const notificationQuery = `SELECT * FROM notificationHistory LIMIT ${ITEM_PER_PAGE} OFFSET ${offset}`; // Corrected table name
    const countQuery = "SELECT COUNT(*) AS total FROM notificationHistory"; // Corrected table name
  
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
  
  if (apiKey !== API_KEY) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const {  Message, DemandID } = await req.json();

    const insertQuery = `
      INSERT INTO notificationHistory (Message, DemandID, CreatedDate)
      VALUES (?, ?, NOW())
    `;
    
    const insertResult = await query(insertQuery, [Message, DemandID]);

    return new NextResponse("Notification added successfully", { status: 201 });
  } catch (error) {
    console.error("Error adding notification:", error);
    return new NextResponse("Error adding notification", { status: 500 });
  }
}
// Mock function to simulate database query execution
// You would replace this with your actual database query function

 