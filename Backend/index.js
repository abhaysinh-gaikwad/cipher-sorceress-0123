const express = require('express')
const cors = require('cors')
const {connection} =require('./config/db')
const {userRouter} =require('./routes/user.routes')
require('dotenv').config()


const app = express()
app.use(express.json())
app.use(cors())
app.use('/users', userRouter);



app.get('/',(req,res) =>{
    res.send({msg:"This is the home route"})
})



app.listen(process.env.port, async() =>{
    try{
        console.log(`server is running on http://localhost:${process.env.port}`)
        await connection
        console.log('connected to db')

    }catch(err){
        console.log(err);
    }
})