import { Router } from 'express'

import ensureAuthentication from '../middlewares/ensureAuthentication'
import ProfileController from '../controllers/ProfileController'

const profileRouter = Router()

const profileController = new ProfileController()

profileRouter.use(ensureAuthentication)

profileRouter.get('/', profileController.show)
profileRouter.put('/', profileController.update)

export default profileRouter
