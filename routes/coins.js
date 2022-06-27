import { Router } from 'express'
import * as apiCtrl from '../controllers/coins.js'
import { isLoggedIn } from '../middleware/middleware.js';

export { router }

const router = Router()


router.get('/coins', apiCtrl.index)
router.post('/coins', isLoggedIn, apiCtrl.search)
router.get('/coins/:id/show', isLoggedIn, apiCtrl.show)
router.post('/coins/:id', isLoggedIn, apiCtrl.create)
router.get('/coins/trending', apiCtrl.trending)

