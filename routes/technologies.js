import express from 'express';
import Technology from '../models/technology';
import Practice from '../models/practice';
import checkToken from '../helpers/checkToken';

const router = express.Router();
const ITEMS_LIMIT = 5;
const ITEMS_OFFSET = 0;

router.get('/:id', checkToken, function(req, res) {
    const id = req.params.id
    Practice.findOne({technology_id: id}, (err, practice) => {
        if (err) {
            res.status(500).send()
            throw err
        }
        if (!practice) {
            res.status(404).send()
        } else {
            const practiceId = practice._id;
            const { limit, offset } = req.query;
            const itemsOffset = +offset || ITEMS_OFFSET;
            const itemsLimit = +limit || ITEMS_LIMIT;
            Technology.find({_created: practiceId},{name: 1, description: 1, _id: 0}).skip(itemsOffset).limit(itemsLimit).exec((err, technologies) => {
                if (err) {
                    res.status(500).send()
                    throw err
                }
                res.json(technologies)
            })
        }
    });
});

export default router
