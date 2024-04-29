import { NextResponse } from "next/server";
import util from "util";
import db from '../../../../util/db';

const API_KEY = process.env.API_KEY; 
const query = util.promisify(db.query).bind(db);

export const GET = async (req: Request, context: any) => {
    const { params } = context;
    const apiKey = req.headers.get('x-api-key');
    
    if (apiKey !== API_KEY) {
        return new NextResponse("Unauthorized", { status: 400 });
    }

    try {
        const { count } = params;

        // Construct the SQL query to retrieve the count of demandes with status 'affecté'
        const affectedCountQuery = `
            SELECT
                COUNT(*) AS affectedCount
            FROM
                demandes
            WHERE
                agentUserID = '${count}'
                AND Status = 'affecté'
        `;
        // Execute the query to get the affected count
        const affectedResult = await query(affectedCountQuery);
        const affectedCount = affectedResult[0].affectedCount;

        // Construct the SQL query to retrieve the count of demandes with status 'collecté'
        const collectedCountQuery = `
            SELECT
                COUNT(*) AS collectedCount
            FROM
                demandes
            WHERE
                agentUserID = '${count}'
                AND Status = 'collecté'
        `;
        // Execute the query to get the collected count
        const collectedResult = await query(collectedCountQuery);
        const collectedCount = collectedResult[0].collectedCount;

        return new NextResponse(JSON.stringify({ affectedCount, collectedCount }), { status: 200 });
    } catch (error) {
        console.error("Error fetching demand counts:", error);
        return new NextResponse("Error fetching demand counts", { status: 500 });
    }
};
