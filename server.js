import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path:'./.env'});

import indexRoutes from './server/index.js';

const CONNECTION_URL = process.env.CONNECTION_URL       // process.env.REACT_APP_CONNECTION_URL
// console.log(process.env.REACT_APP_CONNECTION_URL)
const app = express()

app.use(bodyParser.json({limit:"30mb", extended: true} ));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true} ));
app.use(cors());

app.options('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Endpoint, Token');
    res.header('Access-Control-Allow-Credentials', true);
    res.sendStatus(200);
    next()
});

app.use('/', indexRoutes)

// app.get('/exp_backend', (req, res) => {
//     res.redirect('/server/index');
// })

const PORT = process.env.PORT || 8080;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log( `Server running on port: ${PORT}` )))
.catch((error) => console.log(error.message));

mongoose.set( 'useFindAndModify', false)