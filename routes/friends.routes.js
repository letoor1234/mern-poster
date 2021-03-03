const express = require ('express');
const db = require('../database');
const router = express.Router();

const User=require('../models/user');
const Friend=require('../models/friends');
const Post=require('../models/post');

router.get('/', async (req, res)=>{
    const user= req.user
    if(user){
        const all = await User.find({}, {pass:0, mail:0});
        res.json(all);
    }else{
        res.json({denegated: true})
    }
    
})
router.get('/myfriends', async (req, res)=>{
    const user= req.user
    if(user){
        const myPosts = await Post.find({userId: user.user})
        const myList = await Friend.findOne({userId:user.user});
        if(myList){
            var allPosts = []
            myPosts.map((myPost)=>{
                allPosts.push(myPost)
            })
            Promise.all(myList.friends.map(async(friend)=>{
                var frPosts=await Post.find({userId: friend.friendId})
                frPosts.map((post)=>{
                    allPosts.push(post)
                })
            })).then(()=>{
                const ordenatedPosts=allPosts.sort((a,b)=> (a.creation < b.creation ? 1 : -1));
                res.json(ordenatedPosts)
            })
        } else{
            const myOrdenatedPosts=myPosts.sort((a,b)=> (a.creation < b.creation ? 1 : -1));
            res.json(myOrdenatedPosts)
        }
    }else{
        res.json({denegated: true}) 
    }
     
})
router.get('/list', async (req, res)=>{
    const user= req.user
    if(user){
        const list = await Friend.findOne({userId:user.user});
        res.json(list);
    } else{
        res.json({denegated: true})
    }
    
})

router.put('/', async (req,res)=> {
    const user = req.user
    if(user){
        const user= req.user
        const reqFriend = req.body.newFriend;
        const friendList= await Friend.findOne({userId:user.user})
        if(friendList){
            const newFriend = {friendId:reqFriend};
            Friend.updateOne({userId:user.user}, {$push: {friends: newFriend}}).exec();
        } else{
            const newFriend = {friendId:reqFriend};
            const newList = new Friend();
            newList.userId = user.user;
            newList.friends=[newFriend]

            await newList.save()
        }
        res.json({added: true})
    } else{
        res.json({denegated: true})
    }
});

router.delete('/',  async(req, res)=>{
    const user= req.user
    if(user){
        const deleteFriend = {friendId: req.body.deleteFriend};
        Friend.updateOne({userId:user.user}, {$pull: {friends: deleteFriend}}).exec();
        
        res.json({deleted: true})
    } else{
        res.json({denegated: true})
    }
})


module.exports = router;