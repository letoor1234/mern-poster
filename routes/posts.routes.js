const express = require ('express');
const db = require('../database');
const router = express.Router();

const Post=require('../models/post');

router.get ('/', async (req, res)=>{
    const user = req.user;
    if(user){
        const posts = await Post.find({'userId':user.user}).sort({creation: -1});
        console.log(posts)
        if(posts){
            res.json(posts);
        } else{
            res.json({noPosts: true});
        }
    }else{
        res.json({notLogued:true})
    }
     
});


router.post('/', async (req,res)=> {
    var time = Date.now();
    const newPost = new Post();
    newPost.userId= req.user.user;
    newPost.content= req.body.content;
    newPost.creation= time;
    await newPost.save();

    res.json({postCreated: true});
});

router.delete('/:id',  async(req, res)=>{
	const post = await Post.findById(req.params.id);
    const remove= await post.remove()
    res.json({success: true})
})


module.exports = router;