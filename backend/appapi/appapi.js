const app = require('express')
const bodyparser = require('body-parser')
var router = app.Router()
const jwt = require('jsonwebtoken')
const v1router = require('./v1/v1')
router.use(bodyparser.urlencoded({extended: true}))
router.use(bodyparser.json())
router.use(bodyparser.raw())

router.use('/v1', v1router)

module.exports = router