import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({path: './.env'});

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();
const __dirname = path.resolve(path.dirname(''))
const CONNECTION_URL = process.env.CONNECTION_URL

// const router = express.Router();
// dotenv.config({path:'./.env'})

app.use(bodyParser.json({limit:"30mb", extended: true} ));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true} ));
app.use(cors());

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

app.options('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Endpoint, Token');
    res.header('Access-Control-Allow-Credentials', true);
    res.sendStatus(200);
    next()
});
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.use(express.static(path.join(__dirname, '/client', '/build')));

app.get('*', (req, res) => {
    // console.log(__dirname)
    res.sendFile(path.join(__dirname, '/client', '/build', '/index.html'));
  });

app.get('/', (req, res) => {
    console.log("At least part-way there.")// res.send('Hello to Memories API');
    res.send("At least part-way there.")
})

const PORT = process.env.PORT || 8080;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log( `Server running on port: ${PORT}` )))
.catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false);

// app.use((error, req, res) => {
//   if (error) {
//     console.log('error from server routes');               /*'error from server routes'*/
//     res.send('error from server routes')
//   } else {
//     res.sendFile(path.join(__dirname, '/client', '/build', '/index.html'));
//   }
// })

// export default router;