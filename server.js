import 'dotenv/config.js'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import createError from 'http-errors'
import session from 'express-session'
import logger from 'morgan'
import methodOverride from 'method-override'
import { passUserToView  } from './middleware/middleware.js'
import passport from 'passport'

const app = express()

import('./config/database.js')
import('./config/passport.js')

import { router as indexRouter } from './routes/index.js'
import { router as authRouter } from './routes/auth.js'
import { router as coinsRouter } from './routes/coins.js'
import { router as profilesRouter } from './routes/profiles.js'

app.set(
  'views',
  path.join(path.dirname(fileURLToPath(import.meta.url)), 'views')
)
app.set('view engine', 'ejs')

app.use(methodOverride('_method'))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')
  )
)

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'lax',
    }
  })
)

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(passUserToView)

// router middleware
app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/coins', coinsRouter)
app.use('/profiles', profilesRouter)

app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export { app }