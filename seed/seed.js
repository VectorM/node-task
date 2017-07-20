import { Technology, Practice } from '../models';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/trainee')

const practices = [
  new Practice({
    name: 'Web-Development',
    description: 'Web development is a broad term for the work involved in developing a web site',
    practice_id: 1,
  }),
  new Practice({
    name: 'IT-technology',
    description: 'Information technology (IT) is the application of computers to store, study, retrieve, transmit, and manipulate data',
    practice_id: 2,
  }),
  new Practice({
    name: 'Hobbies',
    description: 'A hobby is a regular activity that is done for enjoyment, typically during one`s leisure time.',
    practice_id: 3
  })
];

const technologies = [
  {
    name: 'React.js',
    topic: 'Web-Development',
    description: 'Most popular front-end library for building user interfaces.',
    technology_id: 1
  },
  {
    name: 'Angular',
    topic: 'Web-Development',
    description: 'The AngularJS framework works by first reading the HTML page',
    technology_id: 2
  },
  {
    name: 'React.js',
    topic: 'Web-Development',
    description: 'Most popular front-end library for building user interfaces.',
    technology_id: 3
  },
  {
    name: 'Angular',
    topic: 'Web-Development',
    description: 'The AngularJS framework works by first reading the HTML page',
    technology_id: 4
  },
  {
    name: 'React.js',
    topic: 'Web-Development',
    description: 'Most popular front-end library for building user interfaces.',
    technology_id: 5
  },
  {
    name: 'Angular',
    topic: 'Web-Development',
    description: 'The AngularJS framework works by first reading the HTML page',
    technology_id: 6
  },
  {
    name: 'React.js',
    topic: 'Web-Development',
    description: 'Most popular front-end library for building user interfaces.',
    technology_id: 7
  },
  {
    name: 'Angular',
    topic: 'Web-Development',
    description: 'The AngularJS framework works by first reading the HTML page',
    technology_id: 8
  },
  {
    name: 'React.js',
    topic: 'Web-Development',
    description: 'Most popular front-end library for building user interfaces.',
    technology_id: 9
  },
  {
    name: 'Angular',
    topic: 'Web-Development',
    description: 'The AngularJS framework works by first reading the HTML page',
    technology_id: 10
  },
  {
    name: 'Community',
    topic: 'IT-technology',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    technology_id: 11
  },
  {
    name: 'Internet banking',
    topic: 'IT-technology',
    description: 'Money money money',
    technology_id: 12
  },
  {
    name: 'Football',
    topic: 'Hobbies',
    description: 'Most popular sport game in the world',
    technology_id: 13
  },
  {
    name: 'Baseball',
    topic: 'Hobbies',
    description: 'Most popular sport game in the world',
    technology_id: 14
  },
  {
    name: 'Drink',
    topic: 'Hobbies',
    description: 'Most popular sport game in the world',
    technology_id: 15
  }
]

function seedTechnology(tech, practices) {
  const practice = practices.find(practice => practice.name === tech.topic)
  const techToSave = new Technology({
    name: tech.name,
    description: tech.description,
    technology_id: tech.technology_id,
    _created: practice._id
  });
  practice.technologies.push(techToSave)
  practice.save()
  techToSave.save()
}

Promise.all(technologies.map(technology => seedTechnology(technology, practices)))
  .then(mongoose.disconnect())
