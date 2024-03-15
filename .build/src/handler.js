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
exports.getAllPatients = exports.goodbye = exports.hello = void 0;
const hello = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hello world!");
    return "hello world!";
});
exports.hello = hello;
const goodbye = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Good bye, see you soon");
    return "Good bye, see you soon";
});
exports.goodbye = goodbye;
const getAllPatients = () => __awaiter(void 0, void 0, void 0, function* () {
    const responce = {
        statusCode: 200,
        body: JSON.stringify({
            nome: "zuzu",
            cognome: "bambol",
            dataNascita: "06/03/2002"
        })
    };
    return responce;
});
exports.getAllPatients = getAllPatients;
