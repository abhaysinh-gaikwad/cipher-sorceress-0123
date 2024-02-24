const express = require('express');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
const {UserModel} =require('../model/user.model')
const {BlackTokenModel} =require('../model/token.model')
require('dotenv').config()

const userRouter =express.Router()


userRouter.get('/users/checkEmail', async (req, res) => {
    try {
        const email = req.query.email;
        const user = await Users.findOne({ email });
        res.json({ available: !user }); // Return whether the email is available or not
    } catch (error) {
        console.error('Error checking email:', error);
        res.status(500).send('Internal Server Error');
    }
});

userRouter.post('/register', async(req,res) =>{
    const {userName,email,pass} =req.body;
    try{
        const exUser =await UserModel.findOne({email})
        if(exUser){
            return res.status(400).send({msg:'user is already registered,Kindly Login'})

        }
        bcrypt.hash(pass,8,async(err,hash) =>{
            if(hash){
                const user =new UserModel({userName,email,pass:hash})
                await user.save()
                res.send({msg:'new user has benn register'})
            }else{
                console.log(err)
                res.send({msg:'error in password hashing process',err:err})
            }
        })

    }catch(err){
        console.log(err)
        res.send({msg:"error in user registration",err})
    }
})


userRouter.post('/login', async(req,res) =>{
    const {email,pass} =req.body
    try{

        if (!email || !pass) {
            return res.status(400).json({ error: "Email and password are required." });
        }
        const user =await UserModel.findOne({email})
        if(!user){
            return res.status(400).send({msg:'user not found'})
         }
        bcrypt.compare(pass,user.pass, (err,result) =>{
            if(result){
                const token = jwt.sign({userID:user._id},process.env.tokenSecretKey,{expiresIn:'7d'})
                res.send({msg:'login successfully',token,username: user.userName})
            }else{
                return res.status(401).send({ error: "Wrong password." });
            }
        })

    }catch(err){
        res.send({msg:"error in user login",errors:err})

    }
})


userRouter.get('/logout', async(req,res) =>{
    try{

        const token =req.headers.authorization?.split(' ')[1];

        if(token){
            const blacktoken =new BlackTokenModel({blackToken:token})
            await blacktoken.save();

            res.status(200).send({msg:'user log out successfully'})
        }



    }catch(err){
        res.status(404).send({msg:'error in user logout',Errors:err})
    }
})







module.exports ={
    userRouter
}