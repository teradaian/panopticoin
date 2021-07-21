import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

export { router }

const router = Router()

router.get('/', isLoggedIn, profilesCtrl.index)
router.get('/:id/watchlists/:watchlistId/edit', isLoggedIn, profilesCtrl.editList)
router.get('/:id/watchlists/:watchlistId', isLoggedIn, profilesCtrl.showList)
router.get('/:id', isLoggedIn, profilesCtrl.show)
router.put('/:id/watchlists/:watchlistId/comment', isLoggedIn, profilesCtrl.newComment)
router.put('/:id/watchlists/:watchlistId', isLoggedIn, profilesCtrl.update)
router.post('/:id/watchlists', isLoggedIn, profilesCtrl.newList)
router.delete('/watchlists/:watchlistId/show/:coinId', isLoggedIn, profilesCtrl.deleteCoinFromList)
router.delete('/watchlists/:watchlistId', isLoggedIn, profilesCtrl.deleteList)
router.delete('/:id/watchlists/:watchlistId/comments/:commentId', isLoggedIn, profilesCtrl.deleteComment)
