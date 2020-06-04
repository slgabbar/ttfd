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
			var val = 2;
			fg_type = "2PT FG";
			increment_score = 2;
		} else { 
			var val = 3;
			fg_type="3PT FG"; 
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
		record_shot(player, fg_type, 'make', val, zone, pos);
	} else {
		console.log("shotchart is disabled");
	}
}

function miss_shot(court, zone, pos) {
	if (!d3.select(".shotchart").classed("disabled")) {
		var fg_type;
		if (zone=="inside-arc") {
			//inside three point arc
			fg_type = "2PT FG";
		} else { fg_type="3PT FG"; }
		
		var player = d3.select(".player-clicked");

		var shot = court.append("circle")
			.attr("cx", pos[0])
			.attr("cy", pos[1])
			.attr("r", "3")
			.attr("class", "miss-shot");

		record_shot(player, fg_type, 'miss', 0, zone, pos);
	} else {
		console.log("shotchart is disabled");
	}

}

function scale(width, height, pos) {
	x_scaled = (pos[0]/width) * 100;
	y_scaled = ((height-pos[1])/height) * 100;
	x_scaled = Math.round(x_scaled * 1e2) / 1e2;
	y_scaled = Math.round(y_scaled * 1e2) / 1e2;
	return [x_scaled, y_scaled];
}

function record_shot(player, fg, result, value, zone, pos) {
	var player_name = player.text();
	var player_id = parseInt(player.attr('id'));
	var court_width = d3.select('.shotchart').select("svg").attr("width");
	var court_height = d3.select('.shotchart').select("svg").attr("height");

	var table = record_table.append("tr");

	table.append("th").text(player_name);

	table.append("td").text(fg);

	table.append("td").text(zone);

	var scaled_pos = scale(court_width, court_height, pos);

	if (!player.classed("opponent")) {
		console.log(player_id);
		console.log(fg);
		console.log(result);
		console.log(value);
		console.log(zone);
		console.log(scaled_pos[0]);
		console.log(scaled_pos[1]);
		console.log("--------------- ");
	}


	var score_text = table.append("td");
	score_text.text(USER_SCORE + "-" + OPP_SCORE);


	var elem = document.getElementById("play-by-play");
	elem.scrollTop = elem.scrollHeight;
}











