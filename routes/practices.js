import express from 'express';
import chalk from 'chalk';
import Practice from '../models/practice';

const router = express.Router();

/* GET ALL Practices. */
router.get('/', function(req, res) {
  Practice.find({}, {name: true, practiceId: true, description: true, _id: 0},(err, data) => {
    if (err) {
        console.log('ERROR:', err)
    }
    res.json(data)
  })
});

export default router
