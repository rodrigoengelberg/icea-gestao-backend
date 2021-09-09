import { Router } from 'express'

import usersRouter from '@modules/users/infra/http/routes/users.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import passwordRouter from '@modules/users/infra/http/routes/password.routes'
import profileRouter from '@modules/users/infra/http/routes/profile.routes'
import membersRouter from '@modules/members/infra/http/routes/members.routes'
import membersContact from '@modules/membersContact/infra/http/routes/membersContact.routes'
import patrimoniesRouter from '@modules/patrimonies/infra/http/routes/patrimonies.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)
routes.use('/members', membersRouter)
routes.use('/membersContact', membersContact)
routes.use('/patrimonies', patrimoniesRouter)

export default routes
