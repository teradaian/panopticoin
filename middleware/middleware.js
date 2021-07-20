export {
    passUserToView,
    isLoggedIn,
    // path
}

let path = null;

function passUserToView(req, res, next) {
    res.locals.user = req.user ? req.user : null
    next()
}

function isLoggedIn(req, res, next) {
    // path = req._parsedOriginalUrl.path
    if (req.isAuthenticated()) return next()
    res.redirect('/auth/google')
  }