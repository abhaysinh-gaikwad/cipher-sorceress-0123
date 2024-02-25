const mongoose = require("mongoose");

const codeSchema = mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
      unique: true,
    },
    htmlcode: {
      type: String,
    },
    csscode: {
      type: String,
    },
    jscode: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const CodeEditor = mongoose.model("codes", codeSchema);
module.exports = {
  CodeEditor,
};
