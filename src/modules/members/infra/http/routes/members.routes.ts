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
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      gender: Joi.string().required(),
      member_type: Joi.string().required(),
      marital_status: Joi.string().required(),
      nationality: Joi.string().required(),
      birth_date: Joi.date().iso().required(),
      member_contact: {
        address: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        zipcode: Joi.number().required(),
        phoneType: Joi.string().required(),
        phoneNumber: Joi.number().required()
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
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      gender: Joi.string().required(),
      member_type: Joi.string().required(),
      marital_status: Joi.string().required(),
      nationality: Joi.string().required(),
      birth_date: Joi.date().iso().required(),
      member_contact: {
        address: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        zipcode: Joi.number().required(),
        phoneType: Joi.string().required(),
        phoneNumber: Joi.number().required()
      },
      created_at: Joi.string().optional(),
      updated_at: Joi.string().optional()
    },
  }),
  membersController.update
)

export default membersRouter