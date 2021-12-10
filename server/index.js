import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path: './.env'});

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const router = express.Router();
// dotenv.config({path:'./.env'})

router.use(express.static("client/build"));

router.get('*', (req, res) => {
  res.sendFile('client/build', 'index.html');
});

router.options('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Endpoint, Token');
    res.header('Access-Control-Allow-Credentials', true);
    res.sendStatus(200);
    next()
});
router.use('/posts', postRoutes);
router.use('/user', userRoutes);

// router.get('/', (req, res) => {
//     res.send('Hello to Memories API');
// })

export default router;