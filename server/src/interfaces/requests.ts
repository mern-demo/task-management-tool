import { Request } from "express";
import {user} from "../models/users"

export interface about extends Request {
    rootUser: string;
}
export interface auth extends Request {
    rootUser: user;
    token: string;
    userID: string;
}