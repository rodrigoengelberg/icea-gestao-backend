import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import MembersContactController from '../controllers/MembersContactController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const membersRouter = Router()

const membersContactController = new MembersContactController()

membersRouter.use(ensureAuthenticated)

membersRouter.get('/', membersContactController.show)
membersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      member_id: Joi.string().required(),
      address: Joi.string().optional(),
      state: Joi.string().optional(),
      city: Joi.string().optional(),
      zipcode: Joi.number().optional(),
      phone_type: Joi.number().optional(),
      phone_type_name: Joi.string().optional(),
      phone_number: Joi.number().optional()
    }
  }),
  membersContactController.create
)
membersRouter.get('/:member_contact_id', membersContactController.showById)
membersRouter.put(
  '/:member_contact_id',
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
    }
  }),
  membersContactController.update
)
membersRouter.delete('/:member_contact_id', membersContactController.delete)

export default membersRouter
