



module.exports = {



	screen: function (message, type) {
		
		var flags = {
			
			"turn": 1,
			"debug": 1,
			"intro": 0,
			"threatAppears": 0,
			"threatAction": 0,
			"crewMove" : 1,
			"delays" : 1
		
		}
		
		
		
	if (flags[type] == 1) {
		
		console.log(message)
		
	}
		
		
		
		
	}
	
	
	
}