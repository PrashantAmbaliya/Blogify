const express = require('express')
const ejs = require("ejs")
const cookieParser = require('cookie-parser') 

const StaticRoutes = require('./routes/StaticRoutes');
const DBconnect = require('./connection/DBconnect')
const {softAuth} = require('./middleware/userAuth')

const app = express()
const port = 3000

DBconnect("mongodb://127.0.0.1:27017/Blogify")
    .then(() => console.log("Databse Connected..."))
    .catch((err) => console.log(err.message))

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(softAuth);


app.use("/",StaticRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))