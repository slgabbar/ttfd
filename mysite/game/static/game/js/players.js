function player_clicked(e) {
	var player = d3.select(e);

	if (GAME_READY) {
		if (PLAYER_SELECTED) {
			// if some player has already been selected
			if (player.classed("player-clicked")) {
				//if selected player is clicked player, unclick player
				player.classed("player-clicked", false);
				player.classed("player-button", true);
				unclick_player();
			} else {
				// unclick whoever was selected, and select current player
				unclick_player(); 
				player.classed("player-clicked", true);
				player.classed("player-button", false);
				PLAYER_SELECTED = true;
				enable_stats();
			}
		} else {
			player.classed("player-clicked", true);
			player.classed("player-button", false);
			PLAYER_SELECTED = true;
			enable_stats();
		}
	}
}

function unclick_player() {
	var player = d3.select(".player-clicked");
	player.classed("player-clicked", false);
	player.classed("player-button", true);
	PLAYER_SELECTED = false;
	disable_stats();
}

function onDragStart(e) {
	e.dataTransfer.setData('text/plain', e.target.id);
}

function onDragOver(e) {
	e.preventDefault();
}

function onDrop(e) {
	const sub_in = e.dataTransfer.getData('text');
	const dragedRow = document.getElementById(sub_in);

	var dropzone = event.target;
	var player_button = d3.select(dropzone);

	if (!player_button.classed("empty")) {
		// Need to make a sub
		const oldRow = document.getElementById(player_button.text());
		var row = d3.select(oldRow)
			.attr("draggable", "true")
			.classed("text-muted", false);
	} else {
		player_button.classed("empty", false)
	}
	player_button.text(sub_in);
	d3.select(dragedRow)
		.attr("draggable", "false")
		.attr("class", "text-muted");
	if(!GAME_READY) {checkGameReady();}
	e.dataTransfer.clearData();
}

function checkGameReady() {
	var check = d3.selectAll(".empty");
	if (check.empty()) {
		GAME_READY = true;
		start_game();
	}
}

function enable_stats() {
	d3.selectAll(".stat-button").each(function(d) {
		var button = d3.select(this);
		button.classed("disabled", false);
	});
}

function disable_stats() {
	d3.selectAll(".stat-button").each(function(d) {
		var button = d3.select(this);
		button.classed("disabled", true);
	});
}

function start_game() {
	d3.select(".play-by-play").style("border", "solid black 3px");
	d3.select(".live-stats").style("border", "solid black");


	d3.selectAll(".player-button").each(function(d) {
		var player = d3.select(this);
		player.classed("in-game", true);
		player.classed("text-muted", false);
	})

}






