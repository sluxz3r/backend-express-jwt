require('dotenv').config() // Initialize dotenv config

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: process.env.DB_HOST || "remotemysql.com",
  user: process.env.DB_USER || "VzHzAIWyCv" ,
  password: process.env.DB_PASSWORD || "o8RZOlh2sl",
  database: process.env.DB_NAME || "VzHzAIWyCv"
})

connection.connect((err) => {
  if (err) console.log(`Error: ${err}`)
})

module.exports = connection
