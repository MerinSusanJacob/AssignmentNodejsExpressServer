const express=require("express");
const router=express.Router();
const fs=require("fs");
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const data=require("../data.json");
const path = require('path');
let filePath = path.join(__dirname,'../data.json'); 

//GET operation
router.get("/getData",(req,res)=>{
  fs.readFile(filePath,(err,data)=>{
    if(err){
       console.log("Error occured");
    }
    else{
      res.send(data);
   }
  }); 
});

//POST operation
router.post("/postData",(req,res) => {
   let data1=data.concat(req.body);
   let dataPost = JSON.stringify(data1);

    fs.writeFile(filePath, dataPost,(err) => {
      if (err) {
        console.error('Error writing to file:', err);
        res.status(500).send('Error writing data to file');
      } else {
        console.log('Data written to file successfully');
        res.sendStatus(200);
      }
  });
});

//PUT operation
router.put("/putData/:index", (req,res)=>{
  const ind=req.params.index;
  data[ind].NameHospital=req.body.NameHospital;
  data[ind].PatientCount=req.body.PatientCount;
  data[ind].HospitalLocation=req.body.HospitalLocation;
  let dataPut = JSON.stringify(data); 

  fs.writeFile(filePath, dataPut,(err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).send('Error writing data to file');
    } else {
      console.log('Data written to file successfully');
      res.sendStatus(200);
    }
  });
});

//DELETE operation
router.delete("/deleteData/:index", (req,res)=>{
  const ind=req.params.index;
  delete data[ind];
  let dataDelete = JSON.stringify(data);

  fs.writeFile(filePath, dataDelete,(err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).send('Error writing data to file');
    } else {
      console.log('Data written to file successfully');
      res.sendStatus(200);
    }
  });
});

module.exports=router;
