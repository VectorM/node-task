import { Practice, Technology } from '../models';

const ITEMS_PER_PAGE = 5;

export const getPractices = (req, res) => {
  Practice.find({}, {__v: false, technologies: false }, (err, data) => {
    if (err) {
      console.log('ERROR:', err)
    }
    res.json(data)
  })
}

export const getPracticesById = (req, res) => {
  const id = req.params.id
  Practice.findOne({_id: id}, {__v: false, technologies: false }, (err, data) => {
    if (err) {
      console.log('ERROR:', err)
    }
    res.json(data)
  })
}

export const getTechnologies = (req, res) => {
  const id = req.params.id
  Practice.findOne({_id: id}, (err, practice) => {
    if (err) {
      res.status(500).send()
      throw err
    }
    if (!practice) {
      res.status(404).send()
    } else {
      const practiceId = practice._id;
      const { limit, page } = req.query;
      const options = {
        select: {
          name: 1,
          description: 1,
          _id: 0
        },
        page: parseInt(page) || 1,
        limit: +limit || ITEMS_PER_PAGE
      }
      console.log(options);
      Technology.paginate({_created: practiceId}, options, (err, result) => {
        console.log(result);
        const { docs: data, page, pages } = result;
          if (err) {
              res.status(500).send()
              throw err
          }
          if (data && data.length) {
            res.json({
              results: data,
              page,
              pages
            })
          } else {
            res.status(404).send('Not found')
          }
      })
    }
  });
}
