import { Router } from 'express'
import passport from 'passport'
import { path } from '../middleware/middleware.js'

export {
  router
}

const router = Router()

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
  '/google/oauth2callback',
  passport.authenticate('google', { failureRedirect: '/auth/google', successRedirect: '/'})
)


router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

