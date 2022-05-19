const router = require("express").Router();

router.use('/auth', require('./auth.routes'))
router.use('/', require('./chapter.routes'))
router.use('/', require('./comment.routes'))
router.use('/upload', require('./upload.routes'))


module.exports = router;
