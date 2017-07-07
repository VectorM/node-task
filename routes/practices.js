import express from 'express';
import Practice from '../models/practice';
import checkToken from '../helpers/checkToken';
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
