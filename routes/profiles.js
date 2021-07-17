import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

export { router }

const router = Router()

router.get('/', isLoggedIn, profilesCtrl.index)
router.get('/:id', isLoggedIn, profilesCtrl.show)
router.post('/:id/watchlists', isLoggedIn, profilesCtrl.newList)
router.delete('/watchlists/:watchlistId', isLoggedIn, profilesCtrl.deleteList)