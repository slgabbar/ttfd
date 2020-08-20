// Record table is the tvable that holds all the shots
var record_table = d3.select(".play-by-play").select(".table").select("tbody");;


/*
* This function listens for a click (made-shot) or double-clikc(miss shot)
* then calls the corrsponf fucntion to record shot to DB
*/
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

/*
* Function called when a shot is 'made'
* first checks to see if the shot chart was enabled, if not dont 
* 8 record any shot and dont add new 'dot' to the chart
* If enabled, incremnt the score, record the fg_type, zone and player
* inceent SHOT_COUT, update scoreboard and call record shot.
*/
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
			.attr("class", "made-shot")
			.attr("id", function() {
				var s_id = "shot_" + SHOT_COUNT.toString();
				shots_list.push(s_id);
				SHOT_COUNT += 1;
				return s_id;
			});

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

/*
* Same funciton as missed shot, although appends red circle if a miss, 
* call record shot to update DB
*/
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
			.attr("class", "miss-shot")
			.attr("id", function() {
				var s_id = "shot_" + SHOT_COUNT.toString();
				shots_list.push(s_id);
				SHOT_COUNT += 1;
				return s_id;
			});

		record_shot(player, fg_type, 'miss', 0, zone, pos);
	} else {
		console.log("shotchart is disabled");
	}

}

// Very simple fucntion to sclae the click events as coordinate [0,100]
// this will make it easier to recreate shotchart from DB later on
function scale(width, height, pos) {
	x_scaled = (pos[0]/width) * 100;
	y_scaled = ((height-pos[1])/height) * 100;
	x_scaled = Math.round(x_scaled * 1e2) / 1e2;
	y_scaled = Math.round(y_scaled * 1e2) / 1e2;
	return [x_scaled, y_scaled];
}

/*
* Funciton to actually record shot to DB.
* Get all useful info for DB (name, id, shot_type, make/miss etc...)
* If the shot was from oppomet, do not record to DB
* Otherwise post to DB with ajax, store the pk response in plays list
*/
function record_shot(player, fg, result, value, zone, pos) {
	var player_name = player.text();
	var player_id = parseInt(player.attr('id'));
	var court_width = d3.select('.shotchart').select("svg").attr("width");
	var court_height = d3.select('.shotchart').select("svg").attr("height");

	var table = record_table.append("tr")
				.attr("id", function() {
					var pbp_id = "pbp_" + PBP_COUNT.toString();
					pbp_list.push(pbp_id);
					PBP_COUNT += 1;
					return pbp_id;
				});

	table.append("th").text(player_name);

	table.append("td").text(fg);

	table.append("td").text(zone);

	var scaled_pos = scale(court_width, court_height, pos);

	if (!player.classed("opponent")) {

		var shot_data = {'csrfmiddlewaretoken':csrftoken,
						 'game_id':game_pk,
						 'player_id':player_id,
						 'shot_type':fg,
						 'result':result,
						 'value': value,
						 'zone':zone,
						 'x_pos':scaled_pos[0],
						 'y_pos':scaled_pos[1]};

		serializedData = $.param(shot_data);

		$.ajax({
			type: 'POST',
            url: "../../shot/post/ajax/shot",
            data: serializedData,
            success: function (response) {
            	var instance = JSON.parse(response["instance"]);
            	var new_play = [instance[0]['model'], instance[0]['pk'], instance[0]['fields']['value']];
            	plays.push(new_play);
            },
            error: function (response) {
                alert(response["responseJSON"]["error"]);
            }

		})
	} else {
		// shot that was recorded was from the opponent
		var opponent_play = ['opponent','shot',value];
		plays.push(opponent_play);
	}


	var score_text = table.append("td");
	score_text.text(USER_SCORE + "-" + OPP_SCORE);


	var elem = document.getElementById("play-by-play");
	elem.scrollTop = elem.scrollHeight;
}











