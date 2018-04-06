

var con = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'password',
	database : 'sa1'
});



   con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
	
		con.query('SELECT idGames FROM sa1.games', function(err, result) {
		if (err) throw err;
		console.log(result);
	
		var GameId = result[0].idGames
		
		console.log(GameId)
		
		});
	});