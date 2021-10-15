import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import PatrimonyController from '../controllers/PatrimonyController'
import TypesDomainController from '../controllers/TypesDomainController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const patrimoniesRouter = Router()

const patrimonyController = new PatrimonyController()
const typesDomainController = new TypesDomainController()

patrimoniesRouter.use(ensureAuthenticated)

patrimoniesRouter.get(
  '/accountingClassification',
  typesDomainController.showAccountingClassification
)

patrimoniesRouter.get('/', patrimonyController.show)
patrimoniesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      accounting_classification: Joi.string().optional(),
      localization: Joi.string().optional(),
      observations: Joi.string().optional()
    }
  }),
  patrimonyController.create
)
patrimoniesRouter.get('/:patrimony_id', patrimonyController.showById)
patrimoniesRouter.put(
  '/:patrimony_id',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().optional(),
      description: Joi.string().required(),
      accounting_classification: Joi.string().optional(),
      localization: Joi.string().optional(),
      observations: Joi.string().optional(),
      created_at: Joi.string().optional(),
      updated_at: Joi.string().optional()
    }
  }),
  patrimonyController.update
)
patrimoniesRouter.delete('/:patrimony_id', patrimonyController.delete)

export default patrimoniesRouter
