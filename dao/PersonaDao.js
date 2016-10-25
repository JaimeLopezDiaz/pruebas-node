var express = require('express');
var app = express();

var Persona = require('../models/PersonaSchema');

exports.getPersona = function(res, imprimir){
	Persona.find(function(err, persona){
		if(err){ return console.log("ERROR al buscar persona")};
		imprimir(persona);
	});
}

exports.savePersona = function(persona){
	persona.save(function(){
		if(err){ 
			return console.log("ERROR al añadir persona");
		}
	});
}

//TODO: terminarlo bien
exports.updatePersona = function(){

}

exports.deletePersona = function(req, res){
	Persona.findByIdAndRemove(req.params.id, function(err){
		if(err){
			return res.send(err);
		}		
	})
}
