const express = require ('express');
const db = require('../database');
const router = express.Router();

const Post=require('../models/post');

router.get ('/', async (req, res)=>{
    const user = req.user;
    if(user){
        const posts = await Post.find({'userId':user._id});
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
    newPost.userId= req.user._id;
    newPost.content= req.body.content;
    newPost.creation= time;
    await newPost.save();

    res.json({postCreated: true});
});
  
router.put('/', (req,res)=>{

});

router.delete('/',  (req, res)=>{
	
})


module.exports = router;