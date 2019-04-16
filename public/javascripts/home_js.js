$(document).ready(function () {
    var dragContainer = new hx.DragContainer('#container')

hx.select('#resetOrder').on('click', function() {
  dragContainer.order(undefined)
})
hx.select('#getOrder').on('click', function() {
  hx.notify.info('The order is: ' + dragContainer.order().join(', '))
})
    Array.prototype.sumUnic = function (name, sumName) {
        var returnArr = [];
        var obj = this;
        for (var x = 0; x < obj.length; x++) {
            if ((function (source) {
                    if (returnArr.length == 0) {
                        return true;
                    } else {
                        for (var y = 0; y < returnArr.length; y++) {
                            var isThere = [];
                            if (returnArr[y][name] == source[name]) {
                                if (parseInt(source[sumName]) > 0) {
                                    returnArr[y][sumName] = parseInt(returnArr[y][sumName]) + parseInt(source[sumName]);
                                    return false;
                                }
                            } else if (parseInt(source[sumName]) > 0) {
                                isThere.push(source);
                            }
                        }
                        if (isThere.length > 0) returnArr.push(source);
                        return false;
                    }
                })(obj[x])) {
                returnArr.push(obj[x]);
            }
        }
        return returnArr;
    }
    var Statement_data = $.ajax({
        async: false,
        url: '/data/new',
        type: 'get',
        data: {
            'Get': 'statement'
        },
        dataType: "JSON"
    }).responseJSON;
    // console.log(Statement_data.groupBy(v => (v.Employeeid)));      
    // console.log(Statement_data.map(x=> x.Employeeid));
    Bonus = Statement_data.sumUnic('Employeeid', 'Sub_total')
    console.log(Bonus);
    new Chart(document.getElementById("bar-chart"), {
        type: 'bar',
        data: {
            labels: Bonus.map(x => x.Employeeid),
            datasets: [{
                label: "Population (millions)",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                data: Bonus.map(x => x.Sub_total)
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Data Bonus For Each EmployeeID'
            },
            scales: {
                xAxes: [{
                    barPercentage: 0.4,
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    var Time = $.ajax({
        async: false,
        url: '/data/new',
        type: 'get',
        data: {
            'Get': 'time'
        },
        dataType: "JSON"
    }).responseJSON;
    console.log(Time);
    var End_Hours = 0;
    var End_Min = 0;
    var Start_Hours= 0;
    var Start_Min= 0;
    var array = [];
    var array_min = [];
    var array_end = [];
    var array_min_end = [];

    Time.forEach(element => {
        array.push(parseInt(element.Start_time.slice(11, 13), 10))
        array_min.push(parseInt(element.Start_time.slice(14, 16), 10));

        array_end.push(parseInt(element.End_time.slice(11, 13), 10))
        array_min_end.push(parseInt(element.End_time.slice(14, 16), 10));

        End_Hours = End_Hours + parseInt(element.End_time.slice(11, 13), 10);
        End_Min = End_Min + parseInt(element.End_time.slice(14, 16), 10);
        Start_Hours = Start_Hours + parseInt(element.Start_time.slice(11, 13), 10);
        Start_Min = Start_Min + parseInt(element.Start_time.slice(14, 16), 10);
    });
    $('#start_time_max').text("Max  "+_.max(array)+":"+array_min[array.indexOf(_.max(array))]+" AM  "+"Min  "+_.min(array)+":"+array_min[array.indexOf(_.min(array))]+" AM ");
    $('#start_time').text(Math.floor(Start_Hours/Time.length)+":"+Math.floor(Start_Min/Time.length)+" AM ");

    $('#end_time_max').text("Max  "+_.max(array_end)+":"+array_min_end[array_end.indexOf(_.max(array_end))]+" PM  "+"Min  "+_.min(array_end)+":"+array_min_end[array_end.indexOf(_.min(array_end))]+" PM ");
    $('#end_time').text(Math.floor(End_Hours/Time.length)+":"+Math.floor(End_Min/Time.length)+" PM ");
    
});