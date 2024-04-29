import { NextRequest, NextResponse } from "next/server";
import util from "util";
import db from '../../../../util/db';
import fs from 'fs';
import path from 'path';
const API_KEY = process.env.API_KEY; 
const query = util.promisify(db.query).bind(db);

export const PATCH = async (req: NextRequest, context: any) => {
  const { params } = context;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== API_KEY) {
    return new NextResponse("Unauthorized", { status: 400 });
  }

  try {
    const { demandId } = params;
    const requestData = await req.json(); // Parse JSON payload

    console.log("Request Data:", requestData); // Log request data

    // Check if requestData is an array
    if (Array.isArray(requestData)) {
      // Loop through each demand in the array
      for (const demand of requestData) {
        const { Status, agentUserID } = demand;
        console.log("Status:", Status); // Log status
        console.log("Demand ID:", demand.DemandID); // Log demand ID

        // Construct SQL query to update demand status
        let updateDemandQuery = `
          UPDATE demandes
          SET Status = ?
          WHERE DemandID = ?`;
        
        const queryValues = [Status, demand.DemandID];

        // Check if agentUserID exists in the request data
        if (agentUserID !== undefined) {
           // Log agentuserid
          // Append agentUserID to the SQL query and add its value to the query values
          updateDemandQuery = `
            UPDATE demandes
            SET Status = ?,
                agentUserID = ?
            WHERE DemandID = ?`;
          queryValues.splice(1, 0, agentUserID);
        }

        console.log("Update Query:", updateDemandQuery); // Log SQL query

        // Execute SQL query for each demand
        await query(updateDemandQuery, queryValues);

        console.log("Demand status updated successfully"); // Log success message
      }
    } else {
      // If requestData is not an array, handle it as a single demand
      const { Status, agentUserID } = requestData;
      console.log("Status:", Status); // Log status

      // Construct SQL query to update demand status
      let updateDemandQuery = `
        UPDATE demandes
        SET Status = ?
        WHERE DemandID = ?`;
      
      const queryValues = [Status, demandId];

      // Check if agentUserID exists in the request data
      if (agentUserID !== undefined) {
        console.log("Agent UserID:", agentUserID); // Log agentuserid
        // Append agentUserID to the SQL query and add its value to the query values
        updateDemandQuery = `
          UPDATE demandes
          SET Status = ?,
              agentUserID = ?
          WHERE DemandID = ?`;
        queryValues.splice(1, 0, agentUserID);
      }

      console.log("Update Query:", updateDemandQuery); // Log SQL query

      // Execute SQL query for the single demand
      await query(updateDemandQuery, queryValues);

      console.log("Demand status updated successfully"); // Log success message
    }

    return new NextResponse("Demand status updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating demand status:", error); // Log error message
    return new NextResponse("Error updating demand status", { status: 500 });
  }
};



export const GET = async (req: Request, context: any) => {
  const { params } = context;
  const apiKey = req.headers.get('x-api-key');
  
  if (apiKey !== API_KEY) {
      return new NextResponse("Unauthorized", { status: 400 });
  }

  try {
      const { demandId } = params;
      
      // Construct the SQL query to retrieve the demand record with the required joins
      const demandQuery = `
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
              demandes.agentUserID = '${demandId}'
      `;
      const result = await query(demandQuery);
    
      return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
      console.error("Error fetching demand:", error);
      return new NextResponse("Error fetching demand", { status: 500 });
  }
};
