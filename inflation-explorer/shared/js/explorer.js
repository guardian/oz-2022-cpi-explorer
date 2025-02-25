import * as d3 from "d3"
// import * as d3jetpack from "d3-jetpack"
// import "d3-jetpack"
// import {tspans} from "d3-jetpack"
// import { textwrap } from 'd3-textwrap';

import { textwrap } from 'd3-textwrap';
// d3.textwrap = textwrap;

var categories = {
	"Beef and veal": "Food",
	"Bread": "Food",
	"Breakfast cereals": "Food",
	"Cakes and biscuits": "Food",
	"Cheese": "Food",
	"Coffee, tea and cocoa": "Food",
	"Eggs": "Food",
	"Fish and other seafood": "Food",
	"Food additives and condiments": "Food",
	"Fruit": "Food",
	"Ice cream and other dairy products": "Food",
	"Jams, honey and spreads": "Food",
	"Lamb and goat": "Food",
	"Milk": "Food",
	"Oils and fats": "Food",
	"Other cereal products": "Food",
	"Other food products n.e.c.": "Food",
	"Other meats": "Food",
	"Pork": "Food",
	"Poultry": "Food",
	"Restaurant meals": "Food",
	"Snacks and confectionery": "Food",
	"Take away and fast foods": "Food",
	"Vegetables": "Food",
	"Waters, soft drinks and juices": "Food",
	"Beer": "Alcohol and tobacco",
	"Spirits": "Alcohol and tobacco",
	"Tobacco": "Alcohol and tobacco",
	"Wine": "Alcohol and tobacco",
	"Accessories": "Clothing",
	"Cleaning, repair and hire of clothing and footwear": "Clothing",
	"Footwear for infants and children": "Clothing",
	"Footwear for men": "Clothing",
	"Footwear for women": "Clothing",
	"Garments for infants and children": "Clothing",
	"Garments for men": "Clothing",
	"Garments for women": "Clothing",
	"Electricity": "Housing",
	"Gas and other household fuels": "Housing",
	"Maintenance and repair of the dwelling": "Housing",
	"New dwelling purchase by owner-occupiers": "Housing",
	"Property rates and charges": "Housing",
	"Rents": "Housing",
	"Water and sewerage": "Housing",
	"Carpets and other floor coverings": "Household and services",
	"Child care": "Household and services",
	"Cleaning and maintenance products": "Household and services",
	"Furniture": "Household and services",
	"Glassware, tableware and household utensils": "Household and services",
	"Hairdressing and personal grooming services": "Household and services",
	"Household textiles": "Household and services",
	"Major household appliances": "Household and services",
	"Other household services": "Household and services",
	"Other non-durable household products": "Household and services",
	"Personal care products": "Household and services",
	"Small electric household appliances": "Household and services",
	"Tools and equipment for house and garden": "Household and services",
	"Dental services": "Health",
	"Medical and hospital services": "Health",
	"Pharmaceutical products": "Health",
	"Therapeutic appliances and equipment": "Health",
	"──Transport──": "divider",
	"Automotive fuel": "Transport",
	"Maintenance and repair of motor vehicles": "Transport",
	"Motor vehicles": "Transport",
	"Other services in respect of motor vehicles": "Transport",
	"Spare parts and accessories for motor vehicles": "Transport",
	"Urban transport fares": "Transport",
	"Audio, visual and computing equipment": "Communication",
	"Audio, visual and computing media and services": "Communication",
	"Postal services": "Communication",
	"Telecommunication equipment and services": "Communication",
	"Books": "Recreation and culture",
	"Domestic holiday travel and accommodation": "Recreation and culture",
	"Equipment for sports, camping and open-air recreation": "Recreation and culture",
	"Games, toys and hobbies": "Recreation and culture",
	"International holiday travel and accommodation": "Recreation and culture",
	"Newspapers, magazines and stationery": "Recreation and culture",
	"Other recreational, sporting and cultural services": "Recreation and culture",
	"Pets and related products": "Recreation and culture",
	"Sports participation": "Recreation and culture",
	"Veterinary and other services for pets": "Recreation and culture",
	"Preschool and primary education": "Education",
	"Secondary education": "Education",
	"Tertiary education": "Education",
	"Insurance": "Financial"
  }

export function explorer(data, citySelected, dataSelected, highlight, zoomed, catColors, highlightCat) { 
	// d3.wordwrap = wordwrap;
	// d3.tspans = tspans;
	
    const container = d3.select(`.inflation #graphicContainer`)
    var context = d3.select(`.inflation #outer-wrapper`)
    console.log("data", data)
    console.log("city", citySelected)
    var breaks = "no"
    var isMobile;
	var group = highlight.length > 1 ? true : false 
	var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

	if (windowWidth < 610) {
			isMobile = true;
	}	

	if (windowWidth >= 610){
			isMobile = false;
	}

	var width = document.querySelector(`.inflation #graphicContainer`).getBoundingClientRect().width

	function makeIds(str) {
		var new_str = str.replace(/,/g, "_")
		new_str = new_str.replace(/\s+/g, '_')
		new_str = new_str.replace(/,/g, '_')
		new_str = new_str.replace(/\./g, '_')
		return new_str
	}


	var height = width*0.6				
	var margin = {top: 10, right: 150, bottom: 20, left:40}

	if (isMobile) {
		height = width * 1.2
		margin = {top: 10, right: 20, bottom: 20, left:40}
	}

	var dateParse = d3.timeParse("%Y-%m-%d")

	var scaleFactor = 1

	if (windowWidth < 820) {
		scaleFactor = windowWidth / 860
	}

	width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    context.select("#graphicContainer svg").remove();
    
    var chartKey = context.select("#mobKey");
	// chartKey.html("");

	var svg = context.select("#graphicContainer").append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.attr("id", "svg")
				.attr("overflow", "hidden");					

	var features = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var keys = Object.keys(data[0])
	
    // console.log(keySort)
    var xVar = keys[0]
	
	keys.splice(0, 1);
	
    var keySort = []

    keys.forEach((key) => {
        var row = {}
        row['key'] = key
        if (highlight.includes(key)) {
            row['sortBy'] = 2
        }
        else if (key == "All groups CPI") {
            row['sortBy'] = 1
        }
        else {
            row['sortBy'] = 0
        }
        keySort.push(row)
    })

	// console.log(xVar, keys);

    keySort.sort(function (a, b) {
        return a.sortBy - b.sortBy;
      
    });
	var cats = ["Food","Alcohol and tobacco","Clothing","Housing","Household and services","Health","Transport","Communication","Recreation and culture","Education","Financial"]
	var colors = ["#4e79a7","#f28e2c","#e15759","#76b7b2","#59a14f","#edc949","#af7aa1","#ff9da7","#9c755f","#bab0ab","#000"];
	var color = d3.scaleOrdinal();

	color.domain(cats).range(colors);

    var x = d3.scaleTime()
		.rangeRound([0, width]);

	var y = d3.scaleLinear()
		.rangeRound([height, 0]);

	// var color = d3.scaleOrdinal()
	// 	.range(colors);	

	var lineGenerators = {};
	var allValues = [];

	keys.forEach(function(key,i) {

        if (breaks === "yes") {
            lineGenerators[key] = d3.line()
                .defined(function(d) {
                    return d;
                })
                .x(function(d) { 
                    return x(d[xVar]); 	
                    })
                .y(function(d) { 
                    return y(d[key]); 
                });
            }
    
            else if (breaks === "no") {
                lineGenerators[key] = d3.line()
                    .x(function(d) { 
                        return x(d[xVar]); 	
                        })
                    .y(function(d) { 
                        return y(d[key]); 
                    });
        }
		data.forEach(function(d) {

			if (typeof d[key] == 'string') {

				if (d[key].includes(",")) {
					if (!isNaN((d[key]).replace(/,/g, ""))) {
						d[key] = +(d[key]).replace(/,/g, "")
						allValues.push(d[key]);	
					}
					
				}
				else if (d[key] != "") {
					
					if (!isNaN(d[key])) {
						
						d[key] = +d[key]
						allValues.push(d[key]);
					}
				}

				else if (d[key] == "") {
					d[key] = null 
				}

			}
			
			else {
         		allValues.push(d[key]);
        	}
		});

	});

	data.forEach(function(d) {
		if (typeof d[xVar] == 'string') {	
			d[xVar] = dateParse(d[xVar])
		}	
	})

    var keyData = {}

	keys.forEach(function(key,i) {
		keyData[key] = []

		data.forEach(function(d) {
			if (d[key] != null) {
				var newData = {}
				newData[xVar] = d[xVar]
				newData[key] = d[key]
				keyData[key].push(newData)
			}
			else if (breaks == "yes") {
				keyData[key].push(null)
			}
			
		});
	})
    
	allValues.sort((a, b) => a - b);

	var min = d3.min(allValues)
	var max = d3.max(allValues)

	if (zoomed == true) {
		if (dataSelected == "pct_year") {
			max = 40
			min = -15
			// max = d3.quantile(allValues, 0.99)
			// min = d3.quantile(allValues, 0.01)
			console.log(max, min)
		}

		else if (dataSelected == "index") {
			max = 250
			min = 40
			// max = d3.quantile(allValues, 0.99) + 5
			// min = d3.quantile(allValues, 0.01) - 5
			console.log(max, min)
		}
	}
	
	x.domain(d3.extent(data, function(d) { return d[xVar]; }));
	y.domain([min, max])

	var xAxis;
	var yAxis;
    const xTicks = isMobile ? 4 : 6

	if (isMobile) {
		xAxis = d3.axisBottom(x).ticks(4)
		// yAxis = d3.axisLeft(y).tickFormat(function (d) { return numberFormat(d)}).ticks(5);
        yAxis = d3.axisLeft(y).ticks(5);
	}

	else {
		xAxis = d3.axisBottom(x).ticks(6)
		// yAxis = d3.axisLeft(y).tickFormat(function (d) { return numberFormat(d)});
        yAxis = d3.axisLeft(y)
	}

    svg.append("svg:defs").append("svg:marker")
		.attr("id", "arrow")
		.attr("refX", 6)
		.attr("refY", 6)
		.attr("markerWidth", 20)
		.attr("markerHeight", 20)
		.attr("markerUnits","userSpaceOnUse")
		.attr("orient", "auto")
		.append("path")
		.attr("d", "M 0 0 12 6 0 12 3 6")
		.style("fill", "black")

	features.append("g")
		.attr("class","x")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	features.append("g")
		.attr("class","y")
		.call(yAxis)

	// features.append("text")
	// 	.attr("transform", "rotate(-90)")
	// 	.attr("y", 6)
	// 	.attr("dy", "0.71em")
	// 	.attr("fill", "#767676")
	// 	.attr("text-anchor", "end")
	// 	.text("Index");

	// features.append("text")
	// 	.attr("x", width)
	// 	.attr("y", height - 6)
	// 	.attr("fill", "#767676")
	// 	.attr("text-anchor", "end")
	// 	.text(details[0].xAxisLabel);	

	context.selectAll(".tick line")
		.attr("stroke", "#767676")

	context.selectAll(".tick text")
		.attr("fill", "#767676")			

	context.selectAll(".domain")
		.attr("stroke", "#767676")		

	const tooltipHeading = d3.select("#tooltipHeading")
	const tooltipType =  d3.select("#valueType")
	const tooltipValue =  d3.select("#value")
	const tooltipDate =  d3.select("#tooltipDate")
	const tooltipContainer = d3.select("#tooltipContainer")
	const formatDate = d3.timeFormat("%B %Y");

	const getTooltipData = (event, tempData, key) => {
		// console.log(tempData)
		var date_slice = x.invert(d3.pointer(event)[0])
		// console.log(date_slice)
		var bisect = d3.bisector(d => d.date)
		// const bisectX = d3.bisect((d) => d[xVar], x.invert(d3.pointer(event)[0]))
		let i = bisect.right(tempData, date_slice);
		// console.log(i, tempData.length)
		if (i == tempData.length) {
			i = tempData.length -1
		}
		console.log(tempData[i])
		tooltipHeading.text(key)
		tooltipType.text(dataSelected == "index" ? "Price index" : "% change")
		tooltipValue.text(tempData[i][key])
		tooltipDate.text(formatDate(tempData[i][xVar]))
		tooltipContainer
			.style("visibility", "visible")
		
		if (highlight.includes(key)) {
			tooltipContainer
				.style("border-color", "red")
		}

		else if (key == "All groups CPI") {
			tooltipContainer
				.style("border-color", "black")
		}
		else {
			tooltipContainer
				.style("border-color", color(categories[key]))
		}
	
	}

	function highlightLine(self) {
		let temp_key = d3.select(self).attr("data-id")
		let temp_class = d3.select(self).attr("class")
		temp_class = temp_class.split(" ")[0]
		console.log(temp_class)

		if (highlight.includes(temp_key)) {
			
			d3.selectAll('.chartLine').style("opacity", 0.2)
			d3.selectAll('circle').style("opacity", 0.2)
			d3.select(`path.${temp_class}`).attr("stroke", "red").style("opacity", 1)
			d3.select(`circle.${temp_class}`).attr("fill", "red").style("opacity", 1)
			d3.selectAll(`g.${temp_class}`).style("opacity", 1)

		}

		else if (temp_key == "All groups CPI") {
			// do noting
		}

		else {
		
			d3.selectAll(`g.All_groups_CPI`).style("opacity", 0.2)
			d3.selectAll(`g.highlight`).style("opacity", 0)
			d3.selectAll(`path.All_groups_CPI`).style("opacity", 0.7)
			d3.selectAll(`path.highlight`).style("opacity", 0.7)
			d3.selectAll('.chartLine').style("opacity", 0.2)
			d3.selectAll('circle').style("opacity", 0.2)
			// d3.selectALL(`circle`).style("opacity", 0.2)
			// d3.selectAll(`.lineLabels`).style("opacity", 0.2)

			d3.select(`path.${temp_class}`).attr("stroke", color(categories[temp_key])).style("opacity", 1)
			d3.select(`circle.${temp_class}`).attr("fill", color(categories[temp_key])).style("opacity", 1)
			d3.selectAll(`g.${temp_class}`).style("color", color(categories[temp_key])).style("opacity", 1)

		}
		
		}

	function fadeLine(d,i) {
		let temp_key = d3.select(this).attr("data-id")
		let temp_class = d3.select(this).attr("class")
		temp_class = temp_class.split(" ")[0]
		console.log(temp_class)
		if (highlight.includes(temp_key)) {
			if (group) {
				d3.selectAll(`g.highlight`).style("opacity", 0)
			}
			else {
				d3.selectAll(`g.highlight`).style("opacity", 1)
			}
			d3.selectAll(`path.highlight`).style("opacity", 1)
			d3.selectAll(`circle.highlight`).style("opacity", 1)
		}

		else if (temp_key == "All groups CPI") {
			// do noting
		}

		else {

			// d3.selectAll(`path.chartLine`).style("opacity", 0.2)
			// d3.select(`circle`).style("opacity", 0.2)
			// d3.selectAll(`.lineLabels`).style("opacity", 0.2)
			d3.selectAll('circle').style("opacity", 0.4)
			d3.selectAll('.chartLine').style("opacity", 0.4)
			d3.selectAll(`path.All_groups_CPI`).style("opacity", 1)
			d3.selectAll(`path.highlight`).style("opacity", 1)
			d3.selectAll(`g.All_groups_CPI`).style("opacity", 1)
			if (group) {
				d3.selectAll(`g.highlight`).style("opacity", 0)
			}
			else {
				d3.selectAll(`g.highlight`).style("opacity", 1)
			}
			d3.selectAll(`circle.All_groups_CPI`).style("opacity", 1)
			d3.selectAll(`circle.highlight`).style("opacity", 1)
			d3.select(`path.${temp_class}`).attr("stroke", "#bdbdbd").style("opacity", 0.4)
			d3.select(`circle.${temp_class}`).attr("fill", "#bdbdbd").style("opacity", 0.4)
			d3.selectAll(`g.${temp_class}`).style("opacity", 0)
		}
		tooltipContainer.style("visibility", "hidden")
		}	

    keySort.forEach(function(key,i) {

		// console.log(key)

        var lineOpacity = 0.4
		var lineColour = "#bdbdbd"
		if (catColors) {
			lineColour = color(categories[key.key])
		}
		var labelOpacity = 0
		var highlightClass = ""

        if (key.sortBy === 2) {
            lineOpacity = 1;
			lineColour = "red";
			if (group) {
				labelOpacity = 0;
			}

			else {
				labelOpacity = 1;
			}	
			highlightClass = "highlight"      
        } 

        else if (key.sortBy === 1) {
            lineOpacity = 1; 
			labelOpacity = 1; 
			lineColour = "#000"; 
        }
        
		features.append("path")
			.datum(keyData[key.key])
			.attr("fill", "none")
			.attr("data-id", key.key)
			.attr("stroke", lineColour)
			.attr("stroke-linejoin", "round")
			.attr("stroke-linecap", "round")
			.attr("stroke-width", 3)
			.attr("class", makeIds(key.key) + " chartLine " + highlightClass)
			.style("opacity", lineOpacity)
			// .on('mouseover', highlightLine)
		  	.on('mouseout', fadeLine)
			.on('mouseover', function(e, d) {
				var self = this
				highlightLine(self)
				getTooltipData(e, d, key.key)
				// console.log(tooltipData)
			})
			.attr("d", lineGenerators[key.key]);

		features
          .append("circle")
		  .datum(keyData[key.key])
		  .attr("data-id", key.key)
          .attr("cy", (d) => {
            return y(keyData[key.key][keyData[key.key].length - 1][key.key])
          })
          .attr("fill", lineColour)
          .attr("cx", (d) => {
            return x(keyData[key.key][keyData[key.key].length - 1][xVar])
          })
          .attr("r", 4)
		  .attr("class", makeIds(key.key) + " " + highlightClass)
		  .on('mouseover', function(e, d) {
			var self = this
			highlightLine(self)
			getTooltipData(e, d, key.key)
			// console.log(tooltipData)
		})
			.on('mouseout', fadeLine)
          .style("opacity", lineOpacity)	


        // features
        //   .append("text")
		//   .attr("data-id", key.key)
        //   .attr("class", makeIds(key.key) + " lineLabels " + highlightClass)
        //   .attr("y", (d) => {
        //     return (
        //       y(keyData[key.key][keyData[key.key].length - 1][key.key]) +
        //       4 
        //     )
        //   })
        //   .attr("x", (d) => {
        //     return (
        //       x(keyData[key.key][keyData[key.key].length - 1][xVar]) + 5
        //     )
        //   })
        //   .attr("fill", "none")
        //   .attr("stroke", "#FFF")
        //   .attr("stroke-width", 5)
        //   .attr("opacity", labelOpacity)
        // //   .text((d) => {
        // //     return key.key
        // //   })
		//   .tspans(function(d) {
		// 	return d3.wordwrap(key.key, 15);  // break line after 15 characters
		// })
		    
		if (!isMobile) {
			features
				.append("g")
				.attr("class", makeIds(key.key) + " labelWrapper " + highlightClass)
				.attr("data-id", key.key)
				.style("opacity", labelOpacity)
				.style("color", lineColour)
				.append("text")
				.attr("data-id", key.key)
				.attr("class",  makeIds(key.key) + " lineLabels " + highlightClass)
				.attr("y", (d) => {
					var yVal = y(keyData[key.key][keyData[key.key].length - 1][key.key]) - 10
					if (yVal < 0) {
						yVal = 0
					}
					else if (yVal > height) {
						return height - 50
					}
					return yVal
				})
				.attr("x", (d) => {
					return (
					x(keyData[key.key][keyData[key.key].length - 1][xVar]) + 5
					)
				})
				.style("opacity", labelOpacity)
				.attr("fill", lineColour)
				.text((d) => {
					return key.key
				})
		}	

	});	
	if (!isMobile) {
		var wrap = textwrap().bounds({height: 100, width: 145});	
		d3.selectAll('.lineLabels').call(wrap);
	}	

	if (isMobile) {

		chartKey.html("")

		const keyDiv1 = chartKey.append("div").attr("class", "keyDiv")

		keyDiv1
			.append("span")
			.attr("class", "keyCircle")
			.style("background-color", "red")

		keyDiv1.append("span").attr("class", "keyText").text(highlightCat)
	
		const keyDiv2 = chartKey.append("div").attr("class", "keyDiv")

		keyDiv2
			.append("span")
			.attr("class", "keyCircle")
			.style("background-color", "black")

		keyDiv2.append("span").attr("class", "keyText").text("All groups CPI")
	}

	// d3.selectAll(".lineLabels").text(function(d) {
	// 	tspans("blah")
	// }) 

	// d3.selectAll(".lineLabels tspan")
	// 	.attr("x", (d) => {
    //         return (
    //           x(keyData[key.key][keyData[key.key].length - 1][xVar]) + 5
    //         )
    //       })	

	// var wrap = d3.textwrap().bounds({height: 100, width: 150});
	// // wrap all text
	// d3.selectAll('.lineLabels').call(wrap);


}