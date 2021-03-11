require('dotenv').config()
const app = require('express')
const bodyparser = require('body-parser')
var router = app.Router()
var authenticationController = require('./../../controllers/authentication')
const errorActions = require('../../misc/erroractions')
router.use(bodyparser.urlencoded({extended: true}))
router.use(bodyparser.json())
router.use(bodyparser.raw())

router.post('/registeruser', async (req, res) => {
    console.log("Register User")
    var data = req.body
    var response = await authenticationController.registerUser(data)
    res.status(response[0]).json(response[1])
})
router.post('/login', async (req, res) => {
    console.log("Login")
    var data = req.body
    var response = await authenticationController.login(data)
    res.status(response[0]).json(response[1])
})
router.post('/setloginotp', async (req, res) => {
    console.log("Set Login OTP")
    var data = req.body
    var response = await authenticationController.setLoginOTP(data)
    res.status(response[0]).json(response[1])
})
module.exports = router