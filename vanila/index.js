const dotenv = require('dotenv').config({path:'./.env'})
const express = require('express')
var isodate = require("isodate");
const bodyParser = require('body-parser')
const port = process.env.port || 5000
const mongoose = require('mongoose');
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
 
mongoose.connect('mongodb://test:test123@ds149894.mlab.com:49894/tryy-testing',
{uri_decode_auth: true }
, function(err, db) {
    if(db){
        console.log('connect to database')
    }

}
)
 const connection=mongoose.connection;
autoIncrement.initialize(connection);
const app =express()


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
 

var routes = require('./router/routers')

app.use('/',routes)


app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}/`);
});