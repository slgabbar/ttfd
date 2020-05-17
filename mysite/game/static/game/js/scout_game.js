// stat_box = d3.select(".stat-button-container");
var stat_box = d3.select(".stat-button-container")


function add_button(name) {
	button = stat_box.append("button");
	button.text(name);
	button.attr("class", "btn-primary btn-block");
}