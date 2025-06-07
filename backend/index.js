import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import moodRoutes from './routes/mood.js';

dotenv.config();

const app  = express();
app.use(cors());
app.use(express.json());

app.use('/api/mood',moodRoutes);

const PORT = process.env.port || 5000;
app.listen(PORT,()=>{
    console.log('Server is running on port : ' + PORT);
});