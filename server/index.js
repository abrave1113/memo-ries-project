import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({path: './.env'});

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const router = express.Router();
// dotenv.config({path:'./.env'})

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

router.get('/', (req, res, next) => {
    console.log("At least part-way there.")// res.send('Hello to Memories API');
    next()
})

router.use((error, req, res) => {
  if (error) {
    console.log('error from server routes');               /*'error from server routes'*/
    res.send('error from server routes')
  } else {
    res.sendFile(path.join(__dirname, '/client', '/build', 'index.html'));
  }
})

export default router;