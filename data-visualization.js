// set the dimensions and margins of the graph
var margin = {top: 80, right: 200, bottom: 80, left: 200},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#mydataviz1")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg1 = d3.select("#mydataviz2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg2 = d3.select("#mydataviz3")
    .append("svg")
    .attr("class", "barNames")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//----------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------First Bar Chart-------------------------------------------------------------//
//------------------------------------Data Pre-processing------------------------------------//
const dataset = d3.csv("dataset/2017TVC.csv");  // load dataset
dataset.then(function(data) {
    // change data type from string to number
    let map = data.map(function (d) {d.AM0 = +d.AM0; d.AM1 = +d.AM1; d.AM2 = +d.AM2; d.AM3 = +d.AM3; d.AM4 = +d.AM4; d.AM5 = +d.AM5; d.AM6 = +d.AM6; d.AM7 = +d.AM7;
        d.AM8 = +d.AM8; d.AM9 = +d.AM9; d.AM10 = +d.AM10; d.AM11 = +d.AM11; d.PM0 = +d.PM0; d.PM1 = +d.PM1; d.PM2 = +d.PM2; d.PM3 = +d.PM3; d.PM4 = +d.PM4;
        d.PM5 = +d.PM5; d.PM6 = +d.PM6; d.PM7 = +d.PM7; d.PM8 = +d.PM8; d.PM9 = +d.PM9; d.PM10 = +d.PM10; d.PM11 = +d.PM11; d.total = +d.total;
        return d;
    });
    const rdtype = d3.map(data, function(d){return(d.RoadType)}).keys();
    // console.log(rdtype);


    // To create unique values in array
    var outputArray = [];
    function removeusingSet(arr) {
        let outputArray = Array.from(new Set(arr));
        return outputArray
    }
    // create list of roadway name and total traffic volume
    var RdwayName = [];
    var aveName = [], bouName = [], briName = [], cirName = [], expName = [], highName = [], pkName = [], rdName = [], stName = [];
    var eachnum = [];
    var ave = 0, bou = 0, bri = 0, cir = 0, exp = 0, high = 0, pk = 0, rd = 0, st = 0;
    for (var i = 0; i < data.length; i++) {
        if (data[i].RoadType === 'Avenue') {
            ave += data[i].total;
            aveName.push(data[i].RoadwayName)
        } else if (data[i].RoadType === 'Boulevard') {
            bou += data[i].total;
            bouName.push(data[i].RoadwayName)
        } else if (data[i].RoadType === 'Bridge') {
            bri += data[i].total;
            briName.push(data[i].RoadwayName)
        } else if (data[i].RoadType === 'Circle') {
            cir += data[i].total;
            cirName.push(data[i].RoadwayName)
        } else if (data[i].RoadType === 'Expressway') {
            exp += data[i].total;
            expName.push(data[i].RoadwayName)
        } else if (data[i].RoadType === 'Highway') {
            high += data[i].total;
            highName.push(data[i].RoadwayName)
        } else if (data[i].RoadType === 'Parkway') {
            pk += data[i].total;
            pkName.push(data[i].RoadwayName)
        } else if (data[i].RoadType === 'Road') {
            rd += data[i].total;
            rdName.push(data[i].RoadwayName)
        } else if (data[i].RoadType === 'Street') {
            st += data[i].total;
            stName.push(data[i].RoadwayName)
        }
    }
    eachnum.push(ave,rd,st,exp,cir,bou,pk,bri,high);
    RdwayName.push(removeusingSet(aveName), removeusingSet(rdName), removeusingSet(stName), removeusingSet(expName)
        , removeusingSet(cirName), removeusingSet(bouName), removeusingSet(pkName), removeusingSet(briName), removeusingSet(highName));
    // console.log(eachnum);
    // console.log(RdwayName);

    // create object of road type and total volume
    var rdobj = [];
    for (var i = 0; i < rdtype.length; i++) {
        rdobj.push({type: rdtype[i], count: eachnum[i]})
    }
    // console.log(rdobj);

//------------------------------------set linear scale------------------------------------//
    // Add X axis
    var x = d3.scaleBand()
        .range([0, width])
        .domain(rdtype)
        .padding(0.2);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 25000000])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

//----------------Add Labels----------------//
    svg.append('text')
        .attr('x', -150)
        .attr('y', -75)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Total Traffic Volume');
    svg.append('text')
        .attr('x', 300)
        .attr('y', -30)
        .attr('text-anchor', 'middle')
        .text('Bar Chart of Total Traffic Volume Between Different Road Types');

//------------------------------------create a tooltip------------------------------------//
    var Tooltip = d3.select("#mydataviz1")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px");

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
        Tooltip
            .style("opacity", 1);
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
    };
    var mousemove = function(d) {
        Tooltip
            .html("Road Type: "+ d.type+ "<br>The Exact Value is: "+ d.count)
            .style("left", (d3.mouse(this)[0]+70) + "px")
            .style("top", (d3.mouse(this)[1]) + "px")
    };
    var mouseleave = function(d) {
        Tooltip
            .style("opacity", 0);
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
    };

//------------------------------------Generate Bar Chart------------------------------------//
    svg.selectAll("rect")
        .data(rdobj)
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d.type);})
        .attr("y", function (d) { return y(d.count);})
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.count);})
        .attr("fill", "#9685b3")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);

//------------------------------------Generate Buttons for connected scatter plot------------------------------------//
    // nested data for generating buttons
    const nested = d3.nest()
        .key(function (d) {
            return d.RoadType
        })
        .key(function (d) {
            return d.RoadwayName
        })
        .entries(data);

    // add the options to the button
    d3.select("#buttons")
        .append("p")
        .text("Road Type: ")
        .append("select")
        .attr("class", "select")
        .attr("id", "select1")
        .on("change", function () {
            var g = this.value;
            var filtered = nested.filter(function (d) {
                return d.key === g;
            });
            var options2 = d3.select("#select2").selectAll("option")
                .data(filtered[0].values.map(function (d) {
                    return d.key;
                }));
            options2.exit().remove();

            options2.enter()
                .append("option")
                .merge(options2)
                .text(function (d) {
                    return d;
                });
        });

    // Options for group 1 selection menu
    var options1 = d3.select("#select1")
        .selectAll("option")
        .data(nested.map(function (d) {
            return d.key;
        })).enter()
        .append("option")
        .text(function (d) {
            return d;
        });

    // Setup initial selection box for group 2
    var select2 = d3.select("#buttons")
        .append("p")
        .text("Road Name: ")
        .append("select")
        .attr("class", "select")
        .attr("id", "select2")
        .on("change", onchange);

    // Initial options for group 2 selection menu
    var filtered = nested.filter(function (d) {
        return d.key === "Avenue";
    });
    var options2 = d3.select("#select2")
        .selectAll("option")
        .data(filtered[0].values.map(function (d) {
            return d.key;
        })).enter()
        .append("option")
        .text(function (d) {
            return d;
        });

    function onchange() {
        sel1 = d3.select("#select1").property("value");
        sel2 = d3.select("#select2").property("value");
    }
});



//----------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------Second Bar Chart-------------------------------------------------------------//
//------------------------------------Data Pre-processing------------------------------------//
const dataset2 = d3.csv("dataset/rdTotal_TVC.csv", function (d) {
    // change data type (string to int)
    d.total= +d.total;
    return d
});
// console.log(dataset2);
dataset2.then(function(data) {

    const nestedName = d3.nest()
        .key(function (d) {
            return d.RoadType
        })
        .entries(data);

    // Get every column value
    var elements = nestedName.filter(function (d) {
        if(d.key === "Road"){return d;}});
    var selectedNames = elements[0].values.map(function (d) {
        return {rdnames: d.RoadwayName, total: d.total};});


//------------------------------------add the options to the button------------------------------------//
    d3.select("#selectButton")
        .selectAll('myOptions')
        .data(d3.map(data, function(d){return(d.RoadType)}).keys())
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }); // corresponding value returned by the button

//------------------------------------set linear scale------------------------------------//
//----------------Set up charts----------------//
    var xChart = d3.scaleBand().range([-143, width+200]).domain(selectedNames.map(function (d) {
        return d.rdnames;}));
    var xAxis = d3.axisBottom(xChart);
    var yChart = d3.scaleLinear().range([height,0]).domain([d3.min(selectedNames, function (d) {return d.total})-10000
        ,d3.max(selectedNames, function (d) {return d.total})]);
    var yAxis = d3.axisLeft(yChart);

//----------------Set up Axes----------------//
    //----Left axes
    var y = svg2.append("g")
        .attr("class", "y axis")
        .attr("transform","translate(-145,0)")
        .transition().duration(1000)
        .call(yAxis);
    //----Bottom axes
    var x = svg2.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .transition().duration(1000)
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

//----------------Add Labels----------------//
    svg2.append("text")
        .attr("transform", "translate(-130," +  (height+margin.bottom)/6 +") rotate(-90)")
        .text("total traffic volume");

    svg2.append("text")
        .attr("transform", "translate(" + (width+110) + "," + (height + margin.bottom) + ")")
        .text("Road Names");
    svg2.append("text")
        .attr('x', 300)
        .attr('y', -65)
        .attr('text-anchor', 'middle')
        .text('Total Traffic Volume Grouped by Different Road Type');

//----------------create a tooltip----------------//
    var Tooltip = d3.select("#mydataviz3")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px");

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
        Tooltip
            .style("opacity", 1);
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
    };
    var mousemove = function(d) {
        Tooltip
            .html("Road Name: "+ d.rdname+ "<br>The Exact Value is: "+ d.value)  // + d.value
            .style("left", (d3.mouse(this)[0]+70) + "px")
            .style("top", (d3.mouse(this)[1]) + "px")
    };
    var mouseleave = function(d) {
        Tooltip
            .style("opacity", 0);
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
    };

//----------------Update Bar Chart----------------//
    function update(selectedType){
        var typeFilter = data.filter(function (d) {
            if (d.RoadType === selectedType){
                return d;
            }
        });
        var dataFilter = typeFilter.map(function (d) {
            return {rdname: d.RoadwayName, value: d.total}
        });

        // Give new scale for the update
        // Set domain for x axis
        xChart.domain(dataFilter.map(function (d) {
            return d.rdname;
        }));

        // Set domain for y axis
        yChart.domain([d3.min(dataFilter, function (d) {return d.value})-50000
            ,d3.max(dataFilter, function (d) {return d.value})]);


        //select all bars on the graph, take them out, and exit the previous data set.
        //then you can add/enter the new data set
        var bars = svg2.selectAll("rect")
            .remove()
            .exit()
            .data(dataFilter);

        //now actually give each rectangle the corresponding data
        bars.enter()
            .append("rect")
            .attr("x", function (d) {return xChart(d.rdname)})
            .attr("y", function (d) {return yChart(d.value)})
            .attr("width", 20)
            .attr("height", function (d) {return height - yChart(d.value);})
            .attr("fill", "#99CCFF")
            .style("stroke-width", 4)
            .style("stroke", "none")
            .style("opacity", 0.8)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave);

        //Bottom axis
        svg2.select('.xAxis')
            .attr("transform", "translate(0," + height + ")")
            .transition().duration(1000)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d){
                return "rotate(-45)";
            });

        //Left axis
        svg2.select('.y')
            .transition().duration(1000)
            .call(yAxis);
    }

    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function (d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value");
        // run the updateChart function with this selected option
        update(selectedOption)
    });

});



//----------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------Third Bar Chart-------------------------------------------------------------//
//------------------------------------Data Pre-processing------------------------------------//
    const dataset1 = d3.csv("dataset/hourly_TVC.csv", function (d) {
        d3.keys(d).forEach(function (e) {
            d[e] = +d[e]
        });
        return d;
    });
    dataset1.then(function (data) {

//----------------------------set linear scale----------------------------//
//----------------Add  X axis----------------//
        var x = d3.scaleLinear().range([0, width])
            .domain([0, d3.max(data, function (d) {
                return d.Time
            })]);
        svg1.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

//----------------Add Y axis----------------//
        // Get every column value
        var elements = Object.keys(data[0]); //list of column names
        var selection = elements[16];  //3 AVENUE

        var y = d3.scaleLinear().range([height, 0]);
        var y1 = y.domain([d3.min(data, function (d) {
                return d[selection]
            })
                , d3.max(data, function (d) {
                    return d[selection]
                })]
        );
        var yAxis = svg1.append("g")
            .call(d3.axisLeft(y));

//----------------Add Labels----------------//
        svg1.append('text')
            .attr('x', -150)
            .attr('y', -70)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Total Traffic Volume');
        svg1.append('text')
            .attr('x', 300)
            .attr('y', -30)
            .attr('text-anchor', 'middle')
            .text('Connected Scatter Plot of Traffic Volume for Each Road in a day');
        svg1.append('text')
            .attr('x', 300)
            .attr('y', 390)
            .attr('text-anchor', 'middle')
            .text('Time (hourly)');

//----------------Initialize line with group a----------------//
        const lines = d3.line()
            .x(function (d) {
                return x(+d.Time);
            })
            .y(function (d) {
                return y1(+d[selection]);
            });

        var line = svg1
            .append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "orange")
            .attr("stroke-width", 2)
            .attr("d", lines);

//----------------Initialize dots with group a----------------//
        var dot = svg1
            .selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr("cx", function (d) {
                return x(+d.Time)
            })
            .attr("cy", function (d) {
                return y(+d[selection])
            })
            .attr("r", 4)
            .style("fill", "green");


//----------------A function that update the chart----------------//
        function update(selectedName) {

            // Create new data with the selection?
            var dataFilter = data.map(function (d) {
                return {time: d.Time, value: d[selectedName]}
            });

            // Give new scale for the update
            // Add Y axis
            y.domain([0, d3.max(dataFilter, function (d) {
                return +d.value
            })]);
            yAxis.transition().duration(1000).call(d3.axisLeft(y));

            // Give these new data to update line
            line
                .datum(dataFilter)
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                    .x(function (d) {
                        return x(+d.time)
                    })
                    .y(function (d) {
                        return y(+d.value)
                    })
                );
            dot
                .data(dataFilter)
                .transition()
                .duration(1000)
                .attr("cx", function (d) {
                    return x(+d.time)
                })
                .attr("cy", function (d) {
                    return y(+d.value)
                })
        }

        // When the button is changed, run the updateChart function
        d3.select("#select2").on("change", function (d) {
            // recover the option that has been chosen
            var selectedOption = d3.select(this).property("value")
            // run the updateChart function with this selected option
            update(selectedOption)
        })

    });


