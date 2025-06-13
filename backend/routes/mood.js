import express from 'express';
import {connecttoDb} from '../db.js';

const router = express.Router();

router.post('/',async(req,res)=>{
    const {mood,message,sentiments} = req.body;
    try {
        const db = await connecttoDb();
        const [result] = await db.execute('INSERT INTO MOODLOGS (mood,message,sentiments) VALUES (?,?,?)',[mood,message,sentiments]);
        res.status(200).json({
            success:true,
            id:result.insertId
        });
        }
        catch(error){
            res.status(500).json({
                success:false,
                message:'Error inserting mood data',
                details:error.message
            })
        }
})

router.get('/',async(req,res)=>{
    try{
        const db = await connecttoDb();
        const [rows] =await  db.execute('SELECT * FROM MOODLOGS ORDER BY createdAt DESC');
        res.status(200).json({
            success:true,
            data:rows
        })
    }catch(error){
        res.status(500).json({
            success:false,message:'Error fetching mood data'
        })
    }
})

router.get('/mood/stats',async(req,res)=>{
    try{
        const db = await connecttoDb();
        const [rows]=await db.execute('SELECT mood,COUNT(*) AS count FROM MOODLOGS GROUP BY mood');
        res.status(200).json({
            success:true,
            data:rows
        });

        
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Error fetching mood statistics",
            detials : error.message
        });
    }
})
export default router;