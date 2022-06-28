import { Profile } from '../models/profile.js'

export {
    index,
    showProfile as show,
    newList,
    deleteList,
    showList,
    editList,
    update,
    deleteCoinFromList,
    newComment,
    deleteComment
}

async function index(req, res){
    try {
        const profiles = await Profile.find({})
        res.render('profiles/index', {profiles, title: "Profiles"})
    } catch (error) {
        console.log(error)
        res.redirect(`/profiles/${req.user.profile}`)
    }
}

async function showProfile(req, res){
    try{
        const profile = await Profile.findById(req.params.id).populate('watchlists.coins')
        const isSelf = req.user.profile.equals(profile._id)
        res.render('profiles/show', { profile, isSelf, title: profile.name })
    } catch (error){
        console.log(error)
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
        Profile.findById(req.params.id)
        .populate({path: 'watchlists', populate: {path: 'coins'}})
        .exec((err, profile) => {
            const isSelf = req.user.profile._id.equals(profile._id)
            const watchlist = profile.watchlists.id(req.params.watchlistId)
            if (err) { console.log(err) }
            res.render('profiles/watchlists/show', { 
                profile, 
                isSelf, 
                watchlist, 
                title:`${profile.name}'s Watchlist` })
        })
    } catch (err) {
        console.log(err)
        res.redirect(`/profiles/${req.user.profile}`)
    }
}

async function editList(req,res){
    try {
        const profile = await Profile.findById(req.params.id)
        const watchlist = await profile.watchlists.id(req.params.watchlistId)
        if (req.user.profile._id.equals(profile._id)) {
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
        const watchlist = await profile.watchlists.id(req.params.watchlistId)
        console.log(watchlist)
        if (req.user.profile._id.equals(profile._id)) {
            watchlist.watchlistTitle = req.body.watchlistTitle
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

async function deleteCoinFromList(req, res){
    try {
        const profile = await Profile.findById(req.user.profile._id)
        const watchlist = await profile.watchlists.id(req.params.watchlistId)
        watchlist.coins.remove({ _id: req.params.coinId })
        await profile.save()
        res.redirect(`/profiles/${req.user.profile._id}/watchlists/${req.params.watchlistId}`)
    } catch (Error) {
        console.log(Error)
        res.redirect(`/profiles/${req.user.profile._id}/watchlists/${req.params.watchlistId}`)
    }
}

async function newComment(req, res) {
    try {
        const profile = await Profile.findById(req.params.id)
        const watchlist = await profile.watchlists.id(req.params.watchlistId)
        watchlist.comments.push(req.body)
        await profile.save()
        res.redirect(`/profiles/${req.params.id}/watchlists/${req.params.watchlistId}`)
    } catch (Error) {
      console.log(Error)
      res.redirect(`/profiles`)
    }
}

async function deleteComment(req, res){
    try {
        const profile = await Profile.findById(req.user.profile._id)
        const watchlist = await profile.watchlists.id(req.params.watchlistId)
        watchlist.comments.remove({ _id: req.params.commentId})
        await profile.save()
        res.redirect(`/profiles/${req.user.profile._id}/watchlists/${req.params.watchlistId}`)
    } catch (Error) {
        console.log(Error)
        res.redirect(`/profiles/${req.user.profile._id}/watchlists/${req.params.watchlistId}`)
    }
}