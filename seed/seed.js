import Practice from '../models/practice';
import Technology from '../models/technology';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/trainee')

const practices = [
  new Practice({
    name: 'Web-Development',
    description: 'Web development is a broad term for the work involved in developing a web site'
  }),
  new Practice({
    name: 'IT-technology',
    description: 'Information technology (IT) is the application of computers to store, study, retrieve, transmit, and manipulate data'
  }),
  new Practice({
    name: 'Hobbies',
    description: 'A hobby is a regular activity that is done for enjoyment, typically during one`s leisure time.'
  })
];

const technologies = [
  {
    name: 'React.js',
    belongsTo: 'Web-Development',
    description: 'Most popular front-end library for building user interfaces.',
  },
  {
    name: 'Angular',
    belongsTo: 'Web-Development',
    description: 'The AngularJS framework works by first reading the HTML page',
  },
  {
    name: 'Community',
    belongsTo: 'IT-technology',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
  },
  {
    name: 'Internet banking',
    belongsTo: 'IT-technology',
    description: 'Money money money',
  },
  {
    name: 'Football',
    belongsTo: 'Hobbies',
    description: 'Most popular sport game in the world',
  },
  {
    name: 'Baseball',
    belongsTo: 'Hobbies',
    description: 'Most popular sport game in the world',
  },
  {
    name: 'Drink',
    belongsTo: 'Hobbies',
    description: 'Most popular sport game in the world',
  }
]

function belongsToAdd(tech, practice, index, length) {
  if (tech.belongsTo !== practice.name) {
    return
  }
  const techToSave = new Technology({
    name: tech.name,
    description: tech.description,
    _created: practice._id
  });
  practice.technologies.push(techToSave)
  practice.save()
  techToSave.save()
}

Promise.all(practices.map(item => {
  item.save()
    .then(practice => {
      Promise.all(technologies.forEach((tech,index,technologies) => belongsToAdd(tech, practice, index, technologies.length)))
    })
  })
)
