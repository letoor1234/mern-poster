const express = require ('express');
const db = require('../database');
const router = express.Router();

const Post=require('../models/post');

router.get ('/', async (req, res)=>{
    const user = req.user;
    if(user){
        const posts = await Post.find({'userId':user.user}).sort({creation: -1});
        if(posts){
            res.json(posts);
        } else{
            res.json({noPosts: true});
        }
    }else{
        res.json({denegated: true}) 
    }
     
});

router.get ('/:user', async (req, res)=>{
    const user=req.user
    if(user){
        const posts = await Post.find({'userId':req.params.user}).sort({creation: -1});
        if(posts){
            res.json(posts);
        } else{
            res.json({noPosts: true});
        }
    }else{
        res.json({denegated: true}) 
    }
});


router.post('/', async (req,res)=> {
    const user= req.user
    if(user){
        var now = Date.now()
        var time= new Date(now).toUTCString();
        const newPost = new Post();
        newPost.userId= user.user;
        newPost.content= req.body.content;
        newPost.creation= time;
        await newPost.save();
        res.json({postCreated: true});
    }else{
        res.json({denegated: true}) 
    }
});

router.delete('/:id',  async(req, res)=>{
    const user=req.user
    if(user){
        const post = await Post.findById(req.params.id);
        await post.remove()
        res.json({success: true})
    }else{
        res.json({denegated: true}) 
    }
})


module.exports = router;