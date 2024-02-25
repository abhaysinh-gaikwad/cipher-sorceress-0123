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
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
  
},{
    versionKey:false
})


const UserModel =mongoose.model('users',userSchema)

module.exports ={
    UserModel
}