import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { Technology, Practice } from '../models';

const router = express.Router();
const ITEMS_LIMIT = 5;
const ITEMS_OFFSET = 0;

// middleware

router.use((req,res,next) => {
  const token = req.headers["authorization"];

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(403).send({success: false, message: 'Failed to authenticate token'})
      } else {
        req.decoded = decoded;
        next()
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      message: "No token provided"
    })
  }
})


router.get('/practices', function(req, res) {
  console.log(req, res);
  Practice.find({}, {name: true, practiceId: true, practice_id:true, description: true, _id: false},(err, data) => {
    if (err) {
        console.log('ERROR:', err)
    }
    res.json(data)
  })
});

router.get('/practices/:id', function(req, res) {
  const id = req.params.id
  Practice.findOne({practice_id: id}, {name: true, practiceId: true, description: true, _id: false},(err, data) => {
    if (err) {
        console.log('ERROR:', err)
    }
    res.json(data)
  })
});

router.get('/practices/:id/technologies', function(req, res) {
    const id = req.params.id
    Practice.findOne({practice_id: id}, (err, practice) => {
        if (err) {
            res.status(500).send()
            throw err
        }
        if (!practice) {
            res.status(404).send()
        } else {
            const practiceId = practice._id;
            const { limit, offset } = req.query;
            const itemsOffset = +offset || ITEMS_OFFSET;
            const itemsLimit = +limit || ITEMS_LIMIT;
            console.log(practiceId);
            Technology.find({_created: practiceId},{name: 1, description: 1, _id: 0}).skip(itemsOffset).limit(itemsLimit).exec((err, technologies) => {
              console.log(technologies);
                if (err) {
                    res.status(500).send()
                    throw err
                }
                res.json(technologies)
            })
        }
    });
});

export default router
