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
      member_contact: Joi.any(),
      member_details: Joi.any(),
      member_spiritual: Joi.any()
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
      member_contact: Joi.any(),
      member_details: Joi.any(),
      member_spiritual: Joi.any(),
      created_at: Joi.string().optional(),
      updated_at: Joi.string().optional()
    },
  }),
  membersController.update
)

export default membersRouter