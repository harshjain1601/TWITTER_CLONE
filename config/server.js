require('dotenv').config({ path: ".env"});

const express = require('express');
const app = express();

app.listen(process.env.PORT||5500, function(err) {
    if(err)
        console.log("Server Down");
    
    else
        console.log(`Server running at port ${process.env.PORT||5500} \n`);
});

module.exports = app;