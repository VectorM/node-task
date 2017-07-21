import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import * as controller from '../controllers/api';

const router = express.Router();

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

router.route('/practices')
  .get(controller.getPractices)

router.route('/practices/:id')
  .get(controller.getPracticesById)

router.route('/practices/:id/technologies')
  .get(controller.getTechnologies)

export default router
