const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");
const studentsFilePath = path.join(__dirname,"students.json");

const readFile = ()=>{
    const buffer = fs.readFileSync(studentsFilePath);
    const content = buffer.toString();
    return JSON.parse(content)
}

router.get("/",(req,res) => {
    res.send(readFile())
})

router.get("/:id", (req,res)=>{
    let students  = readFile()
    let student = students.find(student => student._id == req.params.id);
    if (student){
        res.send(student);
    }else{
        res.status(404).send("User not found");
    }
})

router.post("/",(req,res)=>{
    previousStudents = readFile()
    let usedEmail = previousStudents.find( student => student.email == req.body.email)

    if(usedEmail){
        res.send("Email already registered")
    }else{
    req.body._id = previousStudents.length +1;
    req.body.creationTime = new Date()

    previousStudents.push(req.body);
    fs.writeFileSync(studentsFilePath,JSON.stringify(previousStudents));
    res.send(req.body)
    }
})

router.delete("/:id",(req,res)=>{
    students = readFile();
    let remainedStudents = students.filter(student => student._id != req.params.id)
    
    if ( remainedStudents.length < students.length){
        fs.writeFileSync(studentsFilePath,JSON.stringify(remainedStudents))
        res.send("Removed")
    }else{
        res.status("400").send("user not found")
    }
})

router.put("/:id",(req,res)=>{
    let students = readFile();
    let editStudent = students.find(student => student._id == req.params.id)
    if (editStudent){
       let editedStudent = Object.assign(editStudent, req.body)
       let editedStudentPosition = students.indexOf(editStudent)
       students[editedStudentPosition] = editedStudent
       fs.writeFileSync(studentsFilePath,JSON.stringify(students));
       res.send(editedStudent)
    }else{
        res.status(400).send("User not Found")
    }

})

router.post("/checkEmail/:email",(req,res)=>{
    let students = readFile();
    let usedEmail = students.find(student => student.email == req.params.email)

    // if (usedEmail){
    //     res.send("email already registered");
    // }else{
    //     res.send("email is available to use");
    // }

    usedEmail? res.send("email already registered") : res.send("email is available to use")
})
module.exports = router;