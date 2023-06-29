const fs = require("fs");
const { stringify } = require("querystring");
const DB_FILE_PATH = "./core/db";
const { v4: uuidv4 } = require('uuid');

console.log("CRUD")

class Todo {
    constructor(content, done = false) {
        this.id = uuidv4(),
        this.date = new Date().toISOString,
        this.content = content,
        this.done = done
    }
}

function create(content) {
    const todo = new Todo(content);

    const todos = [
        ...read(),
        todo,
      ];

    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({todos}, null, 2));
}

function read() {
    let dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
    let dbParsed = JSON.parse(dbString || "{}");
    return dbParsed.todos ? undefined = dbParsed.todos : "";
}

function update(todoId, content, done) {
    const todos = read();
    todos.forEach(todo => {
        const todoToBeUpdated = Object.assign(new Todo, todo);
        if(todoToBeUpdated.id != todoId) {
            return;
        }
        todoToBeUpdated.content = content
        todoToBeUpdated.done = done
        Object.assign(todo, todoToBeUpdated);
    });
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({todos}, null, 2));
}

function remove(todoId) {
    const todos = read();
    todos.forEach(todo => {
        const todoToBeUpdated = Object.assign(new Todo, todo);
        if(todoToBeUpdated.id != todoId) {
            return;
        }
        console.log(todoToBeUpdated)
        todos.pop(todo)
    });
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({todos}, null, 2));
}

function CLEAR_DB() {
    fs.writeFileSync(DB_FILE_PATH, ""); 
}

// CLEAR_DB();
// create("opa");
remove("40a1da39-139c-4cee-a987-4688e4db647b")

