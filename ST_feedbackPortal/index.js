const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const db = require('./config/mongoose');
const port = 8888;

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

// telling app to use routes
app.use('/', require('./routes/index'));

//setting view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//make app listen to server
app.listen(port , function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
        return;
    }
    console.log(`Server is running on port: ${port}`);
})