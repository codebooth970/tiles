var request = require('request-promise')
var util = require('util')
var axios = require('axios')

var requestMaker = function(){}
const axiosConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}
/*requestMaker.sendOTPMail = util.promisify(function(data, callback){
    request.post({url:"https://goque.latencot.com/appapi/v1/email/sendmail.php", formData:{
        username:"sankalppol@latencot.com",
        password:"iaodjw@rdkd",
        to:data.to,
        subject:"OTP For Email Verification",
        content:"Your One Time Password (OTP) is <b>"+data.otp+"</b><br>Please ignore if you didn't requested for email verification. Please do not share or forward this email with anyone.<br><img width='120px' src='https://goque.latencot.com/goque_logo.png'>"
    }}, (err, res, body) => {
        callback(JSON.parse(body).error)
    })
}) */

requestMaker.sendOTPMail = async (data) => {
    var response = await axios.post("https://goque.latencot.com/appapi/v1/email/sendmail.php", {
        username:"sankalppol@latencot.com",
        password:"iaodjw@rdkd",
        to:data.to,
        subject:"OTP For Email Verification",
        content:"Your One Time Password (OTP) is <b>"+data.otp+"</b><br>Please ignore if you didn't requested for email verification. Please do not share or forward this email with anyone.<br><img width='120px' src='https://goque.latencot.com/goque_logo.png'>"
    })
    return response.data.error
}
module.exports = requestMaker