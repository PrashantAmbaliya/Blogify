const mongoose = require("mongoose")

async function DBconnect(URL){
    await mongoose.connect(URL)
}

module.exports = DBconnect