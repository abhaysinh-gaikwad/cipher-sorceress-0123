const mongoose = require('mongoose')


const blackSchema =mongoose.Schema({
    blackToken:{
        type:String,
        required:true
    }

},{
    versionKey:false
})


const BlackTokenModel =mongoose.model('BlackToken',blackSchema)



module.exports ={
    BlackTokenModel
}