




module.exports = {

	initThreat: function (code) {
		var threat = getThreatByCode(code);
		return threat
	},

	
	
	processTurn : function () {
		
		
	var out = require("./output");
		
	out.screen("Turn: " + Turn , "turn");
						
	//Threat Appears
			
	threatAppears();	

	//Player Actions
	
	playerActions();
	
	//Compute Damage
	
	//Threat Actions
		
	//threatActions();	
	
	//Rocket Resolution	
	
	//Computer Maintenance Check
	
	//If RuleSet !== Training
	//On Turns 2 Or 5 
	//add 1 to delaycount

	//victory or defeat?
	
	
	
	
	}

	
};



function threatAppears() {
	
	var game = require("./gamestate.json");
	var out = require("./output");
	
		if (Turn < 9) {
		enemy = enemy.concat(getThreatByCode(game.extthreats[Turn].threatcode));
		} else {
		enemy = enemy.concat(getThreatByCode("none"));
		}
						
		if (enemy[Turn].code != "none") {
			enemy[Turn].trajectory = game.extthreats[Turn].trajectory
			enemy[Turn].pos = track[enemy[Turn].trajectory].length-1
			enemy[Turn].status = "Active"
			
			out.screen("A " + enemy[Turn].name + "(" + Turn + ")" + " has appeared on " + enemy[Turn].trajectory + " at space " + enemy[Turn].pos, "threatAppears")

		}	
	
};

function getThreatByCode(code) {
  
  var extthreats = require("./extthreats.json");
  return extthreats.filter(function(extthreats) {return extthreats.code == code});
}

function threatActions() {

//moves enemy down trajectory and reports on required actions

var trajectory = require("./trajectory.json");
var Moves = 0

	enemy.forEach(function(item, index, array) {
		
		if (item.status == "Active") {
				out.screen("Moving " + item.name + "(" + index + ")", "threatAction");
				
				for (moves = 0, speed = item.speed; moves < speed; ++moves) {
								
								item.pos = item.pos - 1
								//out.screen(item.name + "(" + index + ") has moved to " + item.trajectory + " " + item.pos)
								if (track[item.trajectory][item.pos].Action == "-") {
									
									} else {
									resolveAction(track[item.trajectory][item.pos].Action, index)									
																		
									if (track[item.trajectory][item.pos].Action == "Z") {
											out.screen("you have survived " + item.name + "(" + index + ")") 
											item.status = "survived"
											speed = 0
										
									}
									
									
									}
								
								
				}
				
			}
	})	
	

};

function resolveAction(type, index) {
var Action

switch(type) {
	
	case "X":
		Action = enemy[index].xaction
		out.screen(enemy[index].name + "(" + index + ")" + Action, "threatAction")
		break;
		
	case "Y":
		Action = enemy[index].yaction
		out.screen(enemy[index].name + "(" + index + ")" + Action, "threatAction")
		break;
	case "Z":
		Action = enemy[index].zaction
		out.screen(enemy[index].name + "(" + index + ")" + Action, "threatAction")
		break;
	case "Start":
		
		break;
	}	

	
		
};

function playerActions() {
	var game = require("./gamestate.json");
	var out = require("./output");
	
	var lift = {};
	lift.blue = "none";
	lift.red ="none";
	lift.white = "none";
	
	lasers = {};
	lasers.blue = "none";
	lasers.red = "none";
	lasers.white = "none";
	lasers.pulse = "none";
	lasers.redsmall = "none";
	lasers.bluesmall = "none";
	
	players.forEach(function(item, index, array) {	
		//if players are delayed for any reason we add that onto the Turn value so we get a later move.
		moves = game.PlayerActions
		actions = moves.filter(function(moves) {return moves.Player == players[index].Seat})[0];
		moveTurn = Turn - players[index].delay
		
		if (players[index].delay > 0) {out.screen(players[index].Name + " is delayed " + players[index].delay + ". Now on Turn " + moveTurn, "delays")}
		
		while (players[index].delay > 0 && actions[moveTurn] == "none") {
			players[index].delay = players[index].delay -1
			moveTurn = Turn - players[index].delay
			out.screen(players[index].Name + " delay is reduced by 1. Now on Turn " + moveTurn, "delays")
			
		} 
		
		
				
						
		
		
		//now do something with that data
		switch(actions[moveTurn]) {
		
		case "lift" :
			if (lift[players[index].position] == "none") {
				
				lift[players[index].position] = players[index].Name
				//change deck
				switch(players[index].deck) {
					case "upper" :
						players[index].deck = "lower"
						break;
					case "lower" :
						players[index].deck = "upper"
						break;
				}
				
				out.screen(players[index].Name + " used the " + players[index].position + " lift and is now at " + players[index].deck + " deck " + players[index].position , "crewMove" )
				
			} else {
				out.screen(players[index].Name + " tried to use the " + players[index].position + " lift but " + lift[players[index].position] + " was already using it so is delayed", "crewMove")
				players[index].delay = players[index].delay + 1
			}
			break;
		
		case "red" :
			switch(players[index].position) {
				case "red" :
					out.screen(players[index].Name + " tried to move red but is already at " + players[index].deck + " deck " + players[index].position, "crewMove")
					break;
				
				case "white" :
					players[index].position = "red"
					out.screen(players[index].Name + " moves to " + players[index].deck + " deck " + players[index].position, "crewMove")
					break;
				case "blue" :
					players[index].position = "white"
					out.screen(players[index].Name + " moves to " + players[index].deck + " deck " + players[index].position, "crewMove")
					break;
				case "fighters" :
					players[index].position = "red"
					out.screen(players[index].Name + " returns to the ship", "crewMove")
					break;
											
			}

			break;
		case "blue" :
			switch(players[index].position) {
				case "blue" :
					out.screen(players[index].Name + " tried to move blue but is already at " + players[index].deck + " deck " + players[index].position, "crewMove")
					break;
				
				case "white" :
					players[index].position = "blue"
					out.screen(players[index].Name + " moves to " + players[index].deck + " deck " + players[index].position, "crewMove")
					break;
				case "red" :
					players[index].position = "white"
					out.screen(players[index].Name + " moves to " + players[index].deck + " deck " + players[index].position, "crewMove")
					break;
				case "fighters" :
					players[index].position = "red"
					out.screen(players[index].Name + " returns to the ship", "crewMove")
					break;
											
			}

			break;	
			
			
		case "A" :
			
			out.screen(players[index].Name + AActions(players[index].deck , players[index].position, players[index].Name), "crewMove")
			break;
		case "B" :
			out.screen(players[index].Name + BActions(players[index].deck , players[index].position), "crewMove")
			break;
		case "C" :
			out.screen(players[index].Name + CActions(players[index].deck , players[index].position), "crewMove")
			break;
		case "Bots" :
			break;
		
		}
			
		
	})
	

};
	
	
	function AActions(deck, position, player) {
		
		
		switch(deck) {
		
			case "upper" :
				switch(position) {
					case "red" :
					if (lasers.red == "none" && ship.reactor.red > 0) {
					lasers.red = player
					ship.reactor.red = ship.reactor.red - 1
					Action = " fires red heavy laser cannon"
					} else {
						if (ship.reactor.red == 0) {
							Action = " presses the red heavy laser cannon, but the reactor is empty"
						} else {
							Action = " tries to fire the red heavy laser but " + lasers.red + " already fired it!"
						}
					};
										
					break;
					
					
					case "white" :
					if (lasers.white == "none" && ship.reactor.white > 0) {
					lasers.white = player
					ship.reactor.white = ship.reactor.white - 1
					Action = " fires white heavy laser cannon"
					} else {
						if (ship.reactor.white == 0) {
							Action = " presses the white heavy laser cannon, but the reactor is empty"
						} else {
							Action = "tries to fire the white heavy laser but " + lasers.white + " already fiwhite it!"
						}
					};
										
					break;
					
					case "blue" :
					if (lasers.blue == "none" && ship.reactor.blue > 0) {
					lasers.blue = player
					ship.reactor.blue = ship.reactor.blue - 1
					Action = " fires blue heavy laser cannon"
					} else {
						if (ship.reactor.blue == 0) {
							Action = " presses the blue heavy laser cannon, but the reactor is empty"
						} else {
							Action = "tries to fire the blue heavy laser but " + lasers.blue + " already fiblue it!"
						}
					};
										
					break;
				}			
			
			
			break;
			
			case "lower" :
				switch(position) {
					case "red" :
					Action = " fires red light laser cannon"
					break;
					
					case "white" :
					Action = " fires pulse cannon"
					break;
					
					case "blue" :
					Action = " fires blue light laser cannon"
					break;
				}	
			
			break;
		
			
			
		}
		
		return Action
		
				
		
	}
	

	

function BActions(deck, position) {
		
		var energytomove = 0
		
		
		switch(deck) {
		
			case "upper" :
				switch(position) {
					case "red" :
					Action = " charges red shields"
					break;
					
					case "white" :
					Action = " charges white shields"
					break;
					
					case "blue" :
					Action = " charges blue shields"
					break;
				}			
			
			
			break;
			
			case "lower" :
				switch(position) {
					case "red" :
					Action = " charges red lateral reactor"
					ship.reactor.red
					break;
					
					case "white" :
					Action = " charges main reactor"
					break;
					
					case "blue" :
					Action = " charges blue lateral reactor"
					break;
				}	
			
			break;
		
			
			
		}
		
		return Action
		
				
		
	}


function CActions(deck, position) {
		
		
		switch(deck) {
		
			case "upper" :
				switch(position) {
					case "red" :
					Action = " launches in fighters"
					break;
					
					case "white" :
					Action = " wiggles the mouse"
					break;
					
					case "blue" :
					Action = " activates battlebot squad"
					break;
				}			
			
			
			break;
			
			case "lower" :
				switch(position) {
					case "red" :
					Action = " activates battlebot squad"
					break;
					
					case "white" :
					Action = " looks out the window"
					break;
					
					case "blue" :
					Action = " launches a rocket"
					break;
				}	
			
			break;
		
			
			
		}
		
		return Action
		
				
		
	}


