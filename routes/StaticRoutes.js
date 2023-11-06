const express = require('express')
const multer  = require('multer')
const bcrypt = require('bcrypt')
const path = require('path')

const UserModel = require('../models/userModel')
const BlogModel = require('../models/blogModel')
const commentModel = require('../models/commentsModel')
const {generateToken} = require('../service/jwtAuth')
const {hardAuth} = require('../middleware/userAuth')
const upload = require('../middleware/multer')

const router = express.Router();

router.get("/",hardAuth, async(req,res) => {
    const posts = await BlogModel.find({}) 
    res.render("home",{
        posts: posts,
        name:req.user.name
    })
})

router.get("/signup", (req,res) => {
    if(req.user) return res.redirect("/")
    
    res.render("signup")
})

router.get("/signin", (req,res) => {
    if(req.user) return res.redirect("/")
    
    res.render("signin")
})

router.post("/signup",async (req,res) => {
    
    let { name , email, password } = req.body;

    if(!name) return res.render("signup.ejs", {Msg: "Please Fill Name"})
    if(!email) return res.render("signup.ejs", {Msg: "Please Fill Email"})
    if(!password) return res.render("signup.ejs", {Msg: "Please Fill Password"})

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
        return res.render("signup.ejs", {alert: error.message})
    }
})

router.post("/signin",async (req,res) => {
    
    let { email, password } = req.body;
    if(!email) return res.render("signin.ejs", {Msg: "Please Fill Email"})
    if(!password) return res.render("signin.ejs", {Msg: "Please Fill Password"})

    try {
        const result = await UserModel.findOne({email})
        if (!result) return res.render("signin.ejs", {Msg: "No User Found With this email"})

        const PasswordResult = await bcrypt.compare(password,result.password)
        
        if(PasswordResult != true) return res.render("signin.ejs", {Msg: "Wrong Password"})

        const token = await generateToken(result);
        
        res.cookie("token",token).status(202).redirect('/')       
    } catch (error) {
        console.log(error.message);
        return res.render("signin.ejs", {alert: error.message})
    }
})

router.get("/logout",(req,res) => {
    res.clearCookie("token").status(202).redirect('/signin') 
})

router.get("/addblog",hardAuth,(req,res) => {
    res.render("postBlog.ejs",{name:req.user.name})
})

router.post("/addblog",upload.single('image'),(req,res) => {
    const {title,text} = req.body;

    blogModel.create({
        title:title,
        text: text,
        coverIMG:`/uploads/${req.file.filename}`,
        autherName: req.user.name,
        createdBy: req.user.id
    })
    res.redirect('/')
})

router.get("/blog/:id",hardAuth, async (req,res) => {
    const BlogID = req.params.id
    try {
        const blog = await BlogModel.findOne({_id:BlogID}).populate("createdBy");
        const comments = await commentModel.find({BlogId:BlogID}).populate("createdBy");
        res.render("blog",{
            blog: blog,
            name: blog.createdBy.name,
            comments: comments,
        })
    } catch (error) {
        console.log(error.message);
    }
})

router.post("/comment/:blogID", async (req,res) => {
    commentModel.create({
        content:req.body.comment,
        BlogId: req.params.blogID,
        createdBy:req.user.id,
    })
    res.redirect(`/blog/${req.params.blogID}`)
})



module.exports = router;