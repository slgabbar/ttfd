var stat_box = d3.select(".stat-button-container")
var record_table = d3.select(".play-by-play").select(".table").select("tbody");

// function add_button_row(btn1, type1, btn2, type2) {
// 	row = stat_box.append("div").attr("class", "button-row");
// 	left_button = row.append("div").attr("class", "left-btn");
// 	right_button = row.append("div").attr("class", "right-btn")

// 	left_button.append("button")
// 			// .attr("class", type1)
// 			.attr("class", type1 + " btn-block")
// 			.text(btn1);

// 	right_button.append("button")
// 			// .attr("class", type2)
// 			.attr("class", type2 + " btn-block")
// 			.text(btn2);

// 	left_button.on("click", function() {
// 		if (player_selected) {
// 			player = d3.select(".player-clicked")

// 			record_stat(player.text(), btn1)
// 			player.classed("player-clicked", false);
// 			player_selected = false;
// 		}
// 	});

// 	right_button.on("click", function() {
// 		if (player_selected) {
// 			player = d3.select(".player-clicked")
// 			record_stat(player.text(), btn2);
// 			player.classed("player-clicked", false);
// 			player_selected = false;
// 		}
// 	});
// }

// function record_stat(player, stat) {
// 	// console.log(player, stat);
// 	var table = record_table.append("tr");
// }