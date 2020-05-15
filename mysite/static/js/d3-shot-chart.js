// d3-shot-chart.js

// Draws half circle centeblack at top of chart with specified radius
function draw_hc_arc(court, dims, r_feet) {
	radius = r_feet * dims[2]
	var hc_arc = d3.arc()
		.innerRadius(radius)
		.outerRadius(radius)
		.startAngle(0)
		.endAngle(Math.PI);

		court.append("path")
		.attr("d", hc_arc)
		.attr("transform", "translate(" + dims[4] + ", 0) rotate(90)")
		.style("stroke", "black")
		.style("stroke-width", "3px");
}

function draw_key(court, dims, key_width_feet, key_height_feet, charge_circle=true) {
	start_point = [(dims[4]) - ((key_width_feet/2)*dims[2]), dims[1]];
	arc_start = [(dims[4]) - ((key_width_feet/2)*dims[2]), (dims[1] - (key_height_feet*dims[2]))];
	end_point = [(dims[4]) + ((key_width_feet/2)*dims[2]), dims[1]];
	key_arc_center = [dims[4], (dims[1] - (key_height_feet*dims[2]))];
	arc_radius = (key_width_feet/2) * dims[2];

	// Draw outline of key
	var path = d3.path();
	path.moveTo(start_point[0], start_point[1]);
	path.lineTo(arc_start[0], arc_start[1]);
	path.arc(key_arc_center[0], key_arc_center[1], arc_radius, Math.PI, 0);
	path.lineTo(end_point[0], end_point[1]);

	court.append("path")
		.attr("d", path)
		.style("stroke-width", "3px")
		.style("stroke", "black")
		.style("fill", "none");

	// draft free throw line
	court.append("line")
		.style("stroke-width", "3px")
		.style("stroke", "black")
		.attr("x1",arc_start[0])
		.attr("y1",arc_start[1])
		.attr("x2",arc_start[0] + (key_width_feet*dims[2]))
		.attr("y2",arc_start[1]);

	// draw key marks, hoop
	draw_key_marks(court, dims, key_width_feet, key_height_feet);
	draw_hoop(court, dims);

	// Draw charge circle
	if (charge_circle) {
		draw_charge_circle(court, dims);
	}

}

function draw_key_marks(court, dims, key_width, key_height) {
	
	// Left block
	court.append("rect")
		.style("x", dims[4] - (((key_width/2)*(12*dims[3])) + (8*dims[3])))
		.style("y",dims[1]-(8*dims[2]))
		.style("width",8*dims[3])
		.style("height",12*dims[3])
		.style("stroke", "black");

	// Right block
	court.append("rect")
		.style("x", dims[4] + ((key_width/2)*(12*dims[3])))
		.style("y", dims[1]-(8*dims[2]))
		.style("width",8*dims[3])
		.style("height",12*dims[3])
		.style("stroke", "black");

	// Left slashes
	court.append("rect")
		.style("x", dims[4] - (((key_width/2)*(12*dims[3])) + (8*dims[3])))
		.style("y",dims[1]-(11*dims[2]))
		.style("width",8*dims[3])
		.style("height",2*dims[3])
		.style("stroke", "black");

	court.append("rect")
		.style("x", dims[4] - (((key_width/2)*(12*dims[3])) + (8*dims[3])))
		.style("y",dims[1]-(14*dims[2]))
		.style("width",8*dims[3])
		.style("height",2*dims[3])
		.style("stroke", "black");

	court.append("rect")
		.style("x", dims[4] - (((key_width/2)*(12*dims[3])) + (8*dims[3])))
		.style("y",dims[1]-(17*dims[2]))
		.style("width",8*dims[3])
		.style("height",2*dims[3])
		.style("stroke", "black");

	// Right slashes
	court.append("rect")
		.style("x", dims[4] + ((key_width/2)*(12*dims[3])))
		.style("y", dims[1]-(11*dims[2]))
		.style("width",8*dims[3])
		.style("height",2*dims[3])
		.style("stroke", "black");

	court.append("rect")
		.style("x", dims[4] + ((key_width/2)*(12*dims[3])))
		.style("y", dims[1]-(14*dims[2]))
		.style("width",8*dims[3])
		.style("height",2*dims[3])
		.style("stroke", "black");

	court.append("rect")
		.style("x", dims[4] + ((key_width/2)*(12*dims[3])))
		.style("y", dims[1]-(17*dims[2]))
		.style("width",8*dims[3])
		.style("height",2*dims[3])
		.style("stroke", "black");
}

function draw_charge_circle(court, dims) {
	var path = d3.path();
	path.moveTo((dims[4])-(4*dims[2]), dims[1]-(4*dims[2]));
	path.lineTo((dims[4])-(4*dims[2]), dims[1]-(4*dims[2]) - 15*dims[3]);
	path.arc(dims[4], dims[1]-(63*dims[3]), 4*dims[2], Math.PI, 0);
	path.lineTo((dims[4]) + (4*dims[2]), dims[1]-(4*dims[2]));

	court.append("path")
		.attr("d", path)
		.style("stroke-width", "3px")
		.style("stroke", "black")
		.style("fill", "none");
}

function draw_hoop(court, dims) {

	court.append("circle")
		.style("stroke", "black")
		.style("stroke-width", "3px")
		.style("fill", "none")
		.attr("cx", dims[4])
		.attr("cy", dims[1] - (63*dims[3]))
		.attr("r", 9*dims[3]);

	court.append("line")
		.style("stroke", "black")
		.style("stroke-width", "3px")
		.attr("x1", (dims[4]) - (3*dims[2]))
		.attr("y1", dims[1] - (48*dims[3]))
		.attr("x2", (dims[4]) + (3*dims[2]))
		.attr("y2", dims[1] - (48*dims[3])); 

	court.append("rect")
		.style("x", dims[4] - (8*dims[3]))
		.style("y", dims[1] - ((54*dims[3])+2))
		.style("width", 16*dims[3])
		.style("height", (6*dims[3])+2);
}

// calculates the start and end angles for our 3 point arc
function arc_angles(dims, side_spacing, corner_len) {
	adj_len = dims[4] - (side_spacing*dims[3]);
	opp_len = (corner_len*dims[3]) - (63*dims[3]);
	angle = Math.atan(opp_len/adj_len);
	start_angle = Math.PI - angle;
	return [start_angle, angle];
}

function draw_three_arc(court, dims, side_spacing, corner_len, out_edge) {
	angles = arc_angles(dims, side_spacing, corner_len);
	var path = d3.path();
	path.moveTo((side_spacing*dims[3] - (0*dims[3])), dims[1]);
	path.arc(dims[4], dims[1]-(63*dims[3]), out_edge*dims[3], -angles[0], -angles[1]);
	path.lineTo(dims[0]-(side_spacing*dims[3]+(0*dims[3])), dims[1]);

	court.append("path")
		.attr("d", path)
		.attr("id", "inside-arc")
		.style("stroke", "black")
		.style("stroke-width", "3px")
		.style("fill", "blue")
		.style("fill-opacity", 0);
}

function draw_zones(court, dims, side_spacing, corner_len, key_width, out_edge) {
	width = dims[0];
	height = dims[1];
	feet = dims[2];
	inch = dims[3];
	center = dims[4];

	// left wing-three
	court.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", width/2)
		.attr("height", height)
		.attr("id", "left-wing")
		.attr("fill", "green")
		.attr("fill-opacity", 0);

	// right wing-three
	court.append("rect")
		.attr("x", width/2)
		.attr("y", 0)
		.attr("width", width/2)
		.attr("height", height)
		.attr("id", "right-wing")
		.attr("fill", "green")
		.attr("fill-opacity", 0);

	// left corner
	court.append("rect")
		.attr("x", 0)
		.attr("y", height - (corner_len*inch))
		.attr("width", (side_spacing*inch))
		.attr("height", height)
		.attr("id", "left-corner")
		.style("fill", "red")
		.style("fill-opacity", 0);

	// right corner
	court.append("rect")
		.attr("x", width-(side_spacing*inch))
		.attr("y", height - (corner_len*inch))
		.attr("width", (side_spacing*inch))
		.attr("height", height)
		.attr("id", "right-corner")
		.style("fill", "red")
		.style("fill-opacity", 0);

	// top of key
	court.append("rect")
		.attr("x", center - ((key_width/2)*feet))
		.attr("y", 0)
		.attr("width", key_width*feet)
		.attr("height", 800)
		.attr("id", "top-of-key")
		.style("fill", "orange")
		.style("fill-opacity", .0);
}


// Draw the court.
function draw_court(court, dims, flag=0, border) {
	// If border is true, add halfcourt circle
	if (border) {
		draw_hc_arc(court, dims, 6);
		court.style("border", "3px solid black");
	} else {
		court.style("border-bottom", "3px solid black");
	}

	// Key has same dimensions for all courts
	draw_key(court, dims, 12, 19);
	draw_zones(court, dims, 40.125, 118.375, 12, 265.75);

	// Draw three point arc depending on court
	if (flag==0) {
		draw_three_arc(court, dims, 40.125, 118.375, 265.75)
	}

}

function draw_mens_ncaa(court_width_px, border=true) {

	height_px = .94 * court_width_px;
	feet_px = court_width_px/50;
	inch_px = feet_px/12
	center_court = court_width_px/2 - (0*inch_px);

	dims = [court_width_px, height_px, feet_px, inch_px, center_court];

	var courtDiv = d3.select(".shotchart");
	var courtSVG = courtDiv.append("svg")
						.attr("width", court_width_px)
						.attr("height", height_px)
						.attr("class", "court-svg");

	draw_court(courtSVG, dims, 0, border);
}









