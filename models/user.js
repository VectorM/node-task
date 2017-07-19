import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  token: {type:Schema.Types.ObjectId, required: true, expireAfterSeconds: 60}
})

const tokenSchema = new Schema({
  value: String,
  user: {
    type: Schema.types.ObjectId,
    ref: 'User'
  },
  expireAt: {
    type: Date,
    expirtes: 60,
    default: Date.now
  }
})

userSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

userSchema.methods.generateToken = function() {
  const token = new Token();
  token.value = "test value";
  token.user = this._id;
  this.token = token._id;
  this.save(err => {
    if (err) {
      throw err;
    }

    token.save(err => {
      if (err) {
        throw err;
      }
    })
  })
}

const User = mongoose.model('User', userSchema);
const Token = mongoose.model('Token', tokenSchema)

export {
  User,
  Token
}

