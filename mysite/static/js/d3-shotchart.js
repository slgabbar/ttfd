// shotchart using d3.js 

var courtDiv = d3.select(".shotchart");
var courtSVG = courtDiv.append("svg");

courtSVG.attr("width", 500)
		.attr("height", 500)
		.style("border", "solid red 5px")
		.style("background-color", "blue");