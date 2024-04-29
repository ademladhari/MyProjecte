import { NextResponse } from "next/server";
import util from "util";
import db from "../../../../util/db";
var jwt = require('jsonwebtoken');

const query = util.promisify(db.query).bind(db);

export const POST = async (req: any) => {
  try {
    // Parse the JSON data from the request body
    const { email, password } = await req.json();
    
    // Query the database to retrieve the user with the provided email and password
    const sql = "SELECT * FROM users WHERE Email = ? AND Password = ?";
    const values = [email, password];
    const user = await query(sql, values);

    // Check if a user with the provided email and password exists
    if (user.length === 1) {
      // If user exists and password is correct, generate JWT token
      const token = jwt.sign({ email }, 'your_secret_key_here', { expiresIn: '1h' });

      // Include the token in the response body along with user data
      const responseData = {
        user: user[0],
        token: token
      };

      // Return success response with user data and token
      return new NextResponse(JSON.stringify(responseData), { status: 200 });
    } else {
      // If user doesn't exist or password is incorrect, return error response
      return new NextResponse("Invalid email or password", { status: 401 });
    }
  } catch (error: any) {
    // Handle any errors that occur during the process
    console.error(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
};