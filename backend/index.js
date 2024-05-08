import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from'mongoose';
import booksRoute from './route/booksRoute.js';
import cors from 'cors';

const app = express();
// Middleware for parsing incoming request bodies
app.use(express.json());

//Middlewre fir handling CORS Policy
app.use(cors());

//Option 2 for handling CORS Policy
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )
app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Welcome to the Book Store')
});

app.use('/books', booksRoute);
// Connect to MongoDB and start the server
mongoose
    .connect(mongoDBURL) 
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
          });
      })
    .catch((err) => {
      console.log(err);
    });