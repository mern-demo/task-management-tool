import jwt from 'jsonwebtoken';
import { User } from '../models/users';
import { Request, Response, NextFunction } from 'express';

export const authenticate = async (req: Request,res: Response, next: NextFunction) =>{

    try{
        const token = req.cookies.jwtoken;
        const verifytoken = jwt.verify(token, process.env.SECRET_KEY);
//validate token
        const rootUser = await User.findOne({_id: verifytoken._id, "tokens.token": token});
        if(!rootUser){throw new Error('User not found')}

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    }catch(err)
    {
        res.status(401).send('Unauthorized: No token provided');
        console.log(err);
    }


}