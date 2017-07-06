import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  }
})

const Practice = mongoose.model('Practice', schema);

export default Practice
