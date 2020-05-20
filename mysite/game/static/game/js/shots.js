var record_table = d3.select(".play-by-play").select(".table").select("tbody");

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
	try {
		var player = d3.select(".player-clicked").text();
		
		var shot = court.append("circle")
			.attr("cx", pos[0])
			.attr("cy", pos[1])
			.attr("r", "3")
			.attr("class", "made-shot");

		USER_SCORE += increment_score;
		record_shot(player, fg_type, zone);

	} catch(err) {
		console.log("No player was selected for shot.");
	}
}

function miss_shot(court, zone, pos) {
	var fg_type;
	if (zone=="inside-arc") {
		//inside three point arc
		fg_type = "2PT FG Miss";
	} else { fg_type="3PT FG Miss"; }
	try {
		var player = d3.select(".player-clicked").text();

		var shot = court.append("circle")
			.attr("cx", pos[0])
			.attr("cy", pos[1])
			.attr("r", "3")
			.attr("class", "miss-shot");

		record_shot(player, fg_type, zone);

	} catch(err) {
		console.log("No player was selected for shot.");
	}
}

function record_shot(player, fg, zone) {
	var table = record_table.append("tr");

	table.append("th").text(player);

	table.append("td").text(fg);

	table.append("td").text(zone);

	var score_text = table.append("td");
	score_text.text(USER_SCORE + "-" + OPP_SCORE);


	var elem = document.getElementById("play-by-play");
	elem.scrollTop = elem.scrollHeight;
}










