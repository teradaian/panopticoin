import { Profile } from '../models/profile.js'

export {
    index,
    showProfile as show
}

function index(req, res){
    Profile.find({}, (err, profiles) => {
        res.render('profiles/index', {err, profiles, title: "Profiles"})
    })
    .catch(err => {
        res.redirect(`/profiles/${req.user.profile}`)
    })
}

function showProfile(req, res){
    Profile.findById(req.params.id)
    .then(profile => {
        Profile.findById(req.user.profile._id)
        .then(self => {
            const isSelf = self._id.equals(profile._id)
            res.render('profiles/show', {
                profile, 
                title: `${profile.name}`,
                isSelf
            })
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect('/profiles')
    })
}