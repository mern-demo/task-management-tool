import express from "express";
import dotenv from "dotenv";

import{ connn } from "./DB/conn";

dotenv.config({path: './config.env'});
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.get('/', (req,res) => {
    res.send(`Hello World from the server`);
    connn();

});



app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}/`);
})
console.log('Hello, World!');