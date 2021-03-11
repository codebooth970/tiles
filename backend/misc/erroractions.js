var errorActions = function(){}

errorActions.userAlreadyExists = [400, {error: true, error_message: "Email ID Already Exists", action_code: 2}]
errorActions.userDoesntExist = [400, {error: true, error_message: "Please Register First", action_code: 2}]

errorActions.invalidEmailID = [400, {error: true, error_message: "Invalid Email ID", action_code: 0}]
errorActions.invalidEmailOrPassword = [400, {error: true, error_message: "Invalid Email or Password", action_code: 0}]
errorActions.invalidMobileNo = [400, {error: true, error_message: "Invalid Mobile Number", action_code: 0}]
errorActions.invalidOTP = [400, {error: true, error_message: "Invalid OTP", action_code: 0}]
errorActions.OTPExpired = [400, {error: true, error_message: "OTP has been expired", action_code: 0}]
errorActions.unverifiedQueue = [400, {error: true, error_message: "Queue is not verified", action_code: 0}]
errorActions.currentSessionAlreadyExists = [400, {error: true, error_message: "Current session already exists", action_code: 0}]
errorActions.QueueDoesNotExists = [400, {error: true, error_message: "Queue Does Not Exists", action_code: 0}]

errorActions.pleaseEnter = function(key){
    return [400, {error: true, error_message: "Please Enter " + key, action_code: 0}]
}
errorActions.anErrorOccured = [400, {error: true, error_message: "An Error Occured", action_code: 0}]
errorActions.failedToAuthenticate = [400, {error: true, error_message: "Failed to authenticate", action_code: 0}]

errorActions.success = [200, {error: false, error_message: "Success", action_code: 1}]
errorActions.successData = function(data){
    return [200, {error: false, error_message: "Success", action_code: 1, data: data}]
}
errorActions.successToken = function(token){
    return [200, {error: false, error_message: "Success", action_code: 1, token: token}]
}
errorActions.successAccessToken = function(token){
    return [200, {error: false, error_message: "Success", action_code: 1, token: token}]
}
errorActions.loginSuccessful = function(token){
    return [200, {error: false, error_message: "Login Successful", action_code: 1, token: token}]
}

module.exports = errorActions