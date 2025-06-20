import express from 'express';
import {connecttoDb} from '../db.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secret = 'vibevault';

export const register = async (req,res)=>{
    const{name, email,password}=req.body;

    if(!email || !password || !name){
        return res.status(400).json({
            message : 'Please fil all the fields'
        })
    }
    const hashed = await bcrypt.hash(password,10);
    try{
        const db = await connecttoDb();
        await db.query('INSERT INTO users(name,email,password)VALUES(?,?,?)',[name,email,hashed]);
        return res.status(201).json({
            message : "User registeres successfully"
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : 'Error registering user',
            error: err.message
        })
    }
};

export const login = async(req,res)=>{
    const {email,password}=req.body;
    const db = await connecttoDb();
    const [rows] = await db.query('SELECT * from users where email = ?',[email]);
    const user = rows[0];
    if(!user){
        return res.status(404).json({
            success : false,
            message : "user not found"
        })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(401).json({
            success : false,
            message : "Invalid credentials"
        })
    }
    const token = jwt.sign({id:user.id},secret,{expiresIn:'1h'});
    res.cookie('token', token, {
        httpOnly: true,
    }).json({
        success:true,message:"login successful"
    });

};
export const getUsers = async(req,res)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            success:false,
            message : "Not logged in"
        });

    }
    try{
        const decode = jwt.verify(token,secret);
        const db = await connecttoDb();
        const [rows]=await db.query('SELECT id,name,email FROM users WHERE id = ?',[decode.id]);
        res.json({
            success:true,
            user: rows[0]
        });
    }catch{
        res.status(401).json({
            message:'Invalid token'
        });
    }



}