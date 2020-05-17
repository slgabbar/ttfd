function register_shots(court, width) {
	var timer = 0;
	var delay = 200;
	var prevent = false;

	court
		.on("click", function() {
			var mouse = d3.mouse(this);
			var shot_type = d3.event.target.id;
			timer = setTimeout(function() {
				if (!prevent) {
					made_shot(court, shot_type, mouse);
					unclick_player();
				}
				prevent=false;
			}, delay);
		})

		.on("dblclick", function() {
			var mouse = d3.mouse(this);
			var shot_type = d3.event.target.id;
			clearTimeout(timer);
			prevent = true;
			miss_shot(court, shot_type, mouse);
			unclick_player();
		});
	}

function made_shot(court, shot, pos) {
	var fg_type;
	if (shot=="inside-arc") {
		//inside three point arc
		fg_type = "2PT FG";
	} else { fg_type="3PT FG"; }

	try {
		var player = d3.select(".player-clicked").text();
		var play_str = player + ", " + fg_type + ", " + shot + ", made";
		
		var shot = court.append("circle")
			.attr("cx", pos[0])
			.attr("cy", pos[1])
			.attr("r", "3")
			.attr("class", "made-shot");
		// shots.push(shot);
		console.log(play_str);

	} catch(err) {
		console.log("No player was selected for shot.");
	}
}

function miss_shot(court, shot, pos) {
	var fg_type;
	if (shot=="inside-arc") {
		//inside three point arc
		fg_type = "2PT FG";
	} else { fg_type="3PT FG"; }

	try {
		var player = d3.select(".player-clicked").text();
		var play_str = player + ", " + fg_type + ", " + shot + ", miss";

		var shot = court.append("circle")
			.attr("cx", pos[0])
			.attr("cy", pos[1])
			.attr("r", "3")
			.attr("class", "miss-shot");
		// shots.push(shot);
		console.log(play_str);

	} catch(err) {
		console.log("No player was selected for shot.");
	}
}