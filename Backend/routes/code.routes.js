const express = require('express');
const {CodeEditor} =require('../model/code.model');
const {auth} =require('../middleware/auth.middleware')
const codeRouter =express.Router();


codeRouter.post('/', auth, async(req,res) =>{
    const {htmlcode,csscode,jscode,userId,author} =req.body;
    try{
        const code =new CodeEditor({htmlcode,csscode,jscode,userId,author});
        await code.save()
        res.send({msg:'new code has benn added'})
    }catch(err){
        console.log(err)
        res.send({msg:"error in code added",err})
    }
});


module.exports = {
    codeRouter
}