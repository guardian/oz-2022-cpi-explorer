import * as d3 from "d3"
import { explorer } from "shared/js/explorer";
console.log("V1.2")
var city = 'Australia'
var dataSelected = 'index'
var currentResults
var highlight = ['Gas and other household fuels']
var zoomed = true
var colors = false
var highlightCat = 'Gas and other household fuels'
Promise.all([
	d3.csv(`<%= path %>/${city}-${dataSelected}.csv`)
	// d3.json(`https://interactive.guim.co.uk/2022/02/river-heights/${selected}`)
	])
	.then((results) =>  {
		explorer(results[0], city, dataSelected, highlight, zoomed, colors, highlightCat)
		currentResults = results[0]
		d3.select(".inflation #loadingContainer").style("display","none")

	});

var categories = [{"expenditure_class":"──Food──","order":1,"group":"divider","disabled":"disabled"},
{"expenditure_class":"Beef and veal","order":2,"group":"Food","disabled":""},
{"expenditure_class":"Bread","order":3,"group":"Food","disabled":""},
{"expenditure_class":"Breakfast cereals","order":4,"group":"Food","disabled":""},
{"expenditure_class":"Cakes and biscuits","order":5,"group":"Food","disabled":""},
{"expenditure_class":"Cheese","order":6,"group":"Food","disabled":""},
{"expenditure_class":"Coffee, tea and cocoa","order":7,"group":"Food","disabled":""},
{"expenditure_class":"Eggs","order":8,"group":"Food","disabled":""},
{"expenditure_class":"Fish and other seafood","order":9,"group":"Food","disabled":""},
{"expenditure_class":"Food additives and condiments","order":10,"group":"Food","disabled":""},
{"expenditure_class":"Fruit","order":11,"group":"Food","disabled":""},
{"expenditure_class":"Ice cream and other dairy products","order":12,"group":"Food","disabled":""},
{"expenditure_class":"Jams, honey and spreads","order":13,"group":"Food","disabled":""},
{"expenditure_class":"Lamb and goat","order":14,"group":"Food","disabled":""},
{"expenditure_class":"Milk","order":15,"group":"Food","disabled":""},
{"expenditure_class":"Oils and fats","order":16,"group":"Food","disabled":""},
{"expenditure_class":"Other cereal products","order":17,"group":"Food","disabled":""},
{"expenditure_class":"Other food products n.e.c.","order":18,"group":"Food","disabled":""},
{"expenditure_class":"Other meats","order":19,"group":"Food","disabled":""},
{"expenditure_class":"Pork","order":20,"group":"Food","disabled":""},
{"expenditure_class":"Poultry","order":21,"group":"Food","disabled":""},
{"expenditure_class":"Restaurant meals","order":22,"group":"Food","disabled":""},
{"expenditure_class":"Snacks and confectionery","order":23,"group":"Food","disabled":""},
{"expenditure_class":"Take away and fast foods","order":24,"group":"Food","disabled":""},
{"expenditure_class":"Vegetables","order":25,"group":"Food","disabled":""},
{"expenditure_class":"Waters, soft drinks and juices","order":26,"group":"Food","disabled":""},
{"expenditure_class":"──Alcohol and tobacco──","order":27,"group":"divider","disabled":"disabled"},
{"expenditure_class":"Beer","order":28,"group":"Alcohol and tobacco","disabled":""},
{"expenditure_class":"Spirits","order":29,"group":"Alcohol and tobacco","disabled":""},
{"expenditure_class":"Tobacco","order":30,"group":"Alcohol and tobacco","disabled":""},
{"expenditure_class":"Wine","order":31,"group":"Alcohol and tobacco","disabled":""},
{"expenditure_class":"──Clothing──","order":32,"group":"divider","disabled":"disabled"},
{"expenditure_class":"Accessories","order":33,"group":"Clothing","disabled":""},
{"expenditure_class":"Cleaning, repair and hire of clothing and footwear","order":34,"group":"Clothing","disabled":""},
{"expenditure_class":"Footwear for infants and children","order":35,"group":"Clothing","disabled":""},
{"expenditure_class":"Footwear for men","order":36,"group":"Clothing","disabled":""},
{"expenditure_class":"Footwear for women","order":37,"group":"Clothing","disabled":""},
{"expenditure_class":"Garments for infants and children","order":38,"group":"Clothing","disabled":""},
{"expenditure_class":"Garments for men","order":39,"group":"Clothing","disabled":""},
{"expenditure_class":"Garments for women","order":40,"group":"Clothing","disabled":""},
{"expenditure_class":"──Housing──","order":41,"group":"divider","disabled":"disabled"},
{"expenditure_class":"Electricity","order":42,"group":"Housing","disabled":""},
{"expenditure_class":"Gas and other household fuels","order":43,"group":"Housing","disabled":""},
{"expenditure_class":"Maintenance and repair of the dwelling","order":44,"group":"Housing","disabled":""},
{"expenditure_class":"New dwelling purchase by owner-occupiers","order":45,"group":"Housing","disabled":""},
{"expenditure_class":"Property rates and charges","order":46,"group":"Housing","disabled":""},
{"expenditure_class":"Rents","order":47,"group":"Housing","disabled":""},
{"expenditure_class":"Water and sewerage","order":48,"group":"Housing","disabled":""},
{"expenditure_class":"──Household and services──","order":49,"group":"divider","disabled":"disabled"},
{"expenditure_class":"Carpets and other floor coverings","order":50,"group":"Household and services","disabled":""},
{"expenditure_class":"Child care","order":51,"group":"Household and services","disabled":""},
{"expenditure_class":"Cleaning and maintenance products","order":52,"group":"Household and services","disabled":""},
{"expenditure_class":"Furniture","order":53,"group":"Household and services","disabled":""},
{"expenditure_class":"Glassware, tableware and household utensils","order":54,"group":"Household and services","disabled":""},
{"expenditure_class":"Hairdressing and personal grooming services","order":55,"group":"Household and services","disabled":""},
{"expenditure_class":"Household textiles","order":56,"group":"Household and services","disabled":""},
{"expenditure_class":"Major household appliances","order":57,"group":"Household and services","disabled":""},
{"expenditure_class":"Other household services","order":58,"group":"Household and services","disabled":""},
{"expenditure_class":"Other non-durable household products","order":59,"group":"Household and services","disabled":""},
{"expenditure_class":"Personal care products","order":60,"group":"Household and services","disabled":""},
{"expenditure_class":"Small electric household appliances","order":61,"group":"Household and services","disabled":""},
{"expenditure_class":"Tools and equipment for house and garden","order":62,"group":"Household and services","disabled":""},
{"expenditure_class":"──Health──","order":63,"group":"divider","disabled":"disabled"},
{"expenditure_class":"Dental services","order":64,"group":"Health","disabled":""},
{"expenditure_class":"Medical and hospital services","order":65,"group":"Health","disabled":""},
{"expenditure_class":"Pharmaceutical products","order":66,"group":"Health","disabled":""},
{"expenditure_class":"Therapeutic appliances and equipment","order":67,"group":"Health","disabled":""},
{"expenditure_class":"──Transport──","order":68,"group":"divider","disabled":"disabled"},
{"expenditure_class":"Automotive fuel","order":69,"group":"Transport","disabled":""},
{"expenditure_class":"Maintenance and repair of motor vehicles","order":70,"group":"Transport","disabled":""},
{"expenditure_class":"Motor vehicles","order":71,"group":"Transport","disabled":""},
{"expenditure_class":"Other services in respect of motor vehicles","order":72,"group":"Transport","disabled":""},
{"expenditure_class":"Spare parts and accessories for motor vehicles","order":73,"group":"Transport","disabled":""},
{"expenditure_class":"Urban transport fares","order":74,"group":"Transport","disabled":""},
{"expenditure_class":"──Communication──","order":75,"group":"divider","disabled":"disabled"},
{"expenditure_class":"Audio, visual and computing equipment","order":76,"group":"Communication","disabled":""},
{"expenditure_class":"Audio, visual and computing media and services","order":77,"group":"Communication","disabled":""},
{"expenditure_class":"Postal services","order":78,"group":"Communication","disabled":""},
{"expenditure_class":"Telecommunication equipment and services","order":79,"group":"Communication","disabled":""},
{"expenditure_class":"──Recreation and culture──","order":80,"group":"divider","disabled":"disabled"},
{"expenditure_class":"Books","order":81,"group":"Recreation and culture","disabled":""},
{"expenditure_class":"Domestic holiday travel and accommodation","order":82,"group":"Recreation and culture","disabled":""},
{"expenditure_class":"Equipment for sports, camping and open-air recreation","order":83,"group":"Recreation and culture","disabled":""},
{"expenditure_class":"Games, toys and hobbies","order":84,"group":"Recreation and culture","disabled":""},
{"expenditure_class":"International holiday travel and accommodation","order":85,"group":"Recreation and culture","disabled":""},
{"expenditure_class":"Newspapers, magazines and stationery","order":86,"group":"Recreation and culture","disabled":""},
{"expenditure_class":"Other recreational, sporting and cultural services","order":87,"group":"Recreation and culture","disabled":""},
{"expenditure_class":"Pets and related products","order":88,"group":"Recreation and culture","disabled":""},
{"expenditure_class":"Sports participation","order":89,"group":"Recreation and culture","disabled":""},
{"expenditure_class":"Veterinary and other services for pets","order":90,"group":"Recreation and culture","disabled":""},
{"expenditure_class":"──Education──","order":91,"group":"divider","disabled":"disabled"},
{"expenditure_class":"Preschool and primary education","order":92,"group":"Education","disabled":""},
{"expenditure_class":"Secondary education","order":93,"group":"Education","disabled":""},
{"expenditure_class":"Tertiary education","order":94,"group":"Education","disabled":""},
{"expenditure_class":"──Financial──","order":95,"group":"divider","disabled":"disabled"},
{"expenditure_class":"Insurance","order":96,"group":"Financial","disabled":""}]

var cities = ['Australia','Sydney','Melbourne','Brisbane','Adelaide','Perth','Canberra','Darwin']

var citySelector = d3.select(".inflation #citySelector")

cities.forEach(function (d) {
    citySelector.append("option")
			.attr("value",d)
			.text(d)	
})

var categorySelector = d3.select(".inflation #categorySelector")

// console.log(categorySelector.property('value')
categories.forEach(function (d) {
    categorySelector.append("option")
			.attr("value",d.expenditure_class)
			.text(d.expenditure_class)
            // .property(() => {
            //     if (d.disabled == "disabled") {
            //         return "disabled"
            //     }
            // })
})

let element = document.getElementById('categorySelector');
element.value = 'Gas and other household fuels';

var dataSelector = d3.select(".inflation #dataSelector")

var data = [
    {"id":"index", "text":"Price index"},
    {"id":"pct_year", "text":"Yearly % change"},
    ]

data.forEach(function (d) {
    dataSelector.append("option")
			.attr("value",d.id)
			.text(d.text)	
})

citySelector.on("change", function() {
    d3.select(".inflation #loadingContainer").style("display","block")
    city = d3.select(this).property('value')
    console.log(city)
    Promise.all([
        d3.csv(`<%= path %>/${city}-${dataSelected}.csv`)
        // d3.json(`https://interactive.guim.co.uk/2022/02/river-heights/${selected}`)
        ])
        .then((results) =>  {
            explorer(results[0], city, dataSelected, highlight, zoomed, colors,highlightCat)
            currentResults = results[0]
            d3.select(".inflation #loadingContainer").style("display","none")
    
        });

});

categorySelector.on("change", function() {
    d3.select(".inflation #loadingContainer").style("display","block")
    var selection = d3.select(this).property('value')
    
    if (selection[0] == "─") {
        var group = selection.replace(/─/g, "")
        highlightCat = group
        console.log(group)
        var results = categories.filter((e) => e.group == group)
        console.log("results", results)
        highlight = results.map(a => a.expenditure_class);
    }
    else {
        highlight = [d3.select(this).property('value')]
        highlightCat = d3.select(this).property('value')
    }
    
    console.log(city)
    Promise.all([
        d3.csv(`<%= path %>/${city}-${dataSelected}.csv`)
        // d3.json(`https://interactive.guim.co.uk/2022/02/river-heights/${selected}`)
        ])
        .then((results) =>  {
            explorer(results[0], city, dataSelected, highlight, zoomed, colors, highlightCat)
            currentResults = results[0]
            d3.select(".inflation #loadingContainer").style("display","none")
    
        });

});

dataSelector.on("change", function() {
    d3.select(".inflation #loadingContainer").style("display","block")
    dataSelected = d3.select(this).property('value')
    console.log(dataSelected)
    Promise.all([
        d3.csv(`<%= path %>/${city}-${dataSelected}.csv`)
        // d3.json(`https://interactive.guim.co.uk/2022/02/river-heights/${selected}`)
        ])
        .then((results) =>  {
            explorer(results[0], city, dataSelected, highlight, zoomed, colors, highlightCat)
            currentResults = results[0]
            d3.select(".inflation #loadingContainer").style("display","none")
    
        });

});

var zoomSelector = d3.select(".inflation #zoomed")

zoomSelector.on("change", function() {
    if (zoomed == true) {
        zoomed = false
    }
    else if (zoomed == false) {
        zoomed = true
    }
    console.log("zoomed", zoomed)
    Promise.all([
        d3.csv(`<%= path %>/${city}-${dataSelected}.csv`)
        // d3.json(`https://interactive.guim.co.uk/2022/02/river-heights/${selected}`)
        ])
        .then((results) =>  {
            explorer(results[0], city, dataSelected, highlight, zoomed, colors, highlightCat)
            currentResults = results[0]
            d3.select(".inflation #loadingContainer").style("display","none")
    
        });
})

var colorSelector = d3.select(".inflation #categoryColor")

colorSelector.on("change", function() {
    if (colors == true) {
        colors = false
    }
    else if (colors == false) {
        colors = true
    }
    
    Promise.all([
        d3.csv(`<%= path %>/${city}-${dataSelected}.csv`)
        // d3.json(`https://interactive.guim.co.uk/2022/02/river-heights/${selected}`)
        ])
        .then((results) =>  {
            explorer(results[0], city, dataSelected, highlight, zoomed, colors, highlightCat)
            currentResults = results[0]
            d3.select(".inflation #loadingContainer").style("display","none")
    
        });
})

var to=null
var lastWidth = document.querySelector(`.inflation #graphicContainer`).getBoundingClientRect()

window.addEventListener('resize', function() {
	var thisWidth = document.querySelector(`.inflation #graphicContainer`).getBoundingClientRect()
    console.log("resizing")
	if (lastWidth != thisWidth) {
		window.clearTimeout(to);
		to = window.setTimeout(function() {
            explorer(currentResults, city, dataSelected, highlight, zoomed, colors, highlightCat)
			}, 100)
	}

})