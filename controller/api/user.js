const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../model');

// /api/user/
router.post('/create', async (req, res) => {
    try{
        const newUser = await User.create(req.body);
       req.session.userId = newUser.id;
       req.session.name = newUser.name;
        req.session.loggedIn = true;

        // res.redirect('/');
         req.session.save(() => {
        //    req.session.userId = newUser.id;
        //     req.session.name = newUser.name;
        //     req.session.loggedIn = true;

            res.redirect('/');
        })

    }catch(err){
        console.log(err);
        //res.status(500).json(err);
        res.render("signup", {err: err})
    }
})
router.post("/login",async (req,res)=>{
    try {
        const user=await User.findOne({
            where: {
                name: req.body.name
            }
        })
       
if (user.checkPassword(req.body.password)){
    req.session.userId = user.id;
    req.session.name = user.name;
    req.session.loggedIn = true;

    req.session.save(() => {
        res.redirect('/');
    })
    
} else {
    throw new Error("Incorrect Username or Password")
}
    } catch (err) {
        res.render("login", {err: err})
    }
})
module.exports = router;