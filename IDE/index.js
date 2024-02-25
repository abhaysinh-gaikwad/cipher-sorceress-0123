const express = require("express");
const bodyParser = require("body-parser");
const compiler = require("compilex");
const options = { stats: true }
const cors = require("cors");


compiler.init(options)

const app = express();


// app.use(express.json());

app.use(cors());
app.use(bodyParser.json());


app.use("/codemirror-5.65.16", express.static( __dirname + "/codemirror-5.65.16"));

app.use(bodyParser.json());




app.get("/", function (req,res){
    compiler.flush(function () {
        console.log("running")
    })

    res.sendFile(__dirname + "/index.html");

})


app.post("/compile", function (req, res) {
    let code = req.body.code
    let input = req.body.input
    let lang = req.body.lang
    try {

        if (lang == "Cpp") {
            if (!input) {
                let envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; 
                compiler.compileCPP(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                let envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; 
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
        else if (lang == "Java") {
            if (!input) {
                let envData = { OS: "windows" };
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                })
            }
            else {
                //if windows  
                let envData = { OS: "windows" };
                //else
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                })
            }
        }
        else if (lang == "Python") {
            if (!input) {
                let envData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                let envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
    }
    catch (e) {
        console.log("error")
    }
})


app.listen(8000, ()=>{
    console.log("server is running on port 8000");
});