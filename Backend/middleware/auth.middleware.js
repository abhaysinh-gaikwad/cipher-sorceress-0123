const jwt =require('jsonwebtoken');
const {BlackTokenModel} =require('../model/token.model')
require('dotenv').config()


const auth =async(req,res,next) =>{
    console.log("i am in auth middleware")
    

    try{
        const token =req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(404).send({msg:"please login"})
        }
         const blacktoken =await BlackTokenModel.findOne({blackToken:token})
        if(!blacktoken){
            const decoded =jwt.verify(token,process.env.tokenSecretKey)
            if(decoded){
                console.log(decoded)
                req.body.userId = decoded.userId
                req.body.author = decoded.author
    
                next()
            }else{
                res.status(404).send({msg:'you are not authorized'})
            }
        }else{
            res.status(404).send({msg:'you are not authorized'})
        }

    }catch(err){
        console.log(err)
        res.status(404).send({msg:"error in middleware"})
    }
}



module.exports ={
    auth
}