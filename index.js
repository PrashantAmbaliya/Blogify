const express = require('express')
const StaticRoutes = require('./routes/StaticRoutes');
const DBconnect = require('./connection/DBconnect')

const app = express()
const port = 3000

DBconnect("mongodb://127.0.0.1:27017/Blogify")
    .then(() => console.log("Databse Connected..."))
    .catch((err) => console.log(err.message))

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))

app.use("/",StaticRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))