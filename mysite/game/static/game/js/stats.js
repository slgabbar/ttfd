// Record table is out play-by play table detailng att the plays
var record_table = d3.select(".play-by-play").select(".table").select("tbody");

/*
* Stat-clicked is called when a user clicks a stat button, it can only
* be clicked when a player has already been selected.
*
* When clicked, it retrieves the player, and stat type, unclicks the
* the player and calls record stat to record in DB
*/
function stat_clicked(e) {
	var player = d3.select(".player-clicked");
	var stat = d3.select(e).text();
	unclick_player();
	record_stat(player, stat);
}


/*
* Thhis function goes through the process of recorded stat to the DB
* First checks if that stat was a Free Throw
* 	- If it is, records the stat as a shot in the shots DB
* If the stat is not a regular free throw
* - Records as a regular stat in  the DB
*
* Opponent stats are printed to the PBP table, however they are not stored
* in the DB
*
*/
function record_stat(player, stat) {
	var ft = false;
	var opp_value = 0;
	var player_name = player.text();
	var player_id = parseInt(player.attr('id'));
	var stat_data;
	POST_URL = '';
	if (stat=="FT Made") {
		opp_value = 1;
		ft = true;
		POST_URL = "../../shot/post/ajax/shot";
		stat_data = {'csrfmiddlewaretoken':csrftoken,
						 'game_id':game_pk,
						 'player_id':player_id,
						 'shot_type':'FT',
						 'result':'made',
						 'value': 1,
						 'zone':'free throw',
						 'x_pos':0,
						 'y_pos':0};
		if (player.classed("opponent")) {
			OPP_SCORE += 1;
			update_scoreboard('away', OPP_SCORE);
		} else {
			USER_SCORE +=1;
			update_scoreboard('home', USER_SCORE);
		}
	} else if (stat=='FT Miss') { 
		ft = true;
		POST_URL = "../../shot/post/ajax/shot";
		stat_data = {'csrfmiddlewaretoken':csrftoken,
						 'game_id':game_pk,
						 'player_id':player_id,
						 'shot_type':'FT',
						 'result':'miss',
						 'value': 0,
						 'zone':'free throw',
						 'x_pos':0,
						 'y_pos':0};
	} else {
		POST_URL = "../../stats/post/ajax/stats";
		stat_data = {'csrfmiddlewaretoken':csrftoken,
						 'game_id':game_pk,
						 'player_id':player_id,
						 'stat': stat};
	}

	var table = record_table.append("tr")
				.attr("id", function() {
					var pbp_id = "pbp_" + PBP_COUNT.toString();
					pbp_list.push(pbp_id);
					PBP_COUNT += 1;
					return pbp_id;
				});

	table.append("th").text(player_name);
	table.append("td").text(stat);
	table.append("td").text("---");
	var score_text = table.append("td");
	score_text.text(USER_SCORE + "-" + OPP_SCORE);
	var elem = document.getElementById("play-by-play");
	elem.scrollTop = elem.scrollHeight;

	if (!player.classed("opponent")) {
		serializedData = $.param(stat_data);

		$.ajax({
			type: 'POST',
            url: POST_URL,
            data: serializedData,
            success: function (response) {
            	var instance = JSON.parse(response["instance"]);
            	var new_play;
            	if (!ft) {
            		new_play = [instance[0]['model'], instance[0]['pk']];
            	} else {
            		new_play = ['user_free_throw', instance[0]['pk'],instance[0]['fields']['value']];
            	}
            	plays.push(new_play);
            },
            error: function (response) {
                alert(response["responseJSON"]["error"]);
            }

		})
	} else {
		var opponent_play = ['opponent','stat', opp_value];
		plays.push(opponent_play);
	}
}

