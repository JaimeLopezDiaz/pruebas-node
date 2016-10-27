var Persona = require('../personas/PersonaSchema');

exports.getPersona = function(nombre, res){
	return new Promise(function(resolve, reject){
		console.log("Hola", nombre);
		Persona.find(function(err, persona){
			if(err){ return console.log("ERROR al buscar persona")};
			resolve(persona);
		});
	});	
};

exports.savePersona = function(persona){
	persona.save(function(){
		if(err){ 
			return console.log("ERROR al añadir persona");
		}
	});
};

exports.updatePersona = function(id, res, modificarPersona){
	Persona.findById(id, function(err, persona){
		modificarPersona(persona);
		persona.save(function(err) {
		    if (err){
		        res.send(err);
		    }
	    })
	})
};

exports.deletePersona = function(req, res){
	Persona.findByIdAndRemove(req.params.id, function(err){
		if(err){
			return res.send(err);
		}		
	})
};
