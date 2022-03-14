const router = require("express").Router()
const Post = require("../model/post");
// in chrome, localhost:3000/
router.get("/",async(req,res)=>{
    let posts=await Post.findAll({
       

        raw:true
    })
    res.render("home",{account: req.session.name, posts: posts})
})


router.get("/login",(req,res)=>{
    res.render("login")
})
router.get("/logout",(req,res)=>{
    req.session.name=null  
    console.log("this happpened")
    //delete req.session
    //req.session=undefined
     req.session.userId = null;
     req.session.loggedIn = false;
    res.redirect("/")
})
router.get("/dashboard",(req,res)=>{
    res.render("dashboard")


})

// in chrome, localhost:3000/signUp
router.get("/signUp",(req,res)=>{
    res.render("signup")

})
module.exports = router;

