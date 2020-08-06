var left_home = d3.select("#home-score").append("svg")
	.attr("width", 20)
	.attr("height", 60);

var right_home = d3.select("#home-score").append("svg")
	.attr("width", 20)
	.attr("height", 60);

var left_away = d3.select("#away-score").append("svg")
	.attr("width", 20)
	.attr("height", 60);

var right_away = d3.select("#away-score").append("svg")
	.attr("width", 20)
	.attr("height", 60);

function draw_digit(e) {

	e.append("line")
		.attr("x1", 0)
		.attr("y1", 10)
		.attr("x2", 20)
		.attr("y2",10)
		.attr("id", "t");

	e.append("line")
		.attr("x1", 0)
		.attr("y1", 50)
		.attr("x2", 20)
		.attr("y2",50)
		.attr("id", "b");

	e.append("line")
		.attr("x1", 0)
		.attr("y1", 12)
		.attr("x2", 0)
		.attr("y2", 29.5)
		.attr("id", "tl");

	e.append("line")
		.attr("x1", 0)
		.attr("y1", 30.5)
		.attr("x2", 0)
		.attr("y2", 48)
		.attr("id", "bl");

	e.append("line")
		.attr("x1", 20)
		.attr("y1", 12)
		.attr("x2", 20)
		.attr("y2", 29.5)
		.attr("id", "tr");

	e.append("line")
		.attr("x1", 20)
		.attr("y1", 30.5)
		.attr("x2", 20)
		.attr("y2", 48)
		.attr("id", "br");

	e.append("line")
		.attr("x1", 2)
		.attr("y1", 30)
		.attr("x2", 18)
		.attr("y2", 30)
		.attr("id", "m");}

function update_scoreboard(team, score) {
	if (score < 10) {
		var left = 0;
		var right = score;
	} else {
		var left = Math.floor(score / 10);
		var right = score % 10;
	}	

	if (team=='home') {
		update_digits(left_home, right_home, left, right)
	} else {
		update_digits(left_away, right_away, left, right)
	}}


function update_digits(l, r, n1, n2) {
	clear_digits(l);
	clear_digits(r);
	switch (n1) {
		case 0:draw_zero(l);break;
		case 1:draw_one(l);break;
		case 2:draw_two(l);break;
		case 3:draw_three(l);break;
		case 4: draw_four(l);break;
		case 5: draw_five(l);break;
		case 6: draw_six(l);break;
		case 7: draw_seven(l);break;
		case 8: draw_eight(l);break;
		case 9: draw_nine(l);break;
	}
	switch (n2) {
		case 0: draw_zero(r);break;
		case 1: draw_one(r);break;
		case 2: draw_two(r);break;
		case 3: draw_three(r);break;
		case 4: draw_four(r);break;
		case 5: draw_five(r);break;
		case 6: draw_six(r);break;
		case 7: draw_seven(r);break;
		case 8: draw_eight(r);break;
		case 9: draw_nine(r);break;
	}}

function clear_digits(digit) {
	digit.selectAll("line").remove();
	draw_digit(digit)
	digit.selectAll("line").classed("light-off", "true");}

function draw_zero(digit) {
	digit.select("#t").classed("light-on", "true");
	digit.select("#t").classed("light-off", "false");

	digit.select("#tl").classed("light-on", "true");
	digit.select("#tl").classed("light-off", "false");

	digit.select("#tr").classed("light-on", "true");
	digit.select("#tr").classed("light-off", "false");

	digit.select("#bl").classed("light-on", "true");
	digit.select("#bl").classed("light-off", "false");

	digit.select("#br").classed("light-on", "true");
	digit.select("#br").classed("light-off", "false");

	digit.select("#b").classed("light-on", "true");
	digit.select("#b").classed("light-off", "false");}
function draw_one(digit) {
	digit.select("#tr").classed("light-on", "true");
	digit.select("#tr").classed("light-off", "false");
	digit.select("#br").classed("light-on", "true");
	digit.select("#br").classed("light-off", "false");}
function draw_two(digit) {
	digit.select("#t").classed("light-on", "true");
	digit.select("#t").classed("light-off", "false");
	digit.select("#tr").classed("light-on", "true");
	digit.select("#tr").classed("light-off", "false");
	digit.select("#m").classed("light-on", "true");
	digit.select("#m").classed("light-off", "false");
	digit.select("#bl").classed("light-on", "true");
	digit.select("#bl").classed("light-off", "false");
	digit.select("#b").classed("light-on", "true");
	digit.select("#b").classed("light-off", "false");}
function draw_three(digit) {
	digit.select("#t").classed("light-on", "true");
	digit.select("#t").classed("light-off", "false");
	digit.select("#tr").classed("light-on", "true");
	digit.select("#tr").classed("light-off", "false");
	digit.select("#m").classed("light-on", "true");
	digit.select("#m").classed("light-off", "false");
	digit.select("#br").classed("light-on", "true");
	digit.select("#br").classed("light-off", "false");
	digit.select("#b").classed("light-on", "true");
	digit.select("#b").classed("light-off", "false");}
function draw_four(digit) {
	digit.select("#tl").classed("light-on", "true");
	digit.select("#tl").classed("light-off", "false");

	digit.select("#m").classed("light-on", "true");
	digit.select("#m").classed("light-off", "false");

	digit.select("#tr").classed("light-on", "true");
	digit.select("#tr").classed("light-off", "false");

	digit.select("#br").classed("light-on", "true");
	digit.select("#br").classed("light-off", "false");}
function draw_five(digit) {
	digit.select("#t").classed("light-on", "true");
	digit.select("#t").classed("light-off", "false");
	digit.select("#tl").classed("light-on", "true");
	digit.select("#tl").classed("light-off", "false");
	digit.select("#m").classed("light-on", "true");
	digit.select("#m").classed("light-off", "false");
	digit.select("#br").classed("light-on", "true");
	digit.select("#br").classed("light-off", "false");
	digit.select("#b").classed("light-on", "true");
	digit.select("#b").classed("light-off", "false");}
function draw_six(digit) {
	digit.select("#t").classed("light-on", "true");
	digit.select("#t").classed("light-off", "false");
	digit.select("#tl").classed("light-on", "true");
	digit.select("#tl").classed("light-off", "false");
	digit.select("#m").classed("light-on", "true");
	digit.select("#m").classed("light-off", "false");
	digit.select("#br").classed("light-on", "true");
	digit.select("#br").classed("light-off", "false");
	digit.select("#bl").classed("light-on", "true");
	digit.select("#bl").classed("light-off", "false");
	digit.select("#b").classed("light-on", "true");
	digit.select("#b").classed("light-off", "false");}
function draw_seven(digit) {
	digit.select("#t").classed("light-on", "true");
	digit.select("#t").classed("light-off", "false");
	digit.select("#tr").classed("light-on", "true");
	digit.select("#tr").classed("light-off", "false");
	digit.select("#br").classed("light-on", "true");
	digit.select("#br").classed("light-off", "false");}
function draw_eight(digit) {
	digit.selectAll("line").classed("light-off", "false");
	digit.selectAll("line").classed("light-on", "true");}
function draw_nine(digit) {
	digit.select("#t").classed("light-on", "true");
	digit.select("#t").classed("light-off", "false");
	digit.select("#tl").classed("light-on", "true");
	digit.select("#tl").classed("light-off", "false");
	digit.select("#tr").classed("light-on", "true");
	digit.select("#tr").classed("light-off", "false");
	digit.select("#m").classed("light-on", "true");
	digit.select("#m").classed("light-off", "false");
	digit.select("#br").classed("light-on", "true");
	digit.select("#br").classed("light-off", "false");}

function start_scoreboard() {
	left_home.selectAll("line").classed("light-off", "true");
	right_home.selectAll("line").classed("light-off", "true");
	left_away.selectAll("line").classed("light-off", "true");
	right_away.selectAll("line").classed("light-off", "true");
	draw_zero(left_home);
	draw_zero(right_home);
	draw_zero(left_away);
	draw_zero(right_away);
}

draw_digit(left_home);
draw_digit(right_home);
draw_digit(left_away);
draw_digit(right_away);
