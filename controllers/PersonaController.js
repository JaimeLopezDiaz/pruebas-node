var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

var Persona = require('../models/PersonaSchema');
var PersonaDao = require("../dao/PersonaDao.js");


exports.getPersona = function(req, res){	
	PersonaDao.getPersona(res, function(persona){
		return res.send(persona);
	});	
	console.log("Busqueda correcta");
}

exports.postPersona = function(req, res){
	var personaNueva = new Persona({
			nombre: req.body.nombre,
			apellido: req.body.apellido,
			DNI: req.body.DNI,
			telefono: req.body.telefono
		});
	PersonaDao.savePersona(personaNueva);
	return res.send("Persona añadida" + personaNueva);
}

//TODO: no funciona 
exports.updatePersona = function(req, res){
/*
	Persona.findById(req.params.id, function(persona){
			persona.nombre = req.body.nombre;
			persona.apellido = req.body.apellido;
			persona.DNI = req.body.DNI;
			persona.telefono = req.body.telefono;

			Persona.update(function(err) {
		      if (err){
		        res.send(err);
		      }
		      res.json(persona);
		    });
	});
	*/
}

exports.deletePersona = function(req, res){
	PersonaDao.deletePersona(req, res);
	return res.json({ message: 'Persona removed from the DB!' });
}

exports.checkAuth = function (req, res, next){
	if(!req.headers.authorization){
		return res.send("403 Forbidden");
	}
	next();
}