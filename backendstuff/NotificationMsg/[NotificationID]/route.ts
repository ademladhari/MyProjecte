
import util from"../../../../util/db"
import db from '../../../../util/db';
import { NextRequest, NextResponse } from 'next/server';

const query = util.promisify(db.query).bind(db);

const API_KEY = process.env.API_KEY; 
export const DELETE = async (req: NextRequest,context: any) => {
  const apiKey = req.headers.get('x-api-key');
  const { params } = context;

  if(apiKey !== API_KEY){
    return new NextResponse("Unauthorized", { status: 400 }); 
  }

  try {
    console.log(params)
    const { NotificationID } = params; // Extract UserID from the URL path
   console.log(NotificationID)
    // Validate UserID (you can add more validation as needed)
    console.log(JSON.stringify(NotificationID));

    // Delete the notifications for the specified UserID from the database
    const deleteQuery = `
      DELETE FROM notificationTokens
      WHERE NotificationToken = ?
    `;
    const deleteResult = await query(deleteQuery, [NotificationID]);

    // Check if any notifications were deleted
    if (deleteResult.affectedRows > 0) {
      return new NextResponse("Notifications deleted successfully", { status: 200 });
    } else {
      return new NextResponse("No notifications found for the specified UserID", { status: 404 });
    }
  } catch (error) {
    return new NextResponse("Error deleting notifications", { status: 400 }); 
  }
}