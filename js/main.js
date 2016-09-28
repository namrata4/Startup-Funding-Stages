/*
 * This file creates the different visualization shown on scrolling
 * through different sections.
 */


var connectedFunctions=[];
var lastIndex = -1;
var activeIndex = 0;
var icolors=["#0082ca","#0094ff","#0d4bcf"];

//the function that contains entire code for visualizations
var display= function(){
	setupSections();

	var scroll = scroller()
	.container(d3.select('#graphic'));

	// passing in all the sections of class step
	scroll(d3.selectAll('.step'));

	// Event handling for scroll
	scroll.on('active', function(index) {debugger;
	// highlight text of current step
	d3.selectAll('.step')
	.style('opacity',  function(d,i) { return i == index ? 1 : 0.1; });

	// activate current section
	activate(index);
	});}

/*
 * function to attach different sections to functions creating visualizations 
 * for that section.
 */

var setupSections = function() {
	connectedFunctions[0] = showIntro;
	connectedFunctions[1] = createFirst;
	connectedFunctions[2] = createSecond;
	connectedFunctions[3] = createThird;
	connectedFunctions[4] = createFourth;
	connectedFunctions[5] = createFifth;
	connectedFunctions[6] = createSixth;
	connectedFunctions[7] = createSeventh;
	connectedFunctions[8] = createEigth;
	connectedFunctions[9] = createNinth;
	connectedFunctions[10] = createTenth;
	connectedFunctions[11] = createEleven;
	connectedFunctions[12] = createExtra;
};
/*
 * function to check the index of currently scrolled section
 * and call the attached visualization function
 */
var activate= function(index){
	activeIndex = index;
	var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
	var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
	scrolledSections.forEach(function(i) {
		connectedFunctions[i]();
	});
	lastIndex = activeIndex;
}

/*
 * function to show the first slide of introduction
 */
function showIntro(){
var viewport= document.getElementById("viewport");
viewport.style.display="block";
var article= document.getElementById("title");
article.style.display="block";


var vis= document.getElementById("vis");
vis.innerHTML="";

var scroll=document.getElementById("scroll");
scroll.style.display="block";
}
/*
 * functions specific to section wise visualizations
 */
function createFirst(){
	var viewport= document.getElementById("viewport");
	viewport.style.display="none";
	var article= document.getElementById("title");
	article.style.display="none";
	var scroll=document.getElementById("scroll");
	scroll.style.display="none";
	var vis= document.getElementById("vis");
	vis.innerHTML="";
	var dataStep1= [{Name:"Founder1", Equity:47.5},
	                {Name:"Founder2", Equity:47.5},
	                {Name:"Friends & Family", Equity:5}];
	var stages=["Friends & Family"];
	var investment=[200000];
	createPie(dataStep1,stages,investment);
	createStartupRate();
}

function createSecond(){
	var vis= document.getElementById("vis");
	vis.innerHTML="";
	vis.setAttribute("style","width:1300px; height:850px");

	var dataStep2= [{Name:"Founder1", Equity:37.5},
	                {Name:"Founder2", Equity:37.5},
	                {Name:"Friends & Family", Equity:5},
	                {Name:"Angel", Equity:20} ];
	var stages=["Friends & Family", "Seed"];
	var investment=[200000, 1000000];
	createPie(dataStep2,stages,investment);

	var margin = {top: 40, right: 10, bottom: 100, left: 40},
	    margin2 = {top: 330, right: 10, bottom: 20, left: 40},
	    width = 960 - margin.left - margin.right,
	    height = 400 - margin.top - margin.bottom,
	    height2 = 400 - margin2.top - margin2.bottom;

	var parseDate = d3.time.format("%m/%d/%Y").parse;

	var x = d3.time.scale().range([0, width]),
	    x2 = d3.time.scale().range([0, width]),
	    y = d3.scale.linear().range([height, 0]),
	    y2 = d3.scale.linear().range([height2, 0]);

	var xAxis = d3.svg.axis().scale(x).ticks(10).orient("bottom"),
	    xAxis2 = d3.svg.axis().scale(x2).ticks(10).orient("bottom"),
	    yAxis = d3.svg.axis().scale(y).orient("left");

	var brush = d3.svg.brush()
	    .x(x2)
	    .on("brush", brushed);

	var line = d3.svg.line()
	    .interpolate("linear")
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.yieldRate); });

	var line2 = d3.svg.line()
	    .interpolate("linear")
	    .x(function(d) { return x2(d.date); })
	    .y(function(d) { return y2(d.yieldRate); });

	var svg = d3.select("#vis").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom);

	svg.append("defs").append("clipPath")
	    .attr("id", "clip")
	  .append("rect")
	    .attr("width", width)
	    .attr("height", height);

	var focus = svg.append("g")
	    .attr("class", "focus")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var context = svg.append("g")
	    .attr("class", "context")
	    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

	d3.csv("data/AngelYield.csv", type, function(error, data) {
	  x.domain(d3.extent(data.map(function(d) { return d.date; })));
	  y.domain([0, d3.max(data.map(function(d) { return d.yieldRate; }))]);
	  x2.domain(x.domain());
	  y2.domain(y.domain());

	var path=  focus.append("path")
	      .datum(data)
	      .attr("class", "line")
	      .attr("d", line);
	var totalLength = path.node().getTotalLength();


	  focus.append("g")
	      .attr("class", "xaxis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	  focus.append("g")
	      .attr("class", "yaxis")
	      .call(yAxis);

	 var path2= context.append("path")
	      .datum(data)
	      .attr("class", "line")
	      .attr("d", line2);
	 var totalLength1 = path2.node().getTotalLength();
		
		path2
		.attr("stroke-dasharray", totalLength1 + " " + totalLength1)
		 .attr("stroke-dashoffset", totalLength1)
		.transition()
	   .duration(3000)
	   .ease("linear")
	   .attr("stroke-dashoffset", 0);

	  context.append("g")
	      .attr("class", "xaxis")
	      .attr("transform", "translate(0," + height2 + ")")
	      .call(xAxis2);

	  context.append("g")
	      .attr("class", "x brush")
	      .call(brush)
	    .selectAll("rect")
	      .attr("y", -6)
	      .attr("height", height2 + 7);
	  
	  var curtain = svg.append('rect')
	    .attr('x', -1 * (width+60))
	    .attr('y', -1 * height)
	    .attr('height', height)
	    .attr('width', width)
	    .attr('class', 'curtain')
	    .attr('transform', 'rotate(180)')
	    .style('fill', '#ffffff')
	    .transition()
    .duration(3000)
    .ease('linear')
    .attr('width', 0);
	  
	  var labelForRate= document.createElement("div");
	  labelForRate.id="labelForRate";
	  labelForRate.innerHTML="<h3>The rate of deal acceptance by Angel Investors in the United States</h3> " +
				"Drag and select (brush) the lower graph to focus on a particular time period";
		$("#vis").append(labelForRate);
		
	
		
	});

	function brushed() {
	
	  x.domain(brush.empty() ? x2.domain() : brush.extent());
	  focus.select(".line").attr("d", line);
	  focus.select(".xaxis").call(xAxis);
	}

	function type(d) {
	  d.date = parseDate(d.date);
	  d.yieldRate = +d.yieldRate;
	  return d;
	}

}


function createThird(){
	var visAll= document.getElementById("visAll");
	visAll.style.left="40%";
	var vis= document.getElementById("vis");
	vis.setAttribute("style","width:1500px; height:900px");
	vis.innerHTML='<object type="text/html" data="AngelInvestmentTotals.html" style="width:inherit; height: inherit"></object>';

}

function createFourth(){
	var visAll= document.getElementById("visAll");
	visAll.style.left="30%";
	var vis= document.getElementById("vis");
	vis.setAttribute("style","width:1700px; height:900px");
	vis.innerHTML='<object type="text/html" data="AngelSectors.html" style="width:inherit; height: inherit"></object>';

	
}


function createFifth(){
	var visAll= document.getElementById("visAll");
	visAll.style.left="40%";
	var vis= document.getElementById("vis");
	vis.innerHTML='<object type="text/html" data="AngelExits.html" style="width:inherit; height: inherit"></object>';
	
	
}

function createSixth(){
	
	var vis= document.getElementById("vis");
	vis.innerHTML="";
	vis.setAttribute("style","width:1300px; height:850px");
	var margin = { top: 20, right: 100, bottom: 40, left: 100 };
	var height = 450 - margin.top - margin.bottom;
	var width = 1200 - margin.left - margin.right;
	
	var dataStep2= [{Name:"Founder1", Equity:27.5},
	                {Name:"Founder2", Equity:27.5},
	                {Name:"Friends & Family", Equity:5},
	                {Name:"Angel", Equity:20},
	                {Name:"VC", Equity:20}
	                ];
	var stages=["Friends & Family", "Seed", "Venture Capital"];
	var investment=[200000, 1000000,5000000];
	createPie(dataStep2,stages,investment);

	var margin = { top: 20, right: 100, bottom: 40, left: 100 };
	var height = 400 - margin.top - margin.bottom;
	var width = 960 - margin.left - margin.right;

	var svg = d3.select("#vis").append("svg")
			.attr("width",width + margin.left + margin.right)
			.attr("height",height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// setup scales - the domain is specified inside of the function called when we load the data
	var xScale = d3.time.scale()
				
	               .range([0, width]);
				   
	var yScale = d3.scale.linear()
				
	               .range([height, 0]);
				   
	
	
	// setup the axes
	var xAxis = d3.svg.axis()
	              .scale(xScale)
				  .orient("bottom");
				  
				  
	var yAxis = d3.svg.axis()
	              .scale(yScale)
				  .orient("left");
				  
	var parseDate = d3.time.format("%Y").parse;
	
	// set the line attributes

		
		d3.csv("data/vcAnalysisnew.csv", function(error, data) {
		if (error) return console.warn(error);
		
		// color domain
			//color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Date"; }));
		data.forEach(function(d){
			
			d.year=new Date(+d.year, 0, 1);
		  d.number = +d.number;});
		xScale.domain(d3.extent(data, function(d) { return d.year; }));
		yScale.domain(d3.extent(data, function(d) { return d.number; }));

			svg.append("g")
				.attr("class", "xaxis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis)
				.append("text")
      .attr("x", width+40)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Year");

			// add the y axis
			svg.append("g")
					.attr("class", "yaxis")
					.call(yAxis)
				    .append("text")
					.attr("transform","rotate(-90)")
					.attr("y", 6)
					.attr("dy",".71em")
					.style("text-anchor","end")
					.text("Number of Firms");
			
			
			
			var chart = svg.append('g')
			//.attr("transform", "translate(95,20)")
			.attr('id','bars')
			.selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
			.attr('width',19)
			.attr("class","firms")
			.attr({'x':function(d,i){ return xScale(d.year); }})
			.attr({'y':function(d,i){ return yScale(d.number); }})
			.style('fill','#ff8533')
			.on("mouseover", function (d) { showPopover.call(this, d); })
           .on("mouseout",  function (d) { removePopovers(); })
			.attr('height',function(d){ return 0; })
			.transition()
		    .duration(1000) 
		    .attr("height", function(d) {return height-yScale(d.number); });
			
		
			function removePopovers () {
		          $('.popover').each(function() {
		            $(this).remove();
		          }); 
		        }
		        function showPopover (d) {debugger;
		        	
		          $(this).popover({
		            title: 'VC Firms',
		            placement: 'auto top',
		            container: 'body',
		            trigger: 'manual',
		            html : true,
		            content: function() {
		            	var year=d.year.getFullYear();
		              return "<b>Year:</b> " + year + 
		                     "<br/><b>No of Firms:</b> " +d.number; }
		          });
		          $(this).popover('show')
		        }
	});	
		
		var labelForFirms= document.createElement("div");
		labelForFirms.id="labelForFirms";
		labelForFirms.style.fontSize="17px";
		labelForFirms.innerHTML="<h3>The Number of VC Firms in United States</h3> Hover over bars for specific data.";
		$("#vis").append(labelForFirms);
					
}

function createSeventh(){
	
	var vis= document.getElementById("vis");
	vis.innerHTML="";
	var data;
	var margin = {top: 20, right: 20, bottom: 30, left: 50};
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
	
	var svg = d3.select("#vis").append("svg")
			.attr("width",width + margin.left + margin.right)
			.attr("height",height + margin.top + margin.bottom)
		    .append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// setup scales - the domain is specified inside of the function called when we load the data
	var xScale = d3.time.scale()
	               .range([0, width]);
				   
	var yScale = d3.scale.linear()
	               .range([height, 0]);
				   
	var color = d3.scale.category20();
	
	// setup the axes
	var xAxis = d3.svg.axis()
	              .scale(xScale)
				  .orient("bottom");
				  
				  
	var yAxis = d3.svg.axis()
	              .scale(yScale)
				  .orient("left");
				  
	var parseDate = d3.time.format("%Y").parse;
	
	
		
		// import data and create chart
		
	d3.csv("data/vcBySector.csv", function(error, data) {
		if (error) return console.warn(error);
		
		// color domain
			color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Date"; }));
		data.forEach(function(d){
			
				d.Date = parseDate(d.Date);
				d.BusinessProductsandServices = +d.BusinessProductsandServices;
		        d.ComputersandPeripherals  = +d.ComputersandPeripherals;
                d.ConsumerProductsandServices = +d.ConsumerProductsandServices;
                d.ElectronicsInstrumentation = +d.ElectronicsInstrumentation;
                d.FinancialServices = +d.FinancialServices;
                d.HealthcareServices = +d.HealthcareServices;
                d.IndustrialEnergy = +d.IndustrialEnergy;
                d.ITServices = +d.ITServices;
                d.MediaandEntertainment = +d.MediaandEntertainment;
                d.MedicalDevicesandEquipment = +d.MedicalDevicesandEquipment;
                d.NetworkingandEquipment = +d.NetworkingandEquipment;
                d.Other = +d.Other;
                d.RetailingDistributio = +d.RetailingDistribution;
                d.Semiconductors = +d.Semiconductors;
                d.Software = +d.Software;
                d.Telecommunications = +d.Telecommunications;
			});
		

        var vc1, vc2, vc3, vc4, vc5, vc6, vc7, vc8, vc9, vc10, vc11, vc12, vc13, vc14, vc15, vc16, vc17;
			
			// create stocks array with object for each company containing all data
			var sector = color.domain().map(function(name) {
				return {
					name: name,
					values: data.map(function(d){
						return {date: d.Date, value: +d[name]};
					})
					};
			});
			
			// add domain ranges to the x and y scales
			xScale.domain([
				d3.min(sector, function(c) { return d3.min(c.values, function(v) { return v.date; }); }),
				d3.max(sector, function(c) { return d3.max(c.values, function(v) { return v.date; }); })
			]);
			
			yScale.domain([
				0,
				d3.max(sector, function(c) { return d3.max(c.values, function(v) { return v.value; }); })
			]);
			
			// add the x axis
			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis)
				.append("text")
      .attr("x", width+40)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Price");
	  

			// add the y axis
			svg.append("g")
					.attr("class", "y axis")
					.call(yAxis)
				    .append("text")
					.attr("transform","rotate(-90)")
					.attr("y",6)
					.attr("dy",".71em")
					.style("text-anchor","end")
					.text("Capital ($)");
					
		var div = d3.select("body").append("div")	
			.attr("class", "tooltip")				
			.style("opacity", 0);			
		
		var allSectors = svg.selectAll(".allSectors")
		                    .data(sector)
							.enter().append("g")
							.attr("class", "allSectors");

			// set the line attributes
	   var line = d3.svg.line()
		            .x(function(d) { return xScale(d.date); })
		            .y(function(d) { return yScale(d.value); });		
					
					
    var Lines = allSectors.append("path")
                      .attr("class","line")
                      .attr("d", function(d) { return line(d.values); })
                      .style("stroke", function(d) { return color(d.name); });	
					  
	var legend = svg.append("g")
	  .attr("class", "legend")
        .attr("x", width-75)
        .attr("y", 50)
	  .attr("height", 100)
	  .attr("width", 100)
    .attr('transform', 'translate(-300,-10)')  
    
    var curtain = svg.append('rect')
	    .attr('x', -1 * (width+60))
	    .attr('y', -1 * height)
	    .attr('height', height+10)
	    .attr('width', width)
	    .attr('class', 'curtain')
	    .attr('transform', 'rotate(180)')
	    .style('fill', '#ffffff')
	    .transition()
    .duration(3000)
    .ease('linear')
    .attr('width', 0);
      
    
    legend.selectAll("rect")
      .data(sector)
      .enter()
      .append("rect")
	  .attr("x", width-75)
      .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 12)
	  .attr("height", 12)
	  .attr("checked",true)
	  .style("fill", function(d) { 
        
		return color(d.name);
        
      })
       .on("click", function(e) {
    	   debugger;
    	   	
    		  this.checked=this.checked ? false:true;
    		  if (this.checked) {
                  d3.select(this).style("opacity", 0.1);
                } else {
                  d3.select(this).style("opacity", 0.8);
                }
    		  var display = this.checked ? "none" : "inline";
    		  allSectors.filter(function(d) {return e.name == d.name;})
    					
    				.attr("display", display);
    		  
	  
	  });
      
    legend.selectAll('text')
      .data(sector)
      .enter()
      .append("text")
	  .attr("x", width-52)
      .attr("y", function(d, i){ return i * 20 + 9;})
	  .text(function(d) {
       var text =d.name;
        return text;
      });
					
		});		
				
	var labelForVC= document.createElement("div");
	labelForVC.id="labelForVC";
	labelForVC.style.fontSize="17px";
	labelForVC.innerHTML="<h3>Venture Capital investments by Sector</h3> Click on the legend boxes to filter data by sectors ";
		$("#vis").append(labelForVC);				
			
			

}


function createEigth(){
	
	var vis= document.getElementById("vis");
	vis.innerHTML='<object type="text/html" data="vcStages.html" style="width:inherit; height: inherit"></object>';
	

	
}

function createNinth(){
	
	
	
	var vis= document.getElementById("vis");
	vis.innerHTML='<object type="text/html" data="vcExits.html" style="width:inherit; height: inherit"></object>';
	
}

function createTenth(){
	var vis= document.getElementById("vis");
	vis.innerHTML='';
	var section= document.getElementById("eleven");
	section.setAttribute("style","opacity:1; background-color:#ff4d4d; color:#ffffff; width:900px");

}

function createEleven(){

}

function createExtra(){}

function createPie(data,stages,investment){
	var width = 500,
	height = 300,
	radius = Math.min(width, height) / 2;

	var color = d3.scale.ordinal()
	.range(["#00cc00","#003399","#98abc5", "#8a89a6", "#7b6888"]);

	var arc = d3.svg.arc()
	.outerRadius(radius - 20)
	.innerRadius(radius - 50);

	var labelArc = d3.svg.arc()
	.outerRadius(radius - 40)
	.innerRadius(radius - 40);

	var pie = d3.layout.pie()
	.sort(null)
	.value(function(d) { return d.Equity; });

	var svg = d3.select("#vis").append("svg")
	.attr("width", width)
	.attr("height", height)
	.attr("class","col-md-5")
	.attr("id","pie")
	.append("g")
	.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	
	svg.append("text")
	.text("Equity Distribution")
	.attr("transform", "translate(-70,-135)")
	.style("fill","#000099")
	.style("font-size","19px");


	var g = svg.selectAll(".arc")
	.data(pie(data))
	.enter().append("g")
	.attr("class", "arc");

	g.append("path")
	.attr("d", arc)
	.style("fill", function(d) { return color(d.data.Name); })
	.transition().delay(function(d, i) { return i * 500; }).duration(3000)
	.attrTween('d', function(d) {
		var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
		return function(t) {
			d.endAngle = i(t);
			return arc(d);
		}
	});
	;

	g.append("text")
	.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
	.attr("dy", ".35em")
	.text(function(d) { return d.data.Name+ " (" +d.data.Equity+" %)"; });
	


//	create bar
width=400;
	var svg1 = d3.select("#vis").append("svg")
	.attr("width", width)
	.attr("height", 350)
	.attr("class","col-md-6")
	.attr("id","bar")
	.append("g");
//	.attr("transform", "translate(" + width/2 + "," + 250 / 2 + ")");

	var x = d3.scale.linear()
	.domain([10000, 5000000])
	.range([0, width]);

	var y = d3.scale.linear()
	.domain([0, stages.length])
	.range([0,250]);
	
	var colorScale = d3.scale.quantize()
	.domain([0,stages.length])
	.range(icolors);

	var xAxis = d3.svg.axis()
	.scale(x)
	.ticks(5)
	.orient("bottom");

	var yAxis = d3.svg.axis()
	.scale(y)
	.tickSize(6)
	.tickFormat(function(d,i){ return stages[i]; })
	.tickValues(d3.range(17))
	.orient("left");
	
	svg1.append("text")
	.text("Investment Range for this stage")
	.attr("transform", "translate(90,20)")
	.style("fill","#000099")
	.style("font-size","19px");

	svg1.append("g")
	.attr("class", "xaxis")
	.attr("transform", "translate(95,300)")
	.call(xAxis);

	svg1.append("g")
	.attr("class", "yaxis")
	.attr("transform", "translate(95,50)")
	.call(yAxis);
	
	var chart = svg1.append('g')
	.attr("transform", "translate(95,20)")
	.attr('id','bars')
	.selectAll('rect')
	.data(investment)
	.enter()
	.append('rect')
	.attr('height',19)
	.attr({'x':0,'y':function(d,i){ return y(i)+19; }})
	.style('fill',function(d,i){ return colorScale(i); })
	.attr('width',function(d){ return 0; })
	.transition()
    .duration(1000) 
    .attr("width", function(d) {return x(d); });
   
	
	d3.select('#bars')
	.selectAll('text')
	.data(investment)
	.enter()
	.append('text')
	.attr({'x':function(d) {return x(d); },'y':function(d,i){ return y(i)+35; }})
	.text(function(d){ return d+"$"; }).style({'fill':'#000000','font-size':'14px'});
	

}

function createStartupRate(){

	var margin = {top: 20, right: 20, bottom: 30, left: 50},
	width = 1000 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;


	var x = d3.time.scale()
	.range([0, width]);

	var y = d3.scale.linear()
	.range([height, 0]);

	var xAxis = d3.svg.axis()
	.scale(x)
	.ticks(20)
	.orient("bottom");

	var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");


	var svg = d3.select("#vis").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.attr("id","startupRate")
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.csv("data/startupRate.csv", function(error, data) {
		if (error) throw error;
		data.forEach(function(d) {
			d.rate=+d.rate;
			d.year=new Date(+d.year, 0, 1);});
		x.domain(d3.extent(data, function(d) { return d.year; }));
		y.domain(d3.extent(data, function(d) { return d.rate; }));

		svg.append("g")
		.attr("class", "xaxis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

		svg.append("g")
		.attr("class", "yaxis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Rate");


		var area = d3.svg.area()
		.x( function( d ) { return x( d.year ) ; } )
		.y0( height - margin.bottom * 1.5 )
		.y1( function( d ) { return y( d.rate ); } )
		.interpolate( 'cardinal' ),
		startData = [];

		data.forEach( function( d ) {
			startData.push( { year : d.year, rate : 0 } );
		} );

		function tweenArea( b ) {
			return function( a ) {
				var i = d3.interpolateArray( a, b );          
				a.forEach( function( data, index ) {
					a[ index ] = b[ index ]
				} );

				return function( t ) {
					return area( i ( t ) );
				};
			};
		}

		var path= svg.append("path")
		.datum(startData)
		.attr("class", "line")
		.attr("d", area)
		.style("fill", "#b3ffcc")
		.style("stroke","blue");
		// var totalLength = path.node().getTotalLength();
		path
		.transition()  
		.duration( 3000 )
		.attrTween( 'd', tweenArea( data ) ); 
	});
	
	var labelForStartup= document.createElement("div");
	labelForStartup.id="labelForStartup";
	labelForStartup.style.fontSize="17px";
	labelForStartup.innerHTML="<h3>The Rate of new Entrepreneurs in the United States</h3>";
	$("#vis").append(labelForStartup);	
}
display();