import express from'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import { base, technologies, practices } from './routes';

import config from './config';

console.log(config)

const port = 3000;
const app = express();

mongoose.connect(config.database, err => {
  if (err) {
    throw err
  }

  console.log('Mongoose connected');
})

app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', base )
app.use('/practices', practices)
app.use('/practices/technologies', technologies)

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
})
