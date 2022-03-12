const { Router } = require("express");

const { User } = require("../../model");
const Post = require("../../model/post");

const blogrouter=Router()

blogrouter.get("/", async (req, res) =>{
    console.log(req.session.name)
    if (req.session.name == undefined){ 
        
        res.redirect("/api/user")
    } else {
        const userId=(await User.findOne({
            where: {
             name: req.session.name  
            }
        })).id  
        console.log(userId)
        let posts=await Post.findAll({
            where: {
                creator_id: (await User.findOne({
                    where: {
                     name: req.session.name  
                    }
                })).id  
            },
            raw:true
        }) 
        console.log(posts)
        res.render("dashboard", {posts: posts})
    }
   
})

blogrouter.post("/", async (req, res) =>{
    const userId=(await User.findOne({
        where: {
         name: req.session.name  
        }
    })).id  
    Post.create({
        title: req.body.title, 
        contents: req.body.contents, 
        creator_id: userId
        
    }) 
    console.log(userId)
    res.redirect("/blog")
})

module.exports={blogrouter}