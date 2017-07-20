import express from'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser'
import { api, auth } from './routes';
import config from './config';

const app = express();

mongoose.connect(config.database, err => {
  if (err) {
    throw err
  }

  console.log('Mongoose connected');
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).send('You connected to the server')
})

app.use('/auth', auth)
app.use('/api', api)

app.listen(config.port, function(err) {
  if (err) {
    console.log(err);
  }
})
