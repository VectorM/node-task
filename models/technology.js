import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  technology_id: {
    type: Number,
    required: true,
    unique: true
  },
  _created: { type: String, ref: 'Practice'}
})

const Technology = mongoose.model('Technology', schema);

export default Technology
