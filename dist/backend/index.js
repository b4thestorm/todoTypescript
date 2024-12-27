"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
var corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE']
};
app.use((0, cors_1.default)(corsOptions));
let container = [{ id: 0, message: "get a job", status: "doing" }]; // temp storage so when server shuts off will disappear
const checkDoesExist = (id) => {
    let exists = false;
    container.forEach((todo) => {
        if (Number(todo.id) === Number(id)) {
            exists = true;
        }
    });
    return exists;
};
app.get("/", (request, response) => {
    response.status(201).send("Welcome to another Typescript Todo App");
});
//GET /list #list todos
app.get("/list", (request, response) => {
    console.log(`[server: GET ${request.path}`);
    response.status(201).send(container);
});
//POST /create #add todos
app.post("/create", (request, response) => {
    const params = request.query;
    if (checkDoesExist(params.id)) {
        response.status(400).send("resource already exist");
    }
    else {
        params["id"] = Number(params.id);
        container.push(params);
        response.status(201).send("200 Ok");
    }
});
//UPDATE /update/:id todos
app.put("/update/:id", (request, response) => {
    const id = Number(request.params.id);
    const params = request.query;
    if (checkDoesExist(id)) {
        params["id"] = id;
        container[params.id] = params;
        response.status(201).send("200 Ok");
    }
    else {
        response.status(404).send("resource doesnt exist");
    }
});
//DELETE /delete/:id  #delete todo
app.delete("/delete/:id", (request, response) => {
    const id = Number(request.params.id);
    let index = container.findIndex((todo) => { Number(todo.id) === id; });
    if (index !== -1) {
        container = container.filter(todo => Number(todo.id) !== id);
        response.status(201).send("resource was deleted");
    }
    else {
        response.status(404).send("resource doesnt exist");
    }
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
module.exports = app;