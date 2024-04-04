import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { createConnection } from "mysql2/promise";
import { IntPaziente } from "./models/IntPaziente";
import { error } from "console";


const getDbConnection = async () => {
    return await createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT || "3306"),
    });
};


export const getAllPazienti = async (): Promise<APIGatewayProxyResult> => {
    try {
        const dbConnection = await getDbConnection();
        const [rows] = await dbConnection.query("SELECT * FROM Paziente");
        await dbConnection.end();

        const response: APIGatewayProxyResult = {
            statusCode: 200,
            headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(rows),
        };
      return response;
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          message: "Error creating database connection",
          error: error,
        }),
      };
    }
};

export const getContatoriCuraAttesa = async (): Promise<APIGatewayProxyResult> => {
  try {
      const dbConnection = await getDbConnection();
      const [rows] = await dbConnection.query("select * from numPazientiCuraAttesa");
      await dbConnection.end();

      const response: APIGatewayProxyResult = {
          statusCode: 200,
          headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify(rows),
      };
    return response;
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        message: "Error creating database connection",
        error: error,
      }),
    };
  }
};


export const getPazientiNonDimessi = async (): Promise<APIGatewayProxyResult> => {
  try {
      const dbConnection = await getDbConnection();
      const [rows] = await dbConnection.query("SELECT ps.Id as idPaziente, p.nome as nomePaziente, p.cognome as cognomePaziente, ps.CodiceColore as CodiceColore, s.Nome as Stato, m.id as IdMedico, pm.Cognome as Medico FROM ProntoSoccorso ps JOIN Persone p on ps.CF=p.CF JOIN Stati s on ps.IdStato=s.Id JOIN Medici m on ps.IdMedico=m.Id join Persone pm on m.CF=pm.CF WHERE ps.IdStato!=3 ORDER BY CASE CodiceColore WHEN 'Rosso' THEN 1 WHEN 'Arancio' THEN 2 WHEN 'Blu' THEN 3 WHEN 'Verde' THEN 4 ELSE 5 END;");
      await dbConnection.end();

      const response: APIGatewayProxyResult = {
          statusCode: 200,
          headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify(rows),
      };
    return response;
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        message: "Error creating database connection",
        error: error,
      }),
    };
  }
};

// localhost:8080/pazienti/id
export const getPazientiById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.pathParameters?.id){
            throw new Error ("Missing id parameter in the URL")
        }
        const dbConnection = await getDbConnection();

        const [rows] = await dbConnection.query("SELECT ps.Id as idPaziente, ps.CF as CodiceFiscale, p.nome as nomePaziente, p.cognome as cognomePaziente, p.DataNascita, p.LuogoNascita, p.NumTel, p.Citta, p.Via, p.NumCivico, p.CAP, ps.DataIngresso as DataIngresso, ps.Arrivo as ModalitaArrivo, ps.CodiceColore as CodiceColore, s.Nome as Stato, m.id as IdMedico, pm.Cognome as Medico FROM ProntoSoccorso ps JOIN Persone p on ps.CF=p.CF JOIN Stati s on ps.IdStato=s.Id JOIN Medici m on ps.IdMedico=m.Id join Persone pm on m.CF=pm.CF WHERE ps.Id=?;", [event.pathParameters?.id]);
        await dbConnection.end();

        const response: APIGatewayProxyResult = {
            statusCode: 200,
            body: JSON.stringify(rows),
        };
        return response;
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
        message: "Error creating database connection",
        error: error,
        }),
      };
    }
};

export const CreatePaziente = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.body){
            throw new Error ("Missing request BODY")
        }
        const paziente: Omit<IntPaziente, "id"> = JSON.parse(event.body)
        const dbConnection = await getDbConnection();
        const [rows] = await dbConnection.query("insert into ProntoSoccorso SET ?", [paziente] );
        await dbConnection.end();
        console.log("test")
        const response: APIGatewayProxyResult = {
            statusCode: 200,
            body: "inserimento avvenuto con successo"
        };
      return response;
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          message: "Error creating database connection",
          error: error,
        }),
      };
    }
};

export const UpdatePaziente = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.body){
            throw new Error ("Missing request BODY")
        }
        if (!event.pathParameters?.id){
            throw new Error ("Missing id parameter in the URL")
        }
        const paziente: IntPaziente = JSON.parse(event.body)
        const dbConnection = await getDbConnection();
        const [rows] = await dbConnection.query("UPDATE  ProntoSoccorso SET ? WHERE id = ?", [paziente, event.pathParameters?.id] );
        await dbConnection.end();

        const response: APIGatewayProxyResult = {
            statusCode: 200,
            body: JSON.stringify(rows),
        };
      return response;
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          message: "Error creating database connection",
          error: error,
        }),
      };
    }
};
// localhost:8080/pazienti/id
export const DeletePazienti = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.pathParameters?.id){
            throw new Error ("Missing id parameter in the URL")
        }
        const dbConnection = await getDbConnection();

        const [rows] = await dbConnection.query("UPDATE ProntoSoccorso SET Stato=3 WHERE id = ?", [event.pathParameters?.id]);
        await dbConnection.end();

        const response: APIGatewayProxyResult = {
            statusCode: 200,
            body: JSON.stringify(rows),
        };
        return response;
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
        message: "Error creating database connection",
        error: error,
        }),
      };
    }
};