const app = require('express')
const bodyparser = require('body-parser')
var router = app.Router()
var authenticationrouter = require('./authentication')
router.use(bodyparser.urlencoded({extended: true}))
router.use(bodyparser.json())
router.use(bodyparser.raw())

router.use('/authentication', authenticationrouter)

module.exports = router