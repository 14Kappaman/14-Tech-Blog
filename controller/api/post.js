const { Router } = require("express");

const { User } = require("../../model");
const Post = require("../../model/post");
const Comment = require("../../model/comment");
const res = require("express/lib/response");
const { post } = require("../homeRoutes");

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
        include:{
            model: User, 
            required: true

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
   
comments.forEach(c => {
    c.user = c["user.name"]
   
    c.date = new Date(Date.parse(c.created_on)).toLocaleString()
});

    if (req.session.name){
        data.name=req.session.name
    } 
    console.log(comments)
    res.render("post", data)
})
blogrouter.get("/update/:title", async (req,res)=>{
    let post = await Post.findOne({
        where:{
            title:req.params.title,
            creator_id: req.session.userId
        }
    })
    res.render("edit_post", {
        title:post.title,
        content: post.contents,
name: req.session.userId
    }
        
    
    )
})
blogrouter.post("/update", async (req,res)=>{
    await Post.update({
        title: req.body.title,
        contents: req.body.content,
        where: {
            title: req.body.oldtitle, 
            creator_id: req.session.userId
        }
    })
    res.redirect("/blog")
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