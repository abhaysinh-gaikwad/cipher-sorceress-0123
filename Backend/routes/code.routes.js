const express = require('express');
const {CodeEditor} =require('../model/code.model');
const {UserModel} =require('../model/user.model')
const {auth} =require('../middleware/auth.middleware')
const codeRouter =express.Router();


codeRouter.post('/', auth, async(req,res) =>{
    const {filename, htmlcode,csscode,jscode,userId,author,} =req.body;
    try{
        const code =new CodeEditor({filename, htmlcode,csscode,jscode,userId,author});
        await code.save()
        res.status(200).send({msg:'new code has benn added'})
    }catch(err){
        console.log(err)
        res.status(400).send({msg:"error in code added",err})
    }
});

codeRouter.get('/', auth, async(req,res) =>{
    try{
        const code =await CodeEditor.find( {userId: req.body.userId} );
        res.status(200).send({msg:'all code',code});
    }
    catch(err){
        console.log(err)
        res.status(400).send({msg:"error in code added",err});
    }
});

codeRouter.get('/:codeId',auth,async(req,res) =>{
    const {codeId} = req.params
    try{
        const code =await CodeEditor.findOne({_id: codeId})
        res.send({code})

    }catch(err){
        res.send({msg:'error in get the one single notes'})

    }

})


codeRouter.patch('/:id', auth, async(req,res) =>{
    const {id} = req.params
    try{
        const code = await CodeEditor.findOne({_id: id});
        if(code.userId === req.body.userId){
            await CodeEditor.findByIdAndUpdate({_id: id}, req.body);
            res.status(200).send({msg: `The code with id ${id} has been updated`})
        }else{
            res.status(400).send({msg: "You are not authorized to update this code"})
        }
    }catch(err){
        res.status(400).send({msg: err})
    }
})

codeRouter.delete('/:id', auth, async(req,res) =>{
    const {id} = req.params
    try{
        const code = await CodeEditor.findOne({_id: id});
        console.log(req.body.userId,code.userId)
        // var yourObjectId = ObjectId("code.userId");
        // var stringRepresentation = yourObjectId.toString();
        // console.log(stringRepresentation)
        await CodeEditor.findByIdAndDelete({_id: id});
        res.status(200).send({msg: `The code with id ${id} has been deleted`})
        // if(code.userId === req.body.userId){
           
        // }else{
        //     res.status(400).send({msg: "You are not authorized to deleted this code"})
        // }
    }catch(err){
        console.log(err)
        res.status(400).send({msg: err})
    }
})

codeRouter.get('/allCodes', async(req,res) =>{
    try{
        const code =await CodeEditor.find();
        res.status(200).send({msg:'all code',code});
    }
    catch(err){
        console.log(err)
        res.status(400).send({msg:"error in code added",err});
    }
});



codeRouter.get('/top-users', async (req, res) => {
    try {
        const topUsers = await CodeEditor.aggregate([
            { $group: { _id: "$userId", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 },
            { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "userData" } },
            { $unwind:"$userData" },
            { $project: { _id: 0, userId: "$_id", userName: "$userData.userName", email: "$userData.email", count: 1 } }
        ]); 

        res.json(topUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });

    }
});


module.exports = {
    codeRouter
}