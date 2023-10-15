// Import modules

const express = require('express');
const genres = require('./routes/genres');
const app = express();
const Joi = require('joi');

// To read JSON string as object
app.use(express.json());
app.use('/genres',genres);

console.log("bye");


let port = process.env.PORT || 3000;

// Listening on the port
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});
