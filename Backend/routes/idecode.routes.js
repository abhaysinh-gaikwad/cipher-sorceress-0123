const express = require('express');
const {IdeCode} =require('../model/idecode.model');
const {auth} =require('../middleware/auth.middleware')
const IdecodeRouter =express.Router();


IdecodeRouter.post('/', auth, async(req,res) =>{
    const {javacode,cppcode,pythoncode,userId,author} =req.body;
    try{
        const code =new IdeCode({javacode,cppcode,pythoncode,userId,author});
        await code.save()
        res.status(200).send({msg:'new code has benn added'})
    }catch(err){
        console.log(err)
        res.status(400).send({msg:"error in code added",err})
    }
});


module.exports ={
    IdecodeRouter
}