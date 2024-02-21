const mongoose =require('mongoose')


const userSchema =mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    pass:{
        type:String,
        required:true
    }
},{
    versionKey:false
})


const UserModel =mongoose.model('users',userSchema)

module.exports ={
    UserModel
}