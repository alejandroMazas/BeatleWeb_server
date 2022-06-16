const router = require("express").Router();
const { json } = require("express/lib/response");
const Chapter = require('./../models/Chapter.model')
const { isAuthenticated } = require("../middlewares/jwt.middleware");

router.get('/allChapters', (req, res) => {

    Chapter
        .find()
        .then(allChapters => {
            allChapters.sort(function (a, b) {
                if (a.number > b.number) {
                    return 1
                }
                if (a.number < b.number) {
                    return -1
                }
            })
            res.json(allChapters)
        })
        .catch(err => res.status(500).json(err))
})

router.get('/chapter/:id', (req, res) => {

    const { id } = req.params

    Chapter
        .findById(id)
        .then(chapter => res.json(chapter))
        .catch(err => res.status(500).json(err))
})

router.post('/newChapter', isAuthenticated, (req, res) => {

    const { title, number, synopsys, cover, pages } = req.body

    const { role } = req.payload

    if (role !== 'ADMIN') {
        return res.status(403).json({ message: 'forbidden' })
    }

    Chapter
        .create({ title, number, synopsys, cover, pages })
        .then(newChapter => res.json(newChapter))
        .catch(err => res.status(500).json(err))
})

router.put('/chapter/:id/edit', isAuthenticated, (req, res) => {

    const { title, number, synopsys, cover, pages } = req.body
    const { id } = req.params
    const { role } = req.payload

    if (role !== 'ADMIN') {
        return res.status(403).json({ message: 'forbidden' })
    }

    Chapter
        .findByIdAndUpdate(id, { title, number, synopsys, cover, pages }, { new: true })
        .then(chapter => res.json(chapter))
        .catch(err => res.status(500).json(err))
})

router.delete('/chapter/:id/delete', isAuthenticated, (req, res) => {

    const { id } = req.params

    const { role } = req.payload

    if (role !== 'ADMIN') {
        return res.status(403).json({ message: 'forbidden' })
    }

    Chapter
        .findByIdAndDelete(id)
        .then((deletedChapter) => res.json(deletedChapter))
        .catch(err => res.status(500).json(err))
})

router.put('/chapterViewers/:id', (req, res) => {

    const { id } = req.params

    Chapter
        .findByIdAndUpdate(id, { $inc: { viewers: 1 } }, { new: true })
        .then(chapter => res.json(chapter))
        .catch(err => res.status(500).json(err))
})


module.exports = router;