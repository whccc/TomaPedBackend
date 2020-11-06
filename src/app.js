const express=require('express');
const cors= require('cors');
const app=express();

//Settings
app.set('port',process.env.PORT || 3000);

//Middlewares
app.use(express.json({limit:'20mb'}));
app.use(cors());
app.use(express.json());


module.exports = app;