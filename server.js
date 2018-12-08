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

//function to search for the index of the object with the specific id key instead of doing this by index of the array as the :id value
function search(idKey, array){
    for (var i=0; i < array.length; i++) {
        if (array[i].id === idKey) {
            return i;
        }
    }
}

// GET /api/owners
app.get('/api/owners', function(req, res, next) {
    res.send(owners);      
});

// GET /api/owners/:id
app.get('/api/owners/:id', function(req, res, next) {
    let id = Number(req.params.id);
    let index = search(id, owners);
    res.send(owners[index]);      
});

// POST /api/owners
app.post('/api/owners', function(req, res) {
    owners.push(req.body)
    res.send(owners);
 });

// PUT /api/owners/:id
app.put('/api/owners/:id', function(req, res, next) {
    let id = Number(req.params.id);
    let index = search(id, owners);
    owners[index] = req.body;
    res.send(owners);
});

// DELETE /api/owners/:id
app.delete('/api/owners/:id', function(req, res, next) {
    let id = Number(req.params.id);
    let index = search(id, owners);
    owners.splice(index, 1);
    res.send(owners);
});

// GET /api/owners/:id/pets
app.get('/api/owners/:id/pets', function(req, res, next) {
    let id = Number(req.params.id);
    let index = search(id, owners);
    res.send(owners[index].pets);      
});

// GET /api/owners/:id/pets/:petId
app.get('/api/owners/:id/pets/:petId', function(req, res, next) {
    let idOwner = Number(req.params.id);
    let indexOwner = search(idOwner, owners);

    let idPet = Number(req.params.petId);
    let indexPet = search(idPet, owners[indexOwner].pets);

    res.send(owners[indexOwner].pets[indexPet]);      
});

// POST /api/owners/:id/pets
app.post('/api/owners/:id/pets', function(req, res, next) {
    let idOwner = Number(req.params.id);
    let indexOwner = search(idOwner, owners);

    owners[indexOwner].pets.push(req.body)
    res.send(owners);
 });

// PUT /api/owners/:id/pets/:petId
app.put('/api/owners/:id/pets/:petId', function(req, res, next) {
    let idOwner = Number(req.params.id);
    let indexOwner = search(idOwner, owners);

    let idPet = Number(req.params.petId);
    let indexPet = search(idPet, owners[indexOwner].pets);

    owners[indexOwner].pets[indexPet] = req.body;
    res.send(owners);
});

// DELETE /api/owners/:id/pets/:petId
app.delete('/api/owners/:id/pets/:petId', function(req, res, next) {
    let idOwner = Number(req.params.id);
    let indexOwner = search(idOwner, owners);

    let idPet = Number(req.params.petId);
    let indexPet = search(idPet, owners[indexOwner].pets);
    
    owners[indexOwner].pets[indexPet].splice(index, 1);
    res.send(owners);
});

app.listen(3000, function(){
    console.log('Pets API is now listening on port 3000...');
})