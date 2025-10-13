import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";

export async function register(req, res){
    const {username, password, email} = req.validated.body;
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({message:"User already exists with this email"});
        }
        const hash = await bcrypt.hash(password,10);
        const newUser = await User.create({email, username, password:hash});
        const token = jwt.sign({id:newUser._id, email:newUser.email}, process.env.JWT_SECRET, {expiresIn:"1h"});
        res.status(201).json({message:"User registered successfully", token});
    }catch(err){
        res.status(500).json({message:"Server error", error:err.message});
    }
}

export async function login(req, res){
    const {email, password} = req.validated.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"Invalid email"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid password"});
        }
        const token = jwt.sign({id:user._id, email:user.email}, process.env.JWT_SECRET, {expiresIn:"1h"});
        res.status(200).json({message:"Login successful", token});
    }catch(err){
        res.status(500).json({message:"Server error", error:err.message});
    }
}