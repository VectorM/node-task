import express from 'express';
import path from 'path';
import { User, Token } from '../models/user';


const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'))
});

router.post('/login', (req,res) => {
  const { email, password } = req.body
  User.findOne({email}, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send()
    }
    console.log('validation', user.validPassword(password))
    console.log('val2', !user)
    if (user && user.validPassword(password)) {
      const token = user.token
      return res.json({
        token,
        success: 'true'
      })
    }
    return res.status(404).send({ message: 'No user found' });
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
      newUser.token = newUser.generateToken()
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
