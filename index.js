// const express = require('express');
// const Joi = require('joi');
// const app = express();
// app.use(express.json());



// const horror = [{'id':1 ,name:'Bhool bhulaiya'},
// {'id':2,name:'1920'},
// {'id':3,name:'Annabell'}
// ];

// app.get('/',(req,res)=>{
//     res.send("Hello world!!!!");
// });


// app.get('/api/horror', (req,res)=>{
//     res.send(horror);
// });
// app.get('/api/horror/:id', (req,res)=>{
//     var id = req.params.id;
//     const horro = horror.find(c=>(c.id === parseInt(req.params.id)));
//     if(!horro ) return res.status(404).send("Given Id Was Not Found");
//     res.send(horro );
// });

// app.post('/api/horror', (req,res) => {
//     const schema = Joi.object({
//         name: Joi.string().min(3).required()
//     });
//     const result = schema.validate(req.body);
//     console.log(result.value);
//     const horror1 ={
//         id:horror.length + 1,
//         name: req.body.name
//     } ;
//     horror.push(horror1);
//     res.send(horror1);
// });


// var port = process.env.PORT || 3000;
// app.listen(port,()=>{
//     console.log(`listening on port ${port}`);
// });

// Import modules

const express = require('express');
const app = express();
const Joi = require('joi');

// To read JSON string as object
app.use(express.json());

let genres = [{id:1,name:'Comedy'},
{id:2,name:'Action'},
{id:3,name:'Adventure'},{id:4,name:'Horror'},
{id:5,name:'Thriller'}
];


// Read operation using express get.
app.get('/genres', (req,res)=>{
    res.send(JSON.stringify(genres));
});


app.get('/genres/:id',(req,res)=>{
    let id = req.params.id;
    var genre = genres.find(c => (c.id == parseInt(id)));

    if(!genre) return res.status(404).send("Bad request");
    res.send(JSON.stringify(genre));
});


// Create operation using express post.
app.post('/genres',(req,res)=>{
    
    let schema = Joi.object({
        name : Joi.string().min(3).required()
    });
    const {value,error} = schema.validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    let genre = { id: genres.length +1,name :value.name};
    genres.push(genre);
    
    res.send(genre);
    

});


// Update operation using express post.

app.put('/genres/:id',(req,res)=>{

    // Check if element exists or not.
    let id = req.params.id;
    let result = genres.find(c =>(c.id === parseInt(id)));
    if(!result) return res.status(400).send("Bad request");

    // Validate the request.
    let schema = Joi.object({
        name : Joi.string().min(3).required()
    });
    const {value,error} = schema.validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    

    // Update the request
    result.name = value.name;
    res.send(result); 

});







let port = process.env.PORT || 3000;

// Listening on the port
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});
