const { Router } = require("express");

const { User } = require("../../model");
const Post = require("../../model/post");
const Comment = require("../../model/comment")

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
        res.render("dashboard", {posts: posts, account: req.session.name})
    }
   
})
blogrouter.post("/:title", async (req, res) => {
    Comment.create({
        contents: req.body.contents,
        creator_id: (await User.findOne({
            where: {
                name: req.session.name
            }
        })).id,
        blog_id: (await Post.findOne({
            where: {
                title: req.params.title
            }
        })).id
    })
    res.redirect(`/blog/${req.params.title}`)
})

blogrouter.get("/:title", async(req, res) => {
    let post = await Post.findOne({
        where: {
            title: req.params.title
        }
    })
    let comments=await Comment.findAll({
        where: {
            blog_id: post.id
        },
        raw: true
    }) 
    console.log(comments)
    console.log(post.id)
    
    let data = {
        title: post.title,
        created_on: post.created_on,
        contents: post.contents,
        user: (await User.findOne({
            where: {
                id: post.creator_id
            }
        })).name,
        comments: comments
    }
    if (req.session.name){
        data.name=req.session.name
    }
    res.render("post", data)
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