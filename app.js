import express from'express';
import path from'path';
import open from'open';
import mongoose from 'mongoose';
import webpack from 'webpack';
import config from './webpack.config.dev';


const port = 3000;
const app = express();
const compiler = webpack(config);

mongoose.connect('mongodb://localhost/trainee')

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './src/index.html'))
})

app.get('/users', function(req, res) {
  res.json([
    {"id":1, "firstName":"Steve", "lastName": "Jobs", "email": "heisdead@gmail.com"},
    {"id":2, "firstName":"Bill", "lastName": "Gates", "email": "heisalive@gmail.com"}
  ]);
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port)
  }
})