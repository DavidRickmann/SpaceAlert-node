




module.exports = {

	initThreat: function (code) {
		var threat = getThreatByCode(code);
		return threat
	},

	
	
	processTurn : function () {
		
	//reset delay flag
	players.forEach(function(item, index, array) {
		item.delay = 0
	})
	
	var out = require("./output");
		
	out.screen(" " , "turn")
	out.screen("-----------------------------------------" , "turn")
	out.screen("                 TURN " + Turn, "turn")
	out.screen("-----------------------------------------" , "turn")
	out.screen(" " , "turn")
	
	//Threat Appears
			
	threatAppears();	

	//Player Actions
	
	playerActions();
	
	//Compute Damage
	
	//Threat Actions
		
	threatActions();	
	
	//Rocket Resolution	
	
	//Computer Maintenance Check
	
	//If RuleSet !== Training
	
	
	
	if (ship.computer == "none" && (Turn == 2 || Turn == 5 || Turn == 9)) {
		players.forEach(function(item, index, array) {
			if (item.delay == 0) {
				players[index].actions = moveDelay(players[index].actions,Turn) 
				item.delay = 1 //this should get reset to zero straight away, (at the start of the next turn).
				out.screen("COMPUTER ERROR: " + item.Name + " is delayed", "delays")
			} 
				
		})
	}
	
	//reset computer
	if (Turn == 3 || Turn == 6) {ship.computer = "none"}
		
		
	//victory or defeat?
	
	TurnReport()
	
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
var out = require("./output");

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
var out = require("./output");
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
	
	rockets = {};
	rockets.one = "ready";
	rockets.two = "ready";
	rockets.three = "ready";
	
	players.forEach(function(item, index, array) {	
		
				
		
		//now do something with that data
		switch(players[index].actions[Turn]) {
		
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
				players[index].actions = moveDelay(players[index].actions,Turn) 	
				players[index].delay = players[index].delay = 1
				out.screen(players[index].Name + " tried to use the " + players[index].position + " lift but " + lift[players[index].position] + " was already using it so is delayed ", "crewMove")
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
							Action = " tries to fire the white heavy laser but " + lasers.white + " already fired it!"
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
							Action = " tries to fire the blue heavy laser but " + lasers.blue + " already fired it!"
						}
					};
										
					break;
				}			
			
			
			break;
			
			case "lower" :
				switch(position) {
					case "red" :
						if (lasers.redsmall == "none") {
							lasers.redsmall = player
							Action = " fires red lateral laser cannon"
						} else {
							Action = " tries to fire the red lateral laser but " + lasers.redsmall + " already fired it!"
						}
					
										
					break;
					
					
					case "white" :
					if (lasers.pulse == "none") {
							lasers.pulse = player
							Action = " fires the pulse cannon"
						} else {
							Action = " tries to fire the pulse cannon but " + lasers.pulse + " already fired it!"
						}
					
										
					break;
					
					case "blue" :
						if (lasers.bluesmall == "none") {
							lasers.bluesmall = player
							Action = " fires blue lateral laser cannon"
						} else {
							Action = " tries to fire the blue lateral laser but " + lasers.bluesmall + " already fired it!"
						}
													
					break;
				}	
			
			break;
		
			
			
		}
		
		return Action
		
				
		
	}

function BActions(deck, position) {
		
		var powerToMove = 0;
		var powerRequired = 0;
		
		switch(deck) {
		
			case "upper" :
				switch(position) {
					case "red" :
					
					powerRequired = ship.shields.redmax - ship.shields.red
					
					if (powerRequired > ship.reactor.red) {
						powerToMove = ship.reactor.red
						ship.reactor.red = 0
						ship.shields.red = ship.shields.red + powerToMove
						
					} else {
						ship.reactor.red = ship.reactor.red - powerRequired
						powerToMove = powerRequired
						ship.shields.red = ship.shields.red + powerRequired
						
					}
					
					Action = " moves " + powerToMove + " power to red shields"					
										
					break;
					
					case "white" :
					
					powerRequired = ship.shields.whitemax - ship.shields.white
					
					if (powerRequired > ship.reactor.white) {
						powerToMove = ship.reactor.white
						ship.reactor.white = 0
						ship.shields.white = ship.shields.white + powerToMove
						
					} else {
						ship.reactor.white = ship.reactor.white - powerRequired
						powerToMove = powerRequired
						ship.shields.white = ship.shields.white + powerRequired
						
					}
					
					Action = " moves " + powerToMove + " power to white shields"					
										
					break;
					
					case "blue" :
					
					powerRequired = ship.shields.bluemax - ship.shields.blue
					
					if (powerRequired > ship.reactor.blue) {
						powerToMove = ship.reactor.blue
						ship.reactor.blue = 0
						ship.shields.blue = ship.shields.blue + powerToMove
						
					} else {
						ship.reactor.blue = ship.reactor.blue - powerRequired
						powerToMove = powerRequired
						ship.shields.blue = ship.shields.blue + powerRequired
						
					}
					
					Action = " moves " + powerToMove + " power to blue shields"					
										
					break;
				}			
			
			
			break;
			
			case "lower" :
				switch(position) {
					case "red" :
					
					powerRequired = ship.reactor.redmax - ship.reactor.red
					
					if (powerRequired > ship.reactor.white) {
						powerToMove = ship.reactor.white
						ship.reactor.white = 0
						ship.reactor.red = ship.reactor.red + powerToMove
						
					} else {
						ship.reactor.white = ship.reactor.white - powerRequired
						powerToMove = powerRequired
						ship.reactor.red = ship.reactor.red + powerRequired
						
					}
					
					Action = " moves " + powerToMove + " power from white to red"
					
					break;
					
					case "white" :
						if (ship.fuel > 0) {
							ship.fuel = ship.fuel - 1
							ship.reactor.white = 5
							Action = " spends a fuel rod to charge the main reactor"
						} else {
							Action = " tries to refuel the main reactor but there is no more fuel"
						}
					break;
					
					case "blue" :
					powerRequired = ship.reactor.bluemax - ship.reactor.blue
					
					if (powerRequired > ship.reactor.white) {
						powerToMove = ship.reactor.white
						ship.reactor.white = 0
						ship.reactor.blue = ship.reactor.blue + powerToMove
						
					} else {
						ship.reactor.white = ship.reactor.white - powerRequired
						powerToMove = powerRequired
						ship.reactor.blue = ship.reactor.blue + powerRequired
						
					}
					
					Action = " moves " + powerToMove + " power from white to blue"
					
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
					ship.computer = players.Name
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

function TurnReport() {
	var out = require("./output");
	
	if (Turn == 0) {out.screen("BEGIN MISSION", "turn")}
	
	out.screen(" " , "report")
	out.screen(   "---------------SHIP STATUS---------------" , "report")
	out.screen("Reactor Status: " + ship.reactor.red + "/" + ship.reactor.white + "/" + ship.reactor.blue +   "  Fuel: "  + ship.fuel, "report")
	out.screen("Shield Status: " + ship.shields.red + "/" + ship.shields.white + "/" + ship.shields.blue, "report")
	out.screen("Heavy Weapon Status: " + lasers.red + " / " + lasers.white + " / " + lasers.blue, "report")
	out.screen("Light Weapon Status: " + lasers.redsmall + " / " + lasers.pulse + " / " + lasers.bluesmall, "report")
	out.screen("Rocket Status: Available(" + ship.rockets + ") " + rockets.one + " / " + rockets.two + " / " + rockets.three, "report")
	out.screen("-----------------------------------------" , "report")
	out.screen(" " , "report")
	
	if (Turn == 13) {out.screen("MISSION COMPLETE", "turn")}
	
	
}

function moveDelay(Actions,Turn) {
	var out = require("./output");
	var delayedActions = new Object();
	var noneFlag = 0
	
		
	delayedActions.Player = Actions.Player	
	
	
	var index;
		for (index = 1; index < 13; index++) {
		
				
		if (index < Turn) {
			delayedActions[index] = Actions[index]
		} 
		if (index == Turn) {
			delayedActions[index] = "none"
		}
		if (index > Turn && noneFlag==0) {
			delayedActions[index] = Actions[index -1] 
			if (Actions[index] == "none") {
				noneFlag = 1
			
			} 
		} else {
			if (index > Turn && noneFlag == 1) {
				delayedActions[index] = Actions[index]
			}
		}
				
	}
	
	
	
	
	out.screen("-----------------------------------------" , "debug")
	out.screen("            Delay Report                 " , "debug") 
	out.screen("-----------------------------------------" , "debug")	
	
	var index;
	for (index = 1; index < 13; index++) {
		
		out.screen(index + ": " + Actions[index] + " / " + delayedActions[index], "debug") 
		
	}
		
return delayedActions
		
		
		
}
	
	
	
