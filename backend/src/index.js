import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/album.route.js';
import statRoutes from './routes/stats.route.js';
import { connectDB } from './lib/db.js';
import { clerkMiddleware } from '@clerk/express';
import fileUpload from 'express-fileupload';
import path from 'path';
import cors from 'cors';

dotenv.config();

const __dirname = path.resolve();
const app = express();


app.use(cors(
    {
        origin:"http://localhost:3000",
        credentials:true,
    }
));

app.use(clerkMiddleware())  //This will add auth and user to the request object
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : path.join(__dirname,'tmp'),
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 },
    })
);

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/songs",songRoutes);
app.use("/api/albums",albumRoutes);
app.use("/api/stats",statRoutes);

app.use((err,req,res,next) => {
    // res.status(404).json({message:"Route not found"});
    res.status(500).json({message:process.env.NODE_ENV === 'production' ? "Internal server error" : err.message}); 
    // next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
    }
);

//TODO: Socket IO Implementation