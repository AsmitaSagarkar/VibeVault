import express from 'express';
import {connecttoDb} from '../db.js';
import axios from 'axios';
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

router.get('/stats',async(req,res)=>{
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
router.get('/quote', async (req, res) => {
  try {
    const result = await axios.get('https://zenquotes.io/api/random');
    const { q, a } = result.data[0];
    res.json({ success: true, quote: `"${q}" - ${a}` });
  } catch (err) {
    res.status(500).json({ success: false, message: "Quote fetch failed", error: err.message });
  }
});
export default router;