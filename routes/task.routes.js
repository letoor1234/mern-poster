const express = require ('express');
const db = require('../database');
const router = express.Router();

const Task=require('../models/task');

router.get ('/', async (req, res)=>{
    const tasks = await Task.find({'userId': req.user});
    if(tasks){
        res.json(tasks);
    } else{
        res.json({noTasks: true});
    } 
});


router.post('/', async (req,res)=> {
    var time = Date.now();
    const newTask = new Task();
    console.log(req.user);
    newTask.userId= req.user;
    newTask.title= req.title;
    newTask.content= req.content;
    newTask.creation= time;
    await newTask.save();

    const tasks = await Task.find({'user-id': req.user});

    res.json(tasks);
});
  
router.put('/', (req,res)=>{

});

router.delete('/',  (req, res)=>{
	
})


module.exports = router;