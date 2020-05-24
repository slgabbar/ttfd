var record_table = d3.select(".play-by-play").select(".table").select("tbody");

function stat_clicked(e) {
	var player = d3.select(".player-clicked");
	var stat = d3.select(e).text();

	unclick_player();
	record_stat(player, stat);
}

function record_stat(player, stat) {
	var player_name = player.text();
	var player_id = parseInt(player.attr('id'));

	var table = record_table.append("tr");
	table.append("th").text(player_name);
	table.append("td").text(stat);
	table.append("td").text("---");
	var score_text = table.append("td");
	score_text.text(USER_SCORE + "-" + OPP_SCORE);
	var elem = document.getElementById("play-by-play");
	elem.scrollTop = elem.scrollHeight;

	console.log(player_id);
	console.log("stat: " + stat);
	console.log("--------------- ");
}


