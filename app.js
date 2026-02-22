const express = require("express");
require("dotenv").config();
const path = require("path");
const methodOverride = require("method-override");
//connect to MongoDB Atlas
const connectToDb = require("./connection");

const allRoutes = require("./routes/allroutes");

const app = express();
const PORT = process.env.PORT || 8000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
//mount routes before starting server
app.use("/api", allRoutes);

//server chalano
const startServer = async() => {
    await connectToDb();

    app.listen(PORT, ()=>{
        console.log("Server running on PORT: ", PORT);
    });
};

startServer();




