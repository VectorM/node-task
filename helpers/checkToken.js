import User from '../models/user';

export default function checkToken(req,res,next) {
  const authToken = req.headers["authorization"];
  if (typeof authToken !== 'undefined') {
    User.findOne({token: authToken},(err, data) => {
      if (err) {
          console.log('ERROR:', err)
      }
      if (data) {
        req.token = data;
        next()
      } else {
        res.sendStatus(401);
      }
    })
  } 
  else {
    res.sendStatus(401);
  }
}
