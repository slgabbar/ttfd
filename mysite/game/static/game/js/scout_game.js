// stat_box = d3.select(".stat-button-container");
var stat_box = d3.select(".stat-button-container")


function add_button(name) {
	button = stat_box.append("button");
	button.text(name);
	button.attr("class", "btn-primary");
}

function add_button_row(btn1, type1, btn2, type2) {
	row = stat_box.append("div").attr("class", "button-row");
	left_button = row.append("div").attr("class", "left-btn");
	right_button = row.append("div").attr("class", "right-btn")

	left_button.append("button")
			// .attr("class", type1)
			.attr("class", type1 + " btn-block")
			.text(btn1);

	right_button.append("button")
			// .attr("class", type2)
			.attr("class", type2 + " btn-block")
			.text(btn2);
}