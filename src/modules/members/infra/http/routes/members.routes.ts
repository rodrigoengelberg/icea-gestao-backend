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
      last_name: Joi.string().required(),
      email: Joi.string().email().allow(null, ''),
      gender: Joi.string().required(),
      marital_status: Joi.string().allow(null, ''),
      nationality: Joi.string().required(),
      birth_date: Joi.date().iso().allow(null, '').empty('').default(null),
      occupation: Joi.string().optional().allow(null, ''),
      schooling: Joi.string().optional().allow(null, ''),
      facebook_link: Joi.string().optional().allow(null, ''),
      instagram_link: Joi.string().optional().allow(null, ''),
      avatar: Joi.string().optional().allow(null, ''),
      member_contact: Joi.object({
        address: Joi.string().optional().allow(null, ''),
        state: Joi.string().optional().allow(null, ''),
        city: Joi.string().optional().allow(null, ''),
        zipcode: Joi.number()
          .optional()
          .allow(null, '')
          .empty('')
          .default(null),
        phone_type_name: Joi.string().optional().allow(null, ''),
        phone_number: Joi.number()
          .optional()
          .allow(null, '')
          .empty('')
          .default(null)
      })
        .optional()
        .allow(null, ''),
      member_spiritual: Joi.object({
        member_function: Joi.string().optional().allow(null, ''),
        member_status: Joi.string().optional().allow(null, ''),
        baptism_date: Joi.date()
          .iso()
          .optional()
          .allow(null, '')
          .empty('')
          .default(null),
        joined_date: Joi.date()
          .iso()
          .optional()
          .allow(null, '')
          .empty('')
          .default(null),
        tithe_member: Joi.number()
          .optional()
          .allow(null, '')
          .empty('')
          .default(null),
        problems: Joi.string().optional().allow(null, ''),
        testimony: Joi.string().optional().allow(null, '')
      })
        .optional()
        .allow(null, '')
        .empty('')
        .default(null)
    }
  }),
  membersController.create
)
membersRouter.get('/:member_id', membersController.showById)
membersRouter.put(
  '/:member_id',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().optional().allow(null, ''),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().allow(null, ''),
      gender: Joi.string().required(),
      marital_status: Joi.string().allow(null, ''),
      nationality: Joi.string().required(),
      birth_date: Joi.date().iso().allow(null, ''),
      occupation: Joi.string().optional().allow(null, ''),
      schooling: Joi.string().optional().allow(null, ''),
      facebook_link: Joi.string().optional().allow(null, ''),
      instagram_link: Joi.string().optional().allow(null, ''),
      avatar: Joi.string().optional().allow(null, ''),
      member_contact: Joi.object({
        id: Joi.string().optional().allow(null, ''),
        member_id: Joi.string().optional().allow(null, ''),
        address: Joi.string().optional().allow(null, ''),
        state: Joi.string().optional().allow(null, ''),
        city: Joi.string().optional().allow(null, ''),
        zipcode: Joi.number()
          .optional()
          .allow(null, '')
          .empty('')
          .default(null),
        phone_type_name: Joi.string().optional().allow(null, ''),
        phone_number: Joi.number()
          .optional()
          .allow(null, '')
          .empty('')
          .default(null),
        created_at: Joi.string().optional().allow(null, ''),
        updated_at: Joi.string().optional().allow(null, '')
      })
        .optional()
        .allow(null, ''),
      member_spiritual: Joi.object({
        id: Joi.string().optional().allow(null, ''),
        member_id: Joi.string().optional().allow(null, ''),
        member_function: Joi.string().optional().allow(null, ''),
        member_status: Joi.string().optional().allow(null, ''),
        baptism_date: Joi.date()
          .iso()
          .optional()
          .allow(null, '')
          .empty('')
          .default(null),
        joined_date: Joi.date()
          .iso()
          .optional()
          .allow(null, '')
          .empty('')
          .default(null),
        tithe_member: Joi.number().optional().allow(null, ''),
        problems: Joi.string().optional().allow(null, ''),
        testimony: Joi.string().optional().allow(null, ''),
        created_at: Joi.string().optional().allow(null, ''),
        updated_at: Joi.string().optional().allow(null, '')
      })
        .optional()
        .allow(null, ''),
      created_at: Joi.string().optional().allow(null, ''),
      updated_at: Joi.string().optional().allow(null, '')
    }
  }),
  membersController.update
)
membersRouter.delete('/:member_id', membersController.delete)

export default membersRouter
