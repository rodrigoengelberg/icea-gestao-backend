import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import MembersController from '../controllers/MembersController'

const membersRouter = Router();
const membersController = new MembersController()

membersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      gender: Joi.string().required(),
      member_type: Joi.string().required(),
      marital_status: Joi.string().required(),
      nationality: Joi.string().required(),
      birth_date: Joi.date().required()
    },
  }),
  membersController.create,
);

export default membersRouter