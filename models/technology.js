import mongoose, { Schema } from 'mongoose';
import mongoosePaginate  from 'mongoose-paginate';

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  _created: { type: String, ref: 'Practice'}
})

schema.plugin(mongoosePaginate);

const Technology = mongoose.model('Technology', schema);

export default Technology
