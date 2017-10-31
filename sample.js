var chart = dc.seriesChart("#test");
var ndx, runDimension, runGroup;

d3.csv("data/grades.csv", function(error, grades) {
  ndx = crossfilter(grades);
  runDimension = ndx.dimension(function(d) {return [d.Name, +d.Month]; });
  runGroup = runDimension.group().reduceSum(function(d) { return +d.Grade; });
  chart
    .width(768)
    .height(480)
    .chart(function(c) { return dc.lineChart(c).interpolate('cardinal'); })
    .x(d3.scale.linear().domain([0,12]))
    .brushOn(false)
    .yAxisLabel("2017 weeks")
    .xAxisLabel("Grades")
    .clipPadding(10)
    .elasticY(true)
    .dimension(runDimension)
    .group(runGroup)
    .mouseZoomable(true)
    .seriesAccessor(function(d) {return d.key[0];})
    .keyAccessor(function(d) {return +d.key[1];})
    .valueAccessor(function(d) {return +d.value;})
    .legend(dc.legend().x(350).y(350).itemHeight(13).gap(5).horizontal(1).legendWidth(140).itemWidth(70));

  chart.yAxis().tickFormat(function(d) {return d3.format(',d')(d);});
  chart.margins().left += 5;
  chart.margins().bottom += 5;
  dc.renderAll();
});
