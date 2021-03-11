require('dotenv').config()
var usersModel = require('../models/users')
var validator = require('validator')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var mailer = require('nodemailer-smtp-transport')
var requestMaker = require('../misc/requestMaker')
var otpgenerator = require('otp-generator')
var errorActions = require('./../misc/erroractions')
const { response } = require('express')

var controller = function(){}

controller.registerUser = async function(data){
    try{
        //Data Validation
        var emailid = data.emailid != undefined?data.emailid:""
        var firstname = data.firstname != undefined?data.firstname:""
        var lastname = data.lastname != undefined?data.lastname:""
        var password = data.password != undefined?data.password:""
        if(!validator.isEmail(emailid)) return errorActions.invalidEmailID
        //Check if user already exists
        var isUserExists = await usersModel.getUserByEmail({emailid: emailid})
        if(!isUserExists) return errorActions.userAlreadyExists
         //Generate OTP
         var otp = otpgenerator.generate(6, {alphabets: false, upperCase: false, specialChars: false})
         while(otp < 100000) otp = otpgenerator.generate(6, {alphabets: false, upperCase: false, specialChars: false})
         otphash = await bcrypt.hash(otp, 8)
         var validity = (new Date().getTime() / 1000) + 1800
        //Register User
        passwordhash = await bcrypt.hash(password,8)
        var error = await usersModel.registerUser({firstname:validator.escape(firstname), lastname:validator.escape(lastname), emailid: validator.escape(emailid), password: passwordhash})
        if(error) return errorActions.anErrorOccured

        var serialid = await usersModel.getSerialID({emailid: validator.escape(emailid)})
        var error =await usersModel.registertoken({serialid:serialid, token:otphash, tokenvalidity:validity})
        if(error) return errorActions.anErrorOccured
        //Generate Access Tokens
        var accesstoken = jwt.sign({serialid: serialid, password: password}, process.env.ACCESS_TOKEN, {expiresIn: "840m"})
        var refreshtoken = jwt.sign({serialid: serialid, password: password}, process.env.REFRESH_TOKEN)
        return errorActions.loginSuccessful({accesstoken: accesstoken, refreshtoken:refreshtoken})
    }catch(error){
        console.log(error)
        return errorActions.anErrorOccured
    }
}
controller.login=async function(data){
    try{
    var emailid = data.emailid != undefined?data.emailid:""
    var password = data.password != undefined?data.password:""
    var response = await usersModel.getUserByEmail({emailid:emailid})
    var error = await bcrypt.compare(password, response[0].password)
    if(!error) return errorActions.invalidEmailOrPassword
    var accesstoken = jwt.sign({emailid: emailid, password: password}, process.env.ACCESS_TOKEN, {expiresIn: "840m"})
    var refreshtoken = jwt.sign({emailid: emailid, password: password}, process.env.REFRESH_TOKEN)
    return errorActions.loginSuccessful({accesstoken: accesstoken, refreshtoken:refreshtoken})
    }catch(error){
        console.log(error)
        return errorActions.anErrorOccured
    }
}
controller.setLoginOTP = async function(data){
    try{
        //Data Validation
        var emailid = escape(data.emailid)
        if(!validator.isEmail(emailid)) return errorActions.invalidEmailID
        var isUserExists = await usersModel.getUserByEmail({emailid: emailid})
        if(!isUserExists) return errorActions.userDoesntExist
        var serialid = await usersModel.getSerialID({emailid: emailid})
        var otp = otpgenerator.generate(6, {alphabets: false, upperCase: false, specialChars: false})
        var otphash = await bcrypt.hash(otp, 8)
        var validity = (new Date().getTime() / 1000) + 1800
        var error = await usersModel.setOtp({serialid: serialid, otp: otphash, otpvalidity: validity})
        if(error.affectedRows == 0) return errorActions.anErrorOccured
        var error = await requestMaker.sendOTPMail({to: emailid, otp: otp})
        if(error) return errorActions.anErrorOccured
        
        return errorActions.successData(serialid)
    }catch(error){
        console.log(error)
        return errorActions.anErrorOccured
    }
}


module.exports = controller