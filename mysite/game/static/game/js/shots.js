var record_table = d3.select(".play-by-play").select(".table").select("tbody");;

function register_shots(court, width) {
	var timer = 0;
	var delay = 200;
	var prevent = false;
	court
		.on("click", function() {
			var mouse = d3.mouse(this);
			var zone = d3.event.target.id;
			timer = setTimeout(function() {
				if (!prevent) {
					if (GAME_READY) {
						made_shot(court, zone, mouse);
						unclick_player();
					} 
				}
				prevent=false;
			}, delay);
		})
		.on("dblclick", function() {
			var mouse = d3.mouse(this);
			var zone = d3.event.target.id;
			clearTimeout(timer);
			prevent = true;
			if (GAME_READY) {
				miss_shot(court, zone, mouse);
				unclick_player();
			}
		});
	}

function made_shot(court, zone, pos) {
	if (!d3.select(".shotchart").classed("disabled")) {
		var fg_type;
		var increment_score;
		if (zone=="inside-arc") {
			//inside three point arc
			fg_type = "2PT FG Make";
			increment_score = 2;
		} else { 
			fg_type="3PT FG Make"; 
			increment_score = 3;
		}
	
		var player = d3.select(".player-clicked");
		
		var shot = court.append("circle")
			.attr("cx", pos[0])
			.attr("cy", pos[1])
			.attr("r", "3")
			.attr("class", "made-shot");

		if (player.classed("opponent")) {
			OPP_SCORE += increment_score;
			update_scoreboard('away', OPP_SCORE);
		} else {
			USER_SCORE += increment_score;
			update_scoreboard('home', USER_SCORE);
		}
		record_shot(player, fg_type, zone);
	} else {
		console.log("shotchart is disabled");
	}
}

function miss_shot(court, zone, pos) {
	if (!d3.select(".shotchart").classed("disabled")) {
		var fg_type;
		if (zone=="inside-arc") {
			//inside three point arc
			fg_type = "2PT FG Miss";
		} else { fg_type="3PT FG Miss"; }
		
		var player = d3.select(".player-clicked");

		var shot = court.append("circle")
			.attr("cx", pos[0])
			.attr("cy", pos[1])
			.attr("r", "3")
			.attr("class", "miss-shot");

		record_shot(player, fg_type, zone);
	} else {
		console.log("shotchart is disabled");
	}

}

function record_shot(player, fg, zone) {
	var player_name = player.text();
	var player_id = parseInt(player.attr('id'));

	var table = record_table.append("tr");

	table.append("th").text(player_name);

	table.append("td").text(fg);

	table.append("td").text(zone);

	if (!player.classed("opponent")) {
		console.log(player_id);
		console.log("shot: " + fg);
		console.log("zone: " + zone);
		console.log("--------------- ");
	}


	var score_text = table.append("td");
	score_text.text(USER_SCORE + "-" + OPP_SCORE);


	var elem = document.getElementById("play-by-play");
	elem.scrollTop = elem.scrollHeight;
}











