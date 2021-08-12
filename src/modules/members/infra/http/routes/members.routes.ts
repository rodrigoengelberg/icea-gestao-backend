import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import MembersController from '../controllers/MembersController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const membersRouter = Router()

const membersController = new MembersController()

membersRouter.use(ensureAuthenticated)

membersRouter.get('/', membersController.show)
membersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      first_name: Joi.string().required(),
      full_name: Joi.string().required(),
      email: Joi.string().email(),
      gender: Joi.string().required(),
      marital_status: Joi.string(),
      nationality: Joi.string().required(),
      birth_date: Joi.date().iso(),
      member_contact: {
        address: Joi.string().required(),
        state: Joi.string(),
        city: Joi.string(),
        zipcode: Joi.number(),
        phone_type: Joi.number(),
        phone_type_name: Joi.string(),
        phone_number: Joi.number()
      },
      member_details: {
        avatar: Joi.string(),
        occupation: Joi.string(),
        schooling: Joi.string(),
        facebook_link: Joi.string(),
        instagram_link: Joi.string()
      }
    },
  }),
  membersController.create
)
membersRouter.get('/:member_id', membersController.showById)
membersRouter.put(
  '/:member_id',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().optional(),
      first_name: Joi.string().required(),
      full_name: Joi.string().required(),
      email: Joi.string().email(),
      gender: Joi.string().required(),
      marital_status: Joi.string(),
      nationality: Joi.string().required(),
      birth_date: Joi.date().iso(),
      member_contact: {
        address: Joi.string().required(),
        state: Joi.string(),
        city: Joi.string(),
        zipcode: Joi.number(),
        phone_type: Joi.number(),
        phone_type_name: Joi.string(),
        phone_number: Joi.number()
      },
      member_details: {
        avatar: Joi.string(),
        occupation: Joi.string(),
        schooling: Joi.string(),
        facebook_link: Joi.string(),
        instagram_link: Joi.string()
      },
      created_at: Joi.string().optional(),
      updated_at: Joi.string().optional()
    },
  }),
  membersController.update
)

export default membersRouter