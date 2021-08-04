import { celebrate, Joi, Segments } from 'celebrate'
import { JoiDate } from '@hapi/joi-date'
import { Router } from 'express'
import MembersContactController from '../controllers/MembersContactController'
import MembersController from '../controllers/MembersController'
import MembersDetailsController from '../controllers/MembersDetailsController'

const membersRouter = Router()
const membersController = new MembersController()
const membersContactController = new MembersContactController()
const membersDetailsController = new MembersDetailsController()

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
      birth_date: JoiDate.date().format('DD/MM/YYYY').required()
    },
  }),
  membersController.create
)
membersRouter.put(
  '/:member_id',
  celebrate({
    [Segments.BODY]: {
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      gender: Joi.string().required(),
      member_type: Joi.string().required(),
      marital_status: Joi.string().required(),
      nationality: Joi.string().required(),
      birth_date: JoiDate.date().format('DD/MM/YYYY').required()
    },
  }),
  membersController.update,
)

membersRouter.post(
  '/contact',
  celebrate({
    [Segments.BODY]: {
      street: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      zipcode: Joi.number().required(),
      phoneType: Joi.string().required(),
      phoneNumber: Joi.number().required()
    },
  }),
  membersContactController.create
)

membersRouter.post(
  '/details',
  celebrate({
    [Segments.BODY]: {
      avatar: Joi.string().required(),
      occupation: Joi.string().required(),
      schooling: Joi.string().required(),
      facebook_link: Joi.string().required(),
      instagram_link: Joi.string().required()
    },
  }),
  membersDetailsController.create
)

export default membersRouter