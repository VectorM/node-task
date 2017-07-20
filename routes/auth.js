import express from 'express';
import jwt from 'jsonwebtoken'
import config from '../config';
import { User } from '../models';


const router = express.Router();

router.post('/login', (req,res) => {
  const { email, password } = req.body
  User.findOne({email}, (err, user) => {
    if (err) {
      return res.status(500).send()
    }
    if (!user) {
      return res.status(404).send({ message: 'No user found' });
    } else if (user) {
      if (!user.validPassword(password)) {
        return res.status(403).send({ message: 'Authentication failed. Wrong password.' });
      } else {
        const secret = config.secret;
        const token = jwt.sign({
          _id: user._id
        }, secret, { expiresIn: '1h' });

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token
        })
      }
    }
  })
})

router.post('/register', (req, res) => {
  const { email, password } = req.body
  User.findOne({email}, (err, user) => {
    if (err) {
      throw err
    }
    if (user) {
      res.status(400).send({ message: 'User already exist'})
    } else {
      const newUser = new User();
      newUser.email = email
      newUser.password = newUser.encryptPassword(password);
      newUser.save((err) => {
        if (err) {
          console.log(err);
          return res.status(500).send();
        }
        return res.status(200).send()
      })
    }
  })
});

export default router
