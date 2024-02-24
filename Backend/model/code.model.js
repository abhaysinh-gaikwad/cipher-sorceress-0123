const mongoose = require('mongoose');

const codeSchema = mongoose.Schema({
    htmlcode :{
        type:String,

    },
    csscode :{
        type:String,
    },
    jscode :{
        type:String,
    }
},{
    versionKey:false
});

const CodeEditor = mongoose.model('codes',codeSchema);
module.exports = {
    CodeEditor
}