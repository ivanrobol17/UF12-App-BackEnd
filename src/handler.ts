import { APIGatewayProxyResult } from "aws-lambda";

export const hello = async () => {
    console.log("hello world!");
    return "hello world!";
};

export const goodbye = async () => {
    console.log("Good bye, see you soon");
    return "Good bye, see you soon";
};

export const getAllPatients = async (): Promise<APIGatewayProxyResult> => {
    const responce:APIGatewayProxyResult ={
        statusCode: 200,
        body: JSON.stringify({
            nome:"zuzu",
            cognome:"bambol",
            dataNascita: "06/03/2002"
        })
    }
    return responce
};