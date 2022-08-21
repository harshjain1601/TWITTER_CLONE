require('dotenv').config({ path: "D:\\Naggaro Internship\\Twiter Clone\\config\\.env"});

const express = require('express');
const app = express();

app.listen(process.env.PORT||3306, function(err) {
    if(err)
        console.log("Server Down");
    
    else
        console.log(`Server running at port ${process.env.PORT||3306} \n`);
});

module.exports = app;