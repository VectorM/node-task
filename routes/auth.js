import express from 'express';
import * as controller from '../controllers/auth';

const router = express.Router();

router.route('/register')
  .post(controller.register)

router.route('/login')
  .post(controller.login)

export default router
