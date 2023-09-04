const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const sass = require('node-sass')
const path = require('path')
const app = express()
// const formidableMiddleware = require("express-formidable");
const port = 3000

// import routes
const routes = require('./routes')

app.use(express.static(path.join(__dirname, 'public')))
app.use(
    express.urlencoded({
        extended: true,
    }),
)
// app.use(formidableMiddleware());
app.use(express.json())
// Http logger
app.use(morgan('combined'))

// Template engine
// Rendering engine setup
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
    }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/resources/views'))
console.log(__dirname)

// routes init
routes(app)

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
