const mysql = require('mysql2/promise')
		const dbconfig = require('././dbconfigpromise')

		const express = require('express')
		const bodyparser = require('body-parser')
		const apirouter = require('./appapi/appapi')
		const app = express()

		app.use(bodyparser.urlencoded({extended: true}))
		app.use(bodyparser.json())
		app.use(bodyparser.raw())
		
		app.use('/appapi', apirouter)
		app.get('*', (req, res) => {
			res.json({error: true, error_message: "Heyy There, Thanks for reaching us"})
		})
		app.listen(3000, () => {
			console.log("We Are Good To Go")
		})
		
	