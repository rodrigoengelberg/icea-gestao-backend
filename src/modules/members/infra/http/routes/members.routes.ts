import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import MembersController from '../controllers/MembersController'
import TypesDomainController from '../controllers/TypesDomainController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const membersRouter = Router()

const membersController = new MembersController()
const typesDomainController = new TypesDomainController()

membersRouter.use(ensureAuthenticated)

membersRouter.get('/genders', typesDomainController.showGenders)
membersRouter.get('/maritalStatus', typesDomainController.showMaritalStatus)
membersRouter.get('/memberFunction', typesDomainController.showMemberFunction)
membersRouter.get('/memberStatus', typesDomainController.showMemberStatus)
membersRouter.get('/nationalities', typesDomainController.showNationalities)
membersRouter.get('/occupations', typesDomainController.showOccupations)
membersRouter.get('/phoneTypes', typesDomainController.showPhoneTypes)
membersRouter.get('/school', typesDomainController.showSchool)

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
      member_contact: Joi.any().optional(),
      member_details: Joi.any().optional(),
      member_spiritual: Joi.any().optional()
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
membersRouter.delete('/:member_id', membersController.delete)

export default membersRouter