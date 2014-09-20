'use strict';
if (!Modernizr.svg || !Modernizr.inlinesvg) {
	define([], function () { return false; });
} else {
define(['d3', 'jquery', 'bootstrap'], function (d3, $) {
	var drawRMCPChart = function (container, data, sample, titleName, callout) {
		var containerSelector = container,
			dataset = data,
			sampleSize = sample,
			titleText = titleName,
			chartObject = {};
		var dimensions = {
			height: 500,
			width: 800,
			paddingHorizontal: 10,
			paddingVertical: 10,
			yAxisMinWidth: 300,
			calloutMinWidth: 180,
			yAxisProportion: 0.4,
			calloutProportion: 0.18,
			titleHeight: 54,
			legendHeight: 100,
			calloutPaddingLeft: 70,
			otherInfoHeight: 0,
			spaceBetweenBars: 10,
			minWidth: 650,
			hideCallout: 940,
			showCalloutBox: true,
			innerHeight: function () {
				return this.height - 2 * this.paddingVertical;
			},
			innerWidth: function () {
				return this.width - 2 * this.paddingHorizontal;
			},
			calloutWidth: function () {
				return this.showCalloutBox ? Math.round(
					Math.max(
						this.calloutMinWidth,
						(this.innerWidth() * this.calloutProportion)
					)
				) : 0;
			},
			yAxisWidth: function () {
				return Math.round(
					Math.max(
						this.yAxisMinWidth,
						(this.innerWidth() - this.calloutWidth()) *
							this.yAxisProportion
					)
				);
			},
			dataWidth: function () {
				return this.innerWidth() - this.calloutWidth() - 
					this.yAxisWidth() - this.calloutPaddingLeft;
			},
			yAxisLeft: function () { return this.paddingHorizontal;	},
			yAxisRight: function () {
				return this.yAxisLeft() + this.yAxisWidth();
			},
			dataLeft: function () { return this.yAxisRight(); },
			dataRight: function ()  {
				return this.dataLeft() + this.dataWidth();
			},
			calloutLeft: function () {
				return this.dataRight() + this.calloutPaddingLeft;
			},
			calloutRight: function () {
				return this.width - this.paddingHorizontal;
			},
			calloutCenterHorizontal: function () {
				return Math.round(this.calloutLeft() + this.calloutWidth() / 2);
			},
			centerHorizontal: function () { return Math.round(this.width / 2); },
			titleTop: function () { return this.paddingVertical; },
			titleBottom: function () {
				return this.titleTop() + this.titleHeight;
			},
			titleUnderline: function () {
				return this.titleBottom() + this.paddingVertical * 2;
			},
			legendTop: function () {
				return this.titleUnderline() + this.paddingVertical;
			},
			legendBottom: function () {
				return this.legendTop() + this.legendHeight;
			},
			legendCenterVertical: function () {
				return Math.round((this.legendTop() + this.legendBottom()) / 2);
			},
			otherInfoBottom: function () {
				return this.height - this.paddingVertical;
			},
			otherInfoTop: function () {
				return this.otherInfoBottom() - this.otherInfoHeight;
			},
			dataTop: function () {
				return this.legendBottom() + this.paddingVertical;
			},
			dataBottom: function () { return this.otherInfoTop(); },
			dataHeight: function () { return this.dataBottom() - this.dataTop(); },
			calloutTop: function () { return this.legendTop(); },
			calloutBottom: function () { return this.dataBottom(); },
			calloutHeight: function () {
				return this.calloutBottom() - this.calloutTop();
			},
			legendLeft: function () { return this.yAxisLeft(); },
			legendRight: function () { return this.dataRight(); }
		};
		dimensions.width =
			Math.max($(containerSelector).width(), dimensions.minWidth);
		dimensions.height = Math.max(9 * dimensions.width / 16, 640);
		dimensions.showCalloutBox =
			(typeof callout !== 'undefined') ? callout : true;
		var hexagonPath = "M18.536,12.353L2.378,21.681c-1.234,0.714-2.755," +
			"0.714-3.99,0l-16.157-9.328c-1.235-0.712-1.996-2.03-1.996-3.456" +
			"V-9.759c0-1.425,0.76-2.743,1.996-3.455l16.157-9.329c1.235-0.712," +
			"2.756-0.712,3.99,0l16.158,9.329c1.234,0.712,1.994,2.3,1.994,3.455" +
			"V8.897C20.53,10.323,19.771,11.641,18.536,12.353";
		var dataKey = function (d) {
			return d.id;
		};
		var colorSet = function (number) {
			switch (number) {
				case 1:
					return ['#b9be10'];
				case 3:
				default:
					return ['#203368', '#1B75BB', '#48C6EA'];
			}
		};
		var svg = d3.select(containerSelector)
			.append("svg")
			.attr("height", dimensions.height)
			.attr("width", dimensions.width);
		var yScaleOuter	= d3.scale.ordinal()
			.domain(d3.range(dataset.length))
			.rangeRoundBands(
				[dimensions.dataTop(), dimensions.dataBottom()], 0.2, 0.1);
		var yScaleInner = d3.scale.ordinal()
			.domain(d3.range(sampleSize.length))
			.rangeRoundBands([0, yScaleOuter.rangeBand()], 0.2);
		var xScale = d3.scale.linear()
			.domain([0, d3.max(dataset, function (d) {
					return d3.max(d.data, function (d, i) {
						return d / sampleSize[i].quantity;
					});
				})])
			.range(
				[0, dimensions.dataWidth()]);
		var colors = d3.scale.ordinal()
			.domain(d3.range(sampleSize.length))
			.range(colorSet(sampleSize.length));
		var legendSpacing = d3.scale.ordinal()
			.domain(d3.range(sampleSize.length))
			.rangeRoundBands(
				[dimensions.legendLeft(), dimensions.legendRight()], 0.1);
		var percentFormat = d3.format('%');

		var resizeText = function (text, width, max) {
			  text.each(function() {
			    var text = d3.select(this),
			    	current = max;

			    do {
			    	text.style("font-size", current + "px");
			    	current -= 2;
			    } while (text.node().getComputedTextLength() > width);
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
			        	.attr("dy", dy + "em");
					
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
			        	.text(word);
			      }
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

		var percentRound = function (number) {
			return Math.round(number * 100) / 100;
		};

		var yAxisStyles = {
				'text-anchor': 'end',
				'fill': '#58585b',
				'font-family': 'Open Sans',
				'font-size': '14px',
			},
			dataLabelStyles = {
				'font-family': 'Open Sans',
				'fill': '#58585b',
				'alignment-baseline': 'middle'
			},
			calloutTitleStyles = {
				'fill': '#58585b',
				'font-family': "Open Sans",
				'font-size': '14px',
				'text-anchor': 'middle',
				'font-weight': 700
			},
			calloutNumberStyles = {
				'fill': '#58585b',
				'font-family': "Roboto Slab",
				'font-size': '24px',
				'text-anchor': 'middle',
			};

		if (!Modernizr.ie9) {
			yAxisStyles['alignment-baseline'] = 'bottom';
			dataLabelStyles['text-anchor'] = 'left';
			calloutTitleStyles['alignment-baseline'] = 'top';
			calloutNumberStyles['alignment-baseline'] = 'center';
		}

		var title = svg.append("g");
		title.append("text")	//	Title Text
			.text(titleText)
			.attr("y", dimensions.titleBottom())
			.attr("x", dimensions.centerHorizontal())
			.style({
				'font-family': "'Roboto Slab', serif",
				'text-anchor': 'middle',
				'fill': '#58585b',
				'font-size': '42px'
			})
			.call(resizeText, dimensions.innerWidth(), 42);
		title.append("path")	//	Underline the title
			.attr("d", function () {
				var path = "";
				path += "M" + dimensions.yAxisLeft() + "," +
					dimensions.titleUnderline();
				path += "L" + dimensions.calloutRight() + "," +
					dimensions.titleUnderline();
				return path;				
			})
			.style({
				'stroke': '#58585b',
				'stroke-width': '2px'
			});
		var legend = svg.append("g");
		legend.selectAll("path").data(sampleSize).enter()
			.append("path")
			.attr("d", hexagonPath)
			.style("fill", function (d, i) {
				return colors(i);
			})
			.style({
				'stroke-width': 0,
				// 'stroke': '#203368'
			})
			.attr('transform', function (d, i) {
				return 'translate(' + (21 * 0.6 + legendSpacing(i)) +
					',' + dimensions.legendCenterVertical() + ')' +
					'scale(0.6)';
			});
		legend.selectAll("text.legend").data(sampleSize).enter()
			.append("text")
			.attr("class", "legend")
			.text(function (d) {
				return d.title + " (n=" + d.quantity + ")";
			})
			.attr("x", function (d, i) {
				return legendSpacing(i) + 41 * 0.6 + dimensions.paddingHorizontal;
			})
			.attr("y", function () {
				return dimensions.legendCenterVertical();
			})
			.style({
				'fill': '#58585b',
				'font-family': 'Open Sans',
				'font-size': '14px',
				'alignment-baseline': 'middle'
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
			.data(dataset, dataKey)
			.enter()
			.append("text")
			.attr("x", function () {
				return dimensions.yAxisRight() - dimensions.paddingHorizontal;
			})
			.attr("y", function (d, i) {
				return yScaleOuter(i) + yScaleOuter.rangeBand() / 3;
			})
			.text(function (d) {
				return d.title;
			})
			.call(wrapLines, 
				(dimensions.yAxisWidth() - dimensions.paddingHorizontal)/1.1)
			.style(yAxisStyles);


		var chartData = svg.append("g");
		chartData.selectAll("g")	//	Bar Groups
			.data(dataset, dataKey)
			.enter()
			.append("g")
			.each(function (dData, iData) {
				var group = d3.select(this);
				group.selectAll("rect")
					.data(sampleSize)
					.enter()
					.append("rect")
					.attr("y", function (d, i) {
						return yScaleOuter(iData) + yScaleInner(i);
					})
					.attr("x", dimensions.dataLeft())
					.attr("height", yScaleInner.rangeBand())
					.attr("width", function (d, i) {
						return xScale(dData.data[i] / d.quantity);
					})
					.attr("data-toggle", "tooltip")
					.attr("title", function (d, i) {
						return dData.data[i] + " out of " + d.quantity + " " +
							d.title.toLowerCase() +
							" companies surveyed experience pain in this area";
					})
					.style({
						// 'stroke': '#203368',
						'stroke-width': 0
					})
					.style("fill", function (d, i) {
						return colors(i);
					})
					.on("mouseover", function() {
						d3.select(this)
							.style("filter", "url(#drop-shadow)");
					})
					.on("mouseout", function(d) {
						d3.select(this)
							.style("filter", "");
					});

				group.selectAll("text")
					.data(sampleSize)
					.enter()
					.append("text")
					.text(function (d, i) {
						return percentFormat(dData.data[i] / d.quantity);
					})
					.attr("x", function (d, i) {
						return dimensions.dataLeft() +
							xScale(dData.data[i] / d.quantity) +
							dimensions.paddingHorizontal;
					})
					.attr("y", function (d,i) {
						return yScaleOuter(iData) + yScaleInner(i) +
							yScaleInner.rangeBand() / 2;
					})
					.style(dataLabelStyles)
					.style('font-size', function () {
						return Math.min(
								Math.round(yScaleInner.rangeBand() * 0.8),
								18
							) + "px";
					});
			});

		var calloutBox = svg.append("g");
		if (!dimensions.showCalloutBox) {
			calloutBox.style("display", "none");
		}
		calloutBox.append("rect")
			.attr("x", function () {
				return dimensions.calloutLeft();
			})
			.attr("y", function () {
				return dimensions.calloutTop();
			})
			.attr("width", function () {
				return dimensions.calloutWidth();
			})
			.attr("height", function () {
				return dimensions.calloutHeight();
			})
			.style({
				'fill': 'rgba(88, 88, 91, 0.1)',
				'stroke-width': '0'
			});
		calloutBox.append("text")
			.attr("class", "title")
			.text("Difference between low and high maturity organizations")
			.attr("x", dimensions.calloutCenterHorizontal())
			.attr("y", (dimensions.legendTop() + dimensions.paddingVertical * 3))
			.call(wrapLines, dimensions.calloutWidth() / 1.2)
			.style(calloutTitleStyles);
		calloutBox.selectAll("text.difference")
			.data(dataset, dataKey)
			.enter()
			.append("text")
			.attr("class", "difference")
			.attr("x", dimensions.calloutCenterHorizontal())
			.attr("y", function (d, i) {
				return yScaleOuter(i) + yScaleOuter.rangeBand() / 2;
			})
			.style(calloutNumberStyles)
			.text(function (d) {
				var last = sampleSize.length - 1;
				return percentFormat(percentRound(d.data[0] / sampleSize[0].quantity) -
					percentRound(d.data[last] / sampleSize[last].quantity));
			});

		// filters go in defs element
		var defs = svg.append("defs");
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

		chartObject.changeData = function (newDataset, newSampleSize, newTitleText, newCallout) {
			dataset = newDataset;
			sampleSize = newSampleSize;
			titleText = newTitleText;
			dimensions.showCalloutBox =
				(typeof newCallout !== 'undefined') ? newCallout : true;

			if (title.selectAll("text").text() !== newTitleText) {
				$(title.selectAll("text")[0][0])
					.animate({'opacity': 0}, { complete: function () {
							title.selectAll("text")
								.text(newTitleText)
								.call(resizeText, dimensions.innerWidth(), 42);
							$(this).animate({'opacity': 1});
						}});
			}

			if (!dimensions.showCalloutBox) {
				calloutBox.style("display", "none");
			} else {
				calloutBox.style("display", "");
			}

			xScale.domain([0, d3.max(dataset, function (d) {
					return d3.max(d.data, function (d, i) {
							return d / sampleSize[i].quantity;
						});
					})
				])
				.range([0, dimensions.dataWidth()]);
			yScaleOuter.domain(d3.range(newDataset.length));
			yScaleInner.domain(d3.range(newSampleSize.length));
			legendSpacing.domain(d3.range(sampleSize.length))
				.rangeRoundBands(
					[dimensions.legendLeft(), dimensions.legendRight()], 0.1);
			colors.range(colorSet(sampleSize.length));

			chartData.selectAll("g")
				.data(newDataset, dataKey)
				.each(function (dData, iData) {
					var group = d3.select(this);

					group.selectAll("rect")
						.data(newSampleSize)
						.exit()
						.remove();
					group.selectAll("rect")
						.data(newSampleSize)
						.style("fill", function (d, i) {
							return colors(i);
						})
						.transition()
						.attr("y", function (d, i) {
							return yScaleOuter(iData) + yScaleInner(i);
						})
						.attr("x", dimensions.dataLeft())
						.attr("height", yScaleInner.rangeBand())
						.attr("width", function (d, i) {
							return xScale(dData.data[i] / d.quantity);
						})
						.attr("data-original-title", function (d, i) {
							return dData.data[i] + " out of " + d.quantity + " " +
								d.title.toLowerCase() +
								" companies surveyed experience pain in this area";
						});
					group.selectAll("rect")
						.data(newSampleSize)
						.enter()
						.append("rect")
						.attr("y", function (d, i) {
							return yScaleOuter(iData) + yScaleInner(i);
						})
						.attr("x", dimensions.dataLeft())
						.attr("height", yScaleInner.rangeBand())
						.attr("width", 0)
						.attr("data-toggle", "tooltip")
						.attr("title", function (d, i) {
							return dData.data[i] + " out of " + d.quantity + " " +
								d.title.toLowerCase() +
								" companies surveyed experience pain in this area";
						})
						.style({
							// 'stroke': '#203368',
							'stroke-width': 0
						})
						.style("fill", function (d, i) {
							return colors(i);
						})
						.on("mouseover", function() {
							d3.select(this)
								.style("filter", "url(#drop-shadow)");
						})
						.on("mouseout", function(d) {
							d3.select(this)
								.style("filter", "");
						})
						.transition()
						.attr("width", function (d, i) {
							return xScale(dData.data[i] / d.quantity);
						});

					group.selectAll("text")
						.data(newSampleSize)
						.exit()
						.remove();
					group.selectAll("text")
						.data(newSampleSize)
						.style('font-size', function () {
							return Math.min(
									Math.round(yScaleInner.rangeBand() * 0.8),
									18
								) + "px";
						})
						.text(function (d, i) {
							return percentFormat(dData.data[i] / d.quantity);
						})
						.transition()
						.attr("x", function (d, i) {
							return dimensions.dataLeft() +
								xScale(dData.data[i] / d.quantity) +
								dimensions.paddingHorizontal;
						})
						.attr("y", function (d,i) {
							return yScaleOuter(iData) + yScaleInner(i) +
								yScaleInner.rangeBand() / 2;
						});
					group.selectAll("text")
						.data(newSampleSize)
						.enter()
						.append("text")
						.text(function (d, i) {
							return percentFormat(dData.data[i] / d.quantity);
						})
						.attr("x", function (d, i) {
							return dimensions.dataLeft() +
								xScale(dData.data[i] / d.quantity) +
								dimensions.paddingHorizontal;
						})
						.attr("y", function (d,i) {
							return yScaleOuter(iData) + yScaleInner(i) +
								yScaleInner.rangeBand() / 2;
						})
						.style(dataLabelStyles)
						.style('font-size', function () {
							return Math.min(
									Math.round(yScaleInner.rangeBand() * 0.8),
									18
								) + "px";
						});
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
				.call(reWrapLines, 
					(dimensions.yAxisWidth() - dimensions.paddingHorizontal)/1.1)
				.transition()
				.attr("x", function () {
					return dimensions.yAxisRight() - dimensions.paddingHorizontal;
				})
				.selectAll("tspan")
				.attr("x", function () {
					return dimensions.yAxisRight() - dimensions.paddingHorizontal;
				});

			calloutBox.selectAll("rect")
				.attr("x", function () {
					return dimensions.calloutLeft();
				})
				.attr("y", function () {
					return dimensions.calloutTop();
				})
				.attr("width", function () {
					return dimensions.calloutWidth();
				})
				.attr("height", function () {
					return dimensions.calloutHeight();
				});
			calloutBox.selectAll("text.title")
				.attr("x", dimensions.calloutCenterHorizontal())
				.attr("y", 
					(dimensions.legendTop() + dimensions.paddingVertical * 3))
				.call(reWrapLines, dimensions.calloutWidth() / 1.2);
			calloutBox.selectAll("text.difference")
				.attr("x", dimensions.calloutCenterHorizontal())
				.attr("y", function (d, i) {
					return yScaleOuter(i) + yScaleOuter.rangeBand() / 2;
				})
				.data(newDataset, dataKey)
				.text(function (d) {
					var last = newSampleSize.length - 1;
					return percentFormat(percentRound(d.data[0] /
						newSampleSize[0].quantity) -
						percentRound(d.data[last] / newSampleSize[last].quantity));
				});

			legend.selectAll("text.legend").data(sampleSize).exit().remove();
			legend.selectAll("text.legend").data(sampleSize)
				.text(function (d) {
					return  d.title + " (n=" + d.quantity + ")";
				})
				.attr('x', function (d, i) {
					return legendSpacing(i) + 41 * 0.6 +
						dimensions.paddingHorizontal;
				});
			legend.selectAll("text.legend").data(sampleSize).enter()
				.append("text")
				.attr("class", "legend")
				.text(function (d) {
					return d.title + " (n=" + d.quantity + ")";
				})
				.attr("x", function (d, i) {
					return legendSpacing(i) + 41 * 0.6 +
						dimensions.paddingHorizontal;
				})
				.attr("y", function () {
					return dimensions.legendCenterVertical();
				})
				.style({
					'fill': '#58585b',
					'font-family': 'Open Sans',
					'font-size': '14px',
					'alignment-baseline': 'middle'
				});

			legend.selectAll("path").data(sampleSize).exit().remove();
			legend.selectAll("path").data(sampleSize)
				.attr('transform', function (d, i) {
					return 'translate(' + (21 * 0.6 + legendSpacing(i)) +
						',' + dimensions.legendCenterVertical() + ') ' +
						'scale(0.6)';
				})
				.style("fill", function (d, i) {
					return colors(i);
				});
			legend.selectAll("path").data(sampleSize).enter()
				.append("path")
				.attr("d", hexagonPath)
				.style("fill", function (d, i) {
					return colors(i);
				})
				.style({
					'stroke-width': 0,
					// 'stroke': '#203368'
				})
				.attr('transform', function (d, i) {
					return 'translate(' + (21 * 0.6 + legendSpacing(i)) +
						',' + dimensions.legendCenterVertical() + ') ' +
						'scale(0.6)';
				});

			$(containerSelector).find('rect')
				.tooltip({
					'trigger': 'hover',
					'container': '.hovers'
				});
		};

		chartObject.resizeChart = function () {
			var width = $(containerSelector).width();
			dimensions.width = Math.max(width, dimensions.minWidth);
			svg.attr("width", dimensions.width);

			if (width < dimensions.hideCallout) {
				calloutBox.style({
					'display': 'none'
				});
				dimensions.calloutMinWidth = 0;
				dimensions.calloutProportion = 0;
			} else {
				if (dimensions.showCalloutBox) {
					calloutBox.style({
						'display': ''
					});						
				}

				dimensions.calloutMinWidth = 200;
				dimensions.calloutProportion = 0.2;
				dimensions.calloutPaddingLeft = 50;
			}

			// Adjust the scales
			xScale.range([0, dimensions.dataWidth()]);
			legendSpacing.rangeRoundBands(
				[dimensions.legendLeft(), dimensions.legendRight()], 0.1);

			title.selectAll("text")	//	Title Text
				.attr("y", dimensions.titleBottom())
				.attr("x", dimensions.centerHorizontal())
				.call(resizeText, dimensions.innerWidth(), 42);
			title.selectAll("path")	//	Underline the title
				.attr("d", function () {
					var path = "";
					path += "M" + dimensions.yAxisLeft() + "," + dimensions.titleUnderline();
					path += "L" + dimensions.calloutRight() + "," + dimensions.titleUnderline();
					return path;				
				});	

			legend.selectAll("path")
				.attr('transform', function (d, i) {
					return 'translate(' + (21 * 0.6 + legendSpacing(i)) +
						',' + dimensions.legendCenterVertical() + ')' +
						'scale(0.6)';
				});
			legend.selectAll("text.legend")
				.attr("x", function (d, i) {
					return legendSpacing(i) + 41 * 0.6 +
						dimensions.paddingHorizontal;
				})
				.attr("y", dimensions.legendCenterVertical());

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
				.call(reWrapLines, (dimensions.yAxisWidth() - dimensions.paddingHorizontal)/1.1)
				.attr("x", function () {
					return dimensions.yAxisRight() - dimensions.paddingHorizontal;
				})
				.selectAll("tspan")
				.attr("x", function () {
					return dimensions.yAxisRight() - dimensions.paddingHorizontal;
				});

			chartData.selectAll("g")
				.each(function (dData) {
					var group = d3.select(this);

					group.selectAll("rect")
						.attr("x", dimensions.dataLeft())
						.attr("width", function (d, i) {
							return xScale(dData.data[i] / d.quantity);
						});

					group.selectAll("text")
						.attr("x", function (d, i) {
							return dimensions.dataLeft() +
								xScale(dData.data[i] / d.quantity) +
								dimensions.paddingHorizontal;
						});
				});

			calloutBox.selectAll("rect")
				.attr("x", function () {
					return dimensions.calloutLeft();
				})
				.attr("width", function () {
					return dimensions.calloutWidth();
				});

			calloutBox.selectAll("text.title")
				.attr("x", dimensions.calloutCenterHorizontal())
				.call(reWrapLines, dimensions.calloutWidth() / 1.5);

			calloutBox.selectAll("text.difference")
				.attr("x", dimensions.calloutCenterHorizontal());
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
	return function (container, data, sample, titleName, callout) { 
		return drawRMCPChart(container, data, sample, titleName, callout);
	};
});
}
