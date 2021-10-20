import { Request } from "express";
import { Usertype } from "../models/Users"

export interface About extends Request {
    rootUser: Usertype;
}
export interface Auth extends Request {
    rootUser: Usertype;
    token: string;
    userID: string;
}