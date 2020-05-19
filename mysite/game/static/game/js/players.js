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
	}
}


