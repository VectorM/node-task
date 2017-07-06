import express from'express';
import path from'path';
import open from'open';
import mongoose from 'mongoose';
import { tools, practices } from './routes';

const port = 3000;
const app = express();

mongoose.connect('mongodb://localhost/trainee')

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './src/index.html'))
})

app.use('/practices', practices)

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port)
  }
})
