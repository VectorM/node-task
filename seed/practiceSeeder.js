import Practice from '../models/practice';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/trainee')
console.log('hello1')
const practices = [
  new Practice({
    practiceId: 1,
    name: 'Web-Development',
    description: 'Web development is a broad term for the work involved in developing a web site'
  }),
  new Practice({
    practiceId: 2,
    name: 'IT-technology',
    description: 'Information technology (IT) is the application of computers to store, study, retrieve, transmit, and manipulate data'
  }),
  new Practice({
    practiceId: 3,
    name: 'Hobbies',
    description: 'A hobby is a regular activity that is done for enjoyment, typically during one`s leisure time.'
  })
];

Promise.all(practices.map(practice => practice.save())).then(mongoose.disconnect())
