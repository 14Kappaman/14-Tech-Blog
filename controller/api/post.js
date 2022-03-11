const { Router } = require("express");

const { User } = require("../../model");
const Post = require("../../model/post");

const blogrouter=Router()

blogrouter.get("/", async (req, res) =>{
    console.log(req.session.name)
    if (req.session.name == undefined){ 
        
        res.redirect("/api/user")
    } else {
        let posts=await Post.findAll({
            where: {
                creator_id: (await User.findOne({
                    where: {
                     name: req.session.name  
                    }
                })).id  
            }
        })
        res.render("dashboard", {posts: posts})
    }
   
})

blogrouter.post("/", async (req, res) =>{
    
    Post.create({
        title: req.body.title, 
        contents: req.body.contents, 
        creator_id: (await User.findOne({
            where: {
             name: req.session.name  
            }
        })).id  
        
    })
    res.redirect("/blog")
})

module.exports={blogrouter}