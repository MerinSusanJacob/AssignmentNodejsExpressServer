const express=require("express");
const app=express();
const morgan=require("morgan");
app.use(morgan('dev'));
require('dotenv').config();
const fs=require("fs");
const api=require("./routes/routePage");

app.use("/api",api);

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
});
