const router = require("express").Router()

const uploader = require('./../config/cloudinary.config')

router.post('/cover', uploader.single('imageData'), (req, res) => {

    if (!req.file) {
        res.status(500).json({ errorMessage: 'Error caragndo el archivo' })
        return
    }

    res.json({ cloudinary_url: req.file.path })
})


router.post('/pages', uploader.array('imageData'), (req, res) => {

    let response = req.file || req.files

    if (!response) {
        res.status(500).json({ errorMessage: 'Error caragndo el archivo' })
        return
    }

    res.json({ cloudinary_urls: response.map(res => res.path) })
})


router.post('/enCover', uploader.single('imageData'), (req, res) => {

    if (!req.file) {
        res.status(500).json({ errorMessage: 'Error caragndo el archivo' })
        return
    }

    res.json({ cloudinary_url: req.file.path })
})


router.post('/enPages', uploader.array('imageData'), (req, res) => {

    let response = req.file || req.files

    if (!response) {
        res.status(500).json({ errorMessage: 'Error caragndo el archivo' })
        return
    }

    res.json({ cloudinary_urls: response.map(res => res.path) })
})





module.exports = router