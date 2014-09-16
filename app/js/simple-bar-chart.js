'use strict';

define(['d3', 'jquery'], function (d3, $) {
	var drawRMCPChart = function (container, data, sample, titleName, set) {
		var containerSelector = container,
			dataset = data,
			sampleSize = sample,
			titleText = titleName,
			setName = set,
			chartObject = {};

		var dimensions = {
			height: 500,
			width: 800,
			paddingHorizontal: 10,
			paddingVertical: 10,
			yAxisMinWidth: 300,
			yAxisProportion: 0.4,
			titleHeight: 82,
			dataPadding: 70,
			otherInfoHeight: 60,
			spaceBetweenBars: 10,
			minWidth: 650,
			innerHeight: function () {
				return this.height - 2 * this.paddingVertical;
			},
			innerWidth: function () {
				return this.width - 2 * this.paddingHorizontal;
			},
			yAxisWidth: function () {
				return Math.round(
					Math.max(
						this.yAxisMinWidth,
						this.innerWidth() *	this.yAxisProportion
					)
				);
			},
			dataWidth: function () {
				return this.innerWidth() - this.yAxisWidth() - this.dataPadding;
			},
			yAxisLeft: function () { return this.paddingHorizontal;	},
			yAxisRight: function () {
				return this.yAxisLeft() + this.yAxisWidth();
			},
			dataLeft: function () { return this.yAxisRight(); },
			dataRight: function ()  {
				return this.dataLeft() + this.dataWidth();
			},
			centerHorizontal: function () { return Math.round(this.width / 2); },
			titleTop: function () { return this.paddingVertical; },
			titleBottom: function () {
				return this.titleTop() + this.titleHeight;
			},
			titleUnderline: function () {
				return this.titleBottom() + this.paddingVertical * 2;
			},
			otherInfoBottom: function () {
				return this.height - this.paddingVertical;
			},
			otherInfoTop: function () {
				return this.otherInfoBottom() - this.otherInfoHeight;
			},
			dataTop: function () {
				return this.titleUnderline() + this.paddingVertical * 4;
			},
			dataBottom: function () { return this.otherInfoTop(); },
			dataHeight: function () { return this.dataBottom() - this.dataTop(); },
		};
		dimensions.width =
			Math.max($(containerSelector).width(), dimensions.minWidth);
		dimensions.height = Math.max(9 * dimensions.width / 16, 600);
		var hexagonPath = "M18.536,12.353L2.378,21.681c-1.234,0.714-2.755," +
			"0.714-3.99,0l-16.157-9.328c-1.235-0.712-1.996-2.03-1.996-3.456" +
			"V-9.759c0-1.425,0.76-2.743,1.996-3.455l16.157-9.329c1.235-0.712," +
			"2.756-0.712,3.99,0l16.158,9.329c1.234,0.712,1.994,2.3,1.994,3.455" +
			"V8.897C20.53,10.323,19.771,11.641,18.536,12.353";

		var svg = d3.select(containerSelector)
			.append("svg")
			.attr("height", dimensions.height)
			.attr("width", dimensions.width);
		var yScale = d3.scale.ordinal()
			.domain(d3.range(dataset.length))
			.rangeRoundBands(
				[dimensions.dataTop(), dimensions.dataBottom()], 0.36, 0.28);
		var xScale = d3.scale.linear()
			.domain([0, d3.max(dataset, function (d) {
					return d.datum / sampleSize;
				})])
			.range(
				[0, dimensions.dataWidth()]);

		var percentFormat = d3.format('%');

		var resizeText = function (text, width, max) {
			  text.each(function() {
			    var text = d3.select(this),
			    	current = max;

			   	if (text.selectAll("tspan").empty()) {
					do {
						text.style("font-size", current + "px");
						current -= 2;
					} while (text.node().getComputedTextLength() > width);
			   	} else {
			   		text.selectAll("tspan")
			   			.each(function () {
			   				var tspan = d3.select(this);
							do {
								tspan.style("font-size", current + "px");
								current -= 2;
							} while (tspan.node().getComputedTextLength() > width);
							current += 2;
			   			})
			   			.style("font-size", current + "px");
			   	}
			  });
		};

		var wrapLines = function (text, width) {
			if (width === 0) return;
			  text.each(function() {
			    var text = d3.select(this),
			        words = text.text().split(/\s+/).reverse(),
			        word,
			        line = [],
			        lineNumber = 0,
			        lineHeight = 1.5, // ems
			        y = text.attr("y"),
			        x = text.attr("x"),
			        dy = parseFloat(text.attr("dy")) || 0,
			        tspan = text.text(null).append("tspan")
			        	.attr("x", x)
			        	.attr("y", y)
			        	.attr("dy", dy + "em")
			        	.style("alignment-baseline",
			        		text.style("alignment-baseline"));
					
			    while (word = words.pop()) {
			      line.push(word);
			      tspan.text(line.join(" "));
			      if (tspan.node().getComputedTextLength() > width) {
			        line.pop();
			        tspan.text(line.join(" "));
			        line = [word];
			        tspan = text.append("tspan")
			        	.attr("x", x)
			        	.attr("y", y)
			        	.attr("dy", ++lineNumber * lineHeight + dy + "em")
			        	.text(word)
			        	.style("alignment-baseline",
			        		text.style("alignment-baseline"));
			      }
			    }
			  });
		};

		var wrapTwoLinesUp = function (text, width) {
			text.each(function() {
				var text = d3.select(this),
					lineOne = text.text().split(/\s+/),
					lineTwo = [],
					lineNumber = 0,
					lineHeight = 1.3, // ems
					y = text.attr("y"),
					x = text.attr("x"),
					tspanOne = text.text(null).append("tspan")
						.attr("x", x)
						.attr("y", y)
						.attr("dy", -1 * lineHeight + "em")
						.text(lineOne.join(" ")),
			        tspanTwo = text.append("tspan")
						.attr("x", x)
						.attr("y", y);
				
				if (tspanOne.node().getComputedTextLength() < width) {
					tspanTwo.remove();
					return;
				}

				while (tspanOne.node().getComputedTextLength() >
						tspanTwo.node().getComputedTextLength()) {
					lineTwo.unshift(lineOne.pop());
					tspanOne.text(lineOne.join(" "));
					tspanTwo.text(lineTwo.join(" "));
				}
			});
		};

		var reWrapLines = function (text, width) {
			if (width === 0 || (typeof width === "number" && isNaN(width))) return;

			text.each(function () {
				var text = d3.select(this),
					tspans = text.selectAll("tspan"),
					content = '';

					if (tspans.empty()) return;

					tspans.each(function () {
						content += d3.select(this).text() + " ";
					});

					text.text(content.substring(0,content.length-1));
			});
			wrapLines(text, width);
		};

		var title = svg.append("g");
		title.append("text")	//	Title Text
			.text(titleText)
			.attr("y", dimensions.titleBottom())
			.attr("x", dimensions.centerHorizontal())
			.style({
				'font-family': "'Roboto Slab', serif",
				'text-anchor': 'middle',
				'fill': '#58585b',
				'font-size': '36px',
				'opacity': 1
			})
			.call(wrapTwoLinesUp, dimensions.innerWidth())
			.call(resizeText, dimensions.innerWidth(), 36);
		title.append("path")	//	Underline the title
			.attr("d", function () {
				var path = "";
				path += "M" + dimensions.yAxisLeft() + "," +
					dimensions.titleUnderline();
				path += "l" + dimensions.innerWidth() + ", 0";
				return path;				
			})
			.style({
				'stroke': '#58585b',
				'stroke-width': '2px'
			});

		var yAxisGroup = svg.append("g");
		yAxisGroup.append("path")	//	Y-axis line
			.attr("d", function () {
				var path = "";
				path += "M" + (dimensions.yAxisRight() - 1) + "," +
					dimensions.dataTop();
				path += "L" + (dimensions.yAxisRight() - 1) + "," +
					dimensions.dataBottom();
				return path;
			})
			.style({
				'stroke': '#000',
				'stroke-width': '1px'
			});
		yAxisGroup.selectAll("text")	//	Labels
			.data(dataset)
			.enter()
			.append("text")
			.style({
				'text-anchor': 'end',
				'fill': '#58585b',
				'font-family': 'Open Sans',
				'font-size': '14px',
				'alignment-baseline': 'middle',
				'opacity': 1
			})
			.attr("x", function () {
				return dimensions.yAxisRight() - dimensions.paddingHorizontal;
			})
			.attr("y", function (d, i) {
				return yScale(i) + yScale.rangeBand() / 2;
			})
			.text(function (d) {
				return d.label;
			})
			.call(wrapLines, 
				(dimensions.yAxisWidth() - dimensions.paddingHorizontal)/1.1);

		var chartData = svg.append("g");
		chartData.selectAll("rect")	//	Bars
			.data(dataset)
			.enter()
			.append("rect")
			.attr("x", dimensions.dataLeft())
			.attr("y", function (d, i) {
				return yScale(i);
			})
			.attr("height", yScale.rangeBand())
			.attr("width", function (d) {
				return xScale(d.datum / sampleSize);
			})
			.attr("data-toggle", "tooltip")
			.attr("title", function (d) {
				return d.datum + " out of " + sampleSize +
					" companies surveyed voiced this as a business risk";
			})
			.style({
				// 'stroke': '#203368',
				'stroke-width': 0,
				'fill': '#48C6EA'
			})
			.on("mouseover", function() {
				d3.select(this)
					.style("filter", "url(#drop-shadow)");
			})
			.on("mouseout", function() {
				d3.select(this)
					.style("filter", "");
			});

		chartData.selectAll("text")
			.data(dataset)
			.enter()
			.append("text")
			.text(function (d) {
				return percentFormat(d.datum / sampleSize);
			})
			.attr("x", function (d) {
				return dimensions.dataLeft() +
					xScale(d.datum / sampleSize) +
					dimensions.paddingHorizontal;
			})
			.attr("y", function (d, i) {
				return yScale(i) + yScale.rangeBand() / 2;
			})
			.style({
				'text-anchor': 'left',
				'font-family': 'Open Sans',
				'fill': '#58585b',
				'alignment-baseline': 'middle',
				'opacity': 1
			})
			.call(resizeText, dimensions.dataPadding, Math.min(
					Math.round(yScale.rangeBand() * 0.8),
					18
				));

		var finePrint = svg.append("g")
			.append("text")
			.text("n=" + sampleSize)
			.attr("x", dimensions.dataLeft())
			.attr("y", (dimensions.otherInfoTop() +
				dimensions.otherInfoHeight / 2))
			.style({
				'font-size': '14px',
				'font-family': 'Open Sans',
				'fill': '#ccc'
			});

		// filters go in defs element
		var defs = svg.insert("defs");
		var filter = defs.append("filter")
		    .attr("id", "drop-shadow")
		    .attr("height", "130%");
		filter.append("feGaussianBlur")
		    // .attr("in", "SourceAlpha")
		    .attr("stdDeviation", 3)
		    .attr("result", "blur");
		filter.append("feOffset")
		    .attr("in", "blur")
		    .attr("dx", 0)
		    .attr("dy", 0)
		    .attr("result", "offsetBlur");
		var feMerge = filter.append("feMerge");

		feMerge.append("feMergeNode")
		    .attr("in", "offsetBlur");
		feMerge.append("feMergeNode")
		    .attr("in", "SourceGraphic");

		chartObject.changeData = function (newDataset, newSampleSize, newTitleText,
				newSet) {
			if (newSet === setName) return;
			dataset = newDataset;
			sampleSize = newSampleSize;
			titleText = newTitleText;
			setName = newSet;

			if (title.selectAll("text").text() !== newTitleText) {
				$(title.selectAll("text")[0][0])
					.animate({'opacity': 0}, { complete: function () {
							title.selectAll("text")
								.text(newTitleText)
								.attr("x", dimensions.centerHorizontal())
								.call(wrapTwoLinesUp, dimensions.innerWidth())
								.call(resizeText, dimensions.innerWidth(), 36);
							$(this).animate({'opacity': 1});
						}});
			}

			xScale.domain([0, d3.max(dataset, function (d) {
					return d.datum / sampleSize;
				})]);
			yScale.domain(d3.range(newDataset.length));

			chartData.selectAll("rect")
				.data(newDataset)
				.exit()
				.transition()
				.attr("width", 0)
				.remove();

			chartData.selectAll("rect")
				.data(newDataset)
				.attr("data-original-title", function (d) {
					return d.datum + " out of " + sampleSize +
						" companies surveyed voiced this as a business risk";
				})
				.transition()
				.attr("width", 0)
				.transition()
				.delay(250)
				.duration(10)
				.attr("y", function (d, i) {
					return yScale(i);
				})
				.attr("height", yScale.rangeBand())
				.transition()
				.duration(500)
				.delay(function (d, i) {
					return 260 + 500 * i / newDataset.length;
				})
				.attr("width", function (d) {
					return xScale(d.datum / newSampleSize);
				});

			chartData.selectAll("rect")
				.data(newDataset)
				.enter()
				.append("rect")
				.attr("x", dimensions.dataLeft())
				.attr("y", function (d, i) {
					return yScale(i);
				})
				.attr("height", yScale.rangeBand())
				.attr("width", 0)
				.attr("data-toggle", "tooltip")
				.attr("data-original-title", function (d) {
					return d.datum + " out of " + sampleSize +
						" companies surveyed voiced this as a business risk";
				})
				.style({
					// 'stroke': '#203368',
					'stroke-width': 0,
					'fill': '#48C6EA'
				})
				.on("mouseover", function() {
					d3.select(this)
						.style("filter", "url(#drop-shadow)");
				})
				.on("mouseout", function() {
					d3.select(this)
						.style("filter", "");
				})
				.transition()
				.delay(function (d, i) {
					return 260 + 500 * i / newDataset.length;
				})
				.attr("width", function (d) {
					return xScale(d.datum / newSampleSize);
				});

			chartData.selectAll("text")
				.data(newDataset)
				.exit()
				.transition()
				.attr("x", dimensions.dataLeft() +
					dimensions.paddingHorizontal)
				.style("opacity", 0)
				.remove();

			chartData.selectAll("text")
				.data(newDataset)
				.transition()
				.attr("x", dimensions.dataLeft() +
					dimensions.paddingHorizontal)
				.style("opacity", 0)
				.transition()
				.delay(250)
				.duration(10)
				.attr("y", function (d, i) {
					return yScale(i) + yScale.rangeBand() / 2;
				})
				.text(function (d) {
					return percentFormat(d.datum / sampleSize);
				})
				.transition()
				.duration(500)
				.delay(function (d, i) {
					return 260 + 500 * i / newDataset.length;
				})
				.style("opacity", 1)
				.attr("x", function (d) {
					return dimensions.dataLeft() +
						xScale(d.datum / sampleSize) +
						dimensions.paddingHorizontal;
				});

			chartData.selectAll("text")
				.data(newDataset)
				.enter()
				.append("text")
				.text(function (d) {
					return percentFormat(d.datum / sampleSize);
				})
				.attr("y", function (d, i) {
					return yScale(i) + yScale.rangeBand() / 2;
				})
				.attr("x", dimensions.dataLeft() +
					dimensions.paddingHorizontal)
				.style({
					'text-anchor': 'left',
					'font-family': 'Open Sans',
					'fill': '#58585b',
					'alignment-baseline': 'middle',
					'opacity': 0
				})
				.call(resizeText, dimensions.dataPadding, Math.min(
						Math.round(yScale.rangeBand() * 0.8),
						18
					))
				.transition()
				.delay(function (d, i) {
					return 260 + 500 * i / newDataset.length;
				})
				.style("opacity", 1)
				.attr("x", function (d) {
					return dimensions.dataLeft() +
						xScale(d.datum / sampleSize) +
						dimensions.paddingHorizontal;
				});

			yAxisGroup.selectAll("text")
				.data(newDataset)
				.exit()
				.transition()
				.style("opacity", 0)
				.remove();

			yAxisGroup.selectAll("text")
				.data(newDataset)
				.transition()
				.style("opacity", 0)
				.transition()
				.delay(250)
				.duration(10)
				.attr("y", function (d, i) {
					return yScale(i) + yScale.rangeBand() / 2;
				})
				.text(function (d) {
					return d.label;
				})
				.each("end", function () {
					d3.select(this).call(wrapLines, 
						(dimensions.yAxisWidth() -
							dimensions.paddingHorizontal)/1.1);
				})
				.transition()
				.delay(function (d, i) {
					return 260 + 500 * i / newDataset.length;
				})
				.duration(500)
				.style("opacity", 1);

			yAxisGroup.selectAll("text")
				.selectAll("tspan")
				.data(newDataset)
				.transition()
				.style("opacity", 0);

			yAxisGroup.selectAll("text")
				.data(newDataset)
				.enter()
				.append("text")
				.style({
					'text-anchor': 'end',
					'fill': '#58585b',
					'font-family': 'Open Sans',
					'font-size': '14px',
					'alignment-baseline': 'middle',
					'opacity': 0
				})
				.attr("x", (-1 * dimensions.paddingHorizontal))
				.attr("y", function (d, i) {
					return yScale(i) + yScale.rangeBand() / 2;
				})
				.text(function (d) {
					return d.label;
				})
				.call(wrapLines, 
					(dimensions.yAxisWidth() - dimensions.paddingHorizontal)/1.1)
				.transition()
				.delay(function (d, i) {
					return 260 + 500 * i / newDataset.length;
				})
				.duration(500)
				.style("opacity", 1);

			finePrint.text("n=" + sampleSize);

			$(containerSelector).find('rect')
				.tooltip({
					'trigger': 'hover',
					'container': containerSelector + ' .hovers'
				});
		};

		chartObject.resizeChart = function () {
			var width = $(containerSelector).width();
			dimensions.width = Math.max(width, dimensions.minWidth);
			svg.attr("width", dimensions.width);

			// Adjust the scales
			xScale.range([0, dimensions.dataWidth()]);

			title.selectAll("text")	//	Title Text
				.call(resizeText, dimensions.innerWidth(), 36)
				.selectAll("tspan")
				.attr("y", dimensions.titleBottom())
				.attr("x", dimensions.centerHorizontal());
			title.selectAll("path")	//	Underline the title
				.attr("d", function () {
					var path = "";
					path += "M" + dimensions.yAxisLeft() + "," +
					dimensions.titleUnderline();
					path += "l" + dimensions.innerWidth() + ", 0";
					return path;				
				});	

			yAxisGroup.selectAll("path")	//	Y-axis line
				.attr("d", function () {
					var path = "";
					path += "M" + (dimensions.yAxisRight() - 1) + "," +
						dimensions.dataTop();
					path += "L" + (dimensions.yAxisRight() - 1) + "," +
						dimensions.dataBottom();
					return path;
				});
			yAxisGroup.selectAll("text")
				.call(reWrapLines, (dimensions.yAxisWidth() -
					dimensions.paddingHorizontal)/1.1)
				.attr("x", function () {
					return dimensions.yAxisRight() - dimensions.paddingHorizontal;
				})
				.selectAll("tspan")
				.attr("x", function () {
					return dimensions.yAxisRight() - dimensions.paddingHorizontal;
				});

			chartData.selectAll("rect")
				.attr("x", dimensions.dataLeft())
				.attr("width", function (d) {
					return xScale(d.datum / sampleSize);
				});

			chartData.selectAll("text")
				.attr("x", function (d) {
					return dimensions.dataLeft() +
						xScale(d.datum / sampleSize) +
						dimensions.paddingHorizontal;
				});

			finePrint.attr("x", dimensions.dataLeft());
		};

		d3.select(containerSelector).append("div").attr("class", "hovers");
		setTimeout(function () {
			chartObject.resizeChart();
		}, 10);
		$(containerSelector).find('rect')
			.tooltip({
				'trigger': 'hover',
				'container': '.hovers'
			});

		return chartObject;
	};
	return function (container, data, sample, titleName, set) { 
		return drawRMCPChart(container, data, sample, titleName, set);
	};
});