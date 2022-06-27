import { Router } from 'express'
import * as coinsCtrl from '../controllers/coins.js'
import { isLoggedIn } from '../middleware/middleware.js';

export { router }

const router = Router()


router.get('/', coinsCtrl.index)
router.post('/', isLoggedIn, coinsCtrl.search)
router.get('/:id/show', isLoggedIn, coinsCtrl.show)
router.post('/:id', isLoggedIn, coinsCtrl.create)
router.get('/trending', coinsCtrl.trending)

