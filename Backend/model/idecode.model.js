const mongoose = require("mongoose");

const idecodeSchema = mongoose.Schema({
    javacode: {
       type: String 
    },
    cppcode: {
        type: String
    },
    pythoncode: {
        type: String
    },
    userId: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
});

const IdeCode = mongoose.model("idecodes", idecodeSchema);
module.exports = {
    IdeCode
}