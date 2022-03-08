const router = require("express").Router()

// in chrome, localhost:3000/
router.get("/",(req,res)=>{
    res.render("home",{account: req.session.name})
})


router.get("/login",(req,res)=>{
    res.render("login")
})
router.get("/logout",(req,res)=>{
    req.session.name=undefined    

    req.session.userId = undefined;
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

