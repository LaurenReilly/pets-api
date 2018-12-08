var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var owners = [
    {
        id: 1,
        name: "Adam",
        pets: [
            {
                id: 1,
                name: "Vera",
                type: "Dog"
            },
            {
                id: 2,
                name: "Felix",
                type: "Cat"
            }
        ]
    },
    {
        id: 2,
        name: "Kamilah",
        pets: [
            {
                id: 1,
                name: "Doug",
                type: "Dog"
            }
        ]
    }
];


// GET /api/owners
app.get('/api/owners', function(req, res, next) {
    res.send(owners);      
});

// GET /api/owners/:id
app.get('/api/owners/:id', function(req, res, next) {
    res.send(owners[req.params.id]);      
});

// POST /api/owners
app.post('/api/owners', function(req, res) {
    owners.push(req.body)
    res.send(owners);
 });

// PUT /api/owners/:id
app.put('/api/owners/:id', function(req, res, next) {
    owners[req.params.id] = req.body;
    res.send(owners);
});

// DELETE /api/owners/:id
app.delete('/api/owners/:id', function(req, res, next) {
    var index = req.params.id;
    owners.splice(index, 1);
    res.send(owners);
});

// GET /api/owners/:id/pets
app.get('/api/owners/:id', function(req, res, next) {
    res.send(owners[req.params.id].pets);      
});

// GET /api/owners/:id/pets/:petId
app.get('/api/owners/:id/pets/:petId', function(req, res, next) {
    res.send(owners[req.params.id].pets[req.params.petId]);      
});

// POST /api/owners/:id/pets
app.post('/api/owners/:id/pets', function(req, res, next) {
    owners[req.params.id].pets.push(req.body)
    res.send(owners);
 });

// PUT /api/owners/:id/pets/:petId
app.put('/api/owners/:id/pets/:petId', function(req, res, next) {
    owners[req.params.id].pets[req.params.petId] = req.body;
    res.send(owners);
});

// DELETE /api/owners/:id/pets/:petId
app.delete('/api/owners/:id/pets/:petId', function(req, res, next) {
    var indexOwner = req.params.id;
    var indexPet = req.params.petId;
    owners[indexOwner].pets[indexPet].splice(index, 1);
    res.send(owners);
});

app.listen(3000, function(){
    console.log('Pets API is now listening on port 3000...');
})