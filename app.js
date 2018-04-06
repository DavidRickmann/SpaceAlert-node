//requires

var express    = require("express");
var mysql      = require('mysql');
//var database = require("./db")
var gamelogic = require("./gamelogic");
var game = require("./gamestate.json");
var trajectory = require("./trajectory.json");
//var app = express();
//app.use('/node_modules',  express.static(__dirname + '/node_modules'));
//app.use('/style',  express.static(__dirname + '/style'));


//globals

Turn = 0;
enemy = new Array();
players = new Array();

track = {};
track.white = trajectory[game.trajectory.white];
track.red = trajectory[game.trajectory.red];
track.blue = trajectory[game.trajectory.blue];
track.green = trajectory[game.trajectory.green];


//maybe this needs to be something a bit cleverer?
//like an actual object with associated functions?
ship = {};

initPlayers();
initShip();

//temporarly changed this to 6 for a test. Change it  back to 13.
while ( Turn <= 13) {
	
	gamelogic.processTurn();
	Turn = Turn + 1
}





function initPlayers() {
	var out = require("./output");
	
	for ( index = 0; index < game.NumPlayers; index++) {
	
		players.push(game.players[index])
		players[index].position = "white"
		players[index].deck = "upper"		
		players[index].delay = 0		
	}
	
	players.forEach(function(item, index, array) {
	
	if (index == 0) {
		out.screen("The crew of the Sitting Duck", "intro")
		out.screen("Captain: " + players[index].Name + " (" + players[index].Colour + ")", "intro")
	} else {
		if (players[index].Role == "none") {
			out.screen(players[index].Name + " (" + players[index].Colour + ")", "intro")
		} else {
			out.screen(players[index].Role + ": " + players[index].Name + " (" + players[index].Colour + ")", "intro")
		}
	}
	
	
	})
}

function initShip(){
	
	ship.shields = {};
	ship.reactor = {};
	
	ship.shields.red = 1
	ship.shields.white = 1
	ship.shields.blue = 1
	ship.reactor.red = 2
	ship.reactor.white = 3
	ship.reactor.blue = 2
	ship.fuel = 3
	ship.computer = "none"
	ship.rockets = 3
	ship.reactor.redmax = 3
	ship.reactor.whitemax = 5
	ship.reactor.bluemax = 3	
	
	};

//app.listen(3000, function () {
//  console.log('app listening on port 3000!');
//});