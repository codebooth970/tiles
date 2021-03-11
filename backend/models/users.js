const mysql = require('mysql2/promise')
const dbconfig = require('./../dbconfigpromise')
const errorActions = require('../misc/erroractions')

async function getConn(){
    return await mysql.createConnection(dbconfig.database)
}
var usersModel = function(){}

usersModel.registerUser = async function(data){
    try{
        const response = await dbconfig.conn.execute("INSERT INTO users (firstname, lastname, emailid, password, creationtime) VALUES (?, ?, ?, ?, ?)", [data.firstname, data.lastname, data.emailid, data.password, (new Date().getTime() / 1000)])
        return response[0].affectedRows == 0
    }catch(error){
        
        return true
    }
}
usersModel.registertoken = async function(data){
    try{
        const response = await dbconfig.conn.execute("INSERT INTO logintokens (userid, token, tokenvalidity) VALUES (?, ?, ?)", [data.serialid, data.token, data.tokenvalidity])
        return response[0].affectedRows == 0
    }catch(error){
        
        return true
    }
}
usersModel.getUserByEmail = async function(data){
    const [rows, fields] = await dbconfig.conn.execute("SELECT * FROM users WHERE emailid = ?", [data.emailid]);
    return rows
}
usersModel.getSerialID = async function(data){
    const [rows, fields] = await dbconfig.conn.execute("SELECT serial_id FROM users WHERE emailid = ?", [data.emailid]);
    return rows[0].serial_id
}
usersModel.setOtp = async function(data){
    try{
        const err = await dbconfig.conn.execute("UPDATE logintokens SET token = ?, tokenvalidity = ? WHERE userid = ?", [data.otp, data.otpvalidity, data.serialid]);
        return err
    }catch(error){
        console.log(error)
        return true
    }
}





module.exports = usersModel