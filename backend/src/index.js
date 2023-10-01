import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import connection from '../db/conn.js';
import authRouter from './authRoutes.js';
import { verifyToken }  from '../middleware/auth.js';
import v1Router  from './v1/routes/index.js';

const PORT = 5050;

//connect with db
connection();

const app = express();

app.use(express.json());

// cross origin
app.use(cors());

// bodyPaser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

//Auth Routes
app.use('/', authRouter);

// Router v1
app.use('/api/v1/', verifyToken, v1Router)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
})