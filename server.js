var express = require('express');
var app = express();
var mongoose = require('mongoose');
var newDate = new Date().toDateString();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

var persona = require('./personaSchema');

mongoose.connect('mongodb://localhost/persona', function(err, res){
	if(err) console.log("ERROR AL CONECTAR BD" + err);
	else console.log("CONECTADO A BD");
});

app.use(function(req, res, next){	
	console.log(newDate);
	next();
});

app.get('/personas', function(req, res){
	persona.find(function(err, persona){
		if(err) return console.log("ERROR al buscar persona");
		res.send("La persona es " + persona);
		console.log(persona);		
	});
	console.log("Busqueda correcta");	
});

app.post('/personas', function(req, res){

	var personaNueva = new persona({
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		DNI: req.body.DNI,
		telefono: req.body.telefono
	});

	personaNueva.save(function(err, persona){
		if(err) return console.log("ERROR al añadir persona");
	});
	res.send("Persona añadida" + personaNueva);
});

app.put('/personas/:id', function(req, res){
	persona.findById(req.params.id, function(persona){
		console.log(req.params.id);
		console.log(persona);
		persona.nombre = req.body.nombre;
		persona.apellido = req.body.apellido;
		persona.DNI = req.body.DNI;
		persona.telefono = req.body.telefono;

		persona.save(function(err) {
	      if (err)
	        res.send(err);
	      res.json(persona);
	    });
	});
});

app.delete('/personas/:id', checkAuth, function(req, res){
	persona.findByIdAndRemove(req.params.id, function(err){
		if(err)
			res.send(err);
		res.json({ message: 'Persona removed from the DB!' });
	})
});

function checkAuth(req, res, next){
	if(!req.headers.authorization)
		return res.send("403 Forbidden");
	next();
}

app.use(function(req, res, next){
	console.log("404 ERROR");
	res.send("404 ERROR");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

