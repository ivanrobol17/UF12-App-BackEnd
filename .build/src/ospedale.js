"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePazienti = exports.UpdatePaziente = exports.CreatePaziente = exports.getPazientiById = exports.getAllPazienti = void 0;
const promise_1 = require("mysql2/promise");
const getDbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, promise_1.createConnection)({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT || "3306"),
    });
});
const getAllPazienti = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbConnection = yield getDbConnection();
        const [rows] = yield dbConnection.query("SELECT * FROM Pazienti");
        yield dbConnection.end();
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(rows),
        };
        return response;
    }
    catch (error) {
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
});
exports.getAllPazienti = getAllPazienti;
const getPazientiById = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!((_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.id)) {
            throw new Error("Missing id parameter in the URL");
        }
        const dbConnection = yield getDbConnection();
        const [rows] = yield dbConnection.query("SELECT * FROM Pazienti WHERE id=?", [(_b = event.pathParameters) === null || _b === void 0 ? void 0 : _b.id]);
        yield dbConnection.end();
        const response = {
            statusCode: 200,
            body: JSON.stringify(rows),
        };
        return response;
    }
    catch (error) {
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
});
exports.getPazientiById = getPazientiById;
const CreatePaziente = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!event.body) {
            throw new Error("Missing request BODY");
        }
        const paziente = JSON.parse(event.body);
        const dbConnection = yield getDbConnection();
        const [rows] = yield dbConnection.query("insert into Paziente SET ?", [paziente]);
        yield dbConnection.end();
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(rows),
        };
        return response;
    }
    catch (error) {
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
});
exports.CreatePaziente = CreatePaziente;
const UpdatePaziente = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        if (!event.body) {
            throw new Error("Missing request BODY");
        }
        if (!((_c = event.pathParameters) === null || _c === void 0 ? void 0 : _c.id)) {
            throw new Error("Missing id parameter in the URL");
        }
        const paziente = JSON.parse(event.body);
        const dbConnection = yield getDbConnection();
        const [rows] = yield dbConnection.query("UPDATE  Paziente SET ? WHERE id = ?", [paziente, (_d = event.pathParameters) === null || _d === void 0 ? void 0 : _d.id]);
        yield dbConnection.end();
        const response = {
            statusCode: 200,
            body: JSON.stringify(rows),
        };
        return response;
    }
    catch (error) {
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
});
exports.UpdatePaziente = UpdatePaziente;
const DeletePazienti = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    try {
        if (!((_e = event.pathParameters) === null || _e === void 0 ? void 0 : _e.id)) {
            throw new Error("Missing id parameter in the URL");
        }
        const dbConnection = yield getDbConnection();
        const [rows] = yield dbConnection.query("UPDATE  Paziente SET stato=-1 WHERE id = ?", [(_f = event.pathParameters) === null || _f === void 0 ? void 0 : _f.id]);
        yield dbConnection.end();
        const response = {
            statusCode: 200,
            body: JSON.stringify(rows),
        };
        return response;
    }
    catch (error) {
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
});
exports.DeletePazienti = DeletePazienti;
