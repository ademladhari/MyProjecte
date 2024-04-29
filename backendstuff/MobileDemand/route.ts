// pages/api/users/index.tsx

import util from "util";
import db from '../../../util/db';
import { NextRequest, NextResponse } from 'next/server';
import qr from 'qrcode';
import { ExpoPushMessage, Expo } from 'expo-server-sdk';
import axios from "axios";
export const getApi = axios.create({
    baseURL: "http://192.168.0.4:3000/api/",
    headers: { "Content-Type": "application/json", "x-api-key": "1111" },
    withCredentials: true,
  });

const query = util.promisify(db.query).bind(db);

const API_KEY = process.env.API_KEY; 
export const POST = async (req: Request) => {
    const apiKey = req.headers.get('x-api-key');
    if (apiKey !== API_KEY) {
        return new NextResponse("Unauthorized", { status: 400 });
    }
    const response = await getApi.get(`/NotificationTokens`); // Adjust the URL as per your API endpoint

    try {
        const demand = await req.json();

        // Set isFacture to 0 if it is not provided or is null
        let isFacture = demand.isFacture !== undefined ? demand.isFacture : "0";

        // Check if both arrival and departure labs exist in the database
        const arrivalLabExistsQuery = "SELECT COUNT(*) AS count FROM users WHERE UserID = ?";
        const departureLabExistsQuery = "SELECT COUNT(*) AS count FROM users WHERE UserID = ?";

        const arrivalLabExistsResult = await query(arrivalLabExistsQuery, [demand.arrivallab]);
        const departureLabExistsResult = await query(departureLabExistsQuery, [demand.departurelab]);

        const arrivalLabExists = arrivalLabExistsResult[0].count > 0;
        const departureLabExists = departureLabExistsResult[0].count > 0;

        if (!arrivalLabExists || !departureLabExists) {
            return new NextResponse("Arrival or departure lab does not exist", { status: 400 });
        }
        const demandSql = "INSERT INTO demandes (requestName,Status, arrivallab, departurelab, temperature, codeQr, Statusdate, RequestResult, quotaUsed,isFacture,agentUserID) VALUES (?,?, ?, ?, ?, ?, NOW(), ?, ?, ?,?)";
        sendNotification(response.data.notifications,demand.requestName,demand.Statusdate)
        // Insert the demand into the database
        const demandInsertionResult = await query(demandSql, [
            demand.requestName,
            demand.Status,
            demand.arrivallab,
            demand.departurelab,
            demand.temperature,
            null, // Placeholder for codeQr
            demand.RequestResult,
            demand.quotaUsed,
            isFacture,
            demand.agentUserID
        ]);
        const ownid = demandInsertionResult.insertId; // Here's the auto-incremented ID
  console.log(ownid)
        const NotificationHistory = await getApi.post("/NotificationMsg", {
            Message: `a demand  have been added ${demand.requestName} `,
            DemandID: ownid
          });

        // Retrieve the last inserted ID
        const insertId = demandInsertionResult.insertId;
        // Generate QR code using the insertId
        const codeQr = await generateQRCode({  insertId,status:demand.Status });

        // Update the demand with the generated QR code
        await query("UPDATE demandes SET codeQr = ? WHERE demandId = ?", [codeQr, insertId]);

        return new NextResponse("Demand added successfully", { status: 201 });
    } catch (error: any) {
        console.error(error);
        return new NextResponse("Error adding demand", { status: 400 });
    }
};


const expo = new Expo();
var sendNotification = async (tokens:any,requestName:string,date:string) => {
    try {
     
   console.log(tokens)
      var notifications = [];
      for (var i = 0; i < tokens.length; i++) {
        const notification = {
            to: tokens[i].NotificationToken,
            sound: 'default',
            title: 'New Demand have been Added !',
            body: `${requestName} at : ${date}`,
          };
        notifications.push(notification);
      }
      console.log(notifications);
      const chunks = expo.chunkPushNotifications(notifications);
      const tickets = [];
  
      for (const chunk of chunks) {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      }
      console.log("Push notification sent successfully!", tickets);
    } catch (error) {
      console.error("Error sending push notification:", error);
    }
  };
  


async function generateQRCode(data: any) {
    try {
        const url = JSON.stringify(data); // Convert data to string for QR code
        return await qr.toDataURL(url); // Generate QR code image data URL
    } catch (error) {
        console.error("Error generating QR code:", error);
        throw error;            
    }
}


export const GET = async (req: NextRequest) => {
    const ITEM_PER_PAGE = 10;
    const apiKey = req.headers.get('x-api-key');
        
    if(apiKey !== API_KEY){
        return new NextResponse("Unauthorized", { status: 401 }); 
    }
    try {
        const page = parseInt(req.nextUrl.searchParams.get('page') || '1');
        const offset = (page - 1) * ITEM_PER_PAGE;
        const sortOrder = req.nextUrl.searchParams.get('sort') || 'desc';
        const includeAssigned = req.nextUrl.searchParams.get('includeAssigned') === 'true';
        
        let demandesQuery = `
        SELECT
            demandes.*,
            COALESCE(arrival_users.LabName, arrival_users.SocialReason) AS ArrivalLabName,
            COALESCE(arrival_users.city, arrival_users.address) AS ArrivalCity,
            COALESCE(arrival_users.Governorate, '') AS ArrivalGovernorate,
            COALESCE(arrival_users.Address, '') AS ArrivalAddress,
            COALESCE(arrival_users.PhoneLandline, '') AS ArrivalPhoneNumber,
            COALESCE(departure_users.LabName, departure_users.SocialReason) AS DepartureLabName,
            COALESCE(departure_users.city, departure_users.address) AS DepartureCity,
            COALESCE(departure_users.Governorate, '') AS DepartureGovernorate,
            COALESCE(departure_users.Address, '') AS DepartureAddress,
            COALESCE(departure_users.PhoneLandline, '') AS DeparturePhoneNumber
                
        FROM
            demandes
        LEFT JOIN
            users AS arrival_users ON demandes.arrivallab = arrival_users.UserID
        LEFT JOIN
            users AS departure_users ON demandes.departurelab = departure_users.UserID
        LEFT JOIN
            users AS agent_users ON demandes.agentUserID = agent_users.UserID
        WHERE
            demandes.agentUserID IS NULL
    `;
    
    let countQuery = "SELECT COUNT(*) AS total FROM demandes WHERE agentUserID IS NULL";
    
    demandesQuery += ` ORDER BY Statusdate ${sortOrder.toUpperCase()} `;
    demandesQuery += ` LIMIT ? OFFSET ?`; // Add pagination
    
    const queryParams = [ITEM_PER_PAGE, offset];
    
    const [demandes, countResult] = await Promise.all([
        query(demandesQuery, queryParams),
        query(countQuery)
    ]);
        const count = countResult[0].total;
        console.log(demandes)
        return new NextResponse(JSON.stringify({ demandes, count }), { status: 200 });
    } catch (error) {
        console.error("Error fetching demands:", error);
        return new NextResponse("Error fetching demands", { status: 500 }); 
    }
};



export const DELETE = async (req: Request) => {
  const apiKey = req.headers.get('x-api-key');
  if(apiKey !== API_KEY){
      return new NextResponse("Unauthorized", { status: 400 }); 
  }
  
  try {
      const demandID = (await req.json()).demandID;

      // Delete associated records in the `analysehistory` table
      const deleteAnalyseHistoryQuery = "DELETE FROM analysehistory WHERE demandID = ?";
      await query(deleteAnalyseHistoryQuery, [demandID]);
      
      // Once associated records are deleted, delete the demand from the `demandes` table
      const deleteDemandQuery = "DELETE FROM demandes WHERE demandID = ?";
      await query(deleteDemandQuery, [demandID]);

      return new NextResponse("Demand and associated records deleted successfully", { status: 200 });
  } catch (error) {
      console.error("Error deleting demand:", error);
      return new NextResponse("Error deleting demand", { status: 500 });
  }
};
