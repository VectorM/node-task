import { Technology, Practice } from '../models';
const ITEMS_PER_PAGE = 5;

export const getPractices = (req, res) => {
  Practice.find({}, {name: true, practiceId: true, practice_id:true, description: true, _id: false},(err, data) => {
    if (err) {
      console.log('ERROR:', err)
    }
    res.json(data)
  })
}

export const getPracticesById = (req, res) => {
  const id = req.params.id
  Practice.findOne({practice_id: id}, {name: true, practiceId: true, description: true, _id: false},(err, data) => {
    if (err) {
      console.log('ERROR:', err)
    }
    res.json(data)
  })
}

export const getTechnologies = (req, res) => {
  const id = req.params.id
  Practice.findOne({practice_id: id}, (err, practice) => {
    if (err) {
      res.status(500).send()
      throw err
    }
    if (!practice) {
      res.status(404).send()
    } else {
      const practiceId = practice._id;
      const { limit, offset } = req.query;
      const page = +limit || ITEMS_PER_PAGE;
      Technology.find({_created: practiceId}, (err, technologies) => {
        const pages = Math.ceil(technologies.length / page)
        console.log(pages);
          if (err) {
              res.status(500).send()
              throw err
          }
          res.json(technologies)
      })
    }
  });
}
// ,{name: 1, description: 1, _id: 0}).skip(itemsOffset).limit(itemsLimit).exec
