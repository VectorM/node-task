import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: [{ type: Schema.Types.ObjectId, ref: 'Technology' }]
})

const Practice = mongoose.model('Practice', schema);

export default Practice
