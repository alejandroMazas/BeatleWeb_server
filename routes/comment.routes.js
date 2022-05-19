const router = require("express").Router();

const { isAuthenticated } = require("../middlewares/jwt.middleware");
const Comment = require('./../models/Comment.model')
const User = require('./../models/User.model')

router.get('/comments', (req, res) => {

    Comment
        .find()
        .then(comments => res.json(comments))
        .catch(err => res.status(500).json(err))
})

router.get('/chapter/:chapterId/comments', (req, res) => {

    const { chapterId } = req.params

    Comment
        .find({ chapter: chapterId })
        .populate('author')
        .then(comments => res.json(comments))
        .catch(err => res.status(500).json(err))

})



router.get('/comments/:id', (req, res) => {

    const { id } = req.params

    Comment
        .findById(id)
        .then(comment => res.json(comment))
        .catch(err => res.status(500).json(err))
})

router.post('/chapter/:chapterId/newComment', isAuthenticated, (req, res) => {

    const { comment } = req.body
    const { chapterId } = req.params
    const { _id } = req.payload

    Comment
        .create({ author: _id, chapter: chapterId, comment })
        .then(newComment => res.json(newComment))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


router.delete('/comments/:id/delete', isAuthenticated, (req, res) => {

    const { id } = req.params
    const { _id, role } = req.payload



    Comment
        .findByIdAndDelete(id)
        .then((deletedComment) => res.json(deletedComment))
        .catch(err => res.status(500).json(err))
})

module.exports = router