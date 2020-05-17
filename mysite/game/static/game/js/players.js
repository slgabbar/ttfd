function player_clicked(e) {
	var player = d3.select(e);

	if (player_selected) {
		// if some player has already been selected
		if (player.classed("player-clicked")) {
			//if selected player is clicked player, unclick player
			// player.classed("player-clicked", false);
			unclick_player();
		} else {
			// unclick whoever was selected, and select current player
			unclick_player(); 
			player.classed("player-clicked", true);
			player_selected = true;
		}
	} else {
		player.classed("player-clicked", true);
		player_selected = true;
	}
}

function unclick_player() {
	var player = d3.select(".player-clicked");
	player.classed("player-clicked", false);
	player_selected = false;
}