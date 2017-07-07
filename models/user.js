import mongoose, { Schema } from 'mongoose';
import generateGuid from '../helpers/generateGuid';
import bcrypt from 'bcrypt';

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  token: {type:String, required: true}
})

schema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

schema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

schema.methods.generateToken = function() {
  return generateGuid
}

const User = mongoose.model('User', schema);

export default User

