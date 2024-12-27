import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import bodyparser from 'body-parser'
import cors from 'cors'

dotenv.config();

const app: Express  = express();
const port: string | number = process.env.PORT || 3001;
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

var corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE']
}

app.use(cors(corsOptions))

  
let container: Todo[] = [{id: 0, message: "get a job", status: "doing"}] // temp storage so when server shuts off will disappear

const checkDoesExist = (id: number):boolean => {
    let exists = false
    container.forEach((todo) => {
        if (Number(todo.id) === Number(id)) {
            exists = true
        }
    })
    return exists
}   

app.get("/", (request: Request, response: Response) => {
    response.status(201).send("Welcome to another Typescript Todo App");
})

//GET /list #list todos
app.get("/list" , (request: Request, response: Response) => {
    console.log(`[server: GET ${request.path}`)
    response.status(201).send(container)
})

//POST /create #add todos
app.post("/create", (request: Request, response: Response) => {
    const params: Todo = request.query as unknown as Todo
    if (checkDoesExist(params.id)) {
        response.status(400).send("resource already exist")
    } else {
        params["id"] = Number(params.id)
        container.push(params)
        response.status(201).send("200 Ok")
    }
})

//UPDATE /update/:id todos
app.put("/update/:id", (request: Request, response: Response) => {
    const id: number = Number(request.params.id)
    const params: Todo = request.query as unknown as Todo
    if (checkDoesExist(id)) {
        params["id"] = id
        container[params.id] = params
        response.status(201).send("200 Ok")
    } else {
        response.status(404).send("resource doesnt exist")
    }
})

//DELETE /delete/:id  #delete todo
app.delete("/delete/:id", (request: Request, response: Response) => {
    const id: number = Number(request.params.id)
    let index = container.findIndex((todo: Todo) => {Number(todo.id) === id})
    if (index !== -1) {
        container = container.filter(todo => Number(todo.id) !== id);
        response.status(201).send("resource was deleted")
    } else {
        response.status(404).send("resource doesnt exist")
    }
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})

module.exports = app