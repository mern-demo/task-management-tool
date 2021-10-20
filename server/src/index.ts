import express from "express";
import dotenv from "dotenv";

import{ connn } from "./DB/conn";
import {router} from "./router/auth";

dotenv.config({path: './config.env'});
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

// we link the router files to make our route easy
app.use(router);

app.get('/', (req,res) => {
    res.send(`Hello World from the server`);

});



app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}/`);
})
console.log('Hello, World!');