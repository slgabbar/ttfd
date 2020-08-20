/*
* this function handles logic for when a plyer is clicked
* if no otherplayer clikced, select player and set to 'clicked'
* if some of ther player was laready clicked, unclick that player
* and slect current player
* if the player was already selected simply unselect.
*/
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
				d3.select(".shotchart").classed("disabled", false);
			}
		} else {
			player.classed("player-clicked", true);
			player.classed("player-button", false);
			PLAYER_SELECTED = true;
			enable_stats();
			d3.select(".shotchart").classed("disabled", false);
		}
	}
}

// helper fucntion to unclicke a player who was 'clicked'
function unclick_player() {
	var player = d3.select(".player-clicked");
	player.classed("player-clicked", false);
	player.classed("player-button", true);
	PLAYER_SELECTED = false;
	disable_stats();
	d3.select(".shotchart").classed("disabled", true);
}

// transfer thatr name and id when dragged
function onDragStart(e, p_id, p_name) {
	var obj = {id:p_id, name:p_name};
	e.dataTransfer.setData('text/plain', JSON.stringify(obj))
}

// necessary to prevent default event
function onDragOver(e) {
	e.preventDefault();
}

// drop the player to rotation spot. Potentially 'sub out' 
// other player if necessary, uopdate bench table.
function onDrop(e) {
	const obj = JSON.parse(e.dataTransfer.getData('text'));
	const player_id = parseInt(obj['id']);
	const player_name = obj['name'];

	const dragedRow = document.getElementById(player_id);

	var dropzone = event.target;
	var player_button = d3.select(dropzone);

	if (!player_button.classed("empty")) {
		// Need to make a sub, make subbed out players table draggable again
		const oldRow = document.getElementById(player_button.attr('id'));
		var row = d3.select(oldRow)
			.attr("draggable", "true")
			.classed("text-muted", false);
	} else {
		player_button.classed("empty", false)
	}
	player_button.text(player_name);
	player_button.attr('id', player_id);
	d3.select(dragedRow)
		.attr("draggable", "false")
		.attr("class", "text-muted");
	if(!GAME_READY) {checkGameReady();}
	e.dataTransfer.clearData();
}

// check if game ready if so set game ready to true and start_game
function checkGameReady() {
	var check = d3.selectAll(".empty");
	if (check.empty()) {
		GAME_READY = true;
		start_game();
	}
}

// enable stat buttons so they are clickable, will higghligh stats so they glow
function enable_stats() {
	d3.selectAll(".stat-button").each(function(d) {
		var button = d3.select(this);
		button.classed("disabled", false);
	});
}

// disable stas sp theyrre unclickable
function disable_stats() {
	d3.selectAll(".stat-button").each(function(d) {
		var button = d3.select(this);
		button.classed("disabled", true);
	});
}


// start game, highlight players, highligh ppb table
function start_game() {
	d3.select(".play-by-play").style("border", "solid black 3px");
	d3.select(".live-stats").style("border", "solid black");
	start_scoreboard();

	d3.selectAll(".player-button").each(function(d) {
		var player = d3.select(this);
		player.classed("in-game", true);
		player.classed("text-muted", false);
	})

}






