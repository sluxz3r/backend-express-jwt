require('dotenv').config() // Initialize dotenv config

const express = require('express') // Import express
const bodyParser = require('body-parser') // Import body-parses
const app = express() // Create method
const port = process.env.PORT // Default PORT

const Cors = require('cors')
const xssFilter = require('x-xss-protection')
const logger = require('morgan')
// const whitelist = process.env.WHITELIST

const userRoute = require('./src/routes/routes')

// const corsOptions = (req, callback) => {
//   if (whitelist.split(',').indexOf(req.header('Origin')) !== -1) {
//     console.log('Success')
//     return callback(null, {
//       origin: true
//     })
//   } else {
//     console.log('Failed')
//     return callback(null, {
//       origin: false
//     })
//   }
// }


app.use(express.static(__dirname + '/src/uploads/images/'))
app.use(Cors())
// app.options('*', Cors(corsOptions))
app.use(xssFilter())
app.use(logger('dev'))

app.listen(port, () => {
  console.log(`\n GASSSSSSS AKU DI PORT : ${port} MASS!!!!\n`)
}) // Create listening app

app.use(bodyParser.json()) // Body parse json
app.use(bodyParser.urlencoded({ extended: false })) // body type

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Methods','GET,PATCH,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// })

app.use('/', userRoute)
