// const createClient = require('@supabase/supabase-js');

// export const supabse = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// )
require('dotenv').config({ path: "env"});

const sql = require('mysql2');

const con = sql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

con.connect(function(err) {
    if(err)
        console.log(err);

    else
        console.log(`Database connected at Port : ${process.env.DB_PORT} \n`);
});

module.exports = con;