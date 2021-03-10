const mysql = require('mysql2/promise')
		const dbconfig = require('././dbconfigpromise')

		const express = require('express')
		const bodyparser = require('body-parser')
		const app = express()

		app.use(bodyparser.urlencoded({extended: true}))
		app.use(bodyparser.json())
		app.use(bodyparser.raw())
		
		app.get('/*', async (req, res) => {
			//First try these lines
			//res.send("HELLO WORLD")
			
			//Then uncomment these lines
			var [rows, fields] = await dbconfig.conn.execute("SELECT * FROM users");
			res.send({rows})
		})
		
		app.listen(3000, () => console.log("We Are Good To Go"))
	