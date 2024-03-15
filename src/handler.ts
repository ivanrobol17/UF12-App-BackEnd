import { APIGatewayProxyResult } from "aws-lambda";
import { createConnection } from "mysql2/promise";
import { json } from "stream/consumers";

export const hello = async () => {
    console.log("hello world!");
    return "hello world!";
};

export const goodbye = async () => {
    console.log("Good bye, see you soon");
    return "Good bye, see you soon";
};

export const getAllPatients = async (): Promise<APIGatewayProxyResult> => {
    // const responce:APIGatewayProxyResult ={
    //     statusCode: 200,
    //     body: JSON.stringify({
    //         nome:"zuzu",
    //         cognome:"bambol",
    //         dataNascita: "06/03/2002"
    //     })
    // }
    try{
        const dbConnection = await createConnection({
            host:process.env.DB_HOST,
            user: process.env.DB_USER,
            password:process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port:parseInt(process.env.DB_PORT || '3306')
        });
        const [rows] = await dbConnection.query("SELECT * FROM Paziente");
        await dbConnection.end(); //da fare!!!!
        console.table(rows)
        const responce: APIGatewayProxyResult={
            statusCode:200,
            body: JSON.stringify(rows)
        }
        return responce
    }catch (error: unknown){
        const responce: APIGatewayProxyResult={
            statusCode:500,
            body: JSON.stringify({
                message: error
            })
        }
        return responce
    }
};