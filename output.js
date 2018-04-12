



module.exports = {



	screen: function (message, type) {
		
		var flags = {
			
			"turn": 1,
			"debug": 0,
			"intro": 1,
			"threatAppears": 1,
			"threatAction": 1,
			"crewMove" : 1,
			"delays" : 1,
			"report" : 1
		
		}
		
		
		
	if (flags[type] == 1) {
		
		console.log(message)
		
	}
		
		
		
		
	}
	
	
	
}