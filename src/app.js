const express=require('express');
const cors= require('cors');
const app=express();

//Settings
app.set('port',process.env.PORT || 3000);

//Middlewares
app.use(express.json({limit:'20mb'}));
app.use(cors());
app.use(express.json());
//Router
app.use("/api/user",require("./Routers/User.js"));

app.use("/api/usertype",require("./Routers/UserType.js"));

app.use("/api/zone",require("./Routers/zone.js"));

module.exports = app;