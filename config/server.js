require('dotenv').config({ path: "config\\.env"});

const express = require('express');
const app = express();

app.listen(process.env.PORT||3307, function(err) {
    if(err)
        console.log("Server Down");
    
    else
        console.log(`Server running at port ${process.env.PORT||3306} \n`);
});

module.exports = app;