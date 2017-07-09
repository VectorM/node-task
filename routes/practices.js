import express from 'express';
import Practice from '../models/practice';
import checkToken from '../helpers/checkToken';

const router = express.Router();

router.get('/', checkToken, function(req, res) {
  Practice.find({}, {name: true, practiceId: true, technology_id:true, description: true, _id: false},(err, data) => {
    if (err) {
        console.log('ERROR:', err)
    }
    res.json(data)
  })
});

export default router
