import User from '../model/user.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

export async function handleLoginRequest({userName, password}) {
    const user = await User.findOne({userName}).lean();

    if( ! user ) return {status: "error", error: "Invalid Username"};
  
    if( ! await bcrypt.compare(password, user.password) ) {
        return {status: "error", error: "Invalid password"};
    }

    const token = jwt.sign( {
        id: user._id,
        username: user.userName
    }, process.env.JWT_SECRET );

    return {status: "ok", data: token};
}

export async function handleRegisterRequest({userName, password: plainTextPassword}) {
    if( !userName || typeof userName != 'string') {
        return {status: "error", error: "Bad username"};
    }
  
    if( !plainTextPassword || typeof plainTextPassword != 'string') {
        return {status: "error", error: "Bad password"};
    }
  
    if( plainTextPassword.length < 6 ) {
        return {status: "error", error: "Small password, at least 6 chars are needed"};
    }
  
    const password = await bcrypt.hash(plainTextPassword, 10);
  
    try {
        await User.create( {userName, password} );
    } catch(error) {
        if(error.code === 11000) { //duplicated key
            return {status: "error", error: "Username allready in use"};
        }
        console.error(error);
    }
  
    return {status: "ok"};
}