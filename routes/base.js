import express from 'express';
import path from 'path';
import User from '../models/user';


const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'))
});

router.post('/login', (req,res) => {
  const { email, password } = req.body
  User.findOne({ email, password}, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send()
    }
    if (!user || user.validPassword(password)) {
      return res.status(404).send({ message: 'No user found' });
    }
    const token = user.token
    return res.json({
      token,
      success: 'true'
    })
  })
})

router.post('/register', (req, res) => {
  const { email, password } = req.body
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
});

export default router
