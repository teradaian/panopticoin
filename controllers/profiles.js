import { Profile } from '../models/profile.js'

export {
    index,
    showProfile as show,
    newList,
    deleteList,
    showList,
    editList,
    update
}

function index(req, res){
    Profile.find({}, (err, profiles) => {
        res.render('profiles/index', {err, profiles, title: "Profiles"})
    })
    .catch(err => {
        res.redirect(`/profiles/${req.user.profile}`)
    })
}

async function showProfile(req, res){
    try{
        const profile = await Profile.findById(req.params.id)
        const user = await Profile.findById(req.user.profile._id)
        const isSelf = user._id.equals(profile._id)
            res.render('profiles/show', {
                profile, 
                title: `${profile.name}`,
                isSelf
            })
        } catch (err){
        console.log(err)
        res.redirect('/profiles')
    }
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
        const watchlist = await profile.watchlists.id(req.params.watchlistId)
        res.render('profiles/watchlists/show', { profile, isSelf, watchlist, title:`${profile.name}` })

    } catch (err) {
        console.log(err)
        res.redirect(`/profiles/${req.user.profile}`)
    }
}

async function editList(req,res){
    try {
        const profile = await Profile.findById(req.params.id)
        const watchlist = await profile.watchlists.id(req.params.watchlistId)
        const user = await Profile.findById(req.user.profile._id)
        if (user._id.equals(profile._id)) {
            res.render('profiles/watchlists/edit', { profile, watchlist, title: 'Edit' })
        } else {
            throw new Error ('Not Authorized')
        }
    } catch (Error) {
        console.log(Error)
        res.redirect(`/profiles/${req.user.profile}`)
    }
}

async function update(req,res){
    try {
        const profile = await Profile.findById(req.params.id)
        const user = await Profile.findById(req.user.profile._id)
        const watchlist = await profile.watchlists.id(req.params.watchlistId)
        console.log(watchlist)
        if (user._id.equals(profile._id)) {
            watchlist.title = req.body.title
            watchlist.description = req.body.description
            await profile.save()
            res.redirect(`/profiles/${profile._id}/watchlists/${watchlist._id}`)
        } else {
            throw new Error ('Not Authorized')
        }
    } catch (Error) {
        console.log(Error)
        res.redirect(`/profiles`)
    }
}