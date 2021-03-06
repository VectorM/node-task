import { Technology, Practice } from '../models';
import mongoose from 'mongoose';
import config from '../config';

mongoose.connect(config.database)
mongoose.set('debug', true);

const practices = [
  new Practice({
    name: 'Web-Development',
    description: 'Web development is a broad term for the work involved in developing a web site',
  }),
  new Practice({
    name: 'IT-technology',
    description: 'Information technology (IT) is the application of computers to store, study, retrieve, transmit, and manipulate data',
  }),
  new Practice({
    name: 'Hobbies',
    description: 'A hobby is a regular activity that is done for enjoyment, typically during one`s leisure time.',
  })
];

const technologies = [
  {
    name: 'React.js',
    topic: 'Web-Development',
    description: 'Most popular front-end library for building user interfaces.',
  },
  {
    name: 'Angular',
    topic: 'Web-Development',
    description: 'The AngularJS framework works by first reading the HTML page',
  },
  {
    name: 'React.js',
    topic: 'Web-Development',
    description: 'Most popular front-end library for building user interfaces.',
  },
  {
    name: 'Angular',
    topic: 'Web-Development',
    description: 'The AngularJS framework works by first reading the HTML page',
  },
  {
    name: 'React.js',
    topic: 'Web-Development',
    description: 'Most popular front-end library for building user interfaces.',
  },
  {
    name: 'Angular',
    topic: 'Web-Development',
    description: 'The AngularJS framework works by first reading the HTML page',
  },
  {
    name: 'React.js',
    topic: 'Web-Development',
    description: 'Most popular front-end library for building user interfaces.',
  },
  {
    name: 'Angular',
    topic: 'Web-Development',
    description: 'The AngularJS framework works by first reading the HTML page',
  },
  {
    name: 'React.js',
    topic: 'Web-Development',
    description: 'Most popular front-end library for building user interfaces.',
  },
  {
    name: 'Angular',
    topic: 'Web-Development',
    description: 'The AngularJS framework works by first reading the HTML page',
  },
  {
    name: 'Angularz',
    topic: 'Web-Development',
    description: 'The AngularJS framework works by first reading the HTML page',
  },
  {
    name: 'Community',
    topic: 'IT-technology',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
  },
  {
    name: 'Internet banking',
    topic: 'IT-technology',
    description: 'Money money money',
  },
  {
    name: 'Football',
    topic: 'Hobbies',
    description: 'Most popular sport game in the world',
  },
  {
    name: 'Baseball',
    topic: 'Hobbies',
    description: 'Most popular sport game in the world',
  },
  {
    name: 'Drink',
    topic: 'Hobbies',
    description: 'Most popular sport game in the world',
  }
]

function seedTechnology(tech, practices) {
  const practice = practices.find(practice => practice.name === tech.topic)
  const techToSave = new Technology({
    name: tech.name,
    description: tech.description,
    _created: practice._id
  });
  practice.technologies.push(techToSave)
  practice.save()
  techToSave.save()
}

Promise.all(technologies.map(technology => seedTechnology(technology, practices)))
.then(mongoose.disconnect())
