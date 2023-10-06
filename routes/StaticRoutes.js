const express = require('express')
const bcrypt = require('bcrypt')
const UserModel = require('../models/userModel')

const router = express.Router();

router.get("/",(req,res) => {
    res.render("home")
})

router.get("/signup", (req,res) => {
    res.render("signup")
})

router.get("/signin", (req,res) => {
    res.render("signin")
})

router.post("/signup",async (req,res) => {
    
    let { name , email, password } = req.body;
    if(!(email || name || password)) res.redirect("/signup")

    try {
        password = await bcrypt.hash(password, 10)

        await UserModel.create({
            name,
            email,
            password,
        })

        res.status(202).redirect('signin')
        
    } catch (error) {
        console.log(error.message);
    }
})

router.post("/signin",async (req,res) => {
    
    let { email, password } = req.body;
    if(!(email || password)) res.redirect("/signin")

    try {
        const result = await UserModel.findOne({email})

        if (!result) {console.log("No User Found With this email"); return res.redirect("/signin")}

        const PasswordReault = await bcrypt.compare(password,result.password)
        
        if(PasswordReault != true) {console.log("Wrong Password"); return res.redirect("/signin")}
        
        res.status(202).redirect('/')
        
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;