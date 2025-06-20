import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import moodRoutes from './routes/mood.js';
import user from './routes/user.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app  = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/mood',moodRoutes);
app.use('/api',user);

const PORT = process.env.port || 5000;
app.listen(PORT,()=>{
    console.log('Server is running on port : ' + PORT);
});