import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

export interface user {
    name: string;
    email: string;
    password: string;
    generateAuthToken: any;
}

export const userSchema = new mongoose.Schema<user>({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
   
    password: {
        type: String,
        required: true
    }
})

// password hashing

userSchema.pre('save', async function (next: any){

    if(this.isModified('password'))
    {
        this.password = await bcrypt.hash(this.password, 12);
    }

    next();
})

userSchema.methods.generateAuthToken = async function () {

    try{
            return jwt.sign({_id: this.id}, process.env.SECRET_KEY);
    }

    catch(err){
        console.log(err);

    }
}

export const User = mongoose.model('USER',userSchema);

