'use strict';

import express from 'express';
import db from './config/db.js';
import router from './router/router.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

 dotenv.config();

const app = express()


// connect to port
const PORT = process.env.PORT ||3000;
// connect to database
try {
    await db.authenticate();
    console.log('Connection has been established successfully.'); 
}
catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`server connected on ${PORT}`));
