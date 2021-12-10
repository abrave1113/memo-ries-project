const express = require('express');
// import express from 'express';
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path:'./.env'});

const indexRoutes = require('./server/index.js');

const CONNECTION_URL = process.env.CONNECTION_URL       // process.env.REACT_APP_CONNECTION_URL
// console.log(process.env.REACT_APP_CONNECTION_URL)

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