import express, {Express, NextFunction, Request, Response} from "express";
import { Client } from "pg";
import dotenv from "dotenv";
// import bodyparser from 'body-parser'
import cors from 'cors'
import Todo from "../types/todo";

dotenv.config();

const app: Express  = express();
const port: string | number = process.env.PORT || 3001;
app.use(express.json())
// app.use(bodyparser.json())
// app.use(bodyparser.urlencoded({extended: false}))

const db = new Client({
    user: 'arnoldsanders',
    host: 'localhost',
    port: 5432,
    database: 'locktransaction',
})

db.connect()

// var corsOptions = {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'PUT', 'POST', 'DELETE']
// }

// corsOptions
app.use(cors())

app.get("/", (request: Request, response: Response) => {
    response.status(201).send("Welcome to another Typescript Todo App");
})

//GET /list #list todos
app.get("/list" , async (request: Request, response: Response) => {
    const res = await db.query('SELECT * FROM todo')
    response.status(201).send(res.rows)
})

//POST /create #add todos
app.post("/create", async (request: Request, response: Response, next: NextFunction) => {
    const params = request.body;
    try {
        const res = await db.query('SELECT * FROM todo WHERE id=$1', [params.id])
        if (res.rows.length === 1) {
            response.status(400).send("resource already exist");
        } else {
            next()
        }
    } catch (err) {
        response.status(500).send("Internal Server Error");
    }
}, async (request: Request, response: Response) => { 
    const params = request.body;
    try {
        db.query('INSERT INTO todo (id, message, status) VALUES ($1, $2, $3)', [params.id, params.message, params.status]);
        response.status(201).send("200 Ok");
    } catch (err) {
        response.status(500).send("Internal Server Err");
    }
})

//UPDATE /update/:id todos
app.put("/update/:id", async(request: Request, response: Response, next: NextFunction) => {
    const params: Todo = request.query as unknown as Todo
    try {
        const res = await db.query('SELECT * FROM todo WHERE id=$1', [params.id])
        if (res.rows.length === 1) {
            next()
        } else {
            response.status(400).send("resource doesn't exist");
        }
    } catch (err) {
        response.status(500).send("Internal Server Error");
    }
}, async(request: Request, response: Response) => {
    const params: Todo = request.query as unknown as Todo
    try {
        await db.query('UPDATE todo SET message=$1, status=$2 WHERE id=$3', [params.message, params.status, params.id])
        response.status(201).send("200 Ok")
    } catch (err) {
        response.status(500).send("Internal Server Err");
    }
})

//DELETE /delete/:id  #delete todo
app.delete("/delete/:id", async (request: Request, response: Response) => {
    const id = request.params.id;
    try {
        await db.query('DELETE FROM todo WHERE id=$1', [id]);
        response.status(201).send("resource was deleted");
    } catch (err) {
        response.status(404).send("resource doesnt exist");
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})

module.exports = app