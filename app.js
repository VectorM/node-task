import express from'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import { base, technologies, practices } from './routes';

const port = 3000;
const app = express();

mongoose.connect('mongodb://localhost/trainee')

app.use(bodyParser());
app.use('/', base )

app.use('/practices', practices)
// app.use('/technologies', technologies)

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
})
