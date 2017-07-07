import express from 'express';
import Technology from '../models/technology';

const router = express.Router();

router.get('/', function(req, res) {
  Technology.findOne({ name: 'Web-Development'}).populate('_created').exec(function(err, data) {
    if (err) { return console.log(err); }
    res.json(data)
  });
});

export default router
