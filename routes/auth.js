import { Router } from 'express'
import passport from 'passport'
import User from './models/user.js'

export {
  router
}

const router = Router()

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

const loginUserOnSuccess = async(req, res) => {
  const user = await User.findById(req.user._id)
  const profile = user.profile
  res.redirect('/' + profile)
}

router.get(
  '/google/oauth2callback',
  passport.authenticate('google', { failureRedirect: '/auth/google' }, loginUserOnSuccess)
)

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})