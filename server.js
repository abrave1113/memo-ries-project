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
const __dirname = path.resolve(path.dirname(''))

app.use(bodyParser.json({limit:"100mb", extended: true} ));
app.use(bodyParser.urlencoded({limit:"100mb", extended: true} ));
app.use(cors());

app.use(express.static('./server/client'));

app.get('*', (req, res) => {
    // console.log(__dirname)
    res.sendFile(path.join(__dirname, '/server', '/client', '/build', 'index.html'));
  });

app.options('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Endpoint, Token');
    res.header('Access-Control-Allow-Credentials', true);
    res.sendStatus(200);
    next()
});

app.use('/api/home', indexRoutes)

app.get('*', (req, res) => {
    try {
        console.log(req.get('Referrer'))    
        res.redirect('/home');
    }
    catch (error) {
        console.log('Sorry, connection error.' + error.message)
    }
})

const PORT = process.env.PORT || 8080;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log( `Server running on port: ${PORT}` )))
.catch((error) => console.log(error.message));

// mongoose.set( 'useFindAndModify', false)