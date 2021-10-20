import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({path: './config.env'});

export function connn()
{
const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
    console.log(`connection successfull`);
}).catch((err) => console.log(`no connection`));
}
