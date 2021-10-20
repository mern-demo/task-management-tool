import express from "express";

// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
const app = express();
// const cookieParser = require('cookie-parser');
const PORT = 3000


app.use(express.json());

app.get('/', (req,res) => {
    res.send(`Hello World from the server`);
});



app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}/`);
})
console.log('Hello, World!');