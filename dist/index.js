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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const db = new pg_1.Client({
    user: 'arnoldsanders',
    host: 'localhost',
    port: 5432,
    database: 'locktransaction',
});
db.connect();
var corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE']
};
app.use((0, cors_1.default)(corsOptions));
app.get("/", (request, response) => {
    response.status(201).send("Welcome to another Typescript Todo App");
});
//GET /list #list todos
app.get("/list", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield db.query('SELECT * FROM todo');
    response.status(201).send(res.rows);
}));
//POST /create #add todos
app.post("/create", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = request.query;
    try {
        const res = yield db.query('SELECT * FROM todo WHERE id=$1', [params.id]);
        if (res.rows.length === 1) {
            response.status(400).send("resource already exist");
        }
    }
    catch (err) {
        response.status(500).send("Internal Server Error");
    }
}), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const params = request.query;
    try {
        yield db.query('INSERT INTO todo (id, message, status) VALUES ($1, $2, $3)', [params.id, params.message, params.status]);
        response.status(201).send("200 Ok");
    }
    catch (err) {
        response.status(500).send("Internal Server Error");
    }
}));
//UPDATE /update/:id todos
app.put("/update/:id", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = request.query;
    try {
        const res = yield db.query('SELECT * FROM todo WHERE id=$1', [params.id]);
        if (res.rows.length === 1) {
            next();
        }
        else {
            response.status(400).send("resource doesn't exist");
        }
    }
    catch (err) {
        response.status(500).send("Internal Server Error");
    }
}), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const params = request.query;
    try {
        yield db.query('UPDATE todo SET message=$1, status=$2 WHERE id=$3', [params.message, params.status, params.id]);
        response.status(201).send("200 Ok");
    }
    catch (err) {
        response.status(500).send("Internal Server Err");
    }
}));
//DELETE /delete/:id  #delete todo
app.delete("/delete/:id", (request, response) => {
    const id = request.params.id;
    try {
        db.query('DELETE FROM todo WHERE id=$1', [id]);
        response.status(201).send("resource was deleted");
    }
    catch (err) {
        response.status(404).send("resource doesnt exist");
    }
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
module.exports = app;
