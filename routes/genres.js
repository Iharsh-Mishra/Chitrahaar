const express = require('express');
const router = express.Router();
// const Joi = require('joi');

// To read JSON string as object
// router.use(express.json());

let genres = [{id:1,name:'Comedy'},
{id:2,name:'Action'},
{id:3,name:'Adventure'},{id:4,name:'Horror'},
{id:5,name:'Thriller'}
];


// Read operation using express get.
router.get('/', (req,res)=>{
    console.log("Hii");
    res.send(JSON.stringify(genres));
});


router.get('/:id',(req,res)=>{
    let id = req.params.id;
    var genre = genres.find(c => (c.id == parseInt(id)));

    if(!genre) return res.status(404).send("Bad request");
    res.send(JSON.stringify(genre));
});


// Create operation using express post.
router.post('/',(req,res)=>{
    
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

router.put('/:id',(req,res)=>{

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


// Delete operation using express

router.delete('/:id',(req,res)=>{
    // Check if element exists or not 
    let id = req.params.id;
    let result = genres.find(c =>(c.id === parseInt(id)));
    if(!result) return res.status(404).send("Genre with the given ID was not found");

    // Delete the element 
    let index = genres.indexOf(result);
    genres.splice(index,1);
    res.send(result);

})

module.exports = router;

