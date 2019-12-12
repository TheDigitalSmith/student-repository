const express = require("express");
const server = express();
const studentServices = require("./src/services/students.js")

server.use(express.json());
server.use("/students",studentServices);

server.listen(3005,() =>{
    console.log("Yo my man, your server is running at port 3005")
});