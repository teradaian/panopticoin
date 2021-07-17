import { Profile } from '../models/profile.js'

export {
    index,
    showProfile as show,
    newList,
    deleteList,
    showList
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

async function newList(req,res) {
    try {
        const profile = await Profile.findById(req.user.profile._id)
        profile.watchlists.push(req.body)
        await profile.save()
        res.redirect(`/profiles/${req.user.profile._id}`)
    } catch (err) {
        console.log(err)
        res.redirect(`/profiles/${req.user.profile}`)
    }
} 

async function deleteList(req,res) {
    try {
        const profile = await Profile.findById(req.user.profile._id)
        const watchlist = await profile.watchlists.id(req.params.watchlistId)
        profile.watchlists.remove(watchlist)
        await profile.save()
        res.redirect(`/profiles/${req.user.profile._id}`)
    } catch (err) {
        console.log(err)
        res.redirect(`/profiles/${req.user.profile}`)
    }
}

async function showList(req,res){
    try {
        const profile = await Profile.findById(req.params.id)
        const user = await Profile.findById(req.user.profile._id)
        const isSelf = user._id.equals(profile._id)
        res.render('profiles/show', { profile, user, isSelf, title:`${profile.name}`})

    } catch (err) {
        console.log(err)
        res.redirect(`/profiles/${req.user.profile}`)
    }
}