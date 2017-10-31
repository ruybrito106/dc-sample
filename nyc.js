function getQuarter(d) {
    var q = ["Q1", "Q2", "Q3", "Q4"]
    return q[Math.floor(d.getMonth() / 3)]
}

function getDayOfTheWeek(d) {
    var q = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    return q[d.getDay()]
}

var quarterChart = dc.pieChart('#quarter-chart')
var dailyCountChart = dc.rowChart('#daily-count-chart')
var dailyAverageChart = dc.rowChart('#daily-average-chart')

d3.csv('data/nyc.csv', function(csv) {
    csv.forEach(d => {
        d['SALE DATE'] = new Date(d['SALE DATE'])
        d['SALE PRICE'] = parseInt(d['SALE PRICE'])
    })

    var ndx = crossfilter(csv)
    var all = ndx.groupAll()
    
    var quarterDimension = ndx.dimension(d => getQuarter(d['SALE DATE']))
    var quarterGroup = quarterDimension.group()

    quarterChart
        .width(180)
        .height(180)
        .radius(80)
        .innerRadius(30)
        .dimension(quarterDimension)
        .group(quarterGroup)

    var dailyCountDimension = ndx.dimension(d => getDayOfTheWeek(d['SALE DATE']))
    var dailyCountGroup = dailyCountDimension.group()

    dailyCountChart
        .width(500)
        .height(180)
        .dimension(dailyCountDimension)
        .group(dailyCountGroup)
        .elasticX(true)
        .xAxis().ticks(5)
    
    var dailyAverageDimension = ndx.dimension(d => getDayOfTheWeek(d['SALE DATE']))
    var dailyAverageGroup = dailyAverageDimension.group().reduce(
        (p, v) => {
            if(isNaN(v['SALE PRICE'])) return p
            p.count += 1
            p.sum += v['SALE PRICE']
            return p
        }, (p, v) => {
            if(isNaN(v['SALE PRICE'])) return p
            p.count -= 1
            p.sum += v['SALE PRICE']
            return p
        }, () => {
            return {
                count: 0, 
                sum: 0
            }
        }
    )
    
    dailyAverageChart
        .width(500)
        .height(180)
        .dimension(dailyAverageDimension)
        .group(dailyAverageGroup)
        .valueAccessor(p => p.value.count ? p.value.sum/p.value.count : 0.0)
        .elasticX(true)
        .xAxis().ticks(5)

    dc.renderAll()
})

