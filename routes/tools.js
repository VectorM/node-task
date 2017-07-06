import express from 'express';
import Practice from '../models/practice';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const practices = Practice.find()
  console.log(chalk.red(practices))
  console.log(chalk.yellow(Practice.find()))
  res.render('index', { title: 'Express', practices });
});

export default router
